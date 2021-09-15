'use strict'
const servicesMiddleware = require('../middlewares/services.middleware')
const servicesController = require('../controllers/services.controller')
const passport = require('../config/passport')
const generalMiddleware = require('../middlewares/general.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Services
  app.post(route + '/services/add', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, servicesMiddleware.validatePostServices, servicesController.addServices)
  // To Get Service
  app.get(route + '/services', passport.authenticate('jwt', { session: false }), servicesMiddleware.validateGetServices, servicesController.getServices)
  // To Update Services
  app.put(route + '/services/update/:id', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, servicesMiddleware.validateUpdateServices, servicesController.updateServices)
  // To Delete Services
  app.delete(route + '/services/:id/delete', passport.authenticate('jwt', { session: false }), servicesMiddleware.validateDeleteServices, servicesController.deleteServices)
  // To Get Service Category
  app.get(route + '/services/all', passport.authenticate('jwt', { session: false }), servicesController.getAllServices)
}
