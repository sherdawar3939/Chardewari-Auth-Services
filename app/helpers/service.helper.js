'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('../helpers/general.helper')
const helpingHelperMethods = require('./helping.helper')
const rabbitMq = require('./rabbitMQ.helper')

// ***************************
// To Add New Service Category
// ***************************

function addServices (data, files) {
  data.isActive = data.isActive === 'true' ? 1 : 0
  return db.Services.create(data)
    .then((createdService) => {
      // upload images
      uploadFiles(createdService.id, files, data.thumbnailIndex)

      // add categories
      const categoryIds = data.CategoryIds
      const serviceCategories = []
      for (let i = 0; i < categoryIds.length; i++) {
        serviceCategories.push({
          ServiceId: createdService.id,
          CategoryId: categoryIds[i]
        })
      }
      db.ServicesHasCategory.bulkCreate(serviceCategories)
    })
}

// This is private method, not exported.
const uploadFiles = async (ServiceId, files, thumbnailIndex) => {
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
  data.Id = ServiceId
  if (isNaN(data.thumbnailIndex)) {
    data.thumbnailIndex = thumbnailIndex
  }
  data.urlArray = urlArray
  data.sizes = sizes
  data.replyQueue = 'servicesImages'
  rabbitMq.sendMessage(data, 'resizeAndWatermarkImages')
}

// ********************
// Get Service Category
// ********************

function getServices (conditions) {
  // Check if Services exist in conditions
  return db.Services.findAll({
    where: conditions,
    include: [{
      model: db.ServiceCategory,
      as: 'RelatedServicesCategories',
      attributes: ['id', 'title', 'titleL1', 'level', 'slug', 'singularName', 'singularNameL1'],
      through: {
        attributes: []
      }
    },
    {
      model: db.ServicesMedia,
      attributes: ['id', 'url'],
      as: 'RelatedMediaServices'
    }
    ]
  })
}

// ********************
// Get Service Category
// ********************

function getAllServices () {
  // Check if Services exist in conditions
  return db.Services.findAll({ where: { isDeleted: false } })
}

// ****************************
// Update Services
// ****************************

function updateServices (data, id, files) {
  console.log(data)
  return db.Services.findOne({ where: { id: id } })
    .then(serviceCategory => {
      if (!serviceCategory) {
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // if data given
      if (data) {
        db.Services.update(data, { where: { id: id } })
      }

      // if categories given
      if (data.CategoryIds.length) {
        db.ServicesHasCategory.destroy({ where: { ServiceId: id } })
          .then(() => {
            // add categories
            const categoryIds = data.CategoryIds
            const serviceCategories = []
            for (let i = 0; i < categoryIds.length; i++) {
              serviceCategories.push({
                ServiceId: id,
                CategoryId: categoryIds[i]
              })
            }
            db.ServicesHasCategory.bulkCreate(serviceCategories)
          })
      }

      // To Delete Image
      if (data.deleteImage) {
        db.ServicesMedia.findAll({ where: { id: data.deleteImage } })
          .then((image) => {
            if (image) {
              db.ServicesMedia.destroy({ where: { id: data.deleteImage } })
            }
          })
      }
      // if new files given
      // if (files && files.length) {
      //     console.log(files);
      //     let thumbnail = JSON.parse(data.thumbnailObject)
      //     let index
      //     if (thumbnail.type === 'index') {
      //         index = thumbnail.value
      //     }
      //     // upload images
      //     uploadFiles(id, files, index)
      // }

      // let thumbnailValue = data.thumbnail
      // console.log(thumbnailValue)
      // if (thumbnailValue.type === 'png') {
      //     serviceCategory.thumbnail = thumbnailValue.value
      //     serviceCategory.save()
      // }
    })
}

// ************************
// Delete Service
// ************************

const deleteServices = (input) => {
  return db.Services.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // Category not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // Category found, change value of isDeleted to true
      result.isDeleted = true
      // save Category
      result.save()
      return true
    })
}

// ********************************************************
// Receive Images from Microservice and Save To Database
// ********************************************************

function insertImages (imagesData, servicesData) {
  db.Services.findOne({
    where: { id: servicesData.Id },
    attributes: ['id']
  })
    .then((foundService) => {
      let images = []
      for (let i = 0; i < imagesData.length; i++) {
        images.push({
          url: imagesData[i].url,
          ratio: imagesData[i].ratio,
          uniqueImages: imagesData[i].uniqueImages,
          ProductId: servicesData.Id,
          type: 0
        })
      }
      db.ServicesMedia.bulkCreate(images)
      if (servicesData.thumbnailIndex) {
        foundService.thumbnail = imagesData[servicesData.thumbnailIndex].url
        foundService.save()
      }
    })
}

module.exports = {
  addServices,
  getServices,
  updateServices,
  deleteServices,
  getAllServices,
  insertImages
}
