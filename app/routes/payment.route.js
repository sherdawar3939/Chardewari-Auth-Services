'use strict'
const paymentMiddleware = require('../middlewares/payment.middleware')
const paymentController = require('../controllers/payment.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // To get payment
  app.get(route + '/payment', passport.authenticate('jwt', { session: false }), paymentController.getPayments)
  // To get payment by id
  app.get(route + '/payment/:id', passport.authenticate('jwt', { session: false }), paymentMiddleware.validateGetByIdPayment, paymentController.getPaymentById)
  // To Add payment
  app.post(route + '/payment/add', passport.authenticate('jwt', { session: false }), paymentMiddleware.validatePostPayment, paymentController.PostPayment)
  // To Update payment
  app.put(route + '/payment/update/:id', passport.authenticate('jwt', { session: false }), paymentMiddleware.validateUpdatePayment, paymentController.updatePayment)
  // To delete payment
  app.delete(route + '/payment/delete/:id', passport.authenticate('jwt', { session: false }), paymentMiddleware.validateDeletePayment, paymentController.deletePayment)
}
