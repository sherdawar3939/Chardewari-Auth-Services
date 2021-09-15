'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ***************************
// Post Top Property
// ***************************

const validateAddTopProperty = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // PropertyId Is required as Date
  if (!(body.PropertyId) || isNaN(body.PropertyId)) {
    errorArray.push({
      field: 'PropertyId',
      error: 90220,
      message: '\'PropertyId\' is required as Numeric .'
    })
  }
  validatedConditions.PropertyId = body.PropertyId

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
  validatedConditions.AreaIds = body.AreaIds

  // startDate is an optional string property, if it is given than validate it.
  if (_.isEmpty(body.startDate) || !(body.startDate)) {
    errorArray.push({
      field: 'startDate',
      error: 90220,
      message: 'At least One \'startDate\' is required.'
    })
  }
  validatedConditions.startDate = body.startDate

  if (body.hasOwnProperty('CompanyId') && !_.isEmpty(body.CompanyId)) {
    // CompanyId Is required as Numeric
    if (!(body.CompanyId) || isNaN(body.CompanyId)) {
      errorArray.push({
        field: 'CompanyId',
        error: 90220,
        message: '\'CompanyId\' is required as Numeric .'
      })
    }
    validatedConditions.CompanyId = body.CompanyId
  }

  // endDate is an optional string property, if it is given than validate it.
  if (_.isEmpty(body.endDate) || !(body.endDate)) {
    errorArray.push({
      field: 'endDate',
      error: 90220,
      message: 'At least One \'endDate\' is required.'
    })
  }
  validatedConditions.endDate = body.endDate

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== 'Yes' && body.isActive !== 'No') {
      errorArray.push({
        field: 'isActive ',
        error: 90190,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedConditions.status = body.isActive
  }

  // approvedByName is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('approvedByName')) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.approvedByName) || body.approvedByName.length < 2 || body.approvedByName.length > 10) {
      errorArray.push({
        field: 'approvedByName',
        error: 90331,
        message: 'Please provide only valid \'approvedByName\' as string, length must be between 2 and 10.'
      })
    }
    validatedConditions.approvedByName = body.approvedByName
  }

  // order is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('order')) {
    // order Is required as Numeric
    if (!(body.order) || isNaN(body.order)) {
      errorArray.push({
        field: 'order',
        error: 90220,
        message: '\'order\' is required as Numeric .'
      })
    }
    validatedConditions.order = body.order
  }

  // CreatedById Is required as Numeric
  if (!(body.CreatedById) || isNaN(body.CreatedById)) {
    errorArray.push({
      field: 'CreatedById',
      error: 90220,
      message: '\'CreatedById\' is required as Numeric .'
    })
  }
  validatedConditions.CreatedById = body.CreatedById

  // home is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('home')) {
    // Validating as not empty, valid String and length range.
    if (body.home !== true && body.home !== false && body.home !== 'true' && body.home !== 'false') {
      errorArray.push({
        field: 'home ',
        error: 90190,
        message: 'Please provide only valid \'home \' as boolean.'
      })
    }
    validatedConditions.showOnHome = body.home
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== 'Yes' && body.isActive !== 'No') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedConditions.isApproved = body.isActive
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topProperty.middleware.validateAddTopProperty')
  }

  req.conditions = validatedConditions

  done()
}

// ***********************************
// To Get All Details
// ***********************************

const validateGetTopProperty = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  const validatedProperty = {}
  let limit = 50
  let offset = 0

  if (req.user.public) {
    validatedConditions.CreatedById = req.user.id
  }
  // Validating id as Required, not empty, valid numeric value with range.
  if (query.hasOwnProperty('id')) {
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 20080,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  // home is optional
  if (query.hasOwnProperty('home')) {
    if (query.home !== true && query.home !== false && query.home !== 'true' && query.home !== 'false') {
      errorArray.push({
        field: 'home',
        error: 80710,
        message: 'Please provide only valid \'home\' as Boolean.'
      })
    }
    validatedConditions.showOnHome = query.home
  }

  // Validating UserId as Required, not empty, valid numeric value with range.
  if (query.hasOwnProperty('UserId')) {
    if (!query.UserId || isNaN(query.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 20080,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.UserId = query.UserId
  }

  // title is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('title')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.title) || !_.isString(query.title)) {
      errorArray.push({
        field: 'title ',
        error: 90130,
        message: 'Please provide only valid \'title \' as string.'
      })
    }
    validatedProperty.title = query.title
  }

  // status is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('status')) {
    // Validating as not empty, valid String and length range.
    if (query.status !== true && query.status !== false && query.status !== 'true' && query.status !== 'false') {
      errorArray.push({
        field: 'status ',
        error: 90190,
        message: 'Please provide only valid \'status \' as boolean.'
      })
    }
    validatedConditions.status = query.status
  }

  // isApproved is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('isApproved')) {
    // Validating as not empty, valid String and length range.
    if (query.isApproved !== true && query.isApproved !== false && query.isApproved !== 'true' && query.isApproved !== 'false') {
      errorArray.push({
        field: 'isApproved ',
        error: 90130,
        message: 'Please provide only valid \'isApproved \' as boolean.'
      })
    }
    validatedConditions.isApproved = query.isApproved
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topProperty.middleware.validateGetTopProperty')
  }

  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }

  req.conditions = validatedConditions
  req.property = validatedProperty

  req.limit = limit
  req.offset = offset

  done()
}

// ***********************************
// To Get History
// ***********************************

const validateGetTopPropertyHistory = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const validatedConditions = {}

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 10380,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }
  validatedConditions.TopPropertyId = params.id

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topProperty.middleware.validateGetTopPropertyHistory')
  }

  req.conditions = validatedConditions
  done()
}

// ************************************
// Validate Delete Top Projects
// ************************************

const validateDeleteTopProperty = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 20090,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topProperty.middleware.validateDeleteTopProperty')
  }
  done()
}

// ******************************
// Update top Property
// ******************************

const validateUpdateTopProperty = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const params = req.params
  const validatedConditions = {}
  const userInfo = req.user

  if (body.hasOwnProperty('PropertyId')) {
    // PropertyId Is required as Date
    if (!(body.PropertyId) || isNaN(body.PropertyId)) {
      errorArray.push({
        field: 'PropertyId',
        error: 90220,
        message: '\'PropertyId\' is required as Numeric .'
      })
    }
    validatedConditions.PropertyId = body.PropertyId
  }

  if (body.hasOwnProperty('startDate')) {
    // startDate is an optional string property, if it is given than validate it.
    if (_.isEmpty(body.startDate) || !(body.startDate)) {
      errorArray.push({
        field: 'startDate',
        error: 90220,
        message: 'At least One \'startDate\' is required.'
      })
    }
    validatedConditions.startDate = body.startDate
  }

  // endDate is  required as Optional,if given then validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('endDate') && body.endDate !== '') {
    // endDate is an optional string property, if it is given than validate it.
    if (_.isEmpty(body.endDate) || !(body.endDate)) {
      errorArray.push({
        field: 'endDate',
        error: 90220,
        message: 'At least One \'endDate\' is required.'
      })
    }
    validatedConditions.endDate = body.endDate
  }

  // status is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('status')) {
    // Validating as not empty, valid String and length range.
    if (body.status !== true && body.status !== false && body.status !== 'true' && body.status !== 'false') {
      errorArray.push({
        field: 'status',
        error: 90331,
        message: 'Please provide only valid \'status\' as string, length must be between 2 and 10.'
      })
    }
    validatedConditions.status = body.status
  }

  // isApproved is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isApproved')) {
    // Validating as not empty, valid String and length range.
    if (body.isApproved !== true && body.isApproved !== false && body.isApproved !== 'true' && body.isApproved !== 'false') {
      errorArray.push({
        field: 'isApproved',
        error: 90331,
        message: 'Please provide only valid \'isApproved\' as Boolean.'
      })
    }
    validatedConditions.isApproved = body.isApproved
  }

  // approve is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('approve')) {
    // Validating as not empty, valid String and length range.
    if (body.approve !== true && body.approve !== false && body.approve !== 'true' && body.approve !== 'false') {
      errorArray.push({
        field: 'approve',
        error: 90331,
        message: 'Please provide only valid \'approve\' as Boolean.'
      })
    }
    validatedConditions.approve = body.approve
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topProperty.middleware.validateAddTopProperty')
  }

  validatedConditions.id = params.id
  req.conditions = validatedConditions
  req.userInfo = userInfo

  done()
}

module.exports = {
  validateAddTopProperty,
  validateGetTopProperty,
  validateDeleteTopProperty,
  validateUpdateTopProperty,
  validateGetTopPropertyHistory
}
