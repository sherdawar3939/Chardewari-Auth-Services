'use strict'

const propertyMiddleware = require('../middlewares/property.middleware')
const propertyController = require('../controllers/property.controller')
const generalMiddleware = require('../middlewares/general.middleware')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get Property
  app.get(route + '/property/listing', passport.authenticate('jwt', { session: false }), propertyMiddleware.validateGetPropertiesListing, propertyController.getPropertiesListing)
  // To add new Property
  app.post(route + '/property/add', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, propertyMiddleware.validateAddProperty, propertyController.addProperty)
  // To Get Property Details Against Given Id
  app.get(route + '/property/details/:id', passport.authenticate('jwt', { session: false }), propertyMiddleware.validateGetProperties, propertyController.getProperty)
  // To Get Related Properties
  app.get(route + '/property/:propertyId/related', passport.authenticate('jwt', { session: false }), propertyMiddleware.validateGetRelatedProperties, propertyController.getRelatedProperty)
  // To Update Property
  app.put(route + '/property/update/:id', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, propertyMiddleware.validateUpdateProperty, propertyController.updateProperty)
}
