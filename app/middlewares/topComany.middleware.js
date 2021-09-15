'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ***************************
// Post Home Featured Agency
// ***************************

const validateAddTopCompany = (req, res, done) => {
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

  // Validating as not empty, valid Boolean and length range.
  if (body.home !== true && body.home !== false && body.home !== 'true' && body.home !== 'false') {
    errorArray.push({
      field: 'home ',
      error: 90190,
      message: 'Please provide only valid \'home \' as boolean.'
    })
  }
  validatedConditions.showOnHome = body.home

  // CompanyId Is required as Numeric
  if (!(body.CompanyId) || isNaN(body.CompanyId)) {
    errorArray.push({
      field: 'CompanyId',
      error: 90220,
      message: '\'CompanyId\' is required as Numeric .'
    })
  }
  validatedConditions.CompanyProfileId = body.CompanyId

  // approvedByName is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('approvedByName') && !_.isEmpty(body.approvedByName)) {
  // Validating as not empty, valid String and length range.
    if (!_.isString(body.approvedByName) || body.approvedByName.length < 2 || body.approvedByName.length > 30) {
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

  // CreatedById is an optional Number, if it is given than validate it.
  if (body.hasOwnProperty('CreatedById')) {
  // CreatedById Is required as Numeric
    if (!(body.CreatedById) || isNaN(body.CreatedById)) {
      errorArray.push({
        field: 'CreatedById',
        error: 90220,
        message: '\'CreatedById\' is required as Numeric .'
      })
    }
    validatedConditions.CreatedById = body.CreatedById
  }

  // isApproved is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== true && body.isActive !== false && body.isActive !== 'true' && body.isActive !== 'false') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedConditions.status = body.isActive
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topCompany.middleware.validateAddTopCompany')
  }
  validatedConditions.user = req.user
  req.conditions = validatedConditions
  done()
}

// ***********************************
// To Get All top companies
// ***********************************

const validateGetTopCompany = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  const validatedCompany = {}
  let limit = 50
  let offset = 0

  if (req.user.public) {
    validatedConditions.CreatedById = req.user.id
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

  // Validating RoleId as Required, not empty, valid numeric value with range.
  if (query.hasOwnProperty('RoleId')) {
    if (!query.RoleId || isNaN(query.RoleId)) {
      errorArray.push({
        field: 'RoleId',
        error: 20080,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.RoleId = query.RoleId
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
    validatedCompany.name = query.title
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topCompany.middleware.validateGetTopCompany')
  }
  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }
  req.conditions = validatedConditions
  req.company = validatedCompany
  req.limit = limit
  req.offset = offset
  done()
}

// ************************************
// Validate Delete TopCompanies
// ************************************

const validateDeleteTopCompany = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topCompany.middleware.validateDeleteTopCompany')
  }
  done()
}

// ***************************
// Update Home TopCompanies
// ***************************

const validateUpdateTopCompany = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const params = req.params
  const validatedConditions = {}

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

  // status is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('status')) {
    // Validating as not empty, valid String and length range.
    if (body.status !== true && body.status !== false && body.status != 'true' && body.status != 'false') {
      errorArray.push({
        field: 'status',
        error: 90331,
        message: 'Please provide only valid \'status\' as Boolean.'
      })
    }
    validatedConditions.status = body.status
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topCompany.middleware.validateAddTopCompany')
  }
  validatedConditions.user = req.user
  validatedConditions.id = params.id
  req.conditions = validatedConditions
  done()
}

// ***********************************
// To Get History
// ***********************************

const validateGetTopCompanyHistory = (req, res, done) => {
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
  validatedConditions.TopCompanyId = param.id
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topProject.middleware.validateGetTopCompanyHistory')
  }

  req.conditions = validatedConditions

  req.limit = limit
  req.offset = offset

  done()
}
module.exports = {
  validateGetTopCompanyHistory,
  validateAddTopCompany,
  validateGetTopCompany,
  validateDeleteTopCompany,
  validateUpdateTopCompany
}
