'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ********************************
// PropertyCategory Get Middleware
// *******************************

const validateGetPropertyCategory = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('ParentCategoryId')) {
    if (query.ParentCategoryId !== 'null') {
      // Validating as not empty, valid numeric value with range.
      if (query.ParentCategoryId != null && (!query.ParentCategoryId || isNaN(query.ParentCategoryId))) {
        errorArray.push({
          field: 'id',
          error: 50500,
          message: 'Please provide only valid \'id\' as numeric.'
        })
      }
    }
    validatedConditions.ParentCategoryId = query.ParentCategoryId === 'null' ? null : query.ParentCategoryId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyCategory.middleware.validateGetPropertyCategory')
  }

  req.conditions = validatedConditions

  done()
}

// ****************************
// PropertyCategory Middleware
// ****************************

const validateGetPropertyCategoryById = (req, res, done) => {
  const errorArray = []
  const param = req.params
  const validatedConditions = {}

  // Validating as not empty, valid numeric value with range.
  if (param.id != null && (!param.id || isNaN(param.id))) {
    errorArray.push({
      field: 'id',
      error: 50500,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  validatedConditions.id = param.id

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyCategory.middleware.validateGetPropertyCategory')
  }

  req.conditions = validatedConditions

  done()
}

// ***************************
// Add Category
// ***************************

const validateAddPropertyCategory = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // title must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
    errorArray.push({
      field: 'title',
      error: 11000,
      message: 'Please provide only valid \'title\' as string, length must be between 2 and 50.'
    })
  }

  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1') && !_.isEmpty(body.titleL1)) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.titleL1) || !_.isString(body.titleL1) || body.titleL1.length > 16) {
      errorArray.push({
        field: 'titleL1',
        error: 11020,
        message: '\'titleL1\' is required as string, length must be 16.'
      })
    }
    validatedConditions.titleL1 = body.titleL1
  }

  // singularName must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.singularName) || body.singularName.length < 2 || body.singularName.length > 50) {
    errorArray.push({
      field: 'singularName',
      error: 11000,
      message: 'Please provide only valid \'singularName\' as string, length must be between 2 and 50.'
    })
  }

  // singularNameL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('singularNameL1') && !_.isEmpty(body.singularNameL1)) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.singularNameL1) || !_.isString(body.singularNameL1) || body.singularNameL1.length > 16) {
      errorArray.push({
        field: 'singularNameL1',
        error: 11020,
        message: '\'singularNameL1\' is required as string, length must be 16.'
      })
    }
    validatedConditions.singularNameL1 = body.singularNameL1
  }

  // CategoryId is an optional numeric property, if it is given than validate it.
  if (body.hasOwnProperty('CategoryId') && body.CategoryId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(body.CategoryId)) {
      errorArray.push({
        field: 'CategoryId',
        error: 40041,
        message: 'Please provide only valid \'CategoryId\' as numeric.'
      })
    }
    validatedConditions.ParentCategoryId = body.CategoryId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyCategory.middleware.validateAddPropertyCategory')
  }

  validatedConditions.title = body.title
  validatedConditions.singularName = body.singularName
  req.conditions = validatedConditions
  done()
}

// ***************************
// Update Category
// ***************************

const validateUpdatePropertyCategory = (req, res, done) => {
  const errorArray = []
  const param = req.params
  const body = req.body
  const validatedConditions = {}

  if (body.hasOwnProperty('title') && !_.isEmpty(body.title)) {
  // title must be required required  Validating as not empty, valid String and length range.
    if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
      errorArray.push({
        field: 'title',
        error: 11000,
        message: 'Please provide only valid \'title\' as string, length must be between 2 and 50.'
      })
    }
    validatedConditions.title = body.title
  }
  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1') && !_.isEmpty(body.titleL1)) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.titleL1) || !_.isString(body.titleL1) || body.titleL1.length > 16) {
      errorArray.push({
        field: 'titleL1',
        error: 11020,
        message: '\'titleL1\' is required as string, length must be 16.'
      })
    }
    validatedConditions.titleL1 = body.titleL1
  }

  // singularName must be required required  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('singularName') && !_.isEmpty(body.singularName)) {
    if (!_.isString(body.singularName) || body.singularName.length < 2 || body.singularName.length > 50) {
      errorArray.push({
        field: 'singularName',
        error: 11000,
        message: 'Please provide only valid \'singularName\' as string, length must be between 2 and 50.'
      })
    }
    validatedConditions.singularName = body.singularName
  }
  // singularNameL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('singularNameL1') && !_.isEmpty(body.singularNameL1)) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.singularNameL1) || !_.isString(body.singularNameL1) || body.singularNameL1.length > 16) {
      errorArray.push({
        field: 'singularNameL1',
        error: 11020,
        message: '\'singularNameL1\' is required as string, length must be 16.'
      })
    }
    validatedConditions.singularNameL1 = body.singularNameL1
  }

  // CategoryId is an optional numeric property, if it is given than validate it.
  if (body.hasOwnProperty('CategoryId') && body.CategoryId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(body.CategoryId)) {
      errorArray.push({
        field: 'CategoryId',
        error: 40041,
        message: 'Please provide only valid \'CategoryId\' as numeric.'
      })
    }
    validatedConditions.ParentCategoryId = body.CategoryId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'propertyCategory.middleware.validateUpdatePropertyCategory')
  }
  req.param = param
  req.conditions = validatedConditions
  done()
}

module.exports = {
  validateGetPropertyCategory,
  validateGetPropertyCategoryById,
  validateAddPropertyCategory,
  validateUpdatePropertyCategory
}
