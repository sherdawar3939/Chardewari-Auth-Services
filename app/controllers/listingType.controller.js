'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const listingTypeHelper = require('../helpers/listingType.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ************************************
// Post Contact Information Controller
// ************************************

const addListingType = function (req, res) {
  return listingTypeHelper.addListingType(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'addListingType fetched successfully.', data, 'listingType.controller.addListingType')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'listingType.controller.addListingType', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'listingType.controller.addListingType', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update Listing Type
// ***********************************

const updateListingType = function (req, res) {
  return listingTypeHelper.updateListingType(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'updateListingType  successfully.', data, 'listingType.controller.updateListingType')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'listingType.controller.updateListingType', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'listingType.controller.updateListingType', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get Listing Type
// ***********************************

const getListingType = function (req, res) {
  return listingTypeHelper.getListingType(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'getListingType  successfully.', data, 'listingType.controller.getListingType')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'listingType.controller.getListingType', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'listingType.controller.getListingType', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Delete Listing Type
// ***********************************

const validateDeleteListingType = (req, res) => {
  return listingTypeHelper.deleteListingType(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'listingType deleted successfully', data, 'listingType.controller.validateDeleteListingType')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'listingType.controller.validateDeleteListingType', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'listingType.controller.validateDeleteListingType', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addListingType,
  updateListingType,
  getListingType,
  validateDeleteListingType
}
