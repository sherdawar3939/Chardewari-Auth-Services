'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const topPropertyHelper = require('../helpers/topProperty.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Add New Top Property
// ***********************************

const addTopProperty = function (req, res) {
  return topPropertyHelper.addTopProperty(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Top Property added successfully.', data, 'topProperty.controller.addTopProperty')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topProperty.controller.addTopProperty', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topProperty.controller.addTopProperty', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update Top Property
// ***********************************

const updateTopProperty = function (req, res) {
  return topPropertyHelper.updateTopProperty(req.conditions, req.userInfo)
    .then(function (data) {
      generalController.successResponse(res, 'Top Property updated successfully.', data, 'topProperty.controller.updateTopProperty')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topProperty.controller.updateTopProperty', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topProperty.controller.updateTopProperty', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All Details
// ***********************************

const getTopProperty = function (req, res) {
  return topPropertyHelper.getTopProperty(req.conditions, req.property, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'top Property fetch successfully.', data, 'topProperty.controller.getTopProperty')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topProperty.controller.getTopProperty', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topProperty.controller.getTopProperty', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get History
// ***********************************

const getTopPropertyHistory = function (req, res) {
  return topPropertyHelper.getTopPropertyHistory(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'top Property fetch successfully.', data, 'topProperty.controller.getTopPropertyHistory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topProperty.controller.getTopPropertyHistory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topProperty.controller.getTopPropertyHistory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Delete
// ***********************************
const validateDeleteTopProperty = (req, res) => {
  return topPropertyHelper.deleteTopProperty(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'top Property deleted successfully', data, 'topProperty.controller.validateDeleteTopProperty')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topProperty.controller.validateDeleteTopProperty', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topProperty.controller.validateDeleteTopProperty', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addTopProperty,
  updateTopProperty,
  getTopProperty,
  getTopPropertyHistory,
  validateDeleteTopProperty
}
