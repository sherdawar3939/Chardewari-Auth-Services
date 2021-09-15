'use strict'
const productUnitMiddleware = require('../middlewares/productUnit.middleware')
const productUnitController = require('../controllers/productUnit.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Areas By specific City
  app.post(route + '/productunit/add', passport.authenticate('jwt', { session: false }), productUnitMiddleware.validatePostProductUnit, productUnitController.addProductUnit)
  // To Get Product Category
  app.get(route + '/productunit', passport.authenticate('jwt', { session: false }), productUnitMiddleware.validateGetProductUnit, productUnitController.getProductUnit)
  // To Update ProductCategory
  app.put(route + '/productunit/update/:id', passport.authenticate('jwt', { session: false }), productUnitMiddleware.validateUpdateProductUnit, productUnitController.updateProductUnit)
  // To Delete ProductCategory
  app.delete(route + '/productunit/:id/delete', passport.authenticate('jwt', { session: false }), productUnitMiddleware.validateDeleteProductUnit, productUnitController.deleteProductUnit)
}
