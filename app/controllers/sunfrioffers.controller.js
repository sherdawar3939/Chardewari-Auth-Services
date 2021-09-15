'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const sunFriOffersHelper = require('../helpers/sunfriofffers.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Add sunFriOffers
// ***********************************

const addSundayFridayOffers = function (req, res) {
  return sunFriOffersHelper.addSundayFridayOffers(req.conditions, req.file)
    .then(function (data) {
      generalController.successResponse(res, 'sunfrioffers Added successfully.', data, 'sunfrioffers.controller.addSundayFridayOffers')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'sunfrioffers.controller.addSundayFridayOffers', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'sunfrioffers.controller.addSundayFridayOffers', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update sunfrioffers Status
// ***********************************

const updateOffersStatus = function (req, res) {
  return sunFriOffersHelper.updateOffersStatus(req.body.data, req.body.id)
    .then(function (data) {
      generalController.successResponse(res, 'sunfrioffers Updated successfully.', data, 'sunfrioffers.controller.updateOffersStatus')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'sunfrioffers.controller.updateOffersStatus', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'sunfrioffers.controller.updateOffersStatus', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update sunfrioffers isApproved
// ***********************************

const updateOffersApproved = function (req, res) {
  return sunFriOffersHelper.updateOffersApproved(req.body.data, req.body.id)
    .then(function (data) {
      generalController.successResponse(res, 'sunfrioffers Updated successfully.', data, 'sunfrioffers.controller.updateOffersApproved')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'sunfrioffers.controller.updateOffersApproved', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'sunfrioffers.controller.updateOffersApproved', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Get SundayFridayOffers By id
// ***********************************

const getSundayFridayOffers = function (req, res) {
  return sunFriOffersHelper.getSundayFridayOffers(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'sunfrioffers fetch successfully.', data, 'sunfrioffers.controller.getSundayFridayOffers')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'sunfrioffers.controller.getSundayFridayOffers', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'sunfrioffers.controller.getSundayFridayOffers', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  addSundayFridayOffers,
  updateOffersStatus,
  getSundayFridayOffers,
  updateOffersApproved
}
