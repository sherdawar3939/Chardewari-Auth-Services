'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ***************************
// Post Top Project
// ***************************

const validateAddTopProjects = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // startDate is an optional string property, if it is given than validate it.
  if (_.isEmpty(body.startDate) || !(body.startDate)) {
    errorArray.push({
      field: 'startDate',
      error: 90220,
      message: 'At least One \'startDate\' is required.'
    })
  }
  validatedConditions.startDate = body.startDate

  // endDate is an optional string property, if it is given than validate it.
  if (_.isEmpty(body.endDate) || !(body.endDate)) {
    errorArray.push({
      field: 'endDate',
      error: 90220,
      message: ' \'endDate\' is required.'
    })
  }
  validatedConditions.endDate = body.endDate

  // CompanyId Is required as Numeric
  if (!(body.CompanyId) || isNaN(body.CompanyId)) {
    errorArray.push({
      field: 'CompanyId',
      error: 90220,
      message: '\'CompanyId\' is required as Numeric .'
    })
  }
  validatedConditions.CompanyProfileId = body.CompanyId

  // Validating as not empty, valid Boolean.
  if (body.isProject !== true && body.isProject !== false && body.isProject !== 'true' && body.isProject !== 'false') {
    errorArray.push({
      field: 'isProject ',
      error: 90190,
      message: 'Please provide only valid \'isProject \' as boolean.'
    })
  }
  validatedConditions.isProject = body.isProject

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== true && body.isActive !== false && body.isActive !== 'true' && body.isActive !== 'false') {
      errorArray.push({
        field: 'isActive',
        error: 90331,
        message: 'Please provide only valid \'isActive\' as string, length must be between 2 and 10.'
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

  // approvedById is an optional Number, if it is given than validate it.
  if (body.hasOwnProperty('approvedById')) {
    // approvedById Is required as Numeric
    if (!(body.approvedById) || isNaN(body.approvedById)) {
      errorArray.push({
        field: 'approvedById',
        error: 90220,
        message: '\'approvedById\' is required as Numeric .'
      })
    }
    validatedConditions.approvedById = body.approvedById
  }

  // LaunchingId Is required as Numeric
  if (!(body.LaunchingId) || isNaN(body.LaunchingId)) {
    errorArray.push({
      field: 'LaunchingId',
      error: 90220,
      message: '\'LaunchingId\' is required as Numeric .'
    })
  }
  validatedConditions.LaunchingId = body.LaunchingId

  // CreatedById Is required as Numeric
  if (!(body.CreatedById) || isNaN(body.CreatedById)) {
    errorArray.push({
      field: 'CreatedById',
      error: 90220,
      message: '\'CreatedById\' is required as Numeric .'
    })
  }
  validatedConditions.CreatedById = body.CreatedById

  // Validating as not empty, valid boolean.
  if (body.home !== true && body.home !== false && body.home !== 'true' && body.home !== 'false') {
    errorArray.push({
      field: 'home ',
      error: 90190,
      message: 'Please provide only valid \'home \' as boolean.'
    })
  }
  validatedConditions.showOnHome = body.home

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'TopProjects.middleware.validateAddTopProjects')
  }

  req.conditions = validatedConditions
  done()
}

// ***********************************
// To Get All Top Projects
// ***********************************

const validateGetTopProjects = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  const validateProject = {}
  let limit = 50
  let offset = 0

  if (req.user.public) {
    validatedConditions.CreatedById = req.user.id
  }

  // Validating isProject as Optional, not empty, valid BOOLEAN value with range.
  if (query.hasOwnProperty('isProject')) {
    if (query.isProject !== true && query.isProject !== false && query.isProject !== 'true' && query.isProject !== 'false') {
      errorArray.push({
        field: 'isProject',
        error: 20080,
        message: 'Please provide only valid \'isProject\' as Boolean.'
      })
    }
    validateProject.isProject = query.isProject
  }

  // Validating home as Optional, not empty, valid BOOLEAN value with range.
  if (query.hasOwnProperty('home')) {
    if (query.home !== true && query.home !== false && query.home !== 'true' && query.home !== 'false') {
      errorArray.push({
        field: 'home',
        error: 20080,
        message: 'Please provide only valid \'home\' as Boolean.'
      })
    }
    validatedConditions.showOnHome = query.home
  }

  // Validating CompanyId as Required, not empty, valid numeric value with range.
  if (query.hasOwnProperty('CompanyId')) {
    if (!query.CompanyId || isNaN(query.CompanyId)) {
      errorArray.push({
        field: 'CompanyId',
        error: 20080,
        message: 'Please provide only valid \'CompanyId\' as numeric.'
      })
    }
    validatedConditions.CompanyProfileId = query.CompanyId
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
    validateProject.title = query.title
  }

  // status is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('status')) {
    // Validating as not empty, valid String and length range.
    if (query.status !== true && query.status !== false && query.status != 'true' && query.status != 'false') {
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
    if (query.isApproved !== true && query.isApproved !== false && query.isApproved != 'true' && query.isApproved != 'false') {
      errorArray.push({
        field: 'isApproved ',
        error: 90130,
        message: 'Please provide only valid \'isApproved \' as boolean.'
      })
    }
    validatedConditions.isApproved = query.isApproved
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'TopProjects.middleware.validateGetTopProjects')
  }

  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }
  req.conditions = validatedConditions
  req.project = validateProject
  req.limit = limit
  req.offset = offset
  done()
}

// ************************************
// Validate Delete TopProjects
// ************************************

const validateDeleteTopProjects = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'TopProjects.middleware.validateDeleteTopProjects')
  }
  done()
}

// ***************************
// Update TopProjects
// ***************************

const validateUpdateTopProjects = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const params = req.params
  const validatedConditions = {}
  const userInfo = req.user

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
    if (body.status !== true && body.status !== false && body.status != 'true' && body.status != 'false') {
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
    if (body.isApproved !== true && body.isApproved !== false && body.isApproved != 'true' && body.isApproved != 'false') {
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
    if (body.approve !== true && body.approve !== false && body.approve != 'true' && body.approve != 'false') {
      errorArray.push({
        field: 'approve',
        error: 90331,
        message: 'Please provide only valid \'approve\' as Boolean.'
      })
    }
    validatedConditions.approve = body.approve
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'TopProjects.middleware.validateAddTopProjects')
  }

  validatedConditions.id = params.id
  req.conditions = validatedConditions
  req.users = userInfo
  done()
}

// ***********************************
// To Get History
// ***********************************

const validateGetTopProjectHistory = (req, res, done) => {
  const errorArray = []
  const param = req.params
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (!param.id || isNaN(param.id)) {
    errorArray.push({
      field: 'id',
      error: 20080,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }
  validatedConditions.TopProjectId = param.id

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topProject.middleware.validateGetTopProjectHistory')
  }

  req.conditions = validatedConditions

  req.limit = limit
  req.offset = offset

  done()
}

module.exports = {
  validateAddTopProjects,
  validateGetTopProjects,
  validateDeleteTopProjects,
  validateUpdateTopProjects,
  validateGetTopProjectHistory
}
