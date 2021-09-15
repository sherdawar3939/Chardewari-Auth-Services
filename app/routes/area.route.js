'use strict'
const areaMiddleware = require('../middlewares/area.middleware')
const areaController = require('../controllers/area.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To get Areas By specific City
  app.get(route + '/area', passport.authenticate('jwt', { session: false }), areaMiddleware.validateGetArea, areaController.getArea)
  // area/cities?
  app.get(route + '/area/cities', passport.authenticate('jwt', { session: false }), areaMiddleware.validateGetAreaCities, areaController.getAreaCities)
  // area/cities?
  app.post(route + '/area/add', passport.authenticate('jwt', { session: false }), areaMiddleware.validatePostArea, areaController.addArea)
  // to Update Area
  app.put(route + '/area/update/:id', passport.authenticate('jwt', { session: false }), areaMiddleware.validatePutArea, areaController.updateArea)
  // to Delete Area
  app.delete(route + '/area/:id/delete', passport.authenticate('jwt', { session: false }), areaMiddleware.validateDelete, areaController.deleteArea)
}
