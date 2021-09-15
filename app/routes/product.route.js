'use strict'

const productMiddleware = require('../middlewares/product.middleware')
const productController = require('../controllers/product.controller')
const passport = require('../config/passport')
const generalMiddleware = require('../middlewares/general.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // Add Product
  app.post(route + '/products/add', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, productMiddleware.validateAddProducts, productController.addProduct)

  // search product
  app.get(route + '/products/', passport.authenticate('jwt', { session: false }), productMiddleware.validateSearchProducts, productController.searchProducts)

  // update product
  app.put(route + '/products/update/:id', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, productMiddleware.validateUpdateProduct, productController.updateProduct)

  // delete product
  app.delete(route + '/products/:id/delete', passport.authenticate('jwt', { session: false }), productMiddleware.validateDeleteProduct, productController.deleteProduct)

  // To Get Product Details Against Given Id
  app.get(route + '/products/details/:id', passport.authenticate('jwt', { session: false }), productMiddleware.validateGetProduct, productController.getProductDetails)
}
