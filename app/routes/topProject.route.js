'use strict'
const topProjectsMiddleware = require('../middlewares/topProject.middleware')
const topProjectsController = require('../controllers/topProject.controller')
const passport = require('../config/passport')

module.exports = function (app, apiVersion) {
  const route = apiVersion
  // To post Home Features
  app.post(route + '/topproject/add', passport.authenticate('jwt', { session: false }), topProjectsMiddleware.validateAddTopProjects, topProjectsController.addTopProject)
  // To Get all Details
  app.get(route + '/topproject', passport.authenticate('jwt', { session: false }), topProjectsMiddleware.validateGetTopProjects, topProjectsController.getTopProject)
  // to Delete
  app.delete(route + '/topproject/delete/:id', passport.authenticate('jwt', { session: false }), topProjectsMiddleware.validateDeleteTopProjects, topProjectsController.validateDeleteTopProject)
  // to update
  app.put(route + '/topproject/update/:id', passport.authenticate('jwt', { session: false }), topProjectsMiddleware.validateUpdateTopProjects, topProjectsController.updateTopProject)
  // To Get History
  app.get(route + '/topproject/history/:id', passport.authenticate('jwt', { session: false }), topProjectsMiddleware.validateGetTopProjectHistory, topProjectsController.getTopProjectHistory)
}
