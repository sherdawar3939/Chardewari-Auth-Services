'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const propertyInsightHelper = require('../helpers/propertyInsight.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **************************************
// Post propertyInsightHelper Controller
// **************************************

const postPropertyInsight = function (req, res) {
  return propertyInsightHelper.postPropertyInsight(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'postPropertyInsight fetched successfully.', data, 'propertyInsight.controller.postPropertyInsight')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'propertyInsight.controller.postPropertyInsight', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'propertyInsight.controller.postPropertyInsight', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get Property Views
// ***********************************

const getPropertyViews = function (req, res) {
  return propertyInsightHelper.getPropertyViews(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'propertyInsight fetch successfully.', data, 'propertyInsight.controller.getPropertyViews')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'propertyInsight.controller.getPropertyViews', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'propertyInsight.controller.getPropertyViews', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get Property Viewers
// ***********************************

const getPropertyVisitor = function (req, res) {
  return propertyInsightHelper.getPropertyVisitor(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'propertyInsight fetch successfully.', data, 'propertyInsight.controller.getPropertyVisitor')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'propertyInsight.controller.getPropertyVisitor', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'propertyInsight.controller.getPropertyVisitor', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  postPropertyInsight,
  getPropertyViews,
  getPropertyVisitor
}
