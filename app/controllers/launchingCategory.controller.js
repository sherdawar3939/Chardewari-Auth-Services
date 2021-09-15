'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const launchingCategoryHelper = require('../helpers/launchingCategory.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// Get LaunchingCategory

const getLaunchingCategories = function (req, res) {
  return launchingCategoryHelper.getLaunchingCategory(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Category fetched successfully.', data, 'launchingCategory.controller.getLaunchingCategory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'launchingCategory.controller.getLaunchingCategory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'launchingCategory.controller.getLaunchingCategory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  getLaunchingCategories
}
