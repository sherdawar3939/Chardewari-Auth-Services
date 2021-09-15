'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const purchaseHelper = require('../helpers/purchase.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Get Purchase Listings Controller
// **********************************

const getPurchaseListing = function (req, res) {
  return purchaseHelper.getPurchaseListing(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Purchase fetched successfully.', data, 'quota.controller.getPurchaseListing')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getPurchaseListing', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getPurchaseListing', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Purchase Detail Controller
// **********************************

const getUserPurchaseDetail = function (req, res) {
  return purchaseHelper.getPurchaseDetail(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Purchase fetched successfully.', data, 'quota.controller.getUserPurchaseDetail')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getUserPurchaseDetail', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getUserPurchaseDetail', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Purchase By Id Controller
// **********************************

const getUserPurchaseById = function (req, res) {
  return purchaseHelper.getPurchaseById(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Purchase fetched successfully.', data, 'quota.controller.getUserPurchaseById')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'quota.controller.getUserPurchaseById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'quota.controller.getUserPurchaseById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getPurchaseListing,
  getUserPurchaseDetail,
  getUserPurchaseById
}
