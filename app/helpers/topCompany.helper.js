'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// ***********************************
// Add New Top Companies
// ***********************************

function addTopCompany (data) {
  console.log(data)
  if (data.status) {
    data.status = (data.status === 'true' || data.status === true)
  }
  data.approvedById = data.user.id
  data.approvedByName = data.user.name
  return db.CompanyProfile.findOne({ where: { id: data.CompanyProfileId } })
    .then((response) => {
      if (response) {
        return db.TopCompany.findAll({ where: { CompanyProfileId: data.CompanyProfileId } })
          .then((response) => {
            if (response.length) {
              // FeaturedAgency Already Exist, return error
              return generalHelpingMethods.rejectPromise([{
                field: 'id',
                error: 1576,
                message: 'FeaturedAgency Already Exist, Please Update Status'
              }])
            }
            return db.TopCompany.create(data)
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
// To Get topCompanies
// ************************************************

function getTopCompany (conditions, company, limit, offset) {
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

  if (company.name) {
    company.name = {
      [Op.like]: `%` + company.name + `%`
    }
  }

  return db.TopCompany.findAndCountAll({
    where: conditions,
    attributes: ['id', 'status', 'isApproved', 'startDate', 'endDate', 'CompanyProfileId'],
    include: [{
      model: db.CompanyProfile,
      as: 'relatedTopCompany',
      where: company,
      attributes: ['id', 'logo', 'name', 'description']
    },
    {
      model: db.Role,
      as: 'relatedRoleTopCompany'
    }],
    limit
  })
}

// ********************
// Delete TopCompanies
// ********************

const deleteTopCompany = (input) => {
  return db.TopCompany.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // TopCompany not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // TopCompany found, change value of isDeleted to true
      result.isDeleted = true
      // save TopCompany
      result.save()
      return true
    })
}

// ***********************************
//  Update TopCompanies
// ***********************************

function updateTopCompany (data) {
  return db.TopCompany.findOne({ where: {
    id: data.id
  }
  }).then((result) => {
    if (result) {
      db.TopCompany.update(
        data,
        { where: { id: data.id } }
      )
      if (data.approve) {
        const obj = {
          status: data.status,
          UserId: data.user.id,
          approvedByName: data.user.name,
          TopCompanyId: data.id
        }
        db.TopCompanyHistory.create(obj)
      }
    }
  })
}
function getTopCompanyHistory (conditions, limit, offset) {
  return db.TopCompanyHistory.findAll({
    where: conditions,
    limit,
    offset
  })
}

module.exports = {
  addTopCompany,
  getTopCompany,
  getTopCompanyHistory,
  deleteTopCompany,
  updateTopCompany
}
