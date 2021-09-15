'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ************************************
// POST Contact Information Middleware
// ************************************

const validatePostContactInformation = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // name is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
    errorArray.push({
      field: 'name',
      error: 70000,
      message: 'Please provide only valid \'name\' as string, length must be between 2 and 100.'
    })
  }

  // phone is Requires As Number
  if (body.hasOwnProperty('phone') && !(body.phone)) {
    if (isNaN(body.phone)) {
      errorArray.push({
        field: 'phone',
        error: 70040,
        message: '\'phone\' is required as Number.'
      })
    }
  }

  // email is an optional  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('email') && body.email !== '') {
    if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 70030,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedConditions.email = body.email
  }

  // fax is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('fax') && !(body.fax)) {
    if (isNaN(body.fax)) {
      errorArray.push({
        field: 'fax',
        error: 70040,
        message: '\'fax\' is required as Number.'
      })
    }
    validatedConditions.fax = body.fax
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contactInformation.middleware.validatePostContactInformation')
  }

  validatedConditions.name = body.name
  validatedConditions.phone = body.phone
  validatedConditions.UserId = req.user.id

  req.conditions = validatedConditions
  done()
}

// **********************************
// Get Contact Information Middleware
// **********************************

const validateGetContactInformation = (req, res, done) => {
  const errorArray = []
  // const query = req.query
  const validatedConditions = {}

  if (req.user.public) {
    validatedConditions.UserId = req.user.id
  }

  // Must Be Required Validating as not empty, valid numeric value with range.
  // if (query.hasOwnProperty('UserId')) {
  //   if (!query.UserId || isNaN(query.UserId)) {
  //     errorArray.push({
  //       field: 'UserId',
  //       error: 70050,
  //       message: 'Please provide only valid \'UserId\' as numeric.'
  //     })
  //   }
  //   validatedConditions.UserId = query.UserId
  // }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contactInformation.middleware.validateGetContactInformation')
  }

  req.conditions = validatedConditions
  done()
}

// **************************************
// Update Contact Information Middleware
// **************************************

const updateContactInformation = (req, res, done) => {
  const errorArray = []
  const param = req.params
  const body = req.body
  const validatedConditions = {}

  // ListingOwner is an Optional  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('listingOwner')) {
    if (!_.isString(body.listingOwner) || body.listingOwner.length < 2 || body.listingOwner.length > 100) {
      errorArray.push({
        field: 'listingOwner',
        error: 70060,
        message: 'Please provide only valid \'listingOwner\' as string, length must be between 2 and 100.'
      })
    }
    validatedConditions.listingOwner = body.listingOwner
  }
  // name is an Optional  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('name')) {
    if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
      errorArray.push({
        field: 'name',
        error: 70070,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 100.'
      })
    }
    validatedConditions.name = body.name
  }
  // price is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('price')) {
    if (!(body.price) || isNaN(body.price)) {
      errorArray.push({
        field: 'price',
        error: 70080,
        message: '\'price\' is required as Number.'
      })
    }
    validatedConditions.price = body.price
  }

  // landphone is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('landphone')) {
    if (!(body.landphone) || isNaN(body.landphone)) {
      errorArray.push({
        field: 'landphone',
        error: 70090,
        message: '\'landphone\' is required as Number.'
      })
    }
    validatedConditions.landphone = body.landphone
  }

  // phone is Optional As Number
  if (body.hasOwnProperty('phone')) {
    if (!(body.phone) || isNaN(body.phone)) {
      errorArray.push({
        field: 'phone',
        error: 70100,
        message: '\'phone\' is required as Number.'
      })
    }
    validatedConditions.phone = body.phone
  }
  // email is an optional  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('email') && body.address !== '') {
    if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 70110,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedConditions.email = body.email
  }

  // fax is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('fax') && body.fax !== '') {
    if (!(body.fax) || isNaN(body.fax)) {
      errorArray.push({
        field: 'fax',
        error: 70120,
        message: '\'fax\' is required as Number.'
      })
    }
    validatedConditions.fax = body.fax
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contactInformation.middleware.validateUpdateContactInformation')
  }
  validatedConditions.UserId = req.user.id
  req.condition = validatedConditions

  done()
}

// ***********************************
// Validate Delete Contact Information
// ************************************

const validateDeleteContactInformation = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 70130,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contactInformation.middleware.validateDeleteContactInformation')
  }
  done()
}

// ***********************************
// Details Contact Information
// ************************************

const detailContactInformation = (req, res, done) => {
  const errorArray = []
  const params = req.params

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 70130,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'contactInformation.middleware.detailContactInformation')
  }
  done()
}

module.exports = {
  validatePostContactInformation,
  validateGetContactInformation,
  updateContactInformation,
  detailContactInformation,
  validateDeleteContactInformation
}
