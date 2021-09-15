'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// *******************************
// Get Amenity Category Middleware
// *******************************

const validateGetCategoryAmenities = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedIds = []

  if (!query.category) {
    return generalMiddleware.standardErrorResponse(res, [{
      field: 'category',
      error: 50000,
      message: 'Please provide only valid \'category\' as string in property category, for multiple id\'s concatenate them with - like 1-3-32.'
    }], 'amenities.middleware.validateGetCategoryAmenities')
  }

  const categoryIds = query.category.split('-')
  for (let i = 0; i < categoryIds.length; i++) {
    const id = categoryIds[i]
    if (!id || isNaN(id)) {
      errorArray.push({
        field: 'categoryIds',
        error: 50010,
        message: 'Please provide only valid numeric ids only.'
      })
    }
    validatedIds.push(parseInt(id))
  }

  if (validatedIds.length === 0) {
    errorArray.push({
      field: 'categoryIds',
      error: 50020,
      message: 'Ids length is zero Please provide only valid \'categoryIds\' as in property category .'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'amenities.middleware.validateGetCategoryAmenities')
  }
  req.query = validatedIds
  done()
}

// *******************************
// Get Amenity Category Middleware
// *******************************

const validateGetLaunchingCategoryAmenities = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedIds = []

  if (!query.category) {
    return generalMiddleware.standardErrorResponse(res, [{
      field: 'category',
      error: 50000,
      message: 'Please provide only valid \'category\' as string in property category, for multiple id\'s concatenate them with - like 1-3-32.'
    }], 'amenities.middleware.validateGetLaunchingCategoryAmenities')
  }

  const categoryIds = query.category.split('-')
  for (let i = 0; i < categoryIds.length; i++) {
    const id = categoryIds[i]
    if (!id || isNaN(id)) {
      errorArray.push({
        field: 'categoryIds',
        error: 50010,
        message: 'Please provide only valid numeric ids only.'
      })
    }
    validatedIds.push(parseInt(id))
  }

  if (validatedIds.length === 0) {
    errorArray.push({
      field: 'categoryIds',
      error: 50020,
      message: 'Ids length is zero Please provide only valid \'categoryIds\' as in property category .'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'amenities.middleware.validateGetLaunchingCategoryAmenities')
  }
  req.query = validatedIds
  done()
}

// *******************************
// Get Amenities Middleware
// *******************************

const validateGetAmenities = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('id') && !_.isEmpty(query.id)) {
    // Validating as not empty, valid numeric value with range.
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 60020,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'amenities.middleware.validateGetAmenities')
  }
  req.query = validatedConditions
  done()
}

// *******************************
// Get Amenities Middleware
// *******************************

const deleteAmenities = (req, res, done) => {
  const errorArray = []
  const param = req.params
  const validatedConditions = {}

  // Validating as not empty, valid numeric value with range.
  if (!param.id || isNaN(param.id)) {
    errorArray.push({
      field: 'id',
      error: 60020,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }
  validatedConditions.id = param.id

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'amenities.middleware.validateGetAmenities')
  }
  req.param = validatedConditions
  done()
}

// **********************************
// POST Middleware
// **********************************

const addAmenity = (req, res, done) => {
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

  if (!(body.orderSequence) || isNaN(body.orderSequence)) {
    errorArray.push({
      field: 'orderSequence',
      error: 30020,
      message: '\'orderSequence\' is required as Number.'
    })
  }

  // Validating as not empty, valid String and length range.
  if (body.isActive !== 'true' && body.isActive !== 'false') {
    errorArray.push({
      field: 'isActive ',
      error: 90130,
      message: 'Please provide only valid \'isActive \' as boolean.'
    })
  }

  // PropertyCategoryId is Optional, if given then validating it as not empty, valid Array and length range.
  if (!_.isArray(body.PropertyCategoryId) || body.PropertyCategoryId.length < 0) {
    errorArray.push({
      field: 'PropertyCategoryId ',
      error: 90130,
      message: 'Please provide only valid \'PropertyCategoryId \' as Array.'
    })
  }

  // PropertyCategoryId is Optional, if given then validating it as not empty, valid Array and length range.
  if (!_.isArray(body.amenities) || body.amenities.length < 1) {
    errorArray.push({
      field: 'amenities ',
      error: 90131,
      message: 'Please provide only valid \'amenities \' as Array.'
    })
  }
  for (let i = 0; i < body.amenities.length; i++) {
    let data = body.amenities[i]
    console.log(data)
    // Validating as not empty, valid String and length range.
    if (!_.isString(data.title) || data.title === '') {
      errorArray.push({
        field: 'title',
        error: 90075,
        message: '\'title\' is required as string, length must be between 3 and 100.'
      })
    }
    if (data.hasOwnProperty('titleL1') && data.titleL1) {
      // Validating as not empty, valid String and length range.
      if (!_.isString(data.titleL1) || data.titleL1.length < 3 || data.titleL1 === '') {
        errorArray.push({
          field: 'titleL1',
          error: 90075,
          message: '\'titleL1\' is required as string, length must be greater then 3.'
        })
      }
    }
    // Validating as not empty, valid String and length range.
    if (isNaN(data.orderSequence) || data.orderSequence === '') {
      errorArray.push({
        field: 'orderSequence',
        error: 90075,
        message: '\'orderSequence\' is required as Number, length must be greater then 3.'
      })
    }

    // Validating as not empty, valid String and length range.
    if (data.isInFilters === '') {
      errorArray.push({
        field: 'isInFilters',
        error: 90075,
        message: '\'isInFilters\' is required, length must be greater then 3.'
      })
    }

    // Validating as not empty, valid String and length range.
    if (!_.isString(data.format) || data.format === '') {
      errorArray.push({
        field: 'format',
        error: 90075,
        message: '\'format\' is required as string.'
      })
    }

    // Validating as not empty, valid String and length range.
    if (data.isRequired === '') {
      errorArray.push({
        field: 'isRequired',
        error: 90075,
        message: '\'isRequired\' is required, length must be greater then 3.'
      })
    }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'listingType.middleware.addAmenity')
  }

  validatedConditions.orderSequence = body.orderSequence
  validatedConditions.isActive = body.isActive
  validatedConditions.categoryIds = body.PropertyCategoryId
  validatedConditions.title = body.title
  validatedConditions.amenityProperties = body.amenities
  req.conditions = validatedConditions

  done()
}

// *******************************
// validateGetCategoryAmenities
// *******************************

const validateGetCategoryAmenity = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // AmenityId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('AmenityId') && !_.isEmpty(query.AmenityId)) {
    // Validating as not empty, valid numeric value with range.
    if (!query.AmenityId || isNaN(query.AmenityId)) {
      errorArray.push({
        field: 'AmenityId',
        error: 60020,
        message: 'Please provide only valid \'AmenityId\' as numeric.'
      })
    }
    validatedConditions.AmenityId = query.AmenityId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'amenities.middleware.validateGetCategoryAmenity')
  }
  req.query = validatedConditions
  done()
}

// *******************************
// validateGetCategoryAmenities
// *******************************

const validateGetAmenityProperty = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // AmenityId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('AmenityId') && !_.isEmpty(query.AmenityId)) {
    // Validating as not empty, valid numeric value with range.
    if (!query.AmenityId || isNaN(query.AmenityId)) {
      errorArray.push({
        field: 'AmenityId',
        error: 60020,
        message: 'Please provide only valid \'AmenityId\' as numeric.'
      })
    }
    validatedConditions.AmenityId = query.AmenityId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'amenities.middleware.validateGetAmenityProperty')
  }
  req.query = validatedConditions
  done()
}

// **********************************
// PUT  Middleware
// **********************************

const updateAmenity = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const param = req.params
  const validatedConditions = {}
  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('title')) {
    // title must be required required  Validating as not empty, valid String and length range.
    if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 50) {
      errorArray.push({
        field: 'title',
        error: 30000,
        message: 'Please provide only valid \'title\' as string, length must be between 2 and 50.'
      })
    }
    validatedConditions.title = body.title
  }
  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1') && body.titleL1 !== '') {
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
  // orderSequence is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('orderSequence')) {
    if (!(body.orderSequence) || isNaN(body.orderSequence)) {
      errorArray.push({
        field: 'orderSequence',
        error: 30020,
        message: '\'orderSequence\' is required as Number.'
      })
    }
    validatedConditions.orderSequence = body.orderSequence
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
  // Validating as not empty, valid String and length range.
    if (body.isActive !== 'true' && body.isActive !== 'false') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as STRING.'
      })
    }
    validatedConditions.isActive = body.isActive
  }

  // PropertyCategoryId is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('PropertyCategoryId')) {
    // PropertyCategoryId is Optional, if given then validating it as not empty, valid Array and length range.
    if (!_.isArray(body.PropertyCategoryId) && body.PropertyCategoryId !== '') {
      errorArray.push({
        field: 'PropertyCategoryId ',
        error: 90130,
        message: 'Please provide only valid \'PropertyCategoryId \' as Array.'
      })
    }
    validatedConditions.categoryIds = body.PropertyCategoryId
  }

  // deletedAmenityProperties is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('deletedAmenityProperties')) {
    // deletedAmenityProperties is Optional, if given then validating it as not empty, valid Array and length range.
    if (!_.isArray(body.deletedAmenityProperties) && body.deletedAmenityProperties !== '') {
      errorArray.push({
        field: 'deletedAmenityProperties ',
        error: 90130,
        message: 'Please provide only valid \'deletedAmenityProperties \' as Array.'
      })
    }
    validatedConditions.deletedAmenityProperties = body.deletedAmenityProperties
  }

  // amenities is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('amenities')) {
    // amenities is Optional, if given then validating it as not empty, valid Array and length range.
    if (!_.isArray(body.amenities) && body.amenities !== '') {
      errorArray.push({
        field: 'amenities ',
        error: 90131,
        message: 'Please provide only valid \'amenities \' as Array.'
      })
    }

    for (let i = 0; i < body.amenities.length; i++) {
      let data = body.amenities[i]
      // Validating as not empty, valid String and length range.
      if (!_.isString(data.title) || data.title === '') {
        errorArray.push({
          field: 'title',
          error: 90075,
          message: '\'title\' is required as string, length must be between 3 and 100.'
        })
      }
      if (data.hasOwnProperty('titleL1') && data.titleL1) {
        // Validating as not empty, valid String and length range.
        if (!_.isString(data.titleL1) || data.titleL1.length < 3) {
          errorArray.push({
            field: 'titleL1',
            error: 90075,
            message: '\'titleL1\' is required as string, length must be greater then 3.'
          })
        }
      }
      // Validating as not empty, valid String and length range.
      if (isNaN(data.orderSequence) || data.orderSequence === '') {
        errorArray.push({
          field: 'orderSequence',
          error: 90075,
          message: '\'orderSequence\' is required as Number, length must be greater then 3.'
        })
      }

      // Validating as not empty, valid String and length range.
      if (data.isInFilters === '') {
        errorArray.push({
          field: 'isInFilters',
          error: 90075,
          message: '\'isInFilters\' is required, length must be greater then 3.'
        })
      }

      // Validating as not empty, valid String and length range.
      if (!_.isString(data.format) || data.format === '') {
        errorArray.push({
          field: 'format',
          error: 90075,
          message: '\'format\' is required as string.'
        })
      }

      // Validating as not empty, valid String and length range.
      if (data.isRequired === '') {
        errorArray.push({
          field: 'isRequired',
          error: 90075,
          message: '\'isRequired\' is required, length must be greater then 3.'
        })
      }
    }
    validatedConditions.amenityProperties = body.amenities
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'amenity.middleware.updateAmenity')
  }

  req.conditions = validatedConditions
  req.param = param

  done()
}

module.exports = {
  updateAmenity,
  addAmenity,
  deleteAmenities,
  validateGetAmenities,
  validateGetAmenityProperty,
  validateGetCategoryAmenities,
  validateGetCategoryAmenity,
  validateGetLaunchingCategoryAmenities
}
