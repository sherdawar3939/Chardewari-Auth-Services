'use strict'
const topPropertyMiddleware = require('../middlewares/topProperty.middleware')
const topPropertyController = require('../controllers/topProperty.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Home Features
  app.post(route + '/topproperty/add', passport.authenticate('jwt', { session: false }), topPropertyMiddleware.validateAddTopProperty, topPropertyController.addTopProperty)
  // To Get History
  app.get(route + '/topproperty/history/:id', passport.authenticate('jwt', { session: false }), topPropertyMiddleware.validateGetTopPropertyHistory, topPropertyController.getTopPropertyHistory)
  // To Get all Details
  app.get(route + '/topproperty', passport.authenticate('jwt', { session: false }), topPropertyMiddleware.validateGetTopProperty, topPropertyController.getTopProperty)
  // to Delete
  app.delete(route + '/topproperty/delete/:id', passport.authenticate('jwt', { session: false }), topPropertyMiddleware.validateDeleteTopProperty, topPropertyController.validateDeleteTopProperty)
  // to update
  app.put(route + '/topproperty/update/:id', passport.authenticate('jwt', { session: false }), topPropertyMiddleware.validateUpdateTopProperty, topPropertyController.updateTopProperty)
}
