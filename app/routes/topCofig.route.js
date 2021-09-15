'use strict'
const topConfigMiddleware = require('../middlewares/topConfig.middleware')
const topConfigController = require('../controllers/topConfig.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To Get all
  app.get(route + '/topconfig', passport.authenticate('jwt', { session: false }), topConfigController.getTopConfig)
  // To Get Detail
  app.get(route + '/topconfig/details/:id', passport.authenticate('jwt', { session: false }), topConfigMiddleware.validateGetDetail, topConfigController.getTopConfigDetail)
  // To Update
  app.put(route + '/topconfig/update/:id', passport.authenticate('jwt', { session: false }), topConfigMiddleware.updateTopConfig, topConfigController.updateTopConfig)
  // To Update
  app.put(route + '/topconfig/banner/update/:id', passport.authenticate('jwt', { session: false }), topConfigMiddleware.updateBannerConfig, topConfigController.updateBannerConfig)
  // To Get all
  app.get(route + '/topconfig/banner', passport.authenticate('jwt', { session: false }), topConfigController.getBannerConfig)
  // To Get Detail
  app.get(route + '/topconfig/banner/details/:id', passport.authenticate('jwt', { session: false }), topConfigMiddleware.validateGetBannerDetail, topConfigController.getBannerConfigDetail)
}
