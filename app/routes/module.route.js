'use strict'
const moduleMiddleware = require('../middlewares/module.middleware')
const moduleController = require('../controllers/module.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // To get PropertyCategory
  app.get(route + '/module', passport.authenticate('jwt', { session: false }), moduleMiddleware.validateGetModule, moduleController.getModules)
}
