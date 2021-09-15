'use strict'
const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const generalHelpingMethods = require('./general.helper')
// const jimp = require('jimp')

const productsHelper = require('./product.helper')
const propertyHelper = require('./property.helper')
const servicesHelper = require('./services.helper')
const launchingHelper = require('./launching.helper')
const companyProfile = require('./companyProfile.helper')
const userProfile = require('./user.helper')

const receiveMessage = (message) => {
  const content = JSON.parse(message.content)
  console.log(content)
  let data = {}
  if (content.thumbnailIndex) {
    data.thumbnailIndex = content.thumbnailIndex
  }
  data.Id = content.Id
  // Check what comes in rabbitMQ
  switch (message.fields.routingKey) {
    // For Products
    case 'productImages':
      insertProductImages(content.imagesUrl, data)
      break
    case 'propertyImages':
      insertPropertyImages(content.imagesUrl, data)
      break
    case 'servicesImages':
      insertServicesImages(content.imagesUrl, data)
      break
    case 'launchingImages':
      insertLaunchingImages(content.imagesUrl, data)
      break
    case 'companyProfileImages':
      insertCompanyProfileImage(content.imagesUrl, data)
      break
    case 'userImages':
      insertUserProfileImage(content.imagesUrl, data)
      break
    default:
      console.log('Operation not performed on consumed message from rabbitMQ.')
  }
}
// *************************
// for products images
// *************************

const insertProductImages = (url, data) => {
  for (let i = 0; i < url.length; i++) {
    let incomingUrl = url[i].url
    let ratio = url[i].ratio
    if (!_.isString(ratio) && !_.isString(incomingUrl) && !_.isArray(url)) {
      console.log('Url is not valid')
      return
    }
    if (!data.Id) {
      console.log('Id Is Invalid')
      return
    }
  }
  productsHelper.insertImages(url, data)
}

// *********************
// for Property Images
// *********************

const insertPropertyImages = (url, data) => {
  for (let i = 0; i < url.length; i++) {
    let incomingUrl = url[i].url
    let ratio = url[i].ratio
    if (!_.isString(ratio) && !_.isString(incomingUrl) && !_.isArray(url)) {
      console.log('Url is not valid')
      return
    }
    if (!data.Id) {
      console.log('Id Is Invalid')
      return
    }
  }
  propertyHelper.insertImages(url, data)
}

// **********************
// for Services images
// **********************

const insertServicesImages = (url, data) => {
  for (let i = 0; i < url.length; i++) {
    let incomingUrl = url[i].url
    let ratio = url[i].ratio
    if (!_.isString(ratio) && !_.isString(incomingUrl) && !_.isArray(url)) {
      console.log('Url is not valid')
      return
    }
    if (!data.Id) {
      console.log('Id Is Invalid')
      return
    }
  }
  servicesHelper.insertImages(url, data)
}

// **********************
// for Launching images
// **********************

const insertLaunchingImages = (url, data) => {
  for (let i = 0; i < url.length; i++) {
    let incomingUrl = url[i].url
    let ratio = url[i].ratio
    if (!_.isString(ratio) && !_.isString(incomingUrl) && !_.isArray(url)) {
      console.log('Url is not valid')
      return
    }
    if (!data.Id) {
      console.log('Id Is Invalid')
      return
    }
  }
  launchingHelper.insertImages(url, data)
}

// ***************************
// for Company Profile images
// ***************************

const insertCompanyProfileImage = (url, data) => {
  for (let i = 0; i < url.length; i++) {
    let incomingUrl = url[i].url
    let ratio = url[i].ratio
    if (!_.isString(ratio) && !_.isString(incomingUrl) && !_.isArray(url)) {
      console.log('Url is not valid')
      return
    }
    if (!data.Id) {
      console.log('Id Is Invalid')
      return
    }
  }
  companyProfile.insertImages(url, data)
}

// ***************************
// for User Profile images
// ***************************

const insertUserProfileImage = (url, data) => {
  for (let i = 0; i < url.length; i++) {
    let incomingUrl = url[i].url
    let ratio = url[i].ratio
    if (!_.isString(ratio) && !_.isString(incomingUrl) && !_.isArray(url)) {
      console.log('Url is not valid')
      return
    }
    if (!data.Id) {
      console.log('Id Is Invalid')
      return
    }
  }
  userProfile.insertImages(url, data)
}

function uploadImage (files) {
  var newPath
  fs.readFile(files.path, async function (err, data) {
    if (err) {
      // image not found, throw error
      return generalHelpingMethods.rejectPromise([{
        field: 'file',
        error: 1564,
        message: 'image.helper ReadFile Error'
      }])
    }
    var imageName = files.name
    /// If there's an error
    if (!imageName) {
      // image not found, throw error
      return generalHelpingMethods.rejectPromise([{
        field: 'name',
        error: 1564,
        message: 'image.helper No Image Name'
      }])
    } else {
      newPath = path.join(__dirname, '../../uploads/temp/' + imageName)
      await fs.writeFile(newPath, data, async function (err) {
        if (err) {
          // image not found, throw error
          return generalHelpingMethods.rejectPromise([{
            field: 'fs',
            error: 1564,
            message: 'image.helper fs.write Throw Error'
          }])
        }
      })
    }
  })
}

module.exports = {
  receiveMessage,
  uploadImage
}
