'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const bannerHelper = require('../helpers/banner.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Add Banner
// ***********************************

const addBanner = function (req, res) {
  return bannerHelper.addBanner(req.conditions, req.file)
    .then(function (data) {
      generalController.successResponse(res, 'Banner Added successfully.', data, 'Banner.controller.addBanner')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'banner.controller.addBanner', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'banner.controller.addBanner', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Get Banner By id
// ***********************************

const getBanner = function (req, res) {
  return bannerHelper.getBanner(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Banner fetch successfully.', data, 'banner.controller.getBanner')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'banner.controller.getBanner', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'banner.controller.getBanner', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update Banner Status
// ***********************************

const updateBannerStatus = function (req, res) {
  return bannerHelper.updateBannerStatus(req.body.data, req.body.id)
    .then(function (data) {
      generalController.successResponse(res, 'banner Updated successfully.', data, 'banner.controller.updateBannerStatus')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'banner.controller.updateBannerStatus', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'banner.controller.updateBannerStatus', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Get Banner By id
// ***********************************

const getBannerTypes = function (req, res) {
  return bannerHelper.getBannerTypes(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Banner fetch successfully.', data, 'banner.controller.getBannerTypes')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'banner.controller.getBannerTypes', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'banner.controller.getBannerTypes', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addBanner,
  getBanner,
  updateBannerStatus,
  getBannerTypes
}
