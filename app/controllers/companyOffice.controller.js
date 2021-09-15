'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const companyOfficeHelper = require('../helpers/companyOffice.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Add Company Office
// ***********************************

const addCompanyOffice = function (req, res) {
  return companyOfficeHelper.addCompanyOffice(req.body)
    .then(function (data) {
      generalController.successResponse(res, 'addCompanyOffice  successfully.', data, 'addCompanyOffice.controller.addCompanyOffice')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'addCompanyOffice.controller.addCompanyOffice', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'addCompanyOffice.controller.addCompanyOffice', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get CompanyOffice Controller
// **********************************

const getCompanyOffice = function (req, res) {
  return companyOfficeHelper.getCompanyOffice(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'companyOffice fetched successfully.', data, 'companyOffice.controller.getCompanyOffice')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'companyOffice.controller.getCompanyOffice', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'companyOffice.controller.getCompanyOffice', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Delete CompanyOffice Controller
// **********************************

const validateDeleteCompanyOffice = (req, res) => {
  return companyOfficeHelper.deleteCompanyOffice(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'companyOffice deleted successfully', data, 'companyOffice.controller.validateDeleteCompanyOffice')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'companyOffice.controller.validateDeleteCompanyOffice', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'companyOffice.controller.validateDeleteCompanyOffice', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addCompanyOffice,
  getCompanyOffice,
  validateDeleteCompanyOffice
}
