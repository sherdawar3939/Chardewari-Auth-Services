'use strict'

const propertyInsightMiddleware = require('../middlewares/propertyInsight.middleware')
const propertyInsightController = require('../controllers/propertyInsight.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion + '/propertyInsight'

  // Post propertyInsight
  app.post(route, propertyInsightMiddleware.validatePostPropertyInsight, propertyInsightController.postPropertyInsight)
  // Get propertyInsight
  app.get(route + '/views/:id', passport.authenticate('jwt', {
    session: false
  }), propertyInsightMiddleware.propertyViews, propertyInsightController.getPropertyViews)

  // Get propertyInsight
  app.get(route + '/visitors/:id', passport.authenticate('jwt', {
    session: false
  }), propertyInsightMiddleware.getPropertyVisitor, propertyInsightController.getPropertyVisitor)
}
