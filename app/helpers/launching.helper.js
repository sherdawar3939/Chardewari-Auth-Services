'use strict'

const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')
const _ = require('lodash')
const rabbitMq = require('./rabbitMQ.helper')
// **********************
// To Generate Unique Id
// **********************

const generateUniqueKey = async (keyLength) => {
  let uId = ''
  let date = new Date()
  uId = uId + date.getFullYear().toString().substr(2, 2) + date.getMonth().toString() + date.getDate().toString()
  let key = Math.floor(Math.pow(10, keyLength - 1) + Math.random() * (Math.pow(10, keyLength) - Math.pow(10, keyLength - 1) - 1)).toString()
  uId = uId + key

  await db.Launching.findAll({
    where: { uId: uId }
  })
    .then((result) => {
      if (!_.isEmpty(result)) {
        return generateUniqueKey(keyLength)
      }
    })
  return uId
}

// *********************
// To Add New Launching
// *********************

function addLaunching (data, files) {
  // let thumbnail = JSON.parse(data.thumbnailObject)
  if (data.isActive) {
    data.isActive = (data.isActive === 'Yes')
  }
  if (data.isProject) {
    data.isProject = (data.isProject === 'true' || data.isProject === true)
  }
  return db.Launching.create(data)
    .then(async (insertedLaunching) => {
      // upload images
      // uploadFiles(insertedLaunching.id, files, thumbnail.value)

      // generate slug
      insertedLaunching.slug = insertedLaunching.slug + '-' + insertedLaunching.id

      // generate uid
      let uId = await generateUniqueKey(5)
      insertedLaunching.uId = uId

      // add categories
      const categoryIds = data.CategoryIds
      const launchingCategories = []
      for (let i = 0; i < categoryIds.length; i++) {
        launchingCategories.push({
          LaunchingId: insertedLaunching.id,
          CategoryId: categoryIds[i]
        })
      }
      db.LaunchingHasCategory.bulkCreate(launchingCategories)

      // To Save Currency Code from Currency Model to Property
      db.Currency.findOne({ where: { id: insertedLaunching.CurrencyId } })
        .then((foundCurrency) => {
          insertedLaunching.currency = foundCurrency.code
          insertedLaunching.save()
        })

      // add areas
      const areaIds = data.AreaIds
      const launchingAreas = []
      for (let i = 0; i < areaIds.length; i++) {
        launchingAreas.push({
          LaunchingId: insertedLaunching.id,
          AreaId: areaIds[i]
        })
      }
      db.LaunchingHasArea.bulkCreate(launchingAreas)

      db.CompanyProfile.findOne({
        where: { UserId: insertedLaunching.UserId }
      })
        .then((companyProfile) => {
          if (companyProfile) {
            let company = companyProfile.toJSON()
            insertedLaunching.CompanyId = company.id
            insertedLaunching.save()
          }
        })
      insertedLaunching.CurrencyId = data.CurrencyId
      // format address string from areas and add to Launching.
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
          insertedLaunching.location = location
          insertedLaunching.locationL1 = locationL1
          insertedLaunching.save()
        })

      // if contact is given just add it into property relation
      if (data.contactInformation.ContactId) {
        db.LaunchingContact.create({
          LaunchingId: insertedLaunching.id,
          ContactId: data.contactInformation.ContactId
        })
      } else {
        const contactInformation = data.contactInformation
        // Insert Into Table
        db.ContactInformation.create(contactInformation)
          .then(contact => {
            db.LaunchingContact.create({
              LaunchingId: insertedLaunching.id,
              ContactId: contact.id
            })
          })
      }

      // Add Property Amenities
      if (data.amenities) {
        const amenities = data.amenities
        for (let i = 0; i < amenities.length; i++) {
          amenities[i]['LaunchingId'] = insertedLaunching.id
        }
        db.LaunchingAmenity.bulkCreate(amenities)
      }

      // Add Video Url
      if (data.videos) {
        const videos = data.videos
        const videosObjects = []
        for (let i = 0; i < videos.length; i++) {
          videosObjects.push({
            LaunchingId: insertedLaunching.id,
            url: videos[i]
          })
        }
        db.LaunchingVideo.bulkCreate(videosObjects)
      }

      return insertedLaunching.save()
    })
}
// This is private method, not exported.
const uploadFiles = async (LaunchingId, files, thumbnailIndex) => {
  const urlArray = []
  const sizes = [{ height: 90, width: 130, ratio: '1x' }, { height: 270, width: 400, ratio: '2x' }, { height: 395, width: 292, ratio: '3x' }, { height: 600, width: 940, ratio: '4x' }]
  for (let k = 0; k < files.length; k++) {
    await helpingHelperMethods.uploadFile(files[k], files[k].name)
      .then((images) => {
        urlArray.push({
          url: images.Location
        })
      })
  }
  let data = {}
  data.Id = LaunchingId
  if (!isNaN(thumbnailIndex)) {
    data.thumbnailIndex = thumbnailIndex
  }
  data.urlArray = urlArray
  data.sizes = sizes
  data.replyQueue = 'launchingImages'
  rabbitMq.sendMessage(data, 'resizeAndWatermarkImages')
}

// ************************
// To Get Launching Listing
// ************************

function getLaunchingsListing (conditions, limit, offset) {
  let andConditions = []
  let where = ''
  let baseQuery = ''
  let queryForCount = '' // we will return total records of condition.

  if (conditions.isProject) {
    conditions.isProject = (conditions.isProject === 'true')
  }

  let selectStatement = 'SELECT `Launchings`.`id`,`CompanyProfiles`.`name`,`CompanyProfiles`.`email`, `CompanyProfiles`.`phone`, `CompanyProfiles`.`fax`, `CompanyProfiles`.`description`, `Launchings`.`title`,`Launchings`.`minPrice`, `Launchings`.`maxPrice`,`Launchings`.`launchDate`, `Launchings`.`titleL1`, `shortDescription`,`shortDescriptionL1`, `Launchings`.`description`, `thumbnail`, `Launchings`.`createdAt`, `Launchings`.`area`, `Launchings`.`areaUnit`, `Launchings`.`location`, `Launchings`.`slug`, `Launchings`.`isActive` ' +
        ' FROM `Launchings`'

  baseQuery = baseQuery + ' LEFT JOIN `CompanyProfiles` ON `CompanyProfiles`.`id` = `Launchings`.`CompanyId` '

  if (conditions.category) {
    baseQuery = baseQuery + ' INNER JOIN `LaunchingHasCategories` ON `LaunchingHasCategories`.`LaunchingId` = `Launchings`.`id`'
    andConditions.push('`LaunchingHasCategories`.`CategoryId` = :category')
  }

  if (conditions.AreaId) {
    baseQuery = baseQuery + ' INNER JOIN `LaunchingHasAreas` ON `LaunchingHasAreas`.`LaunchingId` = `Launchings`.`id`'
    andConditions.push('`LaunchingHasAreas`.`AreaId` = :AreaId')
  }

  if (conditions.hasOwnProperty('UserId')) {
    andConditions.push('`Launchings`.`UserId` = :UserId')
  }

  if (conditions.hasOwnProperty('CompanyId')) {
    andConditions.push('`Launchings`.`CompanyId` = :CompanyId')
  }

  if (conditions.hasOwnProperty('isProject')) {
    andConditions.push('`Launchings`.`isProject` = :isProject')
  }

  if (conditions.hasOwnProperty('title')) {
    conditions.title = '%' + conditions.title + '%'
    andConditions.push('`Launchings`.`title` like :title')
  }

  if (conditions.hasOwnProperty('isActive')) {
    andConditions.push('`Launchings`.`isActive` = ' + conditions.isActive)
  }

  if (conditions.minprice) {
    andConditions.push('`Launchings`.`minPrice` >= :minprice')
  }

  if (conditions.maxprice) {
    andConditions.push('`Launchings`.`maxPrice` <= :maxprice')
  }

  if (andConditions.length) {
    where = 'WHERE' + andConditions.join(' AND ')
    where = ' ' + where + ' '
  }
  baseQuery = baseQuery + where

  // GROUP BY pr id.
  baseQuery = baseQuery + ' GROUP BY `Launchings`.`id`'

  if (conditions.sortByDate) {
    if (conditions.sortByDate === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Launchings`.`createdAt` ASC'
    } else if (conditions.sortByDate === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Launchings`.`createdAt` DESC'
    }
  }
  if (conditions.sortByPrice) {
    if (conditions.sortByPrice === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Launchings`.`price` ASC'
    } else if (conditions.sortByPrice === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Launchings`.`price` DESC'
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
  return db.sequelize.query(baseQuery, {
    replacements: conditions,
    type: db.sequelize.QueryTypes.SELECT
  })
    .then((queryResult) => {
      result = queryResult
      if (_.isEmpty(queryResult)) {
        return 0
      }

      queryForCount = 'SELECT COUNT(*) as count FROM `Launchings` ' + queryForCount
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

// *************************************
// To Get Launching Details Against Id
// *************************************

async function getLaunching (conditions) {
  return db.Launching.findOne({
    where: { id: conditions.id },
    attributes: ['id', 'title', 'titleL1', 'CurrencyId', 'shortDescription', 'shortDescriptionL1', 'updatedAt', 'description', 'lat', 'lng', 'isActive', 'minPrice', 'maxPrice', 'launchDate', 'thumbnail', 'slug', 'uId', 'isVerified', 'area', 'areaUnit', 'isApproved', 'approvedBy', 'expiry', 'CompanyId', 'createdAt', 'location', 'UserId'],
    include: [{
      model: db.LaunchingVideo,
      as: 'LaunchingVideos',
      attributes: ['id', 'url', 'source', 'createdAt']
    },
    {
      model: db.Area,
      as: 'launchingAreas',
      attributes: ['id', 'title', 'titleL1', 'name', 'nameL1', 'level', 'createdAt'],
      through: {
        attributes: []
      }
    },
    {
      model: db.ContactInformation,
      as: 'launchingContacts',
      attributes: ['id', 'name', 'phone', 'fax', 'email', 'createdAt'],
      through: {
        attributes: []
      }
    },
    {
      model: db.LaunchingCategory,
      as: 'launchings',
      attributes: ['id', 'title', 'titleL1', 'level', 'slug', 'singularName', 'singularNameL1'],
      through: {
        attributes: []
      }
    },
    {
      model: db.CompanyProfile,
      as: 'LaunchingCompany'
    },
    {
      model: db.Currency,
      as: 'relatedCurrencyLaunching',
      attributes: ['name', 'symbol']
    },
    {
      model: db.LaunchingImage,
      as: 'LaunchingImages',
      attributes: ['id', 'url', 'ratio']
    }
    ]
  })
    .then(async (project) => {
      if (_.isEmpty(project)) {
        return {}
      }
      project = JSON.parse(JSON.stringify(project))
      let amenities = await db.Amenities.findAll({
        attributes: ['title'],
        include: [{
          model: db.AmenityProperty,
          as: 'amenity',
          required: true,
          attributes: ['id', 'title', 'titleL1'],
          include: [{
            model: db.LaunchingAmenity,
            attributes: ['value'],
            as: 'amenityLaunchingValue',
            required: true,
            where: {
              LaunchingId: conditions.id
            }
          }]
        }]
      })
      if (project.CompanyId) {
        let propertyCount = await db.Property.count({
          where: { CompanyId: project.CompanyId }
        })
        // project.projectCount = projectCount
        project = { ...project, ...{ propertyCount: propertyCount } }
      }
      project['amenities'] = amenities
      return project
    })
}

// **********************************
// To Update Launchings
// **********************************

function updateLaunchings (data, id, files) {
  console.log(data)
  if (data.launching.isActive) {
    data.launching.isActive = JSON.parse(data.launching.isActive === 'Yes')
  }

  let thumbnail = {}
  try {
    thumbnail = JSON.parse(data.launching.thumbnailObject)
  } catch (error) {
  }

  let Id = Number(id)
  return db.Launching.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then(async (launching) => {
      if (_.isEmpty(launching)) {
        // User not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'launching not found.'
        }])
      }

      // Update launching
      if (data.launching) {
        launching.set(data.launching)
        launching.save()
        db.CompanyProfile.findOne({
          where: { UserId: launching.UserId }
        })
          .then((companyProfile) => {
            if (companyProfile) {
              let company = companyProfile.toJSON()
              launching.CompanyId = company.id
              launching.save()
            }
          })
      }
      // If CurrencyId Given find and update currency
      if (data.launching.CurrencyId) {
        db.Currency.findOne({
          where: { id: data.launching.CurrencyId }
        })
          .then((resp) => {
            launching.currency = resp.code
            launching.save()
          })
      }
      // if areaIds  given then Update
      if (data.AreaIds) {
        db.LaunchingHasArea.destroy({ where: { LaunchingId: id } })
          .then(() => {
            // add areas
            const areaIds = data.AreaIds
            const launchingAreas = []
            for (let i = 0; i < areaIds.length; i++) {
              launchingAreas.push({
                LaunchingId: id,
                AreaId: areaIds[i]
              })
            }
            db.LaunchingHasArea.bulkCreate(launchingAreas)

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
                launching.location = location
                launching.locationL1 = locationL1
                launching.save()
              })
          })
      }

      // If Categories Given
      if (data.CategoryIds) {
        db.LaunchingHasCategory.destroy({ where: { LaunchingId: id } })
          .then(() => {
            // add categories
            const categoryIds = data.CategoryIds
            const launchingCategories = []
            for (let i = 0; i < categoryIds.length; i++) {
              launchingCategories.push({
                LaunchingId: id,
                CategoryId: categoryIds[i]
              })
            }
            db.LaunchingHasCategory.bulkCreate(launchingCategories)
          })
      }

      // if Amenities Given
      if (data.updateAmenities) {
        db.LaunchingAmenity.destroy({ where: { LaunchingId: id } })
          .then(() => {
            // Add Property Amenities
            if (data.updateAmenities.length) {
              const amenities = data.updateAmenities
              for (let i = 0; i < amenities.length; i++) {
                amenities[i]['LaunchingId'] = id
              }
              const filterAmenities = amenities.filter(x => x.value !== '')
              db.LaunchingAmenity.bulkCreate(filterAmenities)
            }
          })
      }

      if (data.deletedImages) {
        let deletedImages = JSON.parse(data.deletedImages)
        db.LaunchingImage.destroy({ where: { LaunchingId: id, id: deletedImages } })
      }

      // To Update Images If Given
      if (files) {
        // upload images
        uploadFiles(Id, files, thumbnail.value)
      }
      if (thumbnail.type === 'url') {
        launching.thumbnail = thumbnail.value
        launching.save()
      }
      // if Contact id Given Then Update Relation
      if (data.contactInformation.ContactId) {
        return db.LaunchingContact.findOne({ where: { LaunchingId: id } })
          .then((response) => {
            if (!response) {
              // ContactInfo not found, throw error
              return generalHelpingMethods.rejectPromise([{
                field: 'Role',
                error: 1564,
                message: 'ContactInformation not found Against this Id'
              }])
            }
            db.LaunchingContact.destroy({
              where: { LaunchingId: id }
            })
              .then(() => {
                db.LaunchingContact.create({
                  LaunchingId: id,
                  ContactId: data.contactInformation.ContactId
                })
              })
          })
      } else {
        const contactInformation = data.contactInformation
        db.LaunchingContact.destroy({
          where: { LaunchingId: Id }
        })
          .then((response) => {
            // Insert Into Table
            if (response) {
              db.ContactInformation.create(contactInformation)
                .then(contact => {
                  db.LaunchingContact.create({
                    LaunchingId: Id,
                    ContactId: contact.id
                  })
                })
            }
          })
      }
    })
}

// ********************************************************
// Receive Images from Microservice and Save To Database
// ********************************************************

function insertImages (imagesData, launchingData) {
  db.Launching.findOne({
    where: { id: launchingData.Id }
  })
    .then((foundLaunching) => {
      let images = []
      for (let i = 0; i < imagesData.length; i++) {
        images.push({
          url: imagesData[i].url,
          ratio: imagesData[i].ratio,
          uniqueImages: imagesData[i].uniqueImages,
          LaunchingId: launchingData.Id
        })
      }
      db.LaunchingImage.bulkCreate(images)
      if (launchingData.thumbnailIndex) {
        foundLaunching.thumbnail = imagesData[launchingData.thumbnailIndex].url
        foundLaunching.save()
      }
    })
}

module.exports = {
  addLaunching,
  getLaunchingsListing,
  getLaunching,
  updateLaunchings,
  insertImages
}
