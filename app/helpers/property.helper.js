'use strict'

const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')
const _ = require('lodash')
const rabbitMq = require('./rabbitMQ.helper')
// const sharp = require('sharp')
// const imageHelper = require('./image.helper')

// *************************************
// Recursive Function For CategoryChild
// *************************************

function getAllChildCategories (categories) {
  if (isNaN(categories) && !_.isArray(categories)) {
    return []
  }

  if (!_.isArray(categories)) {
    categories = [parseInt(categories)]
  }

  return db.PropertyCategory.findAll({ where: { ParentCategoryId: categories }, attributes: ['id'], raw: true })
    .then(async (resp) => {
      if (!_.isEmpty(resp)) {
        const idsArray = resp.map(x => x.id)
        let result = await getAllChildCategories(idsArray)
        return categories.concat(result)
      } else {
        return categories
      }
    })
}

// *********************************
// Recursive Function For AreaChild
// *********************************

function getAllChildAreas (areas) {
  if (isNaN(areas) && !_.isArray(areas)) {
    return []
  }

  if (!_.isArray(areas)) {
    areas = [parseInt(areas)]
  }

  return db.Area.findAll({ where: { ParentId: areas }, attributes: ['id'], raw: true })
    .then(async (resp) => {
      if (!_.isEmpty(resp)) {
        const idsArray = resp.map(x => x.id)
        let result = await getAllChildAreas(idsArray)
        return areas.concat(result)
      } else {
        return areas
      }
    })
}

// ************************
// To Get Property Listing
// ************************

async function getPropertiesListing (conditions, limit, offset) {
  let andConditions = []
  let where = ''
  let baseQuery = ''
  let queryForCount = '' // we will return total records of condition.
  let selectStatement

  selectStatement = 'SELECT `Properties`.`id`, `Users`.`name`, `Properties`.`title`, `CompanyProfiles`.`logo` ,`Properties`.`CompanyId`, `ListingTypes`.`title` as listingType, `Properties`.`titleL1`, `shortDescription`,`shortDescriptionL1`, `thumbnail`,`price`, `Properties`.`createdAt`, `Properties`.`purpose`, `Properties`.`area`, `Properties`.`areaUnit`, `Properties`.`location`, `Properties`.`slug`, `Properties`.`isActive`' +
    ' FROM `Properties`'

  baseQuery = baseQuery + ' INNER JOIN `ListingTypes` ON `ListingTypes`.`id` = `Properties`.`ListingTypeId` '
  baseQuery = baseQuery + ' LEFT JOIN `CompanyProfiles` ON `CompanyProfiles`.`id` = `Properties`.`CompanyId` '
  baseQuery = baseQuery + ' INNER JOIN `Users` ON `Users`.`id` = `Properties`.`UserId`'
  if (conditions.category) {
    // To Get All Child of Category
    await getAllChildCategories(conditions.category)
      .then((result) => {
        conditions.category = result || conditions.category
      })

    baseQuery = baseQuery + ' INNER JOIN `PropertyHasCategories` ON `PropertyHasCategories`.`PropertyId` = `Properties`.`id`'
    andConditions.push('`PropertyHasCategories`.`CategoryId` IN (' + conditions.category + ')')

    baseQuery = baseQuery + ' INNER JOIN `PropertyCategories` ON `PropertyCategories`.`id` = `PropertyHasCategories`.`CategoryId`'
    andConditions.push('`PropertyCategories`.`id` IN (' + conditions.category.slice(1) + ')')
  }

  if (conditions.AreaId) {
    // To Get All Property of Child Areas

    await getAllChildAreas(conditions.AreaId)
      .then((result) => {
        conditions.AreaId = result || conditions.AreaId
      })

    baseQuery = baseQuery + ' INNER JOIN `PropertyHasAreas` ON `PropertyHasAreas`.`PropertyId` = `Properties`.`id`'
    andConditions.push('`PropertyHasAreas`.`AreaId` IN (' + conditions.AreaId + ')')
  }

  if (conditions.hasOwnProperty('totalArea')) {
    andConditions.push('`Properties`.`area` = :totalArea')
  }

  if (conditions.hasOwnProperty('areaUnit')) {
    andConditions.push('`Properties`.`areaUnit` = :areaUnit')
  }

  if (conditions.CompanyId) {
    andConditions.push('`Properties`.`CompanyId` = :CompanyId')
  }

  if (conditions.hasOwnProperty('purpose')) {
    andConditions.push('`Properties`.`purpose` = :purpose')
  }

  if (conditions.hasOwnProperty('isApproved')) {
    andConditions.push('`Properties`.`isApproved` = :isApproved')
  }

  if (conditions.hasOwnProperty('UserId')) {
    andConditions.push('`Properties`.`UserId` = :UserId')
  }

  if (conditions.hasOwnProperty('isActive')) {
    andConditions.push(' `Properties`.`isActive` = ' + conditions.isActive)
  }

  if (conditions.minprice) {
    andConditions.push('`Properties`.`price` >= :minprice')
  }

  if (conditions.maxprice) {
    andConditions.push('`Properties`.`price` <= :maxprice')
  }

  if (andConditions.length) {
    where = 'WHERE' + andConditions.join(' AND ')
    where = ' ' + where + ' '
  }
  baseQuery = baseQuery + where

  if (conditions.createdAt) {
    baseQuery = baseQuery + ' ORDER BY `createdAt` DESC'
  } else {
    // GROUP BY pr id.
    baseQuery = baseQuery + ' GROUP BY `Properties`.`id`'
  }

  if (conditions.sortByDate) {
    if (conditions.sortByDate === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Properties`.`createdAt` ASC'
    } else if (conditions.sortByDate === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Properties`.`createdAt` DESC'
    }
  }

  if (conditions.sortByPrice) {
    if (conditions.sortByPrice === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Properties`.`price` ASC'
    } else if (conditions.sortByPrice === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Properties`.`price` DESC'
    }
  }

  queryForCount = baseQuery // copy the base query into query for total without applying limit offset

  baseQuery = baseQuery + ' LIMIT :limit'

  conditions.limit = parseInt(limit)

  // Check for offset.
  if (!isNaN(offset)) {
    baseQuery = baseQuery + ' OFFSET  ' + offset
    conditions.offset = offset
  }

  let result
  baseQuery = selectStatement + baseQuery

  return db.sequelize.query(baseQuery,
    {
      replacements: conditions,
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(async (queryResult) => {
      result = queryResult
      if (_.isEmpty(queryResult)) {
        return 0
      }

      const ids = queryResult.map(x => x.id)
      let amenitiesQuery = 'SELECT `title`, `PropertyAmenities`.`value`,`PropertyAmenities`.`PropertyId` FROM `AmenityProperties` INNER JOIN `PropertyAmenities` ON `PropertyAmenities`.`AmenityPropertyId` = `AmenityProperties`.`id` WHERE `PropertyAmenities`.`PropertyId` IN (' + ids + ') ORDER BY `AmenityProperties`.`orderSequence`'
      const value = await db.sequelize.query(amenitiesQuery, { type: db.sequelize.QueryTypes.SELECT })

      for (let i = 0; i < result.length; i++) {
        const temp = result[i]
        const filterAmenities = value.filter(x => x.PropertyId === temp.id)
        result[i].amenities = filterAmenities
      }

      let categoryQuery = 'SELECT `title`, `PropertyHasCategories`.`PropertyId` FROM `PropertyCategories` INNER JOIN `PropertyHasCategories` ON `PropertyHasCategories`.`CategoryId` = `PropertyCategories`.`id` WHERE `PropertyHasCategories`.`PropertyId` IN (' + ids + ')'
      const categoriesResult = await db.sequelize.query(categoryQuery, { type: db.sequelize.QueryTypes.SELECT })

      for (let i = 0; i < result.length; i++) {
        const temp = result[i]
        const filterCategories = categoriesResult.filter(x => x.PropertyId === temp.id)
        result[i].categories = filterCategories
      }
      queryForCount = 'SELECT COUNT(*) as count FROM `Properties` ' + queryForCount
      return db.sequelize.query(queryForCount, {
        replacements: conditions,
        type: db.sequelize.QueryTypes.SELECT
      })
    })
    .then((countQueryResult) => {
      let count = 0
      if (!_.isEmpty(countQueryResult)) {
        count = countQueryResult.length
      }
      return {
        result: result,
        count: count
      }
    })
}

// **********************
// To Generate Unique Id
// **********************

const generateUniqueKey = async (keyLength, purpose) => {
  let uId = purpose ? 's' : 'r'
  let date = new Date()
  uId = uId + date.getFullYear().toString().substr(2, 2) + date.getMonth().toString() + date.getDate().toString()
  let key = Math.floor(Math.pow(10, keyLength - 1) + Math.random() * (Math.pow(10, keyLength) - Math.pow(10, keyLength - 1) - 1)).toString()
  uId = uId + key

  await db.Property.findAll({
    where: { uId: uId }
  })
    .then((result) => {
      if (!_.isEmpty(result)) {
        return generateUniqueKey(keyLength, purpose)
      }
    })
  return uId
}

// ********************
// To Add New Property
// ********************

function addProperty (data, files) {
  let location = ''
  let locationL1 = ''
  let thumbnail = data.thumbnail

  console.log('thumbnail::::', thumbnail)

  if (data.multipleUnits) {
    data.multipleUnits = (data.multipleUnits === 'Yes')
  }

  if (data.isActive) {
    data.isActive = (data.isActive === 'Yes')
  }

  return db.Property.create(data)
    .then(async (insertedProperty) => {
      // generate slug
      insertedProperty.slug = insertedProperty.slug + '-' + insertedProperty.id

      // generate uid
      let uId = await generateUniqueKey(9, data.purpose)
      insertedProperty.uId = uId
      // to create Property Meta data of title
      const titleMeta = {
        PropertyId: insertedProperty.id,
        key: 'title',
        value: insertedProperty.title
      }
      // to create Property Meta data of title
      const descriptionMeta = {
        PropertyId: insertedProperty.id,
        key: 'description',
        value: insertedProperty.shortDescription || insertedProperty.description.length < 200 ? insertedProperty.description : insertedProperty.description
      }
      db.PropertyMeta.create(titleMeta)
      db.PropertyMeta.create(descriptionMeta)
      // upload images
      console.log(':::::::::::::???????///////////')
      if (files) {
        uploadFiles(insertedProperty.id, files, thumbnail)
      }console.log(':::::::::::::???????///////////')

      // sharp(thumbnail)
      //   .resize(320, 200)
      //   .toFile('outputfile.png, output.jpg')

      // To Save Currency Code from Currency Model to Property
      db.Currency.findOne({ where: { id: insertedProperty.CurrencyId } })
        .then((foundCurrency) => {
          insertedProperty.currency = foundCurrency.code
          insertedProperty.save()
        })
      // add categories
      const categoryIds = data.CategoryIds
      const propertyCategories = []
      for (let i = 0; i < categoryIds.length; i++) {
        propertyCategories.push({
          PropertyId: insertedProperty.id,
          CategoryId: categoryIds[i]
        })
      }
      db.PropertyHasCategory.bulkCreate(propertyCategories)

      // add areas
      const areaIds = data.AreaIds
      const propertyAreas = []
      for (let i = 0; i < areaIds.length; i++) {
        propertyAreas.push({
          PropertyId: insertedProperty.id,
          AreaId: areaIds[i]
        })
      }
      db.PropertyHasArea.bulkCreate(propertyAreas)

      db.CompanyProfile.findOne({
        where: { UserId: data.UserId }
      })
        .then((companyProfile) => {
          if (companyProfile) {
            let company = companyProfile.toJSON()
            insertedProperty.CompanyId = company.id
            insertedProperty.save()
          }
        })
      // format address string from areas and add to property.
      db.Area.findAll({
        where: { id: areaIds },
        attributes: ['name', 'nameL1'],
        order: [
          ['level', 'DESC']
        ]
      })
        .then((areas) => {
          for (let i = 0; i < areas.length; i++) {
            const area = areas[i]
            location = location + area.name
            locationL1 = locationL1 + area.nameL1
            if (i + 1 !== areas.length) {
              location = location + ', '
              locationL1 = locationL1 + ', '
            }
          }
          insertedProperty.location = location
          insertedProperty.locationL1 = locationL1
          insertedProperty.save()

          // if contact is given just add it into property relation
          if (data.contactInformation.ContactId) {
            db.PropertyContact.create({
              PropertyId: insertedProperty.id,
              ContactId: data.contactInformation.ContactId
            })
          } else {
            const contactInfo = data.contactInformation
            contactInfo.UserId = insertedProperty.UserId
            // Insert Into Table
            db.ContactInformation.create(contactInfo)
              .then(contact => {
                db.PropertyContact.create({
                  PropertyId: insertedProperty.id,
                  ContactId: contact.id
                })
              })
          }

          // Add Property Amenities
          if (data.amenities) {
            const amenities = data.amenities
            for (let i = 0; i < amenities.length; i++) {
              amenities[i]['PropertyId'] = insertedProperty.id
            }
            db.PropertyAmenity.bulkCreate(amenities)
          }

          // Add Video Url
          if (data.videos) {
            const videos = data.videos
            const videosObjects = []
            for (let i = 0; i < videos.length; i++) {
              videosObjects.push({
                PropertyId: insertedProperty.id,
                url: videos[i]
              })
            }
            db.PropertyVideo.bulkCreate(videosObjects)
          }
          // format address string from areas and add to property.
          db.PropertyCategory.findAll({
            where: { id: categoryIds },
            attributes: ['title'],
            order: [
              ['level', 'DESC']
            ],
            raw: true
          }).then((response) => {
            // to create Property Meta data of title
            const keyWordsMeta = {
              PropertyId: insertedProperty.id,
              key: 'keywords',
              value: insertedProperty.title + ' in ' + location + ', ' + insertedProperty.title + ' ' + response[0].title + ' in ' + location + ', ' + insertedProperty.title + ' ' + response[0].title + ' in ' + location
            }
            db.PropertyMeta.create(keyWordsMeta)
          })
        })
      return insertedProperty.save()
    })
}

// This is private method, not exported.
const uploadFiles = async (propertyId, files, thumbnailIndex) => {
  const urlArray = []
  const sizes = [{ height: 90, width: 130, ratio: '1x' }, { height: 280, width: 403, ratio: '2x' }, { height: 600, width: 940, ratio: '3x' }]
  for (let k = 0; k < files.length; k++) {
    await helpingHelperMethods.uploadFile(files[k], files[k].name)
      .then((images) => {
        urlArray.push({
          url: images.Location
        })
      })
  }
  let data = {}
  data.Id = propertyId
  if (isNaN(data.thumbnailIndex)) {
    data.thumbnailIndex = thumbnailIndex
  }
  data.urlArray = urlArray
  data.sizes = sizes
  data.replyQueue = 'propertyImages'
  rabbitMq.sendMessage(data, 'resizeAndWatermarkImages')
}

// ***********************************
// To Get Property Details Against Id
// ***********************************

function getProperty (conditions) {
  return db.Property.findOne({
    where: { id: conditions.id },
    attributes: ['id', 'title', 'titleL1', 'multipleUnits', 'shortDescription', 'shortDescriptionL1', 'description', 'descriptionL1', 'lat', 'lng', 'isActive', 'purpose', 'price', 'thumbnail', 'slug', 'uId', 'isVerified', 'area', 'areaUnit', 'isApproved', 'approvedBy', 'expiry', 'CompanyId', 'UserId', 'createdAt', 'updatedAt', 'location', 'LaunchingId', 'ListingTypeId'],
    include: [
      {
        model: db.PropertyVideo,
        as: 'videos',
        attributes: ['id', 'url', 'source', 'createdAt']
      },
      {
        model: db.Area,
        as: 'propertyAreas',
        attributes: ['id', 'title', 'titleL1', 'name', 'nameL1', 'level', 'createdAt'],
        through: {
          attributes: []
        }
      },
      {
        model: db.ContactInformation,
        as: 'propertyContacts',
        attributes: ['id', 'name', 'phone', 'fax', 'email', 'createdAt'],
        through: {
          attributes: []
        }
      },
      {
        model: db.PropertyCategory,
        as: 'categories',
        attributes: ['id', 'title', 'titleL1', 'level', 'slug', 'singularName', 'singularNameL1'],
        through: {
          attributes: []
        }
      },
      {
        model: db.CompanyProfile,
        as: 'propertyCompany'
      },
      {
        model: db.Currency,
        as: 'relatedCurrencyProperty',
        attributes: ['name', 'symbol']
      },
      {
        model: db.PropertyImage,
        as: 'images',
        attributes: ['id', 'url', 'uniqueImages', 'ratio']
      }
    ]
  })
    .then(async (property) => {
      if (_.isEmpty(property)) {
        return {}
      }
      property = JSON.parse(JSON.stringify(property))
      const amenities = await db.Amenities.findAll({
        attributes: ['title'],
        include: [
          {
            model: db.AmenityProperty,
            as: 'amenity',
            required: true,
            attributes: ['id', 'title', 'titleL1'],
            include: [{
              model: db.PropertyAmenity,
              attributes: ['id', 'value'],
              as: 'amenityValue',
              required: true,
              where: {
                PropertyId: conditions.id
              }
            }]
          }
        ]
      })
      if (property.CompanyId) {
        let propertyCount = await db.Property.count({
          where: { CompanyId: property.CompanyId }
        })
        // property.propertyCount = propertyCount
        property = { ...property, ...{ propertyCount: propertyCount } }
      }
      property['amenities'] = amenities
      return property
    })
}

// **********************************
// To Get 6 Related Properties
// **********************************

function getRelatedProperty (conditions) {
  return db.Property.findOne({
    where: { id: conditions.propertyId },
    attributes: ['id'],
    include: [{
      model: db.PropertyCategory,
      as: 'categories',
      attributes: ['id', 'title', 'level', 'slug', 'singularName'],
      through: {
        attributes: []
      }
    }
    ]
  }).then((res) => {
    if (!_.isEmpty(res)) {
      let response = res.toJSON()

      const categoryId = response.categories[0].id

      return db.PropertyCategory.findOne({
        where: { id: categoryId },
        limit: 6,
        subQuery: false,
        // attributes: [],
        include: [{
          model: db.Property,
          as: 'properties',
          attributes: ['id', 'title', 'titleL1', 'shortDescription', 'shortDescriptionL1', 'description', 'lat', 'lng', 'isActive', 'purpose', 'price', 'thumbnail', 'currency', 'slug', 'uId', 'CurrencyId', 'isVerified', 'area', 'areaUnit', 'isApproved', 'approvedBy', 'expiry', 'CompanyId', 'createdAt', 'location'],
          through: {
            attributes: []
          },
          include: [
            {
              model: db.CompanyProfile,
              as: 'propertyCompany',
              attributes: ['logo']
            },
            {
              model: db.PropertyCategory,
              as: 'categories',
              attributes: ['id', 'title', 'level', 'slug', 'singularName'],
              through: {
                attributes: []
              }
            },
            {
              model: db.AmenityProperty,
              as: 'propertyAmenities',
              attributes: ['id', 'AmenityId', 'title', 'titleL1', 'format', 'isRequired', 'orderSequence', 'createdAt'],
              through: {
                attributes: ['value']
              }
            }
          ]
        }]
      })
        .then(res => {
          return res.dataValues.properties
        })
    }
    return []
  })
}

// ***********************
// To Update Property
// ***********************

function updateProperty (data, id, files) {
  if (data.property.isActive) {
    data.property.isActive = data.property.isActive === 'Yes'
  }

  if (data.property.isApproved) {
    data.property.isApproved = true
  } else {
    data.property.isApproved = false
  }
  id = Number(id)
  return db.Property.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then(async (property) => {
      if (_.isEmpty(property)) {
        // User not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'Property not found.'
        }])
      }
      // Update Property
      if (data.property) {
        property.set(data.property)
        property.save()

        db.CompanyProfile.findOne({
          where: { UserId: property.UserId }
        })
          .then((companyProfile) => {
            if (companyProfile) {
              let company = companyProfile.toJSON()
              property.CompanyId = company.id
              property.save()
            }
          })

        if (data.property.CurrencyId) {
          db.Currency.findOne({
            where: { id: data.property.CurrencyId }
          })
            .then((resp) => {
              property.currency = resp.code
              property.save()
            })
        }
      }

      // if AreaIds Given
      if (data.AreaIds) {
        db.PropertyHasArea.destroy({ where: { PropertyId: id } })
          .then(() => {
            // add areas
            const areaIds = data.AreaIds
            const propertyAreas = []
            for (let i = 0; i < areaIds.length; i++) {
              propertyAreas.push({
                PropertyId: id,
                AreaId: areaIds[i]
              })
            }
            db.PropertyHasArea.bulkCreate(propertyAreas)

            // format address string from areas and add to property.
            db.Area.findAll({
              where: { id: areaIds },
              attributes: ['name', 'nameL1'],
              order: [
                ['level', 'DESC']
              ]
            })
              .then((areas) => {
                let location = ''
                let locationL1 = ''
                for (let i = 0; i < areas.length; i++) {
                  const area = areas[i]
                  location = location + area.name
                  locationL1 = locationL1 + area.nameL1
                  if (i + 1 !== areas.length) {
                    location = location + ', '
                    locationL1 = locationL1 + ', '
                  }
                }
                property.isApproved = false
                property.location = location
                property.locationL1 = locationL1
                property.save()
              })
          })
      }

      // If Categories Given
      if (data.CategoryIds) {
        db.PropertyHasCategory.destroy({ where: { PropertyId: id } })
          .then(() => {
            // add categories
            const categoryIds = data.CategoryIds
            const propertyCategories = []
            for (let i = 0; i < categoryIds.length; i++) {
              propertyCategories.push({
                PropertyId: id,
                CategoryId: categoryIds[i]
              })
            }
            db.PropertyHasCategory.bulkCreate(propertyCategories)
            property.isApproved = false
            property.save()
          })
      }

      // if Amenities Given
      if (data.updateAmenities) {
        db.PropertyAmenity.destroy({ where: { PropertyId: id } })
          .then((response) => {
            // Add Property Amenities
            if (data.updateAmenities.length) {
              const amenities = data.updateAmenities
              for (let i = 0; i < amenities.length; i++) {
                amenities[i]['PropertyId'] = id
              }
              const filterAmenities = amenities.filter(x => x.value !== '')
              db.PropertyAmenity.bulkCreate(filterAmenities)
              property.isApproved = false
              property.save()
            }
          })
      }

      if (data.deletedImages) {
        let deletedImages = data.deletedImages
        db.PropertyImage.destroy({ where: { PropertyId: id, id: deletedImages } })
        property.isApproved = false
        property.save()
      }

      // if Files Sent
      // if (files && files.length) {
      //   let thumbnail = JSON.parse(data.property.thumbnailObject)
      //   let index

      //   if (thumbnail.type === 'index') {
      //     index = thumbnail.value
      //   }
      // upload images
      //   uploadFiles(id, files, index)
      //   property.isApproved = false
      //   property.save()
      // }
      // let thumbnailValue = data.property.thumbnailObject
      // if (thumbnailValue.type === 'url') {
      //   property.thumbnail = thumbnailValue.value
      //   property.save()
      // }

      if (data.contactInformation.ContactId) {
        return db.PropertyContact.findOne({ where: { PropertyId: id } })
          .then((response) => {
            if (!response) {
              // ContactInfo not found, throw error
              return generalHelpingMethods.rejectPromise([{
                field: 'Role',
                error: 1564,
                message: 'ContactInformation not found Against this id'
              }])
            }
            db.PropertyContact.destroy({
              where: { PropertyId: id }
            })
              .then(() => {
                db.PropertyContact.create({
                  PropertyId: id,
                  ContactId: data.contactInformation.ContactId
                })
                property.isApproved = false
                property.save()
              })
          })
      } else if (!_.isEmpty(data.contactInformation)) {
        const contactInformation = data.contactInformation
        db.PropertyContact.destroy({
          where: { PropertyId: id }
        })
          .then((response) => {
            // Insert Into Table
            if (response) {
              db.ContactInformation.create(contactInformation)
                .then(contact => {
                  db.PropertyContact.create({
                    PropertyId: id,
                    ContactId: contact.id
                  })
                  property.isApproved = false
                  property.save()
                })
            }
          })
      }
    })
}

// ********************************************************
// Receive Images from Microservice and Save To Database
// ********************************************************

function insertImages (imagesData, propertyData) {
  db.Property.findOne({
    where: { id: propertyData.Id }
  })
    .then((foundProperty) => {
      let images = []
      for (let i = 0; i < imagesData.length; i++) {
        images.push({
          url: imagesData[i].url,
          ratio: imagesData[i].ratio,
          uniqueImages: imagesData[i].uniqueImages,
          PropertyId: propertyData.Id
        })
      }
      db.PropertyImage.bulkCreate(images)
      if (propertyData.thumbnailIndex) {
        foundProperty.thumbnail = imagesData[propertyData.thumbnailIndex].url
        foundProperty.save()
      }
    })
}

module.exports = {
  getPropertiesListing,
  addProperty,
  getProperty,
  getRelatedProperty,
  updateProperty,
  insertImages
}
