'use strict'

const passport = require('../config/passport')
const purchaseMiddleware = require('../middlewares/purchase.middleware')
const purchaseController = require('../controllers/purchase.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion + '/purchase'

  // get purchase Listings
  app.get(route, passport.authenticate('jwt', {
    session: false
  }), purchaseMiddleware.validateGetPurchaseListing, purchaseController.getPurchaseListing)

  // get purchase Detail
  app.get(route + '/detail/:id', passport.authenticate('jwt', {
    session: false
  }), purchaseMiddleware.validateGetPurchaseDetail, purchaseController.getUserPurchaseDetail)

  // get purchase By Id
  app.get(route + '/:id', passport.authenticate('jwt', {
    session: false
  }), purchaseMiddleware.validateGetPurchaseById, purchaseController.getUserPurchaseById)
}
