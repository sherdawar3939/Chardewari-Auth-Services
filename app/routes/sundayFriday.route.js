'use strict'
const offersMiddleware = require('../middlewares/sunfrioffers.middleware')
const offersController = require('../controllers/sunfrioffers.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // To Post SundayFriday Offers
  app.post(route + '/sunfrioffers', passport.authenticate('jwt', { session: false }), offersMiddleware.validatePostSunFriOffers, offersController.addSundayFridayOffers)
  // To Update Status of SundayFriday Offers
  app.put(route + '/sunfrioffers/status/:id', passport.authenticate('jwt', { session: false }), offersMiddleware.validateUpdateOffers, offersController.updateOffersStatus)
  // To Get SundayFriday Offers
  app.get(route + '/sunfrioffers', passport.authenticate('jwt', { session: false }), offersMiddleware.validateGetSunFriOffers, offersController.getSundayFridayOffers)
  // To Update Approve SundayFriday Offers
  app.put(route + '/sunfrioffers/approve/:id', passport.authenticate('jwt', { session: false }), offersMiddleware.validateUpdateApprove, offersController.updateOffersApproved)
}
