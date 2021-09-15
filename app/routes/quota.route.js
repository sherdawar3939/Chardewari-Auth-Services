'use strict'

const passport = require('../config/passport')
const quotaController = require('../controllers/quota.controller')

module.exports = function (app, apiVersion) {
  const route = apiVersion + '/quota'

  // get ListingType quota
  app.get(route + '/listingtype', passport.authenticate('jwt', {
    session: false
  }), quotaController.getListingTypeQuota)

  // get TopAgency quota
  app.get(route + '/agency', passport.authenticate('jwt', {
    session: false
  }), quotaController.getAgencyQuota)

  // get TopProperty quota
  app.get(route + '/property', passport.authenticate('jwt', {
    session: false
  }), quotaController.getTopPropertyQuota)

  // get TopProjects quota
  app.get(route + '/project', passport.authenticate('jwt', {
    session: false
  }), quotaController.getTopProjectQuota)

  // get TopLaunchings quota
  app.get(route + '/launching', passport.authenticate('jwt', {
    session: false
  }), quotaController.getTopLaunchingQuota)

  // get Banner quota
  app.get(route + '/banner', passport.authenticate('jwt', {
    session: false
  }), quotaController.getBannerQuota)
}
