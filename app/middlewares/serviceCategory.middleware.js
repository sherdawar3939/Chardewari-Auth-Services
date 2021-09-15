'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST serviceCategory  Middleware
// **********************************

const validatePostServiceCategory = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // title must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
    errorArray.push({
      field: 'title',
      error: 80500,
      message: 'Please provide only valid \'title\' as string, length must be between 2 and 50.'
    })
  }

  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.titleL1) || !_.isString(body.titleL1) || body.titleL1.length > 100) {
      errorArray.push({
        field: 'titleL1',
        error: 80510,
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
        error: 80520,
        message: '\'level\' is required as Number.'
      })
    }
    validatedConditions.level = body.level
  }

  // slug is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('slug')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.slug) || !_.isString(body.slug) || body.slug.length > 100) {
      errorArray.push({
        field: 'slug',
        error: 80530,
        message: '\'slug\' is required as string, length must be lessThen 100.'
      })
    }
    validatedConditions.slug = body.slug
  }

  // singularName is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('singularName')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.singularName) || !_.isString(body.singularName) || body.singularName.length > 50) {
      errorArray.push({
        field: 'singularName',
        error: 80540,
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
        error: 80550,
        message: '\'singularNameL1\' is required as string, length must be 50.'
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'serviceCategory.middleware.validatePostServiceCategory')
  }

  validatedConditions.title = body.title
  req.conditions = validatedConditions
  done()
}

// **********************************
// Get  ServiceCategory Middleware
// **********************************

const validateGetServiceCategory = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('id')) {
    // Must Be Required Validating as not empty, valid numeric value with range.
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 80560,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'serviceCategory.middleware.validateGetServiceCategory')
  }

  req.conditions = validatedConditions
  done()
}

// **********************************
// Update serviceCategory  Middleware
// **********************************

const validateUpdateServiceCategory = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // Must Be Required Validating as not empty, valid numeric value with range.
  if (!body.id || isNaN(body.id)) {
    errorArray.push({
      field: 'id',
      error: 80570,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  // title is Optional in Update
  if (body.hasOwnProperty('title')) {
    if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
      errorArray.push({
        field: 'title',
        error: 80580,
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
        error: 80590,
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
        error: 80600,
        message: '\'level\' is required as Number.'
      })
    }
    validatedConditions.level = body.level
  }

  // slug is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('slug')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.slug) || !_.isString(body.slug) || body.slug.length > 100) {
      errorArray.push({
        field: 'slug',
        error: 80610,
        message: '\'slug\' is required as string, length must be lessThen 100.'
      })
    }
    validatedConditions.slug = body.slug
  }

  // singularName is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('singularName')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.singularName) || !_.isString(body.singularName) || body.singularName.length > 50) {
      errorArray.push({
        field: 'singularName',
        error: 80620,
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
        error: 80630,
        message: '\'singularNameL1\' is required as string, length must be 50.'
      })
    }
    validatedConditions.singularNameL1 = body.singularNameL1
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'serviceCategory.middleware.validateUpdateServiceCategory')
  }

  req.body = validatedConditions
  req.categoryId = body.id
  done()
}

// ***********************************
// Validate Delete ServiceCategory
// ************************************

const validateDeleteServiceCategory = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80640,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'serviceCategory.middleware.validateDeleteServiceCategory')
  }
  done()
}

module.exports = {
  validatePostServiceCategory,
  validateGetServiceCategory,
  validateUpdateServiceCategory,
  validateDeleteServiceCategory
}
