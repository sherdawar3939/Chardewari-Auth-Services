'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST currency  Middleware
// **********************************

const validatePostCurrency = (req, res, done) => {
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
  if (body.hasOwnProperty('nameL1')) {
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

  // rate is Optional and Required As Numeric
  if (body.hasOwnProperty('rate') && body.rate != '') {
    if (isNaN(body.rate)) {
      errorArray.push({
        field: 'rate',
        error: 80020,
        message: '\'rate\' is required as Number.'
      })
    }
    validatedConditions.rate = body.rate
  }

  // symbol is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('symbol')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.symbol) || !_.isString(body.symbol) || body.symbol.length > 20) {
      errorArray.push({
        field: 'symbol',
        error: 80030,
        message: '\'symbol\' is required as string, length must be lessThen 100.'
      })
    }
    validatedConditions.symbol = body.symbol
  }

  // code is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('code')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.code) || !_.isString(body.code) || body.code.length > 50) {
      errorArray.push({
        field: 'code',
        error: 80040,
        message: '\'code\' is required as string, length must lessThen 50.'
      })
    }
    validatedConditions.code = body.code
  }

  // codeL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('codeL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.codeL1) || !_.isString(body.codeL1) || body.codeL1.length > 50) {
      errorArray.push({
        field: 'codeL1',
        error: 80050,
        message: '\'codeL1\' is required as string, length must be 50.'
      })
    }
    validatedConditions.codeL1 = body.codeL1
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'currency.middleware.validatePostCurrency')
  }
  validatedConditions.ParentIdId = body.hasOwnProperty('ParentId') ? body.ParentIdId : null
  validatedConditions.name = body.name
  req.conditions = validatedConditions
  done()
}

// **********************************
// Get currency Middleware
// **********************************

const validateGetCurrency = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('ParentId')) {
    if (query.ParentId !== 'null') {
      // Validating as not empty, valid numeric value with range.
      if (query.ParentId != null && (!query.ParentId || isNaN(query.ParentId))) {
        errorArray.push({
          field: 'id',
          error: 50500,
          message: 'Please provide only valid \'id\' as numeric.'
        })
      }
    }
    validatedConditions.ParentId = query.ParentId === 'null' ? null : query.ParentId
  }

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('id')) {
    if (query.id !== 'null') {
      // Validating as not empty, valid numeric value with range.
      if (query.id != null && (!query.id || isNaN(query.id))) {
        errorArray.push({
          field: 'id',
          error: 50500,
          message: 'Please provide only valid \'id\' as numeric.'
        })
      }
    }
    validatedConditions.id = query.id
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'currency.middleware.validateGetCurrency')
  }
  req.conditions = validatedConditions
  done()
}

// **********************************
// Update currency
// **********************************

const validateUpdateCurrency = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const id = req.params
  const validatedConditions = {}

  // Must Be Required Validating as not empty, valid numeric value with range.
  if (!id.id || isNaN(id.id)) {
    errorArray.push({
      field: 'id',
      error: 80070,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  // name is Optional in Update
  if (body.hasOwnProperty('name')) {
    if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 50) {
      errorArray.push({
        field: 'name',
        error: 80080,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 50.'
      })
    }
    validatedConditions.name = body.name
  }
  // nameL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('nameL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.nameL1) || !_.isString(body.nameL1) || body.nameL1.length > 100) {
      errorArray.push({
        field: 'nameL1',
        error: 80090,
        message: '\'nameL1\' is required as string, length must be 100.'
      })
    }
    validatedConditions.nameL1 = body.nameL1
  }

  // rate is Optional and Required As Numeric
  if (body.hasOwnProperty('rate') && body.rate != '') {
    if (isNaN(body.rate)) {
      errorArray.push({
        field: 'rate',
        error: 80100,
        message: '\'rate\' is required as Number.'
      })
    }
    validatedConditions.rate = body.rate
  }

  // symbol is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('symbol')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.symbol) || !_.isString(body.symbol) || body.symbol.length > 20) {
      errorArray.push({
        field: 'symbol',
        error: 80110,
        message: '\'symbol\' is required as string, length must be lessThen 100.'
      })
    }
    validatedConditions.symbol = body.symbol
  }

  // code is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('code')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.code) || !_.isString(body.code) || body.code.length > 20) {
      errorArray.push({
        field: 'code',
        error: 80120,
        message: '\'code\' is required as string, length must lessThen 50.'
      })
    }
    validatedConditions.code = body.code
  }

  // codeL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('codeL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.codeL1) || !_.isString(body.codeL1) || body.codeL1.length > 20) {
      errorArray.push({
        field: 'codeL1',
        error: 80130,
        message: '\'codeL1\' is required as string, length must be 50.'
      })
    }
    validatedConditions.codeL1 = body.codeL1
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'currency.middleware.validateUpdateCurrency')
  }
  validatedConditions.ParentIdId = body.hasOwnProperty('ParentId') ? body.ParentIdId : null
  req.body = validatedConditions
  req.categoryId = body.id
  done()
}

// ***********************************
// Validate Delete Currency
// ************************************

const validateDeleteCurrency = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80140,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'currency.middleware.validateDeleteCurrency')
  }
  done()
}

module.exports = {
  validatePostCurrency,
  validateGetCurrency,
  validateUpdateCurrency,
  validateDeleteCurrency
}
