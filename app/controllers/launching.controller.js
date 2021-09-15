'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const launchingHelper = require('../helpers/launching.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Get Launching Listing
// ***********************************

const getLaunchingsListing = function (req, res) {
  return launchingHelper.getLaunchingsListing(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'launchings fetched successfully.', data, 'launching.controller.getLaunchingsListing')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'launching.controller.getLaunchingsListing', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'launching.controller.getLaunchingsListing', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Add New launching
// ***********************************

const addLaunching = function (req, res) {
  return launchingHelper.addLaunching(req.body, req.files)
    .then(function (data) {
      generalController.successResponse(res, 'addLaunching fetched successfully.', data, 'launching.controller.addLaunching')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'launching.controller.addLaunching', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'launching.controller.addLaunching', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const getLaunching = function (req, res) {
  return launchingHelper.getLaunching(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'launching fetch successfully.', data, 'launching.controller.getLaunching')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'launching.controller.getLaunching', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'launching.controller.getLaunching', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get 6 Related Properties
// ***********************************

// const getRelatedlaunching = function (req, res) {
//   return launchingHelper.getRelatedlaunching(req.conditions)
//     .then(function (data) {
//       generalController.successResponse(res, 'launching fetch successfully.', data, 'launching.controller.getRelatedlaunching')
//     }).catch(StandardError, function (err) {
//       generalController.errorResponse(res, err, null, 'launching.controller.getRelatedlaunching', SERVER_RESPONSE.VALIDATION_ERROR)
//     }).catch(function (err) {
//       generalController.errorResponse(res, err, 'Please check originalError for details', 'launching.controller.getRelatedlaunching', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
//     })
// }

// ***********************************
// Update launching
// ***********************************

const updateLaunchings = function (req, res) {
  return launchingHelper.updateLaunchings(req.body.data, req.body.id, req.files)
    .then(function (data) {
      generalController.successResponse(res, 'launching Updated successfully.', data, 'launching.controller.updateLaunchings')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'launching.controller.updateLaunchings', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'launching.controller.updateLaunchings', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getLaunchingsListing,
  addLaunching,
  getLaunching,
  //   getRelatedlaunching,
  updateLaunchings
}
