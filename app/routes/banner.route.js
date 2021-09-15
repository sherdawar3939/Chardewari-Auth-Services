'use strict'
const bannerMiddleware = require('../middlewares/banner.middleware')
const bannerController = require('../controllers/banner.controller')
const generalMiddleware = require('../middlewares/general.middleware')

const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To Post Banner
  app.post(route + '/banner', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, bannerMiddleware.validatePostBanner, bannerController.addBanner)
  // To Get Banner By id
  app.get(route + '/banner', passport.authenticate('jwt', { session: false }), bannerMiddleware.validateGetBanner, bannerController.getBanner)
  // To Get Banner By id
  app.get(route + '/banner/type', passport.authenticate('jwt', { session: false }), bannerMiddleware.validateGetBannerTypes, bannerController.getBannerTypes)
  // To Update Status
  app.put(route + '/banner/status/:id', passport.authenticate('jwt', { session: false }), bannerMiddleware.validateUpdateBanner, bannerController.updateBannerStatus)
}
