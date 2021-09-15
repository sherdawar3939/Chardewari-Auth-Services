'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')
const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// *********************
// signUp validation
// *********************

const validateSignUp = (req, res, done) => {
  const body = req.body
  const validatedValues = {}
  // get all the errors in an array
  const errorArray = []
  // email is an required  Validating as not empty, valid String and length range.
  if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(emailReg.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 10010,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }
  // name is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
    errorArray.push({
      field: 'name',
      error: 10020,
      message: '\'name\' is required as string, length must be between 2 and 100.'
    })
  }

  // password is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.password) || !_.isString(body.password) || body.password.length < 8 || body.password.length > 16) {
    errorArray.push({
      field: 'password',
      error: 10030,
      message: '\'password\' is required as string, length must be between 8 and 16.'
    })
  }
  // phone is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length < 11 || body.phone.length > 11) {
    errorArray.push({
      field: 'phone',
      error: 10040,
      message: '\'phone\' is required as string, length must be 11.'
    })
  }

  // landphone is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('landphone') && body.landphone !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.landphone) || !_.isString(body.landphone) || body.landphone.length < 11 || body.landphone.length > 11) {
      errorArray.push({
        field: 'landphone',
        error: 10050,
        message: '\'landphone\' is required as string, length must be 11.'
      })
    }
    validatedValues.landphone = body.landphone
  }

  // CountryId is required, validating it as not empty.
  if (!body.CountryId || isNaN(body.CountryId)) {
    errorArray.push({
      field: 'CountryId',
      error: 10060,
      message: '\'CountryId\' is required as string'
    })
  }

  // CityId is required, validating it as not empty.
  if (!body.CityId || isNaN(body.CityId)) {
    errorArray.push({
      field: 'CityId',
      error: 10070,
      message: '\'CityId\' is required as Number'
    })
  }

  // RoleId is required, validating it as not empty.
  if (!body.RoleId || isNaN(body.RoleId)) {
    errorArray.push({
      field: 'RoleId',
      error: 10080,
      message: '\'RoleId\' is required as Numbers'
    })
  }

  // newsLetter is Optional , validating if given it as not empty.
  if (body.hasOwnProperty('newsLetter') && body.newsLetter !== '' && body.newsLetter !== null) {
    if (body.newsLetter !== 'true' && body.newsLetter !== 'false' && body.newsLetter !== true && body.newsLetter !== false) {
      errorArray.push({
        field: 'newsLetter',
        error: 10090,
        message: '\'newsLetter\' must be boolean.'
      })
    }
    validatedValues.newsLetter = body.newsLetter
  }

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateSignUp')
  }

  validatedValues.name = body.name
  validatedValues.email = body.email
  validatedValues.password = body.password
  validatedValues.phone = body.phone
  validatedValues.CountryId = body.CountryId
  validatedValues.CityId = body.CityId
  validatedValues.RoleId = body.RoleId

  req.body = validatedValues
  done()
}

// ****************************
// validate login credentials
// ****************************

const validateLoginCredentials = (req, res, done) => {
  const body = req.body
  // get all the errors in an array
  const errorArray = []

  // email is an required  Validating as not empty, valid String and length range.
  if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(emailReg.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 10010,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }

  // password is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.password) || !_.isString(body.password)) {
    errorArray.push({
      field: 'password',
      error: 10110,
      message: '\'password\' is required.'
    })
  }

  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateLoginCredentials')
  }

  return done()
}

// ********************
// validate get user
// ********************

const validateGetUsers = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedQuery = {}
  let limit = 50
  let offset = 0

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('id')) {
    // Validating as not empty, valid numeric value with range.
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 10120,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedQuery.id = query.id
  }

  // fName is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('name')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.name) || !_.isString(query.name) || query.name.length < 2 || query.name.length > 100) {
      errorArray.push({
        field: 'name',
        error: 10130,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 100.'
      })
    }
    validatedQuery.name = query.name
  }

  // email is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('email')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(emailReg.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 10150,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedQuery.email = query.email
  }

  // phone is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('phone')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.phone) || !_.isString(query.phone) || query.phone.length < 11 || query.phone.length > 11) {
      errorArray.push({
        field: 'phone',
        error: 10160,
        message: 'Please provide only valid \'phone\' as string, length must be between 5 and 10.'
      })
    }
    validatedQuery.phone = query.phone
  }

  // isVerified is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('isVerified')) {
    // Validating as not empty, valid String and length range.
    if (query.isVerified !== true && query.isVerified !== false && query.isVerified !== 'true' && query.isVerified !== 'false') {
    // if (!query.isVerified || (query.isVerified != 'true' && query.isVerified != 'false')) {
      errorArray.push({
        field: 'isVerified ',
        error: 10180,
        message: 'Please provide only valid \'isVerified \' as boolean.'
      })
    }
    try {
      validatedQuery.isVerified = JSON.parse(query.isVerified)
    } catch (error) {
      console.error(error)
    }
  }

  // isBlocked is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('isBlocked')) {
    // Validating as not empty, valid String and length range.
    if (!query.isBlocked || (query.isBlocked !== 'true' && query.isBlocked !== 'false')) {
      errorArray.push({
        field: 'isBlocked ',
        error: 10190,
        message: 'Please provide only valid \'isBlocked \' as boolean.'
      })
    }
    try {
      validatedQuery.isBlocked = JSON.parse(query.isBlocked)
    } catch (error) {
      console.error(error)
    }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateGetUsers')
  }

  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }

  validatedQuery.isDeleted = false
  req.conditions = validatedQuery
  req.limit = limit
  req.offset = offset
  done()
}

// **************************
// Validate forgot password
// **************************

const validateForgotPassword = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // email is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(emailReg.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 1059,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateForgotPassword')
  }
  validatedBody.email = body.email
  validatedBody.isDeleted = false
  req.conditions = validatedBody
  done()
}

// ****************************
// validate login credentials
// ***************************

const validateResetPassword = (req, res, done) => {
  const body = req.body
  const validatedBody = {}
  // get all the errors in an array
  const errorArray = []

  // email is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 10010,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }

  // password is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.password) || !_.isString(body.password) || body.password.length < 8 || body.password.length > 16) {
    errorArray.push({
      field: 'password',
      error: 10220,
      message: '\'password\' is required as string, length must be between 8 and 16.'
    })
  }

  // otp is required, validating as not empty, valid numeric value with range.
  if (!body.otp) {
    errorArray.push({
      field: 'otp',
      error: 10230,
      message: '\'otp\' is required as numeric, range must be between 1000 and 9999.'
    })
  }

  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateResetPassword')
  }
  validatedBody.password = body.password
  validatedBody.email = body.email
  validatedBody.otp = body.otp
  return done()
}

// ************************
// Update User Validations
// ************************

const validateUpdateUser = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const id = req.params.id
  const validatedData = {}

  console.log('++++++++++++++++++++++++++++++++++++++++')
  // if (req.user.role == 'Admin') {
  //   // isVerified is an optional string property, if it is given than validate it.
  //   if (body.hasOwnProperty('isVerified')) {
  //     // Validating as not empty, valid String and length range.
  //     if (!body.isVerified || (body.isVerified != 'true' && body.isVerified != 'false')) {
  //       errorArray.push({
  //         field: 'isVerified ',
  //         error: 10240,
  //         message: 'Please provide only valid \'isVerified \' as boolean.'
  //       })
  //     }
  //     try {
  //       validatedData.isVerified = JSON.parse(body.isVerified)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }

  //   // isBlocked is an optional string property, if it is given than validate it.
  //   if (body.hasOwnProperty('isBlocked')) {
  //     // Validating as not empty, valid String and length range.
  //     if (!body.isBlocked || (body.isBlocked != 'true' && body.isBlocked != 'false')) {
  //       errorArray.push({
  //         field: 'isBlocked ',
  //         error: 10250,
  //         message: 'Please provide only valid \'isBlocked \' as boolean.'
  //       })
  //     }
  //     try {
  //       validatedData.isBlocked = JSON.parse(body.isBlocked)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  // } else {
  //   if (id != req.user.id) {
  //     errorArray.push({
  //       field: 'id',
  //       error: 10260,
  //       message: 'You are not allowed to edit this record.'
  //     })
  //   }
  // }

  // id is required, validating as not empty, valid numeric value with range.
  if (!id || isNaN(id)) {
    errorArray.push({
      field: 'id',
      error: 10270,
      message: '\'id\' is required as numeric in params.'
    })
  }

  // fName is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('name')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
      errorArray.push({
        field: 'name',
        error: 10280,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 100.'
      })
    }
    validatedData.name = body.name
  }

  // email is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('email')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 10300,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedData.email = body.email
  }

  // Phone is Required as String
  if (body.hasOwnProperty('phone')) {
    if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length > 16) {
      errorArray.push({
        field: 'phone',
        error: 11010,
        message: '\'phone\' is required as string, length must be 100.'
      })
    }
    validatedData.phone = body.phone
  }

  // landphone is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('landphone') && body.landphone !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.landphone) || !_.isString(body.landphone) || body.landphone.length < 11 || body.landphone.length > 11) {
      errorArray.push({
        field: 'landphone',
        error: 10050,
        message: '\'landphone\' is required as string, length must be 11.'
      })
    }
    validatedData.landphone = body.landphone
  }

  // CountryId is required, validating it as not empty.
  if (body.hasOwnProperty('CountryId')) {
    if (!body.CountryId || isNaN(body.CountryId)) {
      errorArray.push({
        field: 'CountryId',
        error: 10060,
        message: '\'CountryId\' is required as string'
      })
    }
    validatedData.CountryId = body.CountryId
  }

  // CityId is required, validating it as not empty.
  if (body.hasOwnProperty('CityId')) {
    if (!body.CityId || isNaN(body.CityId)) {
      errorArray.push({
        field: 'CityId',
        error: 10070,
        message: '\'CityId\' is required as Number'
      })
    }
    validatedData.CityId = body.CityId
  }

  // RoleId is required, validating it as not empty.
  if (body.hasOwnProperty('RoleId')) {
    if (!body.RoleId || isNaN(body.RoleId)) {
      errorArray.push({
        field: 'RoleId',
        error: 10080,
        message: '\'RoleId\' is required as Numbers'
      })
    }
    validatedData.RoleId = body.RoleId
  }

  // Send error Array if error(s).
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateUpdateUser')
  }

  if (_.isEmpty(validatedData) && _.isEmpty(req.files)) {
    return generalMiddleware.standardErrorResponse(res, [{
      field: 'general',
      error: 10320,
      message: 'No data provided to update.'
    }], 'user.middleware.validateUpdateUser')
  }

  req.body = {
    data: validatedData,
    id: id
  }
  return done()
}

// ************************
// validateChangePassword
// ************************

const validateChangePassword = (req, res, done) => {
  const body = req.body
  const id = req.params.id
  // get all the errors in an array
  const errorArray = []

  // if (req.user.role == 'Admin') {
  //   // phone is required, validating it as not empty, valid String and length range.
  //   if (_.isEmpty(body.phone) || !_.isString(body.phone) || body.phone.length < 11 || body.phone.length > 11) {
  //     errorArray.push({
  //       field: 'phone',
  //       error: 10330,
  //       message: '\'phone\' is required as string, length must be 11.'
  //     })
  //   }
  // } else {
  //   req.body.phone = req.user.phone
  // }

  // id is required, validating as not empty, valid numeric value with range.
  if (!id || isNaN(id)) {
    errorArray.push({
      field: 'id',
      error: 10270,
      message: '\'id\' is required as numeric in params.'
    })
  }

  // password is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.oldPassword) || !_.isString(body.oldPassword)) {
    errorArray.push({
      field: 'password',
      error: 10335,
      message: '\'password\' is required.'
    })
  }

  // newPassword is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.newPassword) || !_.isString(body.newPassword) || body.newPassword.length < 8 || body.newPassword.length > 16) {
    errorArray.push({
      field: 'newPassword',
      error: 10340,
      message: '\'newPassword\' is required as string, length must be between 8 and 16.'
    })
  }

  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateChangePassword')
  }

  const validatedValues = {}
  validatedValues.oldPassword = body.oldPassword
  validatedValues.newPassword = body.newPassword

  req.body = {
    data: validatedValues,
    id: id
  }

  return done()
}

// **********************
// Verify OTP
// **********************

const verifyOtp = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // email is an required  Validating as not empty, valid String and length range.
  if (_.isEmpty(body.email) || !_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(emailReg.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 10010,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }

  // otp is required, validating as not empty, valid numeric value with range.
  if (!body.otp) {
    errorArray.push({
      field: 'otp',
      error: 10360,
      message: '\'otp\' is required.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.verifyOtp')
  }

  validatedBody.email = body.email
  validatedBody.otp = body.otp
  validatedBody.isDeleted = false
  req.conditions = validatedBody
  done()
}

// ***********************
// Resend Otp
// ***********************

const resendOtp = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // email is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
    errorArray.push({
      field: 'email',
      error: 10010,
      message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.resendOtp')
  }

  validatedBody.email = body.email
  validatedBody.isDeleted = false
  req.conditions = validatedBody
  done()
}

// *****************
// Delete User
// *****************

const validateDeleteUser = (req, res, done) => {
  const errorArray = []
  const params = req.params

  // if (req.user.role != 'Admin') {
  //   // errorArray.push({
  //   //   field: 'd',
  //   //   error: 1350,
  //   //   message: 'You are not allowed to delete record.'
  //   // })
  // }

  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 10380,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.validateDeleteUser')
  }
  done()
}

// **************************
// To Update Company Profile
// **************************

const updateCompany = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // name is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.name) || !_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
    errorArray.push({
      field: 'name',
      error: 10390,
      message: '\'name\' is required as string, length must be between 2 and 100.'
    })
  }

  // description is Optional , validating if given it as not empty.
  if (body.hasOwnProperty('description') && body.description !== '') {
    if (_.isEmpty(body.description) || !_.isString(body.description) || body.description.length < 2 || body.description.length > 150) {
      errorArray.push({
        field: 'description',
        error: 10400,
        message: '\'description\' is Optional should be string and length btw 2 and 150 '
      })
    }
    validatedBody.description = body.description
  }

  // Validating as not empty, valid String and length range.
  if (!body.phone || !_.isString(body.phone) || body.phone.length < 1 || body.phone.length > 11) {
    errorArray.push({
      field: 'phone',
      error: 10410,
      message: 'Please provide only valid \'phone\' as 03001231234, length must be 11.'
    })
  }

  // fax is Optional , validating if given it as not empty.
  if (body.hasOwnProperty('fax') && body.fax !== '') {
    if (_.isEmpty(body.fax) || !_.isString(body.fax) || body.fax.length < 2 || body.fax.length > 17) {
      errorArray.push({
        field: 'fax',
        error: 10420,
        message: '\'fax\' is Optional and should be string length must btw 2 and 16'
      })
    }
    validatedBody.fax = body.fax
  }

  // address is Optional , validating if given it as not empty.
  if (body.hasOwnProperty('address') && body.address !== '') {
    if (_.isEmpty(body.address) || !_.isString(body.address) || body.address.length < 2 || body.address.length > 150) {
      errorArray.push({
        field: 'address',
        error: 10430,
        message: '\'address\' is Optional and should be String length must btw 2 and 150'
      })
    }
    validatedBody.address = body.address
  }
  // email is an optional  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('email') && body.address !== '') {
    if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
      errorArray.push({
        field: 'email',
        error: 10440,
        message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
      })
    }
    validatedBody.email = body.email
  }

  // cityId is required, validating it as not empty.
  if (!body.cityId || isNaN(body.cityId)) {
    errorArray.push({
      field: 'cityId',
      error: 10450,
      message: '\'cityId\' is required as Number'
    })
  }

  // countryId is required, validating it as not empty.
  if (!body.countryId || isNaN(body.countryId)) {
    errorArray.push({
      field: 'countryId',
      error: 10460,
      message: '\'countryId\' is required as Number'
    })
  }
  // logo is Optional , validating if given it as not empty.
  if (body.hasOwnProperty('logo') && body.logo !== '') {
    if (_.isEmpty(body.logo) || !_.isString(body.logo) || body.logo.length < 2 || body.logo.length > 100) {
      errorArray.push({
        field: 'logo',
        error: 10470,
        message: '\'logo\' is Optional and must be string '
      })
    }
    validatedBody.logo = body.logo
  }
  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'user.middleware.updateCompany')
  }

  validatedBody.name = body.name
  validatedBody.cityId = body.cityId
  validatedBody.countryId = body.countryId
  validatedBody.phone = body.phone
  validatedBody.UserId = 1

  req.body = validatedBody
  req.user = 1

  done()
}

module.exports = {
  validateSignUp,
  validateLoginCredentials,
  validateGetUsers,
  validateForgotPassword,
  validateResetPassword,
  validateUpdateUser,
  validateChangePassword,
  verifyOtp,
  resendOtp,
  validateDeleteUser,
  updateCompany
}
