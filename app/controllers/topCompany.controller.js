'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const topCompanyHelper = require('../helpers/topCompany.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Add Top Company
// ***********************************

const addTopCompany = function (req, res) {
  return topCompanyHelper.addTopCompany(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'TopCompany added successfully.', data, 'TopCompany.controller.addTopCompany')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'TopCompany.controller.addTopCompany', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'TopCompany.controller.addTopCompany', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update Top Company
// ***********************************

const updateTopCompany = function (req, res) {
  return topCompanyHelper.updateTopCompany(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'updateTopCompany Updated  successfully.', data, 'TopCompany.controller.updateTopCompany')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'TopCompany.controller.updateTopCompany', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'TopCompany.controller.updateTopCompany', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All Companies
// ***********************************

const getTopCompany = function (req, res) {
  return topCompanyHelper.getTopCompany(req.conditions, req.company, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'TopCompany fetch successfully.', data, 'TopCompany.controller.getTopCompany')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'TopCompany.controller.getTopCompany', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'TopCompany.controller.getTopCompany', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
// ***********************************
// To Delete
// ***********************************
const validateDeleteTopCompany = (req, res) => {
  return topCompanyHelper.deleteTopCompany(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'topCompany deleted successfully', data, 'topCompany.controller.validateDeleteTopCompany')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topCompany.controller.validateDeleteTopCompany', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topCompany.controller.validateDeleteTopCompany', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get History
// ***********************************

const getTopCompanyHistory = function (req, res) {
  return topCompanyHelper.getTopCompanyHistory(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'top Top Company History fetch successfully.', data, 'topCompany.controller.getTopCompanyHistory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topCompany.controller.getTopCompanyHistory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topCompany.controller.getTopCompanyHistory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addTopCompany,
  updateTopCompany,
  getTopCompany,
  validateDeleteTopCompany,
  getTopCompanyHistory
}
