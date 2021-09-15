'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// POST Payment Middleware
// **********************************

const validatePostPayment = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}
  console.log(body, req.user.id)

  // Validating as not empty, valid numeric value with range.
  if (!body.amount || isNaN(body.amount) || body.amount < 0 || body.amount > 999999999) {
    errorArray.push({
      field: 'amount',
      error: 80060,
      message: 'Please provide only valid \'amount\' as numeric, range must be between 0 and 999999999.'
    })
  }

  // PurchaseId is required, validating it as not empty, valid db collection id.
  if (!body.PurchaseId || isNaN(body.PurchaseId)) {
    errorArray.push({
      field: 'PurchaseId',
      error: 90280,
      message: '\'PurchaseId\' is required as Number.'
    })
  }

  // paymentDate is an optional string property, if it is given than validate it.
  if (_.isEmpty(body.paymentDate) || !(body.paymentDate)) {
    errorArray.push({
      field: 'paymentDate',
      error: 90220,
      message: ' \'paymentDate\' is required.'
    })
  }

  // paymentStatus is an optional string property, if it is given than validate it.
  if (isNaN(body.paymentStatus) || !(body.paymentStatus)) {
    errorArray.push({
      field: 'paymentStatus',
      error: 90220,
      message: ' \'paymentStatus\' is required.'
    })
  }

  // paymentMethod is Optional in Update
  // if (body.hasOwnProperty('paymentMethod')) {
  //   if (!_.isString(body.paymentMethod) || body.paymentMethod.length < 2 || body.paymentMethod.length > 50) {
  //     errorArray.push({
  //       field: 'paymentMethod',
  //       error: 80080,
  //       message: 'Please provide only valid \'paymentMethod\' as string, length must be between 2 and 50.'
  //     })
  //   }
  //   validatedBody.paymentMethod = body.paymentMethod
  // }

  // if (!_.isEmpty(errorArray)) {
  //   return generalMiddleware.standardErrorResponse(res, errorArray, 'payment.middleware.validatePostPayment')
  // }
  validatedBody.amount = body.amount
  validatedBody.paymentDate = body.paymentDate
  validatedBody.paymentStatus = body.paymentStatus
  validatedBody.PurchaseId = body.PurchaseId
  validatedBody.UserId = req.user.id

  req.validatedBody = validatedBody
  done()
}

// **********************************
// Put Payment Middleware
// **********************************

const validateUpdatePayment = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}

  // PurchaseId is required, validating it as not empty, valid db collection id.
  if (!body.PurchaseId || isNaN(body.PurchaseId)) {
    errorArray.push({
      field: 'PurchaseId',
      error: 90280,
      message: '\'PurchaseId\' is required as Number.'
    })
  }

  if (body.hasOwnProperty('amount')) {
  // Validating as not empty, valid numeric value with range.
    if (!body.amount || isNaN(body.amount) || body.amount < 0 || body.amount > 999999999) {
      errorArray.push({
        field: 'amount',
        error: 80060,
        message: 'Please provide only valid \'amount\' as numeric, range must be between 0 and 999999999.'
      })
    }
    validatedBody.amount = body.amount
  }

  if (body.hasOwnProperty('paymentDate')) {
  // paymentDate is an optional string property, if it is given than validate it.
    if (_.isEmpty(body.paymentDate) || !(body.paymentDate)) {
      errorArray.push({
        field: 'paymentDate',
        error: 90220,
        message: ' \'paymentDate\' is required.'
      })
    }
    validatedBody.paymentDate = body.paymentDate
  }

  // paymentMethod is Optional in Update
  if (body.hasOwnProperty('paymentMethod')) {
    if (!_.isString(body.paymentMethod) || body.paymentMethod.length < 2 || body.paymentMethod.length > 50) {
      errorArray.push({
        field: 'paymentMethod',
        error: 80080,
        message: 'Please provide only valid \'paymentMethod\' as string, length must be between 2 and 50.'
      })
    }
    validatedBody.paymentMethod = body.paymentMethod
  }

  if (body.hasOwnProperty('paymentMethod')) {
  // paymentStatus is an optional string property, if it is given than validate it.
    if (isNaN(body.paymentStatus) || !(body.paymentStatus)) {
      errorArray.push({
        field: 'paymentStatus',
        error: 90220,
        message: ' \'paymentStatus\' is required.'
      })
    }
    validatedBody.paymentStatus = body.paymentStatus
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'payment.middleware.validateUpdatePayment')
  }

  validatedBody.PurchaseId = body.PurchaseId

  req.validatedBody = validatedBody
  done()
}

// *****************************
// Validate delete payment
// *****************************

const validateDeletePayment = (req, res, next) => {
  const errorArray = []
  const validatedBody = {}
  const id = req.params
  // id is required, validating it as not empty, valid mongo db collection id.
  if (!id.id || isNaN(id.id)) {
    errorArray.push({
      field: '',
      error: 90280,
      message: '\'id\' is required as Number.'
    })
  }
  validatedBody.id = id.id

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'payment.middleware.validateDeletePayment')
  }
  req.conditions = validatedBody
  next()
}

// *****************************
// Get By Id
// *****************************

const validateGetByIdPayment = (req, res, next) => {
  const errorArray = []
  const validatedBody = {}
  const id = req.params
  // id is required, validating it as not empty, valid mongo db collection id.
  if (!id.id || isNaN(id.id)) {
    errorArray.push({
      field: '',
      error: 90280,
      message: '\'id\' is required as Number.'
    })
  }
  validatedBody.id = id.id

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'payment.middleware.validateGetByIdPayment')
  }
  req.conditions = validatedBody
  next()
}

module.exports = {
  validatePostPayment,
  validateUpdatePayment,
  validateGetByIdPayment,
  validateDeletePayment
}
