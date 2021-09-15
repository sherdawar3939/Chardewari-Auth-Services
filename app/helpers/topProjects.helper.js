'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// **********************
// Add New TOpProjects
// **********************

function addTopProject (data) {
  if (data.isApproved) {
    data.isApproved = (data.isApproved === 'Yes')
  }
  if (data.showOnHome) {
    data.showOnHome = (data.showOnHome === 'true' || data.showOnHome === true)
  }
  return db.CompanyProfile.findOne({ where: { id: data.CompanyProfileId } })
    .then((response) => {
      if (response) {
        return db.TopProject.findAll({ where: { LaunchingId: data.LaunchingId } })
          .then((response) => {
            if (response.length) {
              // FeaturedAgency Already Exist, return error
              return generalHelpingMethods.rejectPromise([{
                field: 'id',
                error: 1576,
                message: 'FeaturedProperty Already Exist, Please Update Status'
              }])
            }
            return db.TopProject.create(data)
          })
      }
      // FeaturedAgency Already Exist, return error
      return generalHelpingMethods.rejectPromise([{
        field: 'CompanyProfileId',
        error: 1575,
        message: 'CompanyProfile Does Not Exist, Please Add One To Featured it..'
      }])
    })
}

// ************************************************
// To Get TopProjects
// ************************************************

function getTopProject (conditions, project, limit, offset) {
  conditions.isDeleted = false

  if (conditions.showOnHome) {
    conditions.showOnHome = (conditions.showOnHome === 'true')
  }
  if (conditions.status) {
    conditions.status = (conditions.status === 'true')
  }
  if (conditions.isApproved) {
    conditions.isApproved = (conditions.isApproved === 'true')
  }
  if (project.isProject) {
    project.isProject = (project.isProject === 'true')
  }
  if (project.title) {
    project.title = {
      [Op.like] : `%` + project.title + `%`
    }
  }

  return db.TopProject.findAndCountAll({
    where: conditions,
    attributes: ['id', 'status', 'startDate', 'isApproved', 'endDate', 'CompanyProfileId'],
    include: [{
      model: db.Launching,
      as: 'relatedTopProjectsLaunching',
      where: project
    }],
    limit: 6
  })
}

// ********************
// Delete TopProjects
// ********************

const deleteTopProject = (input) => {
  return db.TopProject.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // TopProject not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // TopProject found, change value of isDeleted to true
      result.isDeleted = true
      // save TopProject
      result.save()
      return true
    })
}

// ***********************************
//  Update Home Featured Projects
// ***********************************

function updateTopProject (data, user) {
  return db.TopProject.findOne({ where: {
    id: data.id
  }
  }).then((result) => {
    if (result) {
      db.TopProject.update(
        data,
        { where: { id: data.id } }
      )
      if (data.approve) {
        const obj = {
          TopProjectId: data.id,
          UserId: user.id,
          approvedByName: user.name,
          status: data.status
        }
        return db.TopProjectsHistory.create(obj)
      }
    }
  })
}

function getTopProjectHistory (conditions, limit, offset) {
  return db.TopProjectsHistory.findAll({
    where: conditions,
    limit,
    offset
  })
}

module.exports = {
  addTopProject,
  getTopProject,
  deleteTopProject,
  updateTopProject,
  getTopProjectHistory
}
