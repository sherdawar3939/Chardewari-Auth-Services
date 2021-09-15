'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST Company Office  Middleware
// **********************************

const validatePostCompanyOffice = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // personName must be required required  Validating as not empty, valid String and length range.
  if (!_.isString(body.personName) || body.personName.length < 2 || body.personName.length > 50) {
    errorArray.push({
      field: 'personName',
      error: 80650,
      message: 'Please provide only valid \'personName\' as string, length must be between 2 and 50.'
    })
  }

  // Phone is Required as String
  if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length > 16) {
    errorArray.push({
      field: 'phone',
      error: 80660,
      message: '\'phone\' is required as string, length must be 100.'
    })
  }

  // fax is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('fax')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.fax) || !_.isString(body.fax) || body.fax.length > 16) {
      errorArray.push({
        field: 'fax',
        error: 80670,
        message: '\'fax\' is required as string, length must be 16.'
      })
    }
    validatedConditions.fax = body.fax
  }

  // email is an Optional  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('email')) {
    if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 80680,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedConditions.email = body.email
  }

  // address is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('address')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.address) || !_.isString(body.address) || body.address.length > 100) {
      errorArray.push({
        field: 'address',
        error: 80690,
        message: '\'address\' is required as string, length must be 100.'
      })
    }
    validatedConditions.address = body.address
  }

  // addressL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('addressL1')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.addressL1) || !_.isString(body.addressL1) || body.addressL1.length > 100) {
      errorArray.push({
        field: 'addressL1',
        error: 80700,
        message: '\'addressL1\' is required as string, length must be 100.'
      })
    }
    validatedConditions.addressL1 = body.addressL1
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'companyOffice.middleware.validatePostCompanyOffice')
  }

  validatedConditions.UserId = body.UserId
  validatedConditions.phone = body.phone
  validatedConditions.personName = body.personName
  req.conditions = validatedConditions
  done()
}

// **********************************
// Get company Office Middleware
// **********************************

const validateGetCompanyProfile = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'companyOffice.middleware.validateGetCompanyProfile')
  }

  req.conditions = validatedConditions
  done()
}

// ***********************************
// Validate Delete Company Office
// ************************************

const validateDeleteCompanyOffice = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 80720,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'companyOffice.middleware.validateDeleteCompanyOffice')
  }
  done()
}

module.exports = {
  validatePostCompanyOffice,
  validateGetCompanyProfile,
  validateDeleteCompanyOffice
}
