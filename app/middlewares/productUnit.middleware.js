'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST ProductUnit  Middleware
// **********************************

const validatePostProductUnit = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // name must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 50) {
    errorArray.push({
      field: 'name',
      error: 80000,
      message: 'Please provide only valid \'name\' as string, length must be between 2 and 50.'
    })
  }

  // nameL1 must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.nameL1) || body.nameL1.length < 2 || body.nameL1.length > 100) {
    errorArray.push({
      field: 'nameL1',
      error: 80010,
      message: 'Please provide only valid \'nameL1\' as string, length must be between 2 and 100.'
    })
  }

  // code is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.code) || !_.isString(body.code) || body.code.length < 1 || body.code.length > 5) {
    errorArray.push({
      field: 'code',
      error: 80040,
      message: '\'code\' is required as string, length must be between 1 and 5.'
    })
  }

  // codeL1 is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.codeL1) || !_.isString(body.codeL1) || body.codeL1.length < 1 || body.codeL1.length > 5) {
    errorArray.push({
      field: 'codeL1',
      error: 80050,
      message: '\'codeL1\' is required as string, length must be between 1 and 5.'
    })
  }

  // ParentId is an optional numeric property, if it is given than validate it.
  if ((body.hasOwnProperty('ParentId') && body.ParentId) || body.operation || body.value) {
    // Validating as not empty, valid numeric value with range.
    if (!body.ParentId || isNaN(body.ParentId) || body.ParentId < 0 || body.ParentId > 999999999) {
      errorArray.push({
        field: 'ParentId',
        error: 80060,
        message: 'Please provide only valid \'ParentId\' as numeric, range must be between 0 and 999999999.'
      })
    }
    validatedBody.ParentId = body.ParentId
  }

  // value is an optional numeric property, if it is given than validate it.
  if ((body.hasOwnProperty('value') && body.value) || body.operation || body.ParentId) {
    // Validating as not empty, valid numeric value with range.
    if (!body.value || isNaN(body.value) || body.value > 999999999) {
      errorArray.push({
        field: 'value',
        error: 80020,
        message: 'Please provide only valid \'value\' as numeric, range must be less than 999999999.'
      })
    }
    validatedBody.value = body.value
  }

  // operation is an optional string property, if it is given than validate it.
  if ((body.hasOwnProperty('operation') && body.operation) || body.value || body.ParentId) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.operation) || !_.isString(body.operation) || (body.operation !== '+' && body.operation !== '-' && body.operation !== '*' && body.operation !== '/')) {
      errorArray.push({
        field: 'operation',
        error: 80030,
        message: 'Please provide only valid \'operation\' as string, and in +, -, *, /.'
      })
    }
    validatedBody.operation = body.operation
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productUnit.middleware.validatePostProductUnit')
  }

  validatedBody.name = body.name
  validatedBody.nameL1 = body.nameL1
  validatedBody.code = body.code
  validatedBody.codeL1 = body.codeL1

  req.validatedBody = validatedBody
  done()
}

// **********************************
// Get Product Unit Middleware
// **********************************

const validateGetProductUnit = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productUnit.middleware.validateGetProductUnit')
  }

  req.conditions = validatedConditions
  done()
}

// **********************************
// Update ProductUnit  Middleware
// **********************************

const validateUpdateProductUnit = (req, res, done) => {
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

  // value is Optional and Required As Numeric
  if (body.hasOwnProperty('value')) {
    if (!(body.value) || isNaN(body.value)) {
      errorArray.push({
        field: 'value',
        error: 80100,
        message: '\'value\' is required as Number.'
      })
    }
    validatedConditions.value = body.value
  }

  // operation is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('operation')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.operation) || !_.isString(body.operation) || body.operation.length > 20) {
      errorArray.push({
        field: 'operation',
        error: 80110,
        message: '\'operation\' is required as string, length must be lessThen 100.'
      })
    }
    validatedConditions.operation = body.operation
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productUnit.middleware.validateUpdateProductUnit')
  }
  validatedConditions.ParentIdId = body.hasOwnProperty('ParentId') ? body.ParentIdId : null
  req.body = validatedConditions
  req.categoryId = body.id
  done()
}

// ***********************************
// Validate Delete Product Unit
// ************************************

const validateDeleteProductUnit = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productUnit.middleware.validateDeleteProductUnit')
  }
  done()
}

module.exports = {
  validatePostProductUnit,
  validateGetProductUnit,
  validateUpdateProductUnit,
  validateDeleteProductUnit
}
