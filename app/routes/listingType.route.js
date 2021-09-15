'use strict'
const listingTypeMiddleware = require('../middlewares/listingType.middleware')
const listingTypeController = require('../controllers/listingType.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Listing Type
  app.post(route + '/listingtype/add', passport.authenticate('jwt', { session: false }), listingTypeMiddleware.validatePostListingType, listingTypeController.addListingType)
  // To Update
  app.put(route + '/listingtype/update/:id', passport.authenticate('jwt', { session: false }), listingTypeMiddleware.validateUpdateListingType, listingTypeController.updateListingType)
  // To Get
  app.get(route + '/listingtype', passport.authenticate('jwt', { session: false }), listingTypeMiddleware.validateGetListingType, listingTypeController.getListingType)
  // To Delete
  app.delete(route + '/listingtype/:id', passport.authenticate('jwt', { session: false }), listingTypeMiddleware.validateDeleteListingType, listingTypeController.validateDeleteListingType)
}
