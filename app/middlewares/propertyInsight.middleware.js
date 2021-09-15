'use strict'

const _ = require('lodash')
const generalMiddleware = require('./general.middleware')

// ************************************
// POST PropertyInsight Middleware
// ************************************

const validatePostPropertyInsight = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // identifier is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.identifier) || body.identifier.length < 2 || body.identifier.length > 10) {
    errorArray.push({
      field: 'identifier',
      error: 70000,
      message: 'Please provide only valid \'identifier\' as string, length must be between 2 and 10.'
    })
  }

  // PropertyId Is required
  if (!(body.PropertyId) || isNaN(body.PropertyId)) {
    errorArray.push({
      field: 'PropertyId',
      error: 90220,
      message: '\'PropertyId\' is required as Numeric .'
    })
  }

  // type Is required as Date
  if (!(body.type) || isNaN(body.type)) {
    errorArray.push({
      field: 'type',
      error: 90220,
      message: '\'type\' is required as Numeric .'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyInsight.middleware.validatePostPropertyInsight')
  }
  validatedConditions.identifier = body.identifier
  validatedConditions.PropertyId = body.PropertyId
  // validatedConditions.type = body.type

  done()
}

// ***********************************
// To Get Details Against Given Id
// ***********************************

const propertyViews = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const validatedConditions = {}

  // Validating id as Required, not empty, valid numeric value with range.
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 90340,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyInsight.middleware.propertyViews')
  }
  validatedConditions.id = params.id
  req.conditions = validatedConditions
  done()
}

// ***********************************
// To Get Viewers
// ***********************************

const getPropertyVisitor = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const validatedConditions = {}

  // Validating id as Required, not empty, valid numeric value with range.
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 90340,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyInsight.middleware.getPropertyVisitor')
  }

  validatedConditions.id = params.id
  req.conditions = validatedConditions
  done()
}

module.exports = {
  validatePostPropertyInsight,
  propertyViews,
  getPropertyVisitor
}
