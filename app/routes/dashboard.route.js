'use strict'
const dashboardController = require('../controllers/dashboard.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // to get Property Count
  app.get(route + '/dashboard/count', passport.authenticate('jwt', { session: false }), dashboardController.getCount)
  // to get Launchings Count
  app.get(route + '/dashboard/propertycount', passport.authenticate('jwt', { session: false }), dashboardController.getDailyPropertyCount)
  // to get project Count
  app.get(route + '/dashboard/visitor', passport.authenticate('jwt', { session: false }), dashboardController.getWebsiteVisitor)
  // to get Products Count
  app.get(route + '/dashboard/categorycount', passport.authenticate('jwt', { session: false }), dashboardController.getCategoryCount)
  // // to get Services Count
  // app.get(route + '/dashboard/webvisitors', passport.authenticate('jwt', { session: false }), dashboardController.getWebVisitorCount)
  // // to get Products Count
  // app.get(route + '/dashboard/usercount', passport.authenticate('jwt', { session: false }), dashboardController.getUserCount)
}
