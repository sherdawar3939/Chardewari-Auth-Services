'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const servicesHelper = require('../helpers/services.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Post Services Controller
// **********************************

const addServices = function (req, res) {
  return servicesHelper.addServices(req.conditions, req.files)
    .then(function (data) {
      generalController.successResponse(res, 'Service Category added successfully.', data, 'services.controller.addServices')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'services.controller.addServices', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'services.controller.addServices', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Services Controller
// **********************************

const getServices = function (req, res) {
  return servicesHelper.getServices(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Services fetched successfully.', data, 'Services.controller.getServices')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Services.controller.getServices', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Services.controller.getServices', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Services Controller
// **********************************

const getAllServices = function (req, res) {
  return servicesHelper.getAllServices(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Services fetched successfully.', data, 'Services.controller.getAllServices')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Services.controller.getAllServices', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Services.controller.getAllServices', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ************************
// Update Services
// ************************

const updateServices = function (req, res) {
  return servicesHelper.updateServices(req.data, req.params.id, req.files)
    .then((data) => {
      generalController.successResponse(res, 'services Updated successfully.', data, 'services.controller.updateServices')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'services.controller.updateServices', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'services.controller.updateServices', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***************************************
// To Delete Services
// ***************************************

const deleteServices = (req, res) => {
  return servicesHelper.deleteServices(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'services deleted successfully', data, 'services.controller.deleteServices')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'services.controller.deleteServices', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'services.controller.deleteServices', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addServices,
  getServices,
  updateServices,
  deleteServices,
  getAllServices
}
