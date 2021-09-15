'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const topConfig = require('../helpers/topConfig.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Update Top COnfig
// ***********************************

const updateTopConfig = function (req, res) {
  return topConfig.updateTopConfig(req.data, req.id)
    .then(function (data) {
      generalController.successResponse(res, 'updateTopConfig Updated  successfully.', data, 'topConfig.controller.updateTopConfig')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topConfig.controller.updateTopConfig', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topConfig.controller.updateTopConfig', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All config
// ***********************************

const getTopConfig = function (req, res) {
  return topConfig.getTopConfig()
    .then(function (data) {
      generalController.successResponse(res, 'topConfig fetch successfully.', data, 'topConfig.controller.getTopConfig')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topConfig.controller.getTopConfig', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topConfig.controller.getTopConfig', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All config
// ***********************************

const getTopConfigDetail = function (req, res) {
  return topConfig.getTopConfigDetail(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'topConfig fetch successfully.', data, 'topConfig.controller.getTopConfigDetail')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topConfig.controller.getTopConfigDetail', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topConfig.controller.getTopConfigDetail', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update Top COnfig
// ***********************************

const updateBannerConfig = function (req, res) {
  return topConfig.updateBannerConfig(req.data, req.id)
    .then(function (data) {
      generalController.successResponse(res, 'updateBannerConfig Updated  successfully.', data, 'topConfig.controller.updateBannerConfig')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topConfig.controller.updateBannerConfig', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topConfig.controller.updateBannerConfig', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All config
// ***********************************

const getBannerConfig = function (req, res) {
  return topConfig.getBannerConfig()
    .then(function (data) {
      generalController.successResponse(res, 'topConfig fetch successfully.', data, 'topConfig.controller.getBannerConfig')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topConfig.controller.getBannerConfig', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topConfig.controller.getBannerConfig', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All config
// ***********************************

const getBannerConfigDetail = function (req, res) {
  return topConfig.getBannerConfigDetail(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'topConfig fetch successfully.', data, 'topConfig.controller.getBannerConfigDetail')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topConfig.controller.getBannerConfigDetail', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topConfig.controller.getBannerConfigDetail', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  updateTopConfig,
  getTopConfig,
  getTopConfigDetail,
  updateBannerConfig,
  getBannerConfig,
  getBannerConfigDetail
}
