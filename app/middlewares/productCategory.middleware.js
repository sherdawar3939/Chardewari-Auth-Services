'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST ProductCategory  Middleware
// **********************************

const validatePostProductCategory = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // title must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
    errorArray.push({
      field: 'title',
      error: 80000,
      message: 'Please provide only valid \'title\' as string, length must be between 2 and 50.'
    })
  }

  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.titleL1) || !_.isString(body.titleL1) || body.titleL1.length > 100) {
      errorArray.push({
        field: 'titleL1',
        error: 80010,
        message: '\'titleL1\' is required as string, length must be 100.'
      })
    }
    validatedConditions.titleL1 = body.titleL1
  }

  // level is Optional and Required As Numeric
  if (body.hasOwnProperty('level')) {
    if (!(body.level) || isNaN(body.level)) {
      errorArray.push({
        field: 'level',
        error: 80020,
        message: '\'level\' is required as Number.'
      })
    }
    validatedConditions.level = body.level
  }

  // Validating as not empty, valid String and length range.
  if (_.isEmpty(body.singularName) || !_.isString(body.singularName) || body.singularName.length > 50) {
    errorArray.push({
      field: 'singularName',
      error: 80040,
      message: '\'singularName\' is required as string, length must lessThen 50.'
    })
  }
  validatedConditions.singularName = body.singularName

  // singularNameL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('singularNameL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.singularNameL1) || !_.isString(body.singularNameL1) || body.singularNameL1.length > 50) {
      errorArray.push({
        field: 'singularNameL1',
        error: 80050,
        message: '\'singularNameL1\' is required as string, length must be 50.'
      })
    }
    validatedConditions.singularNameL1 = body.singularNameL1
  }

  // productType is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('productType')) {
    // Validating as not empty, valid String and length range.
    if (isNaN(body.productType)) {
      errorArray.push({
        field: 'productType',
        error: 80050,
        message: '\'productType\' is required as Number'
      })
    }
    validatedConditions.productType = body.productType
  }

  // productCategory is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('productCategory')) {
    // Validating as not empty, valid String and length range.
    if (isNaN(body.productCategory)) {
      errorArray.push({
        field: 'productCategory',
        error: 80050,
        message: '\'productCategory\' is required as Number'
      })
    }
    validatedConditions.productCategory = body.productCategory
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productCategory.middleware.validatePostProductCategory')
  }

  validatedConditions.title = body.title
  req.conditions = validatedConditions
  done()
}

// **********************************
// Get Product Category Middleware
// **********************************

const validateGetProductCategory = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productCategory.middleware.validateGetProductCategory')
  }

  req.conditions = validatedConditions
  done()
}

// **********************************
// Update ProductCategory  Middleware
// **********************************

const validateUpdateProductCategory = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const param = req.params
  const validatedConditions = {}

  // Must Be Required Validating as not empty, valid numeric value with range.
  if (!param.id || isNaN(param.id)) {
    errorArray.push({
      field: 'id',
      error: 80070,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  // title is Optional in Update
  if (body.hasOwnProperty('title')) {
    if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
      errorArray.push({
        field: 'title',
        error: 80080,
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
        error: 80090,
        message: '\'titleL1\' is required as string, length must be 100.'
      })
    }
    validatedConditions.titleL1 = body.titleL1
  }

  // level is Optional and Required As Numeric
  if (body.hasOwnProperty('level')) {
    if (!(body.level) || isNaN(body.level)) {
      errorArray.push({
        field: 'level',
        error: 80100,
        message: '\'level\' is required as Number.'
      })
    }
    validatedConditions.level = body.level
  }

  // singularName is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('singularName')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.singularName) || !_.isString(body.singularName) || body.singularName.length > 50) {
      errorArray.push({
        field: 'singularName',
        error: 80120,
        message: '\'singularName\' is required as string, length must lessThen 50.'
      })
    }
    validatedConditions.singularName = body.singularName
  }

  // singularNameL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('singularNameL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.singularNameL1) || !_.isString(body.singularNameL1) || body.singularNameL1.length > 50) {
      errorArray.push({
        field: 'singularNameL1',
        error: 80130,
        message: '\'singularNameL1\' is required as string, length must be 50.'
      })
    }
    validatedConditions.singularNameL1 = body.singularNameL1
  }

  // productType is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('productType')) {
    // Validating as not empty, valid String and length range.
    if (isNaN(body.productType)) {
      errorArray.push({
        field: 'productType',
        error: 80050,
        message: '\'productType\' is required as Number'
      })
    }
    validatedConditions.productType = body.productType
  }

  // productCategory is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('productCategory')) {
    // Validating as not empty, valid String and length range.
    if (isNaN(body.productCategory)) {
      errorArray.push({
        field: 'productCategory',
        error: 80050,
        message: '\'productCategory\' is required as Number'
      })
    }
    validatedConditions.productCategory = body.productCategory
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productCategory.middleware.validatePostProductCategory')
  }

  req.body = validatedConditions
  req.param = param.id
  done()
}

// ***********************************
// Validate Delete Product Category
// ************************************

const validateDeleteProductCategory = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productCategory.middleware.validateDeleteProductCategory')
  }
  done()
}

// ****************************
// PropertyCategory Middleware
// ****************************

const validateGetPrductCategoryById = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'productCategory.middleware.validateGetPrductCategoryById')
  }

  req.conditions = validatedConditions

  done()
}

module.exports = {
  validatePostProductCategory,
  validateGetProductCategory,
  validateUpdateProductCategory,
  validateDeleteProductCategory,
  validateGetPrductCategoryById
}
