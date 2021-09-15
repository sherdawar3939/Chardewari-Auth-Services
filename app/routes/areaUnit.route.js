'use strict'
const areaUnitMiddleware = require('../middlewares/areaUnit.middleware')
const areaUnitController = require('../controllers/areaUnit.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To get areaUnits By specific City
  app.get(route + '/area-unit', passport.authenticate('jwt', { session: false }), areaUnitMiddleware.validateGetAllUnits, areaUnitController.getAllUnits)
}
