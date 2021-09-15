'use strict'
const companyOfficeMiddleware = require('../middlewares/companyOffice.middleware')
const companyOfficeController = require('../controllers/companyOffice.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post CompanyOffice and Update
  app.post(route + '/companyoffice/add', passport.authenticate('jwt', { session: false }), companyOfficeMiddleware.validatePostCompanyOffice, companyOfficeController.addCompanyOffice)
  // To Get Company Office
  app.get(route + '/companyoffice', passport.authenticate('jwt', { session: false }), companyOfficeMiddleware.validateGetCompanyProfile, companyOfficeController.getCompanyOffice)
  // To Delete Company Office
  app.delete(route + '/companyoffice/delete/:id', passport.authenticate('jwt', { session: false }), companyOfficeMiddleware.validateDeleteCompanyOffice, companyOfficeController.validateDeleteCompanyOffice)
}
