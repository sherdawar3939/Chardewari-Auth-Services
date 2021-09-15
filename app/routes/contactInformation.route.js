'use strict'
const contactInformationMiddleware = require('../middlewares/contactInformation.middleware')
const contactInformationController = require('../controllers/contactInformation.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Areas By specific City
  app.post(route + '/contact/add', passport.authenticate('jwt', { session: false }), contactInformationMiddleware.validatePostContactInformation, contactInformationController.addContactInformation)
  // To Get Contact By UserId
  app.get(route + '/contact', passport.authenticate('jwt', { session: false }), contactInformationMiddleware.validateGetContactInformation, contactInformationController.getContactInformation)
  // To Update contactInfo
  app.put(route + '/contact/update/:id', passport.authenticate('jwt', { session: false }), contactInformationMiddleware.updateContactInformation, contactInformationController.updateContactInformation)
  // To Update contactInfo
  app.get(route + '/contact/details/:id', passport.authenticate('jwt', { session: false }), contactInformationMiddleware.detailContactInformation, contactInformationController.validateDetailContactInformation)
  // To Delete Contact Information
  app.delete(route + '/contact/:id', passport.authenticate('jwt', { session: false }), contactInformationMiddleware.validateDeleteContactInformation, contactInformationController.validateDeleteContactInformation)
}
