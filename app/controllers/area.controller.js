'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const areaHelper = require('../helpers/area.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Get Areas
// ***********************************

const getArea = function (req, res) {
  return areaHelper.getArea(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Area fetch successfully.', data, 'area.controller.getArea')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'area.controller.getArea', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'area.controller.getArea', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Get Areas Details By Id
// ***********************************

const deleteArea = function (req, res) {
  return areaHelper.deleteArea(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Area Deleted successfully.', data, 'area.controller.deleteArea')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'area.controller.deleteArea', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'area.controller.deleteArea', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Get Area/Cities
// ***********************************

const getAreaCities = function (req, res) {
  return areaHelper.getAreaCities(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'Area fetched successfully.', data, 'Area.controller.getAreaCities')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Area.controller.getAreaCities', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Area.controller.getAreaCities', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Post Area Controller
// **********************************

const addArea = function (req, res) {
  return areaHelper.addArea(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Area added successfully.', data, 'area.controller.addArea')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'area.controller.addArea', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'area.controller.addArea', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Put Area Controller
// **********************************

const updateArea = function (req, res) {
  return areaHelper.updateArea(req.conditions, req.id)
    .then(function (data) {
      generalController.successResponse(res, 'Area Updated successfully.', data, 'area.controller.updateArea')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'area.controller.updateArea', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'area.controller.updateArea', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  getArea,
  getAreaCities,
  addArea,
  deleteArea,
  updateArea
}
