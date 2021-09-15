'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ***********************
// validate Search Product
// ***********************

const validateSearchProducts = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (req.user.public) {
    validatedConditions.UserId = req.user.id
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
    validatedConditions.title = query.name
  }

  // minPrice is not required, validating it as not empty, valid String and length range.
  if (query.hasOwnProperty('minPrice') && query.minPrice) {
    if (isNaN(query.minPrice)) {
      errorArray.push({
        field: 'minPrice',
        error: 90230,
        message: '\'minPrice\' is required as string.'
      })
    }
    validatedConditions.minPrice = query.minPrice
  }

  // minPrice is not required, validating it as not empty, valid String and length range.
  if (query.hasOwnProperty('maxPrice') && query.maxPrice) {
    if (isNaN(query.maxPrice)) {
      errorArray.push({
        field: 'maxPrice',
        error: 90230,
        message: '\'maxPrice\' is required as string.'
      })
    }
    validatedConditions.maxPrice = query.maxPrice
  }

  // minPrice is not required, validating it as not empty, valid String and length range.
  if (query.hasOwnProperty('discountedPrice') && query.discountedPrice) {
    if (isNaN(query.discountedPrice)) {
      errorArray.push({
        field: 'discountedPrice',
        error: 90230,
        message: '\'discountedPrice\' is required as string.'
      })
    }
    validatedConditions.discountedPrice = query.discountedPrice
  }

  validatedConditions.isActive = query.hasOwnProperty('isActive') ? query.isActive : 'true'

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateSearchProducts')
  }

  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

// Update Product Validations
const validateUpdateProduct = (req, res, done) => {
  const errorArray = []
  const body = req.body
  let id = req.params.id
  const validatedData = {}
  // id is required, validating as not empty, valid numeric value with range.
  if (!id || isNaN(id)) {
    errorArray.push({
      field: 'id',
      error: 40040,
      message: '\'id\' is required as numeric in params.'
    })
  }

  body.AreaIds = body.AreaIds ? body.AreaIds.split(',') : []

  // AreaIds Are required As Array
  if (_.isEmpty(body.AreaIds) || !_.isArray(body.AreaIds) || body.AreaIds.length < 1) {
    errorArray.push({
      field: 'AreaIds',
      error: 90260,
      message: '\'AreaIds\' is required as Array Provide Valid Array of AreaIds.'
    })
  }

  const areaIds = body.AreaIds
  for (const id in areaIds) {
    if (!id || isNaN(id)) {
      errorArray.push({
        field: 'AreaIds',
        error: 90270,
        message: 'Please provide only valid numeric ids in Property  AreaIds only.'
      })
    }
  }

  validatedData.AreaIds = body.AreaIds

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
  // title is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('title') && !_.isEmpty(body.title)) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.title) || !_.isString(body.title) || body.title.length < 2 || body.title.length > 100) {
      errorArray.push({
        field: 'title',
        error: 40050,
        message: 'Please provide only valid \'title\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.title = body.title
  }

  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1') && body.titleL1 !== 'null') {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.titleL1) || body.titleL1.length > 100) {
      errorArray.push({
        field: 'titleL1',
        error: 40060,
        message: 'Please provide only valid \'titleL1\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.titleL1 = body.titleL1
  }

  // unit is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('UnitId')) {
    // UnitId Is Required As Numeric
    if (isNaN(body.UnitId)) {
      errorArray.push({
        field: 'UnitId',
        error: 90230,
        message: '\'UnitId\' is required as Numeric.'
      })
    }
    validatedData.UnitId = body.UnitId
  }

  // description is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('description') && !_.isEmpty(body.description)) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.description) || !_.isString(body.description) || body.description.length < 2 || body.description.length > 200) {
      errorArray.push({
        field: 'description',
        error: 40080,
        message: 'Please provide only valid \'description\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.description = body.description
  }

  // descriptionL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('descriptionL1') && body.descriptionL1 !== 'null') {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.descriptionL1) || body.descriptionL1.length > 100) {
      errorArray.push({
        field: 'descriptionL1',
        error: 40080,
        message: 'Please provide only valid \'descriptionL1\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.descriptionL1 = body.descriptionL1
  }

  // currency is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('currency')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.currency) || !_.isString(body.currency) || body.currency.length < 1 || body.currency.length > 10) {
      errorArray.push({
        field: 'currency',
        error: 40080,
        message: 'Please provide only valid \'currency\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.currency = body.currency
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

  // size is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('size')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.size) || !_.isString(body.size) || body.size.length < 2 || body.size.length > 100) {
      errorArray.push({
        field: 'size',
        error: 40080,
        message: 'Please provide only valid \'size\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.size = body.size
  }

  // quality is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('quality')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.quality) || !_.isString(body.quality) || body.quality.length < 2 || body.quality.length > 100) {
      errorArray.push({
        field: 'quality',
        error: 40080,
        message: 'Please provide only valid \'quality\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.quality = body.quality
  }

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

  // DiscountedPrice
  if (body.hasOwnProperty('discountedPrice') && body.discountedPrice !== 'null' && body.discountedPrice !== '') {
    // discountedPrice is required, validating as not empty, valid numeric value with range.
    if (isNaN(body.discountedPrice)) {
      errorArray.push({
        field: 'discountedPrice',
        error: 90171,
        message: '\'discountedPrice\' is required as numeric.'
      })
    }
    validatedData.discountedPrice = body.discountedPrice
  }
  validatedData.discountedPrice = (body.discountedPrice === 'null' || body.discountedPrice === '') ? 0 : body.discountedPrice
  console.log(validatedData.discountedPrice)
  // Price
  if (body.hasOwnProperty('price')) {
    // price is Optional, validating as not empty, valid numeric value with range.
    if (!body.price || isNaN(body.price)) {
      errorArray.push({
        field: 'price',
        error: 90171,
        message: '\'price\' is required as numeric.'
      })
    }
    validatedData.price = body.price
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (!body.isActive || (body.isActive !== 'true' && body.isActive !== 'false')) {
      errorArray.push({
        field: 'isActive ',
        error: 40090,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    try {
      validatedData.isActive = JSON.parse(body.isActive)
    } catch (error) {
      console.error(error)
    }
  }

  // Send error Array if error(s).
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateUpdateProduct')
  }

  if (_.isEmpty(validatedData)) {
    return generalMiddleware.standardErrorResponse(res, [{
      field: 'general',
      error: 40100,
      message: 'No data provided to update.'
    }], 'user.middleware.validateUpdateProduct')
  }

  req.body = {
    data: validatedData,
    id: id
  }
  return done()
}

const validateDeleteProduct = (req, res, done) => {
  const errorArray = []
  const params = req.params

  // if (req.user.role != 'Admin') {
  //   errorArray.push({
  //     field: 'id',
  //     error: 40110,
  //     message: 'You are not allowed to delete this record.'
  //   })
  // }

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 40120,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateDeleteProduct')
  }
  done()
}

// *********************
// To Add New Product
// *********************

const validateAddProducts = (req, res, done) => {
  const body = req.body
  const validatedBody = {}
  const validateContactInfo = {}
  // get all the errors in an array
  const errorArray = []

  // Title is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 100) {
    errorArray.push({
      field: 'title',
      error: 90070,
      message: 'Please provide only valid \'title\' as string, length must be between 2 and 100.'
    })
  }

  // titleL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('titleL1') && body.titleL1) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.titleL1) || body.titleL1.length < 2 || body.titleL1.length > 100) {
      errorArray.push({
        field: 'titleL1',
        error: 90075,
        message: 'Please provide only valid \'titleL1\' as string, length must be between 2 and 100.'
      })
    }
  }

  // price is required, validating as not empty, valid numeric value with range.
  if (!body.price || isNaN(body.price)) {
    errorArray.push({
      field: 'price',
      error: 90170,
      message: '\'price\' is required as numeric.'
    })
  }

  if (body.hasOwnProperty('discountedPrice') && body.discountedPrice !== 'null') {
    console.log(body.discountedPrice)
    // discountedPrice is required, validating as not empty, valid numeric value with range.
    if (!body.discountedPrice || isNaN(body.discountedPrice)) {
      errorArray.push({
        field: 'discountedPrice',
        error: 90171,
        message: '\'discountedPrice\' is required as numeric.'
      })
    }
    validatedBody.discountedPrice = body.discountedPrice
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
    validatedBody.descriptionL1 = body.descriptionL1
  }

  // UnitId Is Required As Numeric
  if (isNaN(body.UnitId)) {
    errorArray.push({
      field: 'UnitId',
      error: 90230,
      message: '\'UnitId\' is required as Numeric.'
    })
  }

  if (body.hasOwnProperty('size')) {
    // size is Optional, validating it as not empty.
    if (_.isEmpty(body.size) || !_.isString(body.size) || body.size.length > 50) {
      errorArray.push({
        field: 'size',
        error: 90180,
        message: '\'size\' is required '
      })
    }
    validatedBody.size = body.size
  }

  if (body.hasOwnProperty('quality')) {
    // quality is required, validating it as not empty.
    if (_.isEmpty(body.quality) || !_.isString(body.quality) || body.quality.length > 100) {
      errorArray.push({
        field: 'quality',
        error: 90180,
        message: '\'quality\' is required '
      })
    }
    validatedBody.quality = body.quality
  }
  // Title is Not required,if given then validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('titleL1') && !_.isEmpty(body.titleL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.titleL1) || body.titleL1.length < 3 || body.titleL1.length > 100) {
      errorArray.push({
        field: 'titleL1',
        error: 90075,
        message: '\'titleL1\' is required as string, length must be between 3 and 150.'
      })
    }
    validatedBody.titleL1 = body.titleL1
  }

  // description is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.description) || !_.isString(body.description) || body.description.length < 3 || body.description.length > 10000) {
    errorArray.push({
      field: 'description',
      error: 90100,
      message: '\'description\' is required as string, length must be between 3 and 4000.'
    })
  }

  // descriptionL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('descriptionL1') && !_.isEmpty(body.descriptionL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.descriptionL1) || body.descriptionL1.length < 3 || body.descriptionL1.length > 10000) {
      errorArray.push({
        field: 'descriptionL1',
        error: 90101,
        message: 'Please provide only valid \'descriptionL1\' as string, length must be between 3 and 4000.'
      })
    }
    validatedBody.descriptionL1 = body.descriptionL1
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== true && body.isActive !== false && body.isActive !== 'true' && body.isActive !== 'false') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedBody.isActive = body.isActive
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
    validatedBody.thumbnailIndex = body.thumbnailIndex
  }

  if (body.hasOwnProperty('currency')) {
    // currency is required, validating it as not empty.
    if (_.isEmpty(body.currency) || !_.isString(body.currency) || body.currency.length > 10) {
      errorArray.push({
        field: 'currency',
        error: 90180,
        message: '\'currency\' is required '
      })
    }
    validatedBody.currency = body.currency
  }

  // UserId Is Required As Numeric
  if (isNaN(body.UserId)) {
    errorArray.push({
      field: 'UserId',
      error: 90230,
      message: '\'UserId\' is required as Numeric.'
    })
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

  body.AreaIds = body.AreaIds ? body.AreaIds.split(',') : []

  // AreaIds Are required As Array
  if (_.isEmpty(body.AreaIds) || !_.isArray(body.AreaIds) || body.AreaIds.length < 1) {
    errorArray.push({
      field: 'AreaIds',
      error: 90260,
      message: '\'AreaIds\' is required as Array Provide Valid Array of AreaIds.'
    })
  }

  const areaIds = body.AreaIds
  for (const id in areaIds) {
    if (!id || isNaN(id)) {
      errorArray.push({
        field: 'AreaIds',
        error: 90270,
        message: 'Please provide only valid numeric ids in Property  AreaIds only.'
      })
    }
  }

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'products.middleware.validateAddProducts')
  }

  let slug = body.title.replace(/ /g, '-')
  validatedBody.UserId = body.UserId
  validatedBody.title = body.title
  validatedBody.slug = slug
  validatedBody.UnitId = body.UnitId
  validatedBody.price = body.price
  validatedBody.description = body.description
  validatedBody.AreaId = body.AreaId
  validatedBody.CategoryIds = body.CategoryIds
  validatedBody.AreaIds = body.AreaIds
  validatedBody.isActive = body.hasOwnProperty('isActive') ? body.isActive : false
  validatedBody.contactInformation = validateContactInfo

  req.body = validatedBody

  done()
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const validateGetProduct = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'product.middleware.validateGetProduct')
  }
  validatedConditions.id = params.id
  req.conditions = validatedConditions
  done()
}

module.exports = {
  validateSearchProducts,
  validateUpdateProduct,
  validateDeleteProduct,
  validateAddProducts,
  validateGetProduct
}
