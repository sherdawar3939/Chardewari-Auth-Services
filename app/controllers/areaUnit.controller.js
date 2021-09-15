'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const areaUnitHelper = require('../helpers/areaUnit.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// *********
// Get Area
// *********

const getAllUnits = function (req, res) {
  return areaUnitHelper.getAllUnits(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Area fetch successfully.', data, 'area.controller.getAllUnits')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'area.controller.getAllUnits', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'area.controller.getAllUnits', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getAllUnits
}
