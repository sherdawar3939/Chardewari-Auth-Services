'use strict'
const currencyMiddleware = require('../middlewares/currency.middleware')
const currencyController = require('../controllers/currency.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Areas By specific City
  app.post(route + '/currency/add', passport.authenticate('jwt', { session: false }), currencyMiddleware.validatePostCurrency, currencyController.addCurrency)
  // To Get Product Category
  app.get(route + '/currency', passport.authenticate('jwt', { session: false }), currencyMiddleware.validateGetCurrency, currencyController.getCurrency)
  // To Update ProductCategory
  app.put(route + '/currency/update/:id', passport.authenticate('jwt', { session: false }), currencyMiddleware.validateUpdateCurrency, currencyController.updateCurrency)
  // To Delete ProductCategory
  app.delete(route + '/currency/:id/delete', passport.authenticate('jwt', { session: false }), currencyMiddleware.validateDeleteCurrency, currencyController.deleteCurrency)
}
