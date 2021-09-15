'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const categoryAmenityHelper = require('../helpers/amenity.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************
// Get Categories Amenity
// ***********************

const getCategoryAmenities = function (req, res) {
  return categoryAmenityHelper.getCategoryAmenities(req.query)
    .then(function (data) {
      generalController.successResponse(res, 'CategoryAmenities fetched successfully.', data, 'amenity.controller.getCategoryAmenities')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'amenity.controller.getCategoryAmenities', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'amenity.controller.getCategoryAmenities', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************
// Get Amenity Properties
// ***********************

const getAmenityProperties = function (req, res) {
  return categoryAmenityHelper.getAmenityProperties(req.query)
    .then(function (data) {
      generalController.successResponse(res, 'Amenity Properties fetched successfully.', data, 'amenity.controller.getAmenityProperties')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'amenity.controller.getAmenityProperties', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'amenity.controller.getAmenityProperties', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************
// Get Categories Amenity
// ***********************

const getCategoryAmenity = function (req, res) {
  return categoryAmenityHelper.getCategoryAmenity(req.query)
    .then(function (data) {
      generalController.successResponse(res, 'CategoryAmenities fetched successfully.', data, 'amenity.controller.getCategoryAmenity')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'amenity.controller.getCategoryAmenity', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'amenity.controller.getCategoryAmenity', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************
// Get Amenities
// ***********************

const getAmenities = function (req, res) {
  return categoryAmenityHelper.getAmenities(req.query)
    .then(function (data) {
      generalController.successResponse(res, 'Amenities fetched successfully.', data, 'amenity.controller.getAmenities')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'amenity.controller.getAmenities', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'amenity.controller.getAmenities', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************
// delete Amenities
// ***********************

const deleteAmenities = function (req, res) {
  return categoryAmenityHelper.deleteAmenities(req.param)
    .then(function (data) {
      generalController.successResponse(res, 'Amenity Deleted successfully.', data, 'amenity.controller.deleteAmenities')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'amenity.controller.deleteAmenities', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'amenity.controller.deleteAmenities', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************
// Get Categories Amenity
// ***********************

const getCategoryLaunchingAmenities = function (req, res) {
  return categoryAmenityHelper.getLaunchingCategoryAmenities(req.query)
    .then(function (data) {
      generalController.successResponse(res, 'getCategoryLaunchingAmenities fetched successfully.', data, 'amenity.controller.getCategoryLaunchingAmenities')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'amenity.controller.getCategoryLaunchingAmenities', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'amenity.controller.getCategoryLaunchingAmenities', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Post Amenity Controller
// **********************************

const addAmenity = function (req, res) {
  return categoryAmenityHelper.addAmenity(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Aminity added successfully.', data, 'Aminity.controller.addAmenity')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Aminity.controller.addAmenity', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Aminity.controller.addAmenity', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
// **********************************
// PUT Amenity Controller
// **********************************

const updateAmenity = function (req, res) {
  return categoryAmenityHelper.updateAmenity(req.conditions, req.param)
    .then(function (data) {
      generalController.successResponse(res, 'Aminity Updated successfully.', data, 'Aminity.controller.updateAmenity')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Aminity.controller.updateAmenity', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Aminity.controller.updateAmenity', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  updateAmenity,
  addAmenity,
  deleteAmenities,
  getAmenityProperties,
  getAmenities,
  getCategoryAmenity,
  getCategoryAmenities,
  getCategoryLaunchingAmenities
}
