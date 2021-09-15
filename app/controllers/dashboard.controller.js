'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const dashboardHelper = require('../helpers/dashboard.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Get Property Count
// **********************************

const getCount = function (req, res) {
  return dashboardHelper.getCount()
    .then(function (data) {
      generalController.successResponse(res, 'dashboard fetched successfully.', data, 'dashboard.controller.getCount')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.getCount', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.getCount', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// getDailyPropertyCount
// **********************************

const getDailyPropertyCount = function (req, res) {
  return dashboardHelper.getDailyPropertyCount(req.query)
    .then(function (data) {
      generalController.successResponse(res, 'dashboard fetched successfully.', data, 'dashboard.controller.getDailyPropertyCount')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.getDailyPropertyCount', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.getDailyPropertyCount', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// getWebsiteVisitor
// **********************************

const getWebsiteVisitor = function (req, res) {
  return dashboardHelper.getWebsiteVisitor(req.query)
    .then(function (data) {
      generalController.successResponse(res, 'dashboard fetched successfully.', data, 'dashboard.controller.getWebsiteVisitor')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.getWebsiteVisitor', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.getWebsiteVisitor', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Property with category Count
// **********************************

const getCategoryCount = function (req, res) {
  return dashboardHelper.getCategoryCount()
    .then(function (data) {
      generalController.successResponse(res, 'dashboard fetched successfully.', data, 'dashboard.controller.getCategoryCount')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'dashboard.controller.getCategoryCount', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'dashboard.controller.getCategoryCount', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getCount,
  getDailyPropertyCount,
  getWebsiteVisitor,
  getCategoryCount
}
