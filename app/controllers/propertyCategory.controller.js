'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const propertyCategoryHelper = require('../helpers/propertyCategory.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// *********************
// Get Categories
// *********************

const getPropertyCategories = function (req, res) {
  return propertyCategoryHelper.getPropertyCategory(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Category fetched successfully.', data, 'propertyCategory.controller.getPropertyCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'propertyCategory.controller.getPropertyCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'propertyCategory.controller.getPropertyCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************
// Get Categories By Id
// *********************

const getPropertyCategoriesById = function (req, res) {
  return propertyCategoryHelper.getPropertyCategoriesById(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Category fetched successfully.', data, 'propertyCategory.controller.getPropertyCategoriesById')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'propertyCategory.controller.getPropertyCategoriesById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'propertyCategory.controller.getPropertyCategoriesById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **************************
// Add
// **************************
const addPropertyCategory = function (req, res) {
  return propertyCategoryHelper.addPropertyCategory(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Category added successfully.', data, 'propertyCategory.controller.addPropertyCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'propertyCategory.controller.addPropertyCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'propertyCategory.controller.addPropertyCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **************************
// updatePropertyCategory
// **************************
const updatePropertyCategory = function (req, res) {
  return propertyCategoryHelper.updatePropertyCategory(req.conditions, req.param)
    .then(function (data) {
      generalController.successResponse(res, 'Category Updated successfully.', data, 'propertyCategory.controller.updatePropertyCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'propertyCategory.controller.updatePropertyCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'propertyCategory.controller.updatePropertyCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getPropertyCategories,
  getPropertyCategoriesById,
  addPropertyCategory,
  updatePropertyCategory
}
