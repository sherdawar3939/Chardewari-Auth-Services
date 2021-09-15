'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const topProjectHelper = require('../helpers/topProjects.helper')
const StandardError = require('standard-error')
const generalController = require('./general.controller')

// ***********************************
// Add New Home top projects
// ***********************************

const addTopProject = function (req, res) {
  return topProjectHelper.addTopProject(req.conditions)
    .then(function (data) {
      generalController.successResponse(res, 'TopProject added successfully.', data, 'TopProject.controller.addTopProject')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'TopProject.controller.addTopProject', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'TopProject.controller.addTopProject', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// Update Home Featured projects
// ***********************************

const updateTopProject = function (req, res) {
  return topProjectHelper.updateTopProject(req.conditions, req.users)
    .then(function (data) {
      generalController.successResponse(res, 'updateTopProject Updated  successfully.', data, 'TopProject.controller.updateTopProject')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'TopProject.controller.updateTopProject', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'TopProject.controller.updateTopProject', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const getTopProject = function (req, res) {
  return topProjectHelper.getTopProject(req.conditions, req.project, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'TopProject fetch successfully.', data, 'TopProject.controller.getTopProject')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'TopProject.controller.getTopProject', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'TopProject.controller.getTopProject', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Delete
// ***********************************
const validateDeleteTopProject = (req, res) => {
  return topProjectHelper.deleteTopProject(req.params)
    .then(function (data) {
      generalController.successResponse(res, 'topProject deleted successfully', data, 'topProject.controller.validateDeleteTopProject')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topProject.controller.validateDeleteTopProject', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topProject.controller.validateDeleteTopProject', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}

// ***********************************
// To Get History
// ***********************************

const getTopProjectHistory = function (req, res) {
  return topProjectHelper.getTopProjectHistory(req.conditions, req.limit, req.offset)
    .then(function (data) {
      generalController.successResponse(res, 'top Top Project History fetch successfully.', data, 'topProject.controller.getTopProjectHistory')
    }).catch(StandardError, function (err) {
      generalController.errorResponse(res, err, null, 'topProject.controller.getTopProjectHistory', SERVER_RESPONSE.VALIDATION_ERROR)
    }).catch(function (err) {
      generalController.errorResponse(res, err, 'Please check originalError for details', 'topProject.controller.getTopProjectHistory', SERVER_RESPONSE.INTERNAL_SERVER_ERROR)
    })
}
module.exports = {
  addTopProject,
  updateTopProject,
  getTopProject,
  validateDeleteTopProject,
  getTopProjectHistory
}
