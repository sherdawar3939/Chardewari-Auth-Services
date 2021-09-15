'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// Get Middleware
// **********************************

const validateGetPropertyMeta = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // Must Be Required Validating as not empty, valid numeric value with range.
  if (!query.PropertyId || isNaN(query.PropertyId)) {
    errorArray.push({
      field: 'PropertyId',
      error: 70050,
      message: 'Please provide only valid \'PropertyId\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyMeta.middleware.validateGetPropertyMeta')
  }
  validatedConditions.PropertyId = query.PropertyId

  req.conditions = validatedConditions
  done()
}

// **********************************
// Update Meta Property  Middleware
// **********************************

const validateUpdateMetaProperty = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const id = req.params
  const validatedConditions = {}

  // meta is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('meta')) {
    // meta is Optional, if given then validating it as not empty, valid Array and length range.
    if (!_.isArray(body.meta) && body.meta !== '') {
      errorArray.push({
        field: 'meta ',
        error: 90130,
        message: 'Please provide only valid \'meta \' as Array.'
      })
    }
    validatedConditions.meta = body.meta
  }

  // deletedMeta is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('deletedMeta')) {
    // deletedMeta is Optional, if given then validating it as not empty, valid Array and length range.
    if (!_.isArray(body.deletedMeta) && body.deletedMeta !== '') {
      errorArray.push({
        field: 'deletedMeta ',
        error: 90130,
        message: 'Please provide only valid \'deletedMeta \' as Array.'
      })
    }
    validatedConditions.deletedMeta = body.deletedMeta
  }

  for (let i = 0; i < body.meta.length; i++) {
    let data = body.meta[i]
    // Validating as not empty, valid String and length range.
    if (!_.isString(data.key) || data.key.length < 3 || data.key.length > 100 || data.key === '') {
      errorArray.push({
        field: 'key',
        error: 90075,
        message: '\'titleL1\' is required as string, length must be between 3 and 100.'
      })
    }

    // Validating as not empty, valid String and length range.
    if (!_.isString(data.value) || data.value.length < 3 || data.value === '') {
      errorArray.push({
        field: 'value',
        error: 90075,
        message: '\'value\' is required as string, length must be greater then 3.'
      })
    }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyMeta.middleware.validateUpdateMetaProperty')
  }

  req.conditions = validatedConditions
  req.id = id
  done()
}

module.exports = {
  validateGetPropertyMeta,
  validateUpdateMetaProperty
}
