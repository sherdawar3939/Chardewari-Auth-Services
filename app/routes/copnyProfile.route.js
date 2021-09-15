'use strict'
const companyProfileMiddleware = require('../middlewares/companyProfile.middleware')
const companyProfileController = require('../controllers/companyProfile.controller')
const generalMiddleware = require('../middlewares/general.middleware')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To Post and Update CompanyProfile  By specific City
  app.post(route + '/companyprofile', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, companyProfileMiddleware.validatePostCompanyProfile, companyProfileController.addCompanyProfile)
  // To Get CompanyProfile
  app.get(route + '/companyprofile', passport.authenticate('jwt', { session: false }), companyProfileMiddleware.validateGetCompanyProfile, companyProfileController.getCompanyProfile)
  // To Get CompanyProfileDetails
  app.get(route + '/companyprofile/details/:id', passport.authenticate('jwt', { session: false }), companyProfileMiddleware.validateGetCompanyProfileDetails, companyProfileController.getCompanyProfileDetails)
  // To Get CompanyProfileDetails
  app.get(route + '/companyprofile/user', passport.authenticate('jwt', { session: false }), companyProfileMiddleware.validateGetUserCompanyProfile, companyProfileController.userCompanyProfile)
}
