'use strict'
const propertyCategoryMiddleware = require('../middlewares/propertyCategory.middleware')
const propertyCategoryController = require('../controllers/propertyCategory.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // To get PropertyCategory
  app.get(route + '/property/category', passport.authenticate('jwt', { session: false }), propertyCategoryMiddleware.validateGetPropertyCategory, propertyCategoryController.getPropertyCategories)

  // To get PropertyCategory
  app.post(route + '/property/category/add', passport.authenticate('jwt', { session: false }), propertyCategoryMiddleware.validateAddPropertyCategory, propertyCategoryController.addPropertyCategory)

  // To get PropertyCategory
  app.get(route + '/property/category/:id', passport.authenticate('jwt', { session: false }), propertyCategoryMiddleware.validateGetPropertyCategoryById, propertyCategoryController.getPropertyCategoriesById)

  // To get PropertyCategory
  app.put(route + '/property/category/update/:id', passport.authenticate('jwt', { session: false }), propertyCategoryMiddleware.validateUpdatePropertyCategory, propertyCategoryController.updatePropertyCategory)
}
