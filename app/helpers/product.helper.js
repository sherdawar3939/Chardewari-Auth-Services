'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')
const _ = require('lodash')
const rabbitMq = require('./rabbitMQ.helper')

// ********************
// To Get Products
// ********************

function searchProducts (conditions, limit = 50, offset = 0) {
  let andConditions = []
  let where = ''
  let baseQuery = ''
  let queryForCount = '' // we will return total records of condition.
  let selectStatement = 'SELECT `Products`.`id`, `Products`.`title`, `Products`.`titleL1`, `Products`.`thumbnail`, `Products`.`price`, `Products`.`discountedPrice`, `Products`.`location`, `Products`.`locationL1`, `Products`.`size`, `Products`.`quality`, `Products`.`description`, `Products`.`descriptionL1`' +
        ' FROM `Products`'

  if (conditions.category) {
    baseQuery = baseQuery + ' INNER JOIN `ProductHasCategories` ON `ProductHasCategories`.`ProductId` = `Products`.`id`'
    andConditions.push('`ProductHasCategories`.`CategoryId` = :category')
  }

  if (conditions.AreaId) {
    baseQuery = baseQuery + ' INNER JOIN `ProductHasAreas` ON `ProductHasAreas`.`ProductId` = `Products`.`id`'
    andConditions.push('`ProductHasAreas`.`AreaId` = :AreaId')
  }

  if (conditions.hasOwnProperty('title')) {
    conditions.title = '%' + conditions.title + '%'
    andConditions.push('`Products`.`title` like :title')
  }

  if (conditions.minPrice) {
    andConditions.push('`Products`.`price` >= :minPrice')
  }

  if (conditions.maxPrice) {
    andConditions.push('`Products`.`price` <= :maxPrice')
  }

  if (conditions.hasOwnProperty('discountedPrice')) {
    andConditions.push('`Products`.`discountedPrice` = :discountedPrice')
  }

  if (conditions.hasOwnProperty('UserId')) {
    andConditions.push('`Products`.`UserId` = :UserId')
  }

  if (conditions.hasOwnProperty('isActive')) {
    andConditions.push('`Products`.`isActive` = ' + conditions.isActive)
  }

  andConditions.push('`Products`.`isDeleted` = false')

  if (andConditions.length) {
    where = 'WHERE' + andConditions.join(' AND ')
    where = ' ' + where + ' '
  }
  baseQuery = baseQuery + where

  // GROUP BY pr id.
  baseQuery = baseQuery + ' GROUP BY `Products`.`id`'

  if (conditions.sortByDate) {
    if (conditions.sortByDate === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Products`.`createdAt` ASC'
    } else if (conditions.sortByDate === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Products`.`createdAt` DESC'
    }
  }
  if (conditions.sortByPrice) {
    if (conditions.sortByPrice === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Products`.`price` ASC'
    } else if (conditions.sortByPrice === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Products`.`price` DESC'
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

      queryForCount = 'SELECT COUNT(*) as count FROM `Products` ' + queryForCount
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
// To Update New Product
// **********************

const updateProduct = (data, id, files) => {
  return db.Product.findOne({
    where: {
      id: id,
      isDeleted: false
    },
    attributes: ['id', 'title', 'titleL1', 'UnitId', 'description', 'descriptionL1', 'location', 'isActive', 'locationL1', 'size', 'price', 'thumbnail', 'currency', 'UserId', 'discountedPrice', 'createdAt']
  })
    .then((product) => {
      if (_.isEmpty(product)) {
        // Product not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'Product not found.'
        }])
      }
      if (data) {
        // Update product
        product.update(data, { where: { id: id.id } })
      }

      // If AreaIds Are given it will update them
      if (data.AreaIds) {
        db.ProductHasArea.destroy({ where: { ProductId: id } })
          .then(() => {
            // add areas
            const areaIds = data.AreaIds
            const productAreas = []
            for (let i = 0; i < areaIds.length; i++) {
              productAreas.push({
                ProductId: id,
                AreaId: areaIds[i]
              })
            }
            db.ProductHasArea.bulkCreate(productAreas)

            // format address string from areas and add to Product.
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
                product.location = location
                product.locationL1 = locationL1
                product.save()
              })
          })
      }

      // if categories given
      if (data.CategoryIds) {
        db.ProductHasCategory.destroy({ where: { ProductId: id } })
          .then(() => {
            // add categories
            const categoryIds = data.CategoryIds
            const productCategories = []
            for (let i = 0; i < categoryIds.length; i++) {
              productCategories.push({
                ProductId: id,
                CategoryId: categoryIds[i]
              })
            }
            db.ProductHasCategory.bulkCreate(productCategories)
          })
      }

      // To Delete Image
      if (data.deleteImage) {
        db.ProductImage.findAll({ where: { id: data.deleteImage } })
          .then((image) => {
            if (image) {
              db.ProductImage.destroy({ where: { id: data.deleteImage } })
            }
          })
      }

      // if (files && files.length) {
      //   let thumbnail = JSON.parse(data.thumbnailObject)
      //   // upload images
      //   return uploadFiles(id, files, data.title)
      //     .then((insertedImages) => {
      //     // data.thumbnailIndex
      //       if (thumbnail.type === 'index') {
      //       // data.thumbnailIndex
      //         if (thumbnail.value !== '' && thumbnail.value !== undefined && thumbnail.value != null) {
      //         // const filter = insertedImages.filter(x => x.ratio === '2x')
      //           product.thumbnail = insertedImages[thumbnail.value].url
      //           product.save()
      //         }
      //       }
      //     })
      // }
      // let thumbnailValue = JSON.parse(data.thumbnailObject)
      // if (thumbnailValue.type === 'url') {
      //   product.thumbnail = thumbnailValue.value
      //   product.save()
      // }
    })
}

// ********************
// To Delete Product
// ********************

const deleteProduct = (input) => {
  return db.Product.findOne({
    where: {
      id: input.id,
      isDeleted: false
    },
    attributes: ['id', 'title', 'titleL1', 'UnitId', 'description', 'descriptionL1', 'location', 'isActive', 'locationL1', 'size', 'price', 'thumbnail', 'currency', 'UserId', 'discountedPrice', 'createdAt']
  })
    .then((product) => {
      if (_.isEmpty(product)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No product found against given id.'
        }])
      }
      // employee found, change value of isDeleted to true
      product.isDeleted = true
      // save employee
      product.save()
      return true
    })
}

// ********************
// To Add New Product
// ********************

function addProduct (data, files) {
  // console.log(files)
  return db.CompanyProfile.findOne({
    where: { UserId: data.UserId }
  })
    .then((profile) => {
      if (_.isEmpty(profile)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'Please Add Company Profile To proceed'
        }])
      }
      data.CompanyId = profile.id
      return db.Product.create(data)
        .then(async (insertedProduct) => {
          // upload images
          uploadFiles(insertedProduct.id, files, data.thumbnailIndex)

          // generate slug
          insertedProduct.slug = insertedProduct.slug + '-' + insertedProduct.id
          insertedProduct.save()

          // add categories
          const categoryIds = data.CategoryIds
          const productCategories = []
          for (let i = 0; i < categoryIds.length; i++) {
            productCategories.push({
              ProductId: insertedProduct.id,
              CategoryId: categoryIds[i]
            })
          }
          db.ProductHasCategory.bulkCreate(productCategories)

          // add areas
          const areaIds = data.AreaIds
          const productAreas = []
          for (let i = 0; i < areaIds.length; i++) {
            productAreas.push({
              ProductId: insertedProduct.id,
              AreaId: areaIds[i]
            })
          }
          db.ProductHasArea.bulkCreate(productAreas)

          // format address string from areas and add to product.
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
              insertedProduct.location = location
              insertedProduct.locationL1 = locationL1
              insertedProduct.save()
            })
          return insertedProduct.save()
        })
    })
}

// This is private method, not exported.
const uploadFiles = async (ProductId, files, thumbnailIndex) => {
  const urlArray = []
  const sizes = [{ height: 90, width: 130, ratio: '1x' }, { height: 280, width: 403, ratio: '2x' }]
  for (let k = 0; k < files.length; k++) {
    await helpingHelperMethods.uploadFile(files[k], files[k].name)
      .then((images) => {
        urlArray.push({
          url: images.Location
        })
      })
  }
  let data = {}
  data.Id = ProductId
  if (!isNaN(data.thumbnailIndex)) {
    data.thumbnailIndex = thumbnailIndex
  }
  data.urlArray = urlArray
  data.sizes = sizes
  data.replyQueue = 'productImages'
  rabbitMq.sendMessage(data, 'resizeAndWatermarkImages')
}

// **********************************
// To Get Product Details Against Id
// **********************************

function getProductDetails (conditions) {
  return db.Product.findOne({
    where: { id: conditions.id },
    attributes: ['id', 'title', 'titleL1', 'UnitId', 'description', 'descriptionL1', 'location', 'isActive', 'locationL1', 'size', 'price', 'thumbnail', 'currency', 'UserId', 'discountedPrice', 'createdAt'],
    include: [{
      model: db.ProductImage,
      as: 'images',
      attributes: ['id', 'url', 'ratio', 'createdAt']
    },
    {
      model: db.Area,
      as: 'relatedAreaProducts',
      attributes: ['id', 'title', 'titleL1', 'name', 'nameL1', 'level', 'createdAt'],
      through: {
        attributes: []
      }
    },
    {
      model: db.ProductCategory,
      as: 'productsCategory',
      attributes: ['id', 'title', 'titleL1', 'level', 'slug', 'singularName', 'singularNameL1'],
      through: {
        attributes: []
      }
    },
    {
      model: db.CompanyProfile,
      as: 'relatedCompanyProducts'
    }
    ]
  })
}

// ********************************************************
// Receive Images from Microservice and Save To Database
// ********************************************************

function insertImages (imagesData, productData) {
  db.Product.findOne({
    where: { id: productData.Id },
    attributes: ['id']
  })
    .then((foundProduct) => {
      let images = []
      for (let i = 0; i < imagesData.length; i++) {
        images.push({
          url: imagesData[i].url,
          ratio: imagesData[i].ratio,
          uniqueImages: imagesData[i].uniqueImages,
          ProductId: productData.Id
        })
      }
      db.ProductImage.bulkCreate(images)
      if (productData.thumbnailIndex) {
        foundProduct.thumbnail = imagesData[productData.thumbnailIndex].url
        foundProduct.save()
      }
    })
}

module.exports = {
  searchProducts,
  updateProduct,
  deleteProduct,
  addProduct,
  getProductDetails,
  insertImages
}
