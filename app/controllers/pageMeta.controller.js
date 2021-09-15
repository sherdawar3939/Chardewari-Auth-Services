'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const pageMetaHelper = require('../helpers/pageMeta.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Get Page Meta Listing
// ***********************************

const getPageMeta = function (req, res) {
  return pageMetaHelper.getPageMeta(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'pageMeta fetched successfully.', data, 'pageMeta.controller.getPageMeta')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'pageMeta.controller.getPageMeta', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'pageMeta.controller.getPageMeta', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update pageMeta
// ***********************************

const updatePageMeta = function (req, res) {
  return pageMetaHelper.updatePageMeta(req.conditions, req.id)
    .then(function (data) {
      generalController.successResponse(res, 'pageMeta Updated successfully.', data, 'pageMeta.controller.updatePageMeta')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'pageMeta.controller.updatePageMeta', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'pageMeta.controller.updatePageMeta', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getPageMeta,
  updatePageMeta
}
