'use strict'

const launchingMiddleware = require('../middlewares/launching.middleware')
const launchingController = require('../controllers/launching.controller')
const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get launching
  app.get(route + '/launching/listing', passport.authenticate('jwt', { session: false }), launchingMiddleware.validateGetLaunchingsListing, launchingController.getLaunchingsListing)

  // To add new launching
  app.post(route + '/launching/add', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, launchingMiddleware.validateAddLaunching, launchingController.addLaunching)

  // To Get launching Details Against Given Id
  app.get(route + '/launching/details/:id', launchingMiddleware.validateGetLaunching, launchingController.getLaunching)

  //   // To Get Related Properties
  //   app.get(route + '/launching/:launchingId/related', launchingMiddleware.validateGetRelatedProperties, launchingController.getRelatedlaunching)

  // To Update launching
  app.put(route + '/launching/:id', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, launchingMiddleware.validateUpdateLaunching, launchingController.updateLaunchings)
}
