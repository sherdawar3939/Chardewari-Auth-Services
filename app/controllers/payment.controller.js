'use strict'

const SERVER_RESPONSE = require('../config/serverResponses')
const paymentHelper = require('../helpers/payment.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***************
// Create Payment
// ***************

const PostPayment = function (req, res) {
  return paymentHelper.PostPayment(req.validatedBody)
    .then((data) => {
      generalController.successResponse(res, 'Payment created successfully.', data, 'payment.controller.PostPayment')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'payment.controller.PostPayment', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'payment.controller.PostPayment', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ************
// get Payment
// ************

const getPayments = function (req, res) {
  return paymentHelper.getPayments(req.user.id)
    .then((data) => {
      generalController.successResponse(res, 'Payment get successfully.', data, 'payment.controller.getPayments')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'payment.controller.getPayments', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'payment.controller.getPayments', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ********************
// get payment Details
// ********************

const getPaymentById = function (req, res) {
  return paymentHelper.getPaymentById(req.conditions)
    .then((data) => {
      generalController.successResponse(res, 'Payment Details Fetched successfully.', data, 'payment.controller.getPaymentById')
    }).catch(StandardError, (err) => {
      generalController.errorResponse(res, err, null, 'payment.controller.getPaymentById', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch((err) => {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'payment.controller.getPaymentById', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***************
// Update Payment
// ***************

const updatePayment = function (req, res) {
  return paymentHelper.updatePayment(req.validatedBody, req.params.id)
    .then(function (data) {
      generalController.successResponse(res, 'Payment updated successfully.', data, 'payment.controller.updatePayment')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'payment.controller.updatePayment', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'payment.controller.updatePayment', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***************
// Delete Payment
// ***************

const deletePayment = function (req, res) {
  return paymentHelper.deletePayment(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'Payment deleted successfully.', data, 'Payment.controller.deletePayment')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'Payment.controller.deletePayment', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'Payment.controller.deletePayment', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

module.exports = {
  PostPayment,
  getPayments,
  updatePayment,
  deletePayment,
  getPaymentById
}
