'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ********************
// Get Area Middleware
// ********************

const validateGetArea = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('ParentId')) {
    // Validating as not empty, valid numeric value with range.
    if (!query.ParentId || isNaN(query.ParentId)) {
      errorArray.push({
        field: 'id',
        error: 60000,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.ParentId = query.ParentId
  }

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('id')) {
    // Validating as not empty, valid numeric value with range.
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 60000,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  // name is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('name')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.name) || !_.isString(query.name)) {
      errorArray.push({
        field: 'name ',
        error: 90130,
        message: 'Please provide only valid \'name \' as string.'
      })
    }
    validatedConditions.name = query.name
  }

  // name is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('level')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.level) || !_.isString(query.level)) {
      errorArray.push({
        field: 'level ',
        error: 90130,
        message: 'Please provide only valid \'level \' as string.'
      })
    }
    validatedConditions.level = query.level
  }

  // level is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('level')) {
    // Validating as not empty, valid numeric value with range.
    if (!query.level || isNaN(query.level)) {
      errorArray.push({
        field: 'level',
        error: 60010,
        message: 'Please provide only valid \'level\' as numeric.'
      })
    }
    validatedConditions.level = query.level
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetArea')
  }

  req.conditions = validatedConditions
  done()
}

// *********************************
// Get Area Details Middleware
// ********************************

const validateDelete = (req, res, done) => {
  const errorArray = []
  const param = req.params
  const validatedConditions = {}

  if (!param.id || isNaN(param.id)) {
    errorArray.push({
      field: 'id',
      error: 60000,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }
  validatedConditions.id = param.id

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateDelete')
  }

  req.conditions = validatedConditions
  done()
}

// **************************
// Get Area/Cities Middleware
// **************************

const validateGetAreaCities = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 100
  let offset = 0

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('ParentId') && !_.isEmpty(query.ParentId)) {
    // Validating as not empty, valid numeric value with range.
    if (!query.ParentId || isNaN(query.ParentId)) {
      errorArray.push({
        field: 'id',
        error: 60020,
        message: 'Please provide only valid \'ParentId\' as numeric.'
      })
    }
    validatedConditions.ParentId = query.ParentId
  }

  // purpose is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('purpose') && query.purpose) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.purpose) || !_.isString(query.purpose) || (query.purpose !== 'rent' && query.purpose !== 'sale' && query.purpose !== 'buy')) {
      errorArray.push({
        field: 'purpose',
        error: 60030,
        message: 'Please provide only valid \'purpose\' as string, and in rent and sale.'
      })
    }
    validatedConditions.purpose = query.purpose !== 'rent'
  }

  // category is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('category') && query.category) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.category)) {
      errorArray.push({
        field: 'category',
        error: 600240,
        message: 'Please provide only valid \'category\' as numeric.'
      })
    }
    validatedConditions.category = query.category
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetAreaCities')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

// **********************************
// POST Area  Middleware
// **********************************

const validatePostArea = (req, res, done) => {
  const errorArray = []
  const body = req.body

  const validatedConditions = {}

  // name must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 50) {
    errorArray.push({
      field: 'name',
      error: 80000,
      message: 'Please provide only valid \'name\' as string, length must be between 2 and 50.'
    })
  }

  // nameL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('nameL1') && body.nameL1 != null && body.nameL1 !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.nameL1) || !_.isString(body.nameL1) || body.nameL1.length > 100) {
      errorArray.push({
        field: 'nameL1',
        error: 80010,
        message: '\'nameL1\' is required as string, length must be 100.'
      })
    }
    validatedConditions.nameL1 = body.nameL1
  }

  // slug is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('slug')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.slug) || !_.isString(body.slug) || body.slug.length > 100) {
      errorArray.push({
        field: 'slug',
        error: 80030,
        message: '\'slug\' is required as string, length must be lessThen 100.'
      })
    }
    validatedConditions.slug = body.slug
  }

  // ParentId is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('ParentId') && body.ParentId != null) {
    // Validating as not empty, valid String and length range.
    if (!(body.ParentId) || isNaN(body.ParentId)) {
      errorArray.push({
        field: 'ParentId',
        error: 80030,
        message: '\'ParentId\' is required as Number'
      })
    }
    validatedConditions.ParentId = body.ParentId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validatePostArea')
  }

  validatedConditions.name = body.name
  validatedConditions.title = body.name
  req.conditions = validatedConditions
  done()
}

// **********************************
// Put Area  Middleware
// **********************************

const validatePutArea = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const param = req.params

  const validatedConditions = {}

  // name is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('name') && body.name != null) {
  // name must be required required  Validating as not empty, valid String and length range.
    if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 50) {
      errorArray.push({
        field: 'name',
        error: 80000,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 50.'
      })
    }
    validatedConditions.name = body.name
    validatedConditions.title = body.name
  }
  // nameL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('nameL1') && body.nameL1 != null) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.nameL1) || !_.isString(body.nameL1) || body.nameL1.length > 100) {
      errorArray.push({
        field: 'nameL1',
        error: 80010,
        message: '\'nameL1\' is required as string, length must be 100.'
      })
    }
    validatedConditions.nameL1 = body.nameL1
    validatedConditions.titleL1 = body.nameL1
  }

  // slug is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('slug')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.slug) || !_.isString(body.slug) || body.slug.length > 100) {
      errorArray.push({
        field: 'slug',
        error: 80030,
        message: '\'slug\' is required as string, length must be lessThen 100.'
      })
    }
    validatedConditions.slug = body.slug
  }

  // ParentId is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('ParentId') && !body.ParentId) {
    // Validating as not empty, valid String and length range.
    if (isNaN(body.ParentId)) {
      errorArray.push({
        field: 'ParentId',
        error: 80030,
        message: '\'ParentId\' is required as Number'
      })
    }
    validatedConditions.ParentId = body.ParentId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validatePutArea')
  }

  req.conditions = validatedConditions
  req.id = param
  done()
}

module.exports = {
  validateGetArea,
  validateGetAreaCities,
  validatePostArea,
  validateDelete,
  validatePutArea
}
