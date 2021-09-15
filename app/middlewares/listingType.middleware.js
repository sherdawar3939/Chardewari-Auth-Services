'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST Listing Type  Middleware
// **********************************

const validatePostListingType = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // title must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
    errorArray.push({
      field: 'title',
      error: 30000,
      message: 'Please provide only valid \'title\' as string, length must be between 2 and 50.'
    })
  }

  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.titleL1) || !_.isString(body.titleL1) || body.titleL1.length > 100) {
      errorArray.push({
        field: 'titleL1',
        error: 30010,
        message: '\'titleL1\' is required as string, length must be 100.'
      })
    }
    validatedConditions.titleL1 = body.titleL1
  }

  // priority is Optional and Required As Numeric
  if (body.hasOwnProperty('priority')) {
    if (!(body.priority) || isNaN(body.priority)) {
      errorArray.push({
        field: 'priority',
        error: 30020,
        message: '\'priority\' is required as Number.'
      })
    }
    validatedConditions.priority = body.priority
  }

  // unitPrice is Optional and Required As Numeric
  if (body.hasOwnProperty('unitPrice')) {
    if (!(body.unitPrice) || isNaN(body.unitPrice)) {
      errorArray.push({
        field: 'unitPrice',
        error: 30030,
        message: '\'unitPrice\' is required as Number.'
      })
    }
    validatedConditions.unitPrice = body.unitPrice
  }

  if (!(body.validTillDay) || isNaN(body.validTillDay)) {
    errorArray.push({
      field: 'validTillDay',
      error: 30030,
      message: '\'validTillDay\' is required as Number.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'listingType.middleware.validatePostListingType')
  }

  validatedConditions.title = body.title
  validatedConditions.validTillDay = body.validTillDay
  req.conditions = validatedConditions
  done()
}

// **********************************
// Update Listing Type  Middleware
// **********************************

const validateUpdateListingType = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const params = req.params
  const validatedConditions = {}

  if (body.hasOwnProperty('title')) {
    if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
      errorArray.push({
        field: 'title',
        error: 30040,
        message: 'Please provide only valid \'title\' as string, length must be between 2 and 50.'
      })
    }
    validatedConditions.title = body.title
  }
  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.titleL1) || !_.isString(body.titleL1) || body.titleL1.length > 100) {
      errorArray.push({
        field: 'titleL1',
        error: 30050,
        message: '\'titleL1\' is required as string, length must be 100.'
      })
    }
    validatedConditions.titleL1 = body.titleL1
  }

  // priority is Optional and Required As Numeric
  if (body.hasOwnProperty('priority')) {
    if (!(body.priority) || isNaN(body.priority)) {
      errorArray.push({
        field: 'priority',
        error: 30060,
        message: '\'priority\' is required as Number.'
      })
    }
    validatedConditions.priority = body.priority
  }

  // unitPrice is Optional and Required As Numeric
  if (body.hasOwnProperty('unitPrice')) {
    if (!(body.unitPrice) || isNaN(body.unitPrice)) {
      errorArray.push({
        field: 'unitPrice',
        error: 30070,
        message: '\'unitPrice\' is required as Number.'
      })
    }
    validatedConditions.unitPrice = body.unitPrice
  }

  // validTillDay is Optional and Required As Numeric
  if (body.hasOwnProperty('validTillDay')) {
    if (!(body.validTillDay) || isNaN(body.validTillDay)) {
      errorArray.push({
        field: 'validTillDay',
        error: 30070,
        message: '\'validTillDay\' is required as Number.'
      })
    }
    validatedConditions.validTillDay = body.validTillDay
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'listingType.middleware.validateUpdateListingType')
  }

  validatedConditions.id = params.id
  req.conditions = validatedConditions
  done()
}

// **********************************
// Get Listing Type  Middleware
// **********************************

const validateGetListingType = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // id is Optional and As Numeric
  if (query.hasOwnProperty('id')) {
    if (!(query.id) || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 30080,
        message: '\'id\' is required as Number.'
      })
    }
    validatedConditions.id = query.id
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'listingType.middleware.validateGetListingType')
  }
  req.conditions = validatedConditions
  done()
}

// ***********************************
// Validate Delete Contact Information
// ************************************

const validateDeleteListingType = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 30090,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'listingType.middleware.validateDeleteListingType')
  }
  done()
}
module.exports = {
  validatePostListingType,
  validateUpdateListingType,
  validateGetListingType,
  validateDeleteListingType

}
