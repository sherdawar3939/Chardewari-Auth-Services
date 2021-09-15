'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const currencyHelper = require('../helpers/currency.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Post Currency Controller
// **********************************
const addCurrency = function (req, res) {
  return currencyHelper.addCurrency(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'Currency added successfully.', data, 'currency.controller.addCurrency')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'currency.controller.addCurrency', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'currency.controller.addCurrency', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Currency Controller
// **********************************

const getCurrency = function (req, res) {
  return currencyHelper.getCurrency(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'currency fetched successfully.', data, 'currency.controller.getCurrency')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'currency.controller.getCurrency', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'currency.controller.getCurrency', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// *******************
// Update Currency
// *******************

const updateCurrency = function (req, res) {
  return currencyHelper.updateCurrency(req.body, req.params)
    .then((data) => {
      generalController.successResponse(res, 'currency Updated successfully.', data, 'currency.controller.updateCurrency')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'currency.controller.updateCurrency', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'currency.controller.updateCurrency', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// *******************
// To Delete Currency
// *******************

const deleteCurrency = (req, res) => {
  return currencyHelper.deleteCurrency(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'currency deleted successfully', data, 'currency.controller.deleteCurrency')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'currency.controller.deleteCurrency', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'currency.controller.deleteCurrency', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addCurrency,
  getCurrency,
  updateCurrency,
  deleteCurrency
}
