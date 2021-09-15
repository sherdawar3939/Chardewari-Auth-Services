'use strict'
const propertyMetaMiddleware = require('../middlewares/propertyMeta.middleware')
const propertyMetaController = require('../controllers/propertyMeta.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // To get PropertyCategory
  app.get(route + '/metaform', passport.authenticate('jwt', { session: false }), propertyMetaMiddleware.validateGetPropertyMeta, propertyMetaController.getPropertyMeta)
  // To get PropertyCategory
  app.put(route + '/metaform/update/:id', passport.authenticate('jwt', { session: false }), propertyMetaMiddleware.validateUpdateMetaProperty, propertyMetaController.updatePropertyMeta)
}
