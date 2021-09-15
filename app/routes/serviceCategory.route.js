'use strict'
const serviceCategoryMiddleware = require('../middlewares/serviceCategory.middleware')
const serviceCategoryController = require('../controllers/serviceCategory.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post ServiceCategory
  app.post(route + '/servicecategory/add', passport.authenticate('jwt', { session: false }), serviceCategoryMiddleware.validatePostServiceCategory, serviceCategoryController.addServiceCategory)
  // To Get Service Category
  app.get(route + '/servicecategory', passport.authenticate('jwt', { session: false }), serviceCategoryMiddleware.validateGetServiceCategory, serviceCategoryController.getServiceCategory)
  // To Update ServiceCategory
  app.put(route + '/servicecategory/update', passport.authenticate('jwt', { session: false }), serviceCategoryMiddleware.validateUpdateServiceCategory, serviceCategoryController.updateServiceCategory)
  // To Delete ServiceCategory
  app.delete(route + '/servicecategory/:id', passport.authenticate('jwt', { session: false }), serviceCategoryMiddleware.validateDeleteServiceCategory, serviceCategoryController.deleteServiceCategory)
}
