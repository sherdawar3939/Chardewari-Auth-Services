'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const contactHelper = require('../helpers/contactInformation.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ************************************
// Post Contact Information Controller
// ************************************

const addContactInformation = function (req, res) {
  return contactHelper.addContactInformation(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'ContactInformation add successfully.', data, 'contactInformation.controller.addContactInformation')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'contactInformation.controller.addContactInformation', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contactInformation.controller.addContactInformation', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// **********************************
// Get Contact Information Controller
// **********************************

const getContactInformation = function (req, res) {
  return contactHelper.getContactInformation(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'ContactInformation fetched successfully.', data, 'ContactInformation.controller.getContactInformation')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'ContactInformation.controller.getContactInformation', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'ContactInformation.controller.getContactInformation', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
// Update ContactInformation
const updateContactInformation = function (req, res) {
  return contactHelper.updateContactInformation(req.condition, req.params)
    .then((data) => {
      generalController.successResponse(res, 'ContactInformation Updated successfully.', data, 'contactInformation.controller.updateContactInformation')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'contactInformation.controller.updateContactInformation', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contactInformation.controller.updateContactInformation', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
// To Delete Contact Information
const validateDeleteContactInformation = (req, res) => {
  return contactHelper.deleteContactInformation(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'ContactInformation deleted successfully', data, 'contactInformation.controller.validateDeleteContactInformation')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'contactInformation.controller.validateDeleteContactInformation', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contactInformation.controller.validateDeleteContactInformation', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// To Get Details Contact Information
const validateDetailContactInformation = (req, res) => {
  return contactHelper.detailContactInformation(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'ContactInformation fetched successfully', data, 'contactInformation.controller.validateDetailContactInformation')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'contactInformation.controller.validateDetailContactInformation', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'contactInformation.controller.validateDetailContactInformation', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addContactInformation,
  getContactInformation,
  updateContactInformation,
  validateDeleteContactInformation,
  validateDetailContactInformation
}
