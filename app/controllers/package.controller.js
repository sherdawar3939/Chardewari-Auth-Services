'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const packageHelper = require('../helpers/package.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ************************************
// Post Package Controller
// ************************************

const addPackage = function (req, res) {
  return packageHelper.addPackage(req.data)
    .then(function (data) {
      generalController.successResponse(res, 'Package Added successfully.', 'listingType.controller.addPackage')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'listingType.controller.addPackage', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'listingType.controller.addPackage', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const getPackageDetail = function (req, res) {
  return packageHelper.getPackageDetail(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'Package Detail fetch successfully.', data, 'package.controller.getPackageDetail')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'package.controller.getPackageDetail', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'package.controller.getPackageDetail', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ************************************
// Update Package Controller
// ************************************

const updatePackage = function (req, res) {
  return packageHelper.updatePackage(req.data, req.id)
    .then(function (data) {
      generalController.successResponse(res, 'Package Updated successfully.', 'listingType.controller.updatePackage')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'listingType.controller.updatePackage', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'listingType.controller.updatePackage', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ********************
// Get Packages
// ********************

const getPackages = function (req, res) {
  return packageHelper.getPackages(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'package fetched successfully.', data, 'package.controller.getPackages')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'package.controller.getPackages', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'package.controller.getPackages', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ********************
// Delete Packages
// ********************

const deletePackages = function (req, res) {
  return packageHelper.deletePackages(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'package Deleted successfully.', data, 'package.controller.deletePackages')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'package.controller.deletePackages', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'package.controller.deletePackages', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ********************
// Get Packages
// ********************

const getAllPackages = function (req, res) {
  return packageHelper.getAllPackages(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'package fetched successfully.', data, 'package.controller.getAllPackages')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'package.controller.getAllPackages', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'package.controller.getAllPackages', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ************************************
// Post Package Controller
// ************************************

const addCustomPackage = function (req, res) {
  return packageHelper.addCustomPackage(req.data, req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'Package Added successfully.', 'listingType.controller.addCustomPackage')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'listingType.controller.addCustomPackage', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'listingType.controller.addCustomPackage', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ********************
// Post User Packages
// ********************

const userPackages = function (req, res) {
  return packageHelper.userPackages(req.conditions, req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'package Added successfully.', data, 'package.controller.userPackages')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'package.controller.userPackages', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'package.controller.userPackages', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ********************
// Get User Offers
// ********************

const userOffers = function (req, res) {
  return packageHelper.userOffers(req.user.id)
    .then(function (data) {
      generalController.successResponse(res, 'offer Fetched successfully.', data, 'package.controller.userOffers')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'package.controller.userOffers', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'package.controller.userOffers', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ********************
// Get topConfig
// ********************

const topConfig = function (req, res) {
  return packageHelper.topConfig()
    .then(function (data) {
      generalController.successResponse(res, 'top Fetched successfully.', data, 'package.controller.topConfig')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'package.controller.topConfig', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'package.controller.topConfig', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addPackage,
  getPackageDetail,
  updatePackage,
  getPackages,
  deletePackages,
  getAllPackages,
  addCustomPackage,
  userPackages,
  userOffers,
  topConfig
}
