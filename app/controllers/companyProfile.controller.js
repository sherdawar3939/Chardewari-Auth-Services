'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const companyProfileHelper = require('../helpers/companyProfile.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Add Company Profile
// ***********************************

const addCompanyProfile = function (req, res) {
  return companyProfileHelper.addCompanyProfile(req.conditions, req.files)
    .then(function (data) {
      generalController.successResponse(res, 'addCompanyProfile  successfully.', data, 'addCompanyProfile.controller.addCompanyProfile')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'addCompanyProfile.controller.addCompanyProfile', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'addCompanyProfile.controller.addCompanyProfile', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get CompanyProfile Controller
// **********************************

const getCompanyProfile = function (req, res) {
  return companyProfileHelper.getCompanyProfile(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'companyProfile fetched successfully.', data, 'companyProfile.controller.getCompanyProfile')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'companyProfile.controller.getCompanyProfile', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'companyProfile.controller.getCompanyProfile', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const getCompanyProfileDetails = function (req, res) {
  return companyProfileHelper.getCompanyProfileDetails(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'companyProfile fetch successfully.', data, 'companyProfile.controller.getCompanyProfileDetails')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'companyProfile.controller.getCompanyProfileDetails', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'companyProfile.controller.getCompanyProfileDetails', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get CompanyProfile Controller
// **********************************

const userCompanyProfile = function (req, res) {
  return companyProfileHelper.userCompanyProfile(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'companyProfile fetched successfully.', data, 'companyProfile.controller.userCompanyProfile')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'companyProfile.controller.userCompanyProfile', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'companyProfile.controller.userCompanyProfile', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addCompanyProfile,
  getCompanyProfile,
  getCompanyProfileDetails,
  userCompanyProfile
}
