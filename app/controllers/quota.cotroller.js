'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const quotaHelper = require('../helpers/quota.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Get getListingTypeQuota Controller
// **********************************

const getListingTypeQuota = function (req, res) {
  return quotaHelper.getListingTypeQuota(req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'quota fetched successfully.', data, 'quota.controller.getListingTypeQuota')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getListingTypeQuota', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getListingTypeQuota', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// getAgencyQuota Controller
// **********************************

const getAgencyQuota = function (req, res) {
  return quotaHelper.getAgencyQuota(req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'quota fetched successfully.', data, 'quota.controller.getAgencyQuota')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getAgencyQuota', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getAgencyQuota', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// getTopPropertyQuota Controller
// **********************************

const getTopPropertyQuota = function (req, res) {
  return quotaHelper.getTopPropertyQuota(req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'quota fetched successfully.', data, 'quota.controller.getTopPropertyQuota')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getTopPropertyQuota', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getTopPropertyQuota', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// getTopProjectQuota Controller
// **********************************

const getTopProjectQuota = function (req, res) {
  return quotaHelper.getTopProjectQuota(req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'quota fetched successfully.', data, 'quota.controller.getTopProjectQuota')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getTopProjectQuota', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getTopProjectQuota', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// getTopLaunchingQuota Controller
// **********************************

const getTopLaunchingQuota = function (req, res) {
  return quotaHelper.getTopLaunchingQuota(req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'quota fetched successfully.', data, 'quota.controller.getTopLaunchingQuota')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getTopLaunchingQuota', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getTopLaunchingQuota', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// getBannerQuota Controller
// **********************************

const getBannerQuota = function (req, res) {
  return quotaHelper.getBannerQuota(req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'quota fetched successfully.', data, 'quota.controller.getBannerQuota')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getBannerQuota', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getTopLaunchingQuota', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getListingTypeQuota,
  getAgencyQuota,
  getTopPropertyQuota,
  getTopProjectQuota,
  getTopLaunchingQuota,
  getBannerQuota
}
