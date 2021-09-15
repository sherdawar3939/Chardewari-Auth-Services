'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const propertyHelper = require('../helpers/property.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Get Properties Listing
// ***********************************

const getPropertiesListing = function (req, res) {
  return propertyHelper.getPropertiesListing(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'PropertiesListing fetched successfully.', data, 'property.controller.getPropertiesListing')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'property.controller.getPropertiesListing', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'property.controller.getPropertiesListing', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Add New Property
// ***********************************

const addProperty = function (req, res) {
  return propertyHelper.addProperty(req.body, req.files)
    .then(function (data) {
      generalController.successResponse(res, 'AddProperty added successfully.', data, 'property.controller.addProperty')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'property.controller.addProperty', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'property.controller.addProperty', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const getProperty = function (req, res) {
  return propertyHelper.getProperty(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'property fetch successfully.', data, 'property.controller.getProperty')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'property.controller.getProperty', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'property.controller.getProperty', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get 6 Related Properties
// ***********************************

const getRelatedProperty = function (req, res) {
  return propertyHelper.getRelatedProperty(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'property fetch successfully.', data, 'property.controller.getRelatedProperty')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'property.controller.getRelatedProperty', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'property.controller.getRelatedProperty', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update Property
// ***********************************

const updateProperty = function (req, res) {
  return propertyHelper.updateProperty(req.body.data, req.body.id, req.files)
    .then(function (data) {
      generalController.successResponse(res, 'Property Updated successfully.', data, 'property.controller.updateProperty')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'property.controller.updateProperty', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'property.controller.updateProperty', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getPropertiesListing,
  addProperty,
  getProperty,
  getRelatedProperty,
  updateProperty
}
