'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const SessionHelper = require('../helpers/session.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Send email
const getUniqueId = function (req, res) {
  return SessionHelper.getUniqueId(req.body)
    .then((data) => {
      generalController.successResponse(res, 'UniqueId', data, 'Session.controller.getUniqueId')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'Session.controller.getUniqueId', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Session.controller.getUniqueId', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getUniqueId
}
