'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const serviceCategoryHelper = require('../helpers/serviceCategory.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Post Service Category Controller
// **********************************

const addServiceCategory = function (req, res) {
  return serviceCategoryHelper.addServiceCategory(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'Service Category added successfully.', data, 'serviceCategory.controller.addServiceCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'serviceCategory.controller.addServiceCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'serviceCategory.controller.addServiceCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Service Category Controller
// **********************************

const getServiceCategory = function (req, res) {
  return serviceCategoryHelper.getServiceCategory(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'ServiceCategory fetched successfully.', data, 'ServiceCategory.controller.getServiceCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'ServiceCategory.controller.getServiceCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ServiceCategory.controller.getServiceCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// *************************
// Update ServiceCategory
// ************************

const updateServiceCategory = function (req, res) {
  return serviceCategoryHelper.updateServiceCategory(req.body, req.categoryId)
    .then((data) => {
      generalController.successResponse(res, 'serviceCategory Updated successfully.', data, 'serviceCategory.controller.updateServiceCategory')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'serviceCategory.controller.updateServiceCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'serviceCategory.controller.updateServiceCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***************************************
// To Delete Service Category Information
// ***************************************

const deleteServiceCategory = (req, res) => {
  return serviceCategoryHelper.deleteServiceCategory(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'serviceCategory deleted successfully', data, 'serviceCategory.controller.deleteServiceCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'serviceCategory.controller.deleteServiceCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'serviceCategory.controller.deleteServiceCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addServiceCategory,
  getServiceCategory,
  updateServiceCategory,
  deleteServiceCategory
}
