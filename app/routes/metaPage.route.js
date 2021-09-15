'use strict'
const metaPageMiddleware = require('../middlewares/metaPage.middleware')
const metaPageController = require('../controllers/pageMeta.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // To Update
  app.put(route + '/metapage/update/:id', passport.authenticate('jwt', { session: false }), metaPageMiddleware.validateUpdateMetaPage, metaPageController.updatePageMeta)
  // To Get
  app.get(route + '/metapage', passport.authenticate('jwt', { session: false }), metaPageMiddleware.validateGetMetaPage, metaPageController.getPageMeta)
}
