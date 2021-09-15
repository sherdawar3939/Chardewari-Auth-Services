'use strict'
const packageMiddleware = require('../middlewares/package.middleware')
const packageController = require('../controllers/package.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Listing Type
  app.post(route + '/package/add', passport.authenticate('jwt', { session: false }), packageMiddleware.validateAddPackage, packageController.addPackage)
  // To Update
  app.put(route + '/package/update/:id', passport.authenticate('jwt', { session: false }), packageMiddleware.validateUpdatePackage, packageController.updatePackage)
  // To Get
  app.get(route + '/package/details/:id', passport.authenticate('jwt', { session: false }), packageMiddleware.validateGetPackageDetail, packageController.getPackageDetail)
  // To get all
  app.get(route + '/package', passport.authenticate('jwt', { session: false }), packageMiddleware.validateGetPackages, packageController.getPackages)
  // To get all Active packages with detail
  app.get(route + '/package/all', passport.authenticate('jwt', { session: false }), packageMiddleware.validateGetPackages, packageController.getAllPackages)
  // delete
  app.delete(route + '/package/delete/:id', passport.authenticate('jwt', { session: false }), packageMiddleware.validateDeletePackage, packageController.deletePackages)
  // to add custom package
  app.post(route + '/package/custom', passport.authenticate('jwt', { session: false }), packageMiddleware.validateAddCustomPackage, packageController.addCustomPackage)
  // to add User package
  app.get(route + '/package/user/:id', passport.authenticate('jwt', { session: false }), packageMiddleware.validateUserPackage, packageController.userPackages)
  // To get User Offers
  app.get(route + '/package/offers', passport.authenticate('jwt', { session: false }), packageController.userOffers)
  // To get Top Config
  app.get(route + '/package/top', passport.authenticate('jwt', { session: false }), packageController.topConfig)
}
