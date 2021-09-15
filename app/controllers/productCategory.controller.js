'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const productCategoryHelper = require('../helpers/productCategory.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Post Product Category Controller
// **********************************
const addProductCategory = function (req, res) {
  return productCategoryHelper.addProductCategory(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'Product Category added successfully.', data, 'productCategory.controller.addProductCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'productCategory.controller.addProductCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'productCategory.controller.addProductCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Product Category Controller
// **********************************

const getProductCategory = function (req, res) {
  return productCategoryHelper.getProductCategory(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'productCategory fetched successfully.', data, 'productCategory.controller.getProductCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'productCategory.controller.getProductCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'productCategory.controller.getProductCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// Update ProductCategory
const updateProductCategory = function (req, res) {
  return productCategoryHelper.updateProductCategory(req.body, req.param)
    .then((data) => {
      generalController.successResponse(res, 'ProductCategory Updated successfully.', data, 'ProductCategory.controller.updateProductCategory')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'ProductCategory.controller.updateProductCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ProductCategory.controller.updateProductCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
// To Delete Product Category Information
const deleteProductCategory = (req, res) => {
  return productCategoryHelper.deleteProductCategory(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'productCategory deleted successfully', data, 'productCategory.controller.deleteProductCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'productCategory.controller.deleteProductCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'productCategory.controller.deleteProductCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************
// Get Categories By Id
// *********************

const getProductCategoriesById = function (req, res) {
  return productCategoryHelper.getProductCategoriesById(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Product fetched successfully.', data, 'productCategory.controller.getProductCategoriesById')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'productCategory.controller.getProductCategoriesById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'productCategory.controller.getProductCategoriesById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addProductCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategoriesById
}
