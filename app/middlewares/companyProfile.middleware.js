'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST Company Profile  Middleware
// **********************************

const validatePostCompanyProfile = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // name must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 50) {
    errorArray.push({
      field: 'name',
      error: 11000,
      message: 'Please provide only valid \'name\' as string, length must be between 2 and 50.'
    })
  }

  // UserId is an optional numeric property, if it is given than validate it.
  if (body.hasOwnProperty('UserId') && body.UserId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(body.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 40041,
        message: 'Please provide only valid \'UserId\' as numeric.'
      })
    }
    validatedConditions.UserId = body.UserId
  }

  // Phone is Required as String
  if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length > 16) {
    errorArray.push({
      field: 'phone',
      error: 11010,
      message: '\'phone\' is required as string, length must be 100.'
    })
  }

  // fax is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('fax') && !_.isEmpty(body.fax)) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.fax) || !_.isString(body.fax) || body.fax.length > 16) {
      errorArray.push({
        field: 'fax',
        error: 11020,
        message: '\'fax\' is required as string, length must be 16.'
      })
    }
    validatedConditions.fax = body.fax
  }

  if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 11030,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }
  validatedConditions.email = body.email

  // address is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('address') && body.address !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.address) || !_.isString(body.address) || body.address.length > 100) {
      errorArray.push({
        field: 'address',
        error: 11040,
        message: '\'address\' is required as string, length must be 100.'
      })
    }
    validatedConditions.address = body.address
  }

  // facebook is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('facebook') && body.facebook !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.facebook) || !_.isString(body.facebook) || body.facebook.length > 200) {
      errorArray.push({
        field: 'facebook',
        error: 11040,
        message: '\'fb\' is required as string, length must be 100.'
      })
    }
    validatedConditions.facebook = body.facebook
  }

  // twitter is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('twitter') && body.twitter !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.twitter) || !_.isString(body.twitter) || body.twitter.length > 200) {
      errorArray.push({
        field: 'twitter',
        error: 11040,
        message: '\'twitter\' is required as string, length must be 100.'
      })
    }
    validatedConditions.twitter = body.twitter
  }

  // instagram is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('instagram') && body.instagram !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.instagram) || !_.isString(body.instagram) || body.instagram.length > 200) {
      errorArray.push({
        field: 'instagram',
        error: 11040,
        message: '\'instagram\' is required as string, length must be 100.'
      })
    }
    validatedConditions.instagram = body.instagram
  }

  // linkedIn is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('linkedIn') && body.linkedIn !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.linkedIn) || !_.isString(body.linkedIn) || body.linkedIn.length > 200) {
      errorArray.push({
        field: 'linkedIn',
        error: 11040,
        message: '\'linkedIn\' is required as string, length must be 100.'
      })
    }
    validatedConditions.linkedIn = body.linkedIn
  }

  // description is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('description') && !_.isEmpty(body.description)) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.description) || !_.isString(body.description) || body.description.length > 200) {
      errorArray.push({
        field: 'description',
        error: 11050,
        message: '\'description\' is required as string, length must be 200.'
      })
    }
    validatedConditions.description = body.description
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'companyProfile.middleware.validatePostCompanyProfile')
  }

  validatedConditions.phone = body.phone
  validatedConditions.name = body.name
  req.conditions = validatedConditions
  done()
}

// **********************************
// Get company Profile Middleware
// **********************************

const validateGetCompanyProfile = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  // UserId is optional
  if (query.hasOwnProperty('UserId')) {
    if (!query.UserId || isNaN(query.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 80710,
        message: 'Please provide only valid \'UserId\' as numeric.'
      })
    }
    validatedConditions.UserId = query.UserId
  }

  // id is optional
  if (query.hasOwnProperty('id')) {
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 80710,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'companyProfile.middleware.validateGetCompanyProfile')
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

// **********************************
// Get company Profile Middleware
// **********************************

const validateGetCompanyProfileDetails = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const validatedConditions = {}

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80710,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }
  validatedConditions.id = params.id

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'companyProfile.middleware.validateGetCompanyProfileDetails')
  }

  req.conditions = validatedConditions
  done()
}

// **********************************
// Get company Profile Middleware
// **********************************

const validateGetUserCompanyProfile = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  // UserId is optional
  if (query.hasOwnProperty('UserId')) {
    if (!query.UserId || isNaN(query.UserId)) {
      errorArray.push({
        field: 'UserId',
        error: 80710,
        message: 'Please provide only valid \'UserId\' as numeric.'
      })
    }
    validatedConditions.UserId = query.UserId
  }

  // CompanyId is optional
  if (query.hasOwnProperty('CompanyId')) {
    if (!query.CompanyId || isNaN(query.CompanyId)) {
      errorArray.push({
        field: 'CompanyId',
        error: 80710,
        message: 'Please provide only valid \'CompanyId\' as numeric.'
      })
    }
    validatedConditions.CompanyId = query.CompanyId
  }

  // RoleId is optional
  if (query.hasOwnProperty('RoleId')) {
    if (!query.RoleId || isNaN(query.RoleId)) {
      errorArray.push({
        field: 'RoleId',
        error: 80710,
        message: 'Please provide only valid \'RoleId\' as numeric.'
      })
    }
    validatedConditions.RoleId = query.RoleId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'companyProfile.middleware.validateGetCompanyProfile')
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

module.exports = {
  validatePostCompanyProfile,
  validateGetCompanyProfile,
  validateGetCompanyProfileDetails,
  validateGetUserCompanyProfile
}
