'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const propertyMetaHelper = require('../helpers/propertyMeta.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// **********************************
// Get Product Category Controller
// **********************************

const getPropertyMeta = function (req, res) {
  return propertyMetaHelper.getPropertyMeta(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'PropertyMeta fetched successfully.', data, 'PropertyMeta.controller.getPropertyMeta')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'PropertyMeta.controller.getPropertyMeta', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'PropertyMeta.controller.getPropertyMeta', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update propertyMeta
// ***********************************

const updatePropertyMeta = function (req, res) {
  return propertyMetaHelper.updatePropertyMeta(req.conditions, req.id)
    .then(function (data) {
      generalController.successResponse(res, 'propertyMeta Updated successfully.', data, 'propertyMeta.controller.updatePropertyMeta')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'propertyMeta.controller.updatePropertyMeta', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'propertyMeta.controller.updatePropertyMeta', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getPropertyMeta,
  updatePropertyMeta
}
