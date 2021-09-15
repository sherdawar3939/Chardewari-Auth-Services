'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST services Middleware
// **********************************

const validatePostServices = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedData = {}

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
    validatedData.titleL1 = body.titleL1
  }

  // description is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.description) || !_.isString(body.description) || body.description.length < 3 || body.description.length > 4000) {
    errorArray.push({
      field: 'description',
      error: 90100,
      message: '\'description\' is required as string, length must be between 3 and 4000.'
    })
  }

  // descriptionL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('descriptionL1') && !_.isEmpty(body.descriptionL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.descriptionL1) || body.descriptionL1.length < 3 || body.descriptionL1.length > 4000) {
      errorArray.push({
        field: 'descriptionL1',
        error: 90101,
        message: 'Please provide only valid \'descriptionL1\' as string, length must be between 3 and 4000.'
      })
    }
    validatedData.descriptionL1 = body.descriptionL1
  }

  if (body.hasOwnProperty('thumbnailIndex') && body.thumbnailIndex && body.thumbnailIndex !== `undefined`) {
    // thumbnailIndex is  required, validating as not empty, valid numeric value.
    if (!body.thumbnailIndex || isNaN(body.thumbnailIndex)) {
      errorArray.push({
        field: 'thumbnailIndex',
        error: 90171,
        message: '\'thumbnailIndex\' is required as numeric.'
      })
    }
    validatedData.thumbnailIndex = body.thumbnailIndex
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
    validatedData.slug = body.slug
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== 'true' && body.isActive !== 'false' && body.isActive !== true && body.isActive !== false) {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedData.isActive = body.isActive
  }

  if (body.hasOwnProperty('thumbnail') && body.thumbnail && body.thumbnail !== `undefined`) {
    // thumbnailIndex is  required, validating as not empty, valid numeric value.
    if (!body.thumbnail) {
      errorArray.push({
        field: 'thumbnail',
        error: 90171,
        message: '\'thumbnail\' is required as valid Object.'
      })
    }
    validatedData.thumbnailObj = body.thumbnail
  }

  // body.CategoryIds = body.CategoryIds ? body.CategoryIds.split(',') : []

  body.CategoryIds = JSON.parse(body.CategoryIds)
  // CategoryIds are required As Array
  if (_.isEmpty(body.CategoryIds) || !_.isArray(body.CategoryIds) || body.CategoryIds.length < 1) {
    errorArray.push({
      field: 'CategoryIds',
      error: 90240,
      message: '\'CategoryIds\' is required as Array Provide Valid Array of CategoryIds.'
    })
  }
  const categoriesIds = body.CategoryIds

  for (const id in categoriesIds) {
    if (!id || isNaN(id)) {
      errorArray.push({
        field: 'categoryIds',
        error: 90250,
        message: 'Please provide only valid numeric ids in Property CategoryIds only.'
      })
    }
  }
  validatedData.CategoryIds = body.CategoryIds

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'services.middleware.validatePostServices')
  }

  validatedData.title = body.title
  validatedData.description = body.description
  req.conditions = validatedData
  done()
}

// **********************************
// Get  Services Middleware
// **********************************

const validateGetServices = (req, res, done) => {
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

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'services.middleware.validateGetServices')
  }

  req.conditions = validatedConditions
  done()
}

// **********************************
// Update services  Middleware
// **********************************

const validateUpdateServices = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedData = {}
  const param = req.params
  // Must Be Required Validating as not empty, valid numeric value with range.
  if (!param.id || isNaN(param.id)) {
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
    validatedData.title = body.title
  }

  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1')) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.titleL1)) {
      errorArray.push({
        field: 'titleL1',
        error: 80590,
        message: '\'titleL1\' is required as string, length must be 100.'
      })
    }
    const value1 = body.titleL1 ? body.titleL1 : ''
    validatedData.titleL1 = value1
  }

  // description is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('description')) {
    // description is required, validating it as not empty, valid String and length range.
    if (_.isEmpty(body.description) || !_.isString(body.description) || body.description.length < 3 || body.description.length > 4000) {
      errorArray.push({
        field: 'description',
        error: 90100,
        message: '\'description\' is required as string, length must be between 3 and 4000.'
      })
    }
    validatedData.description = body.description
  }

  // descriptionL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('descriptionL1')) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.descriptionL1)) {
      errorArray.push({
        field: 'descriptionL1',
        error: 90101,
        message: 'Please provide only valid \'descriptionL1\' as string, length must be between 3 and 4000.'
      })
    }
    const value = body.descriptionL1 ? body.descriptionL1 : ''
    validatedData.descriptionL1 = value
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
    validatedData.slug = body.slug
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== 'true' && body.isActive !== 'false' && body.isActive !== true && body.isActive !== false) {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    const value = body.isActive === 'true' ? 1 : 0
    validatedData.isActive = value
  }

  if (body.hasOwnProperty('thumbnail') && body.thumbnail && body.thumbnail !== `undefined`) {
    // thumbnailIndex is  required, validating as not empty, valid numeric value.
    if (!body.thumbnail) {
      errorArray.push({
        field: 'thumbnailIndex',
        error: 90171,
        message: '\'thumbnailIndex\' is required as valid Object.'
      })
    }
    validatedData.thumbnailObject = body.thumbnail
  }

  body.CategoryIds = body.CategoryIds ? body.CategoryIds.split(',') : []

  // CategoryIds are required As Array
  if (_.isEmpty(body.CategoryIds) || !_.isArray(body.CategoryIds) || body.CategoryIds.length < 1) {
    errorArray.push({
      field: 'CategoryIds',
      error: 90240,
      message: '\'CategoryIds\' is required as Array Provide Valid Array of CategoryIds.'
    })
  }
  const categoriesIds = body.CategoryIds

  for (const id in categoriesIds) {
    if (!id || isNaN(id)) {
      errorArray.push({
        field: 'categoryIds',
        error: 90250,
        message: 'Please provide only valid numeric ids in Property CategoryIds only.'
      })
    }
  }
  validatedData.CategoryIds = body.CategoryIds

  // deletedImage is an optional numeric property, if it is given than validate it.
  if (body.hasOwnProperty('deletedImage') && body.deletedImage && body.deletedImage !== `undefined`) {
    body.deletedImage = JSON.parse(body.deletedImage)
    // Validating as not empty, valid numeric value with range.
    if (!_.isArray(body.deletedImage)) {
      errorArray.push({
        field: 'deletedImage',
        error: 90000,
        message: 'Please provide only valid \'deletedImage\' as numeric.'
      })
    }
    validatedData.deleteImage = body.deletedImage
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'services.middleware.validateUpdateServices')
  }

  req.data = validatedData
  done()
}

// ***********************************
// Validate Delete Services
// ************************************

const validateDeleteServices = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'services.middleware.validateDeleteServices')
  }
  done()
}

module.exports = {
  validatePostServices,
  validateGetServices,
  validateUpdateServices,
  validateDeleteServices
}
