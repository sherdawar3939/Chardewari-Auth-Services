'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const productUnitHelper = require('../helpers/productUnit.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Post Product Unit Controller
// **********************************
const addProductUnit = function (req, res) {
  return productUnitHelper.addProductUnit(req.validatedBody)
    .then(function (data) {
      generalController.successResponse(res, 'Product Unit added successfully.', data, 'productUnit.controller.addProductUnit')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'productUnit.controller.addProductUnit', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'productUnit.controller.addProductUnit', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Product Unit Controller
// **********************************

const getProductUnit = function (req, res) {
  return productUnitHelper.getProductUnit(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'productUnit fetched successfully.', data, 'productUnit.controller.getProductUnit')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'productUnit.controller.getProductUnit', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'productUnit.controller.getProductUnit', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Update Product Unit
const updateProductUnit = function (req, res) {
  return productUnitHelper.updateProductUnit(req.body, req.params)
    .then((data) => {
      generalController.successResponse(res, 'ProductUnit Updated successfully.', data, 'ProductUnit.controller.updateProductUnit')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'ProductUnit.controller.updateProductUnit', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ProductUnit.controller.updateProductUnit', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
// To Delete Product Unit Information
const deleteProductUnit = (req, res) => {
  return productUnitHelper.deleteProductUnit(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'productUnit deleted successfully', data, 'productUnit.controller.deleteProductUnit')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'productUnit.controller.deleteProductUnit', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'productUnit.controller.deleteProductUnit', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addProductUnit,
  getProductUnit,
  updateProductUnit,
  deleteProductUnit
}
