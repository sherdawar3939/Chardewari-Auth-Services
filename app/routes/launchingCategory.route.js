'use strict'
const launchingCategoryMiddleware = require('../middlewares/launchingCategory.middleware')
const launchingCategoryController = require('../controllers/launchingCategory.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // To get PropertyCategory
  app.get(route + '/launching/category', passport.authenticate('jwt', { session: false }), launchingCategoryMiddleware.validateGetLaunchingCategory, launchingCategoryController.getLaunchingCategories)
}
