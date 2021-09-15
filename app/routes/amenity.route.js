'use strict'

const amenityMiddleware = require('../middlewares/amenity.middleware')
const amenityController = require('../controllers/amenity.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // get amenityCategory
  app.get(route + '/amenity/category', passport.authenticate('jwt', { session: false }), amenityMiddleware.validateGetCategoryAmenities, amenityController.getCategoryAmenities)
  // get amenityLaunchingCategory
  app.get(route + '/amenity/launchingcategory', passport.authenticate('jwt', { session: false }), amenityMiddleware.validateGetLaunchingCategoryAmenities, amenityController.getCategoryLaunchingAmenities)
  // get amenityCategory
  app.get(route + '/amenity', passport.authenticate('jwt', { session: false }), amenityMiddleware.validateGetAmenities, amenityController.getAmenities)
  // delete amenityCategory
  app.delete(route + '/amenity/:id/delete', passport.authenticate('jwt', { session: false }), amenityMiddleware.deleteAmenities, amenityController.deleteAmenities)
  // add amenityCategory
  app.post(route + '/amenity/add', passport.authenticate('jwt', { session: false }), amenityMiddleware.addAmenity, amenityController.addAmenity)
  // get  PropertyCategory
  app.get(route + '/amenity/categoryamenity', passport.authenticate('jwt', { session: false }), amenityMiddleware.validateGetCategoryAmenity, amenityController.getCategoryAmenity)
  // put PropertyCategory
  app.put(route + '/amenity/update/:id', passport.authenticate('jwt', { session: false }), amenityMiddleware.updateAmenity, amenityController.updateAmenity)
  // get AmenityProperties
  app.get(route + '/amenity/properties', passport.authenticate('jwt', { session: false }), amenityMiddleware.validateGetAmenityProperty, amenityController.getAmenityProperties)
}
