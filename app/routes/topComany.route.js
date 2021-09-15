'use strict'
const topCompanyMiddleware = require('../middlewares/topCompany.middleware')
const topCompanyController = require('../controllers/topCompany.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Home Features
  app.post(route + '/topcompany/add', passport.authenticate('jwt', { session: false }), topCompanyMiddleware.validateAddTopCompany, topCompanyController.addTopCompany)
  // To Get all Details
  app.get(route + '/topcompany', passport.authenticate('jwt', { session: false }), topCompanyMiddleware.validateGetTopCompany, topCompanyController.getTopCompany)
  // to Delete
  app.delete(route + '/topcompany/delete/:id', passport.authenticate('jwt', { session: false }), topCompanyMiddleware.validateDeleteTopCompany, topCompanyController.validateDeleteTopCompany)
  // to update
  app.put(route + '/topcompany/update/:id', passport.authenticate('jwt', { session: false }), topCompanyMiddleware.validateUpdateTopCompany, topCompanyController.updateTopCompany)
  // to Get History
  app.get(route + '/topcompany/history/:id', passport.authenticate('jwt', { session: false }), topCompanyMiddleware.validateGetTopCompanyHistory, topCompanyController.getTopCompanyHistory)
}
