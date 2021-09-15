'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ********************
// Get Purchase Listing
// ********************

const validateGetPurchaseListing = (req, res, done) => {
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (req.user.public) {
    validatedConditions.UserId = req.user.id
  }

  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

// ******************************
// Validate Get Purchase Details
// ******************************

const validateGetPurchaseDetail = (req, res, next) => {
  let purchase = req.params
  let validatedConditions = {}
  const errorArray = []

  // Validating as not empty, mongo db collection id.
  if (_.isEmpty(purchase.id) || isNaN(purchase.id)) {
    errorArray.push({
      field: 'id',
      error: 60550,
      message: 'Please provide only valid \'id\'.'
    })
  }
  validatedConditions.id = purchase.id

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'purchase.middleware.validateGetPurchaseDetail', SERVER_RESPONSE.VALIDATION_ERROR)
  }
  req.conditions = validatedConditions
  next()
}

// ******************************
// Validate Get Purchase ById
// ******************************

const validateGetPurchaseById = (req, res, next) => {
  let purchase = req.params
  let validatedConditions = {}
  const errorArray = []

  // Validating as not empty, mongo db collection id.
  if (_.isEmpty(purchase.id) || isNaN(purchase.id)) {
    errorArray.push({
      field: 'id',
      error: 60550,
      message: 'Please provide only valid \'id\'.'
    })
  }
  validatedConditions.id = purchase.id

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'purchase.middleware.validateGetPurchaseById', SERVER_RESPONSE.VALIDATION_ERROR)
  }
  req.conditions = validatedConditions
  next()
}

module.exports = {
  validateGetPurchaseListing,
  validateGetPurchaseDetail,
  validateGetPurchaseById
}
