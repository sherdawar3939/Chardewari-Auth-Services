'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// ***********************************
// Add New Home Featured Property
// ***********************************

function addTopProperty (data) {
  if (data.isApproved) {
    data.isApproved = (data.isApproved === 'yes')
  }

  if (data.status) {
    data.status = (data.status === 'Yes')
  }

  return db.TopProperty.findAll({ where: { PropertyId: data.PropertyId } })
    .then((response) => {
      if (response.length) {
        // FeaturedProperty Already Exist, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'FeaturedProperty Already Exist, Please Update Status'
        }])
      }
      return db.TopProperty.create(data)
        .then(async (insertedTopProperty) => {
          // add areas
          const areaIds = data.AreaIds
          const propertyAreas = []
          for (let i = 0; i < areaIds.length; i++) {
            propertyAreas.push({
              TopPropertyId: insertedTopProperty.id,
              AreaId: areaIds[i]
            })
          }
          db.TopPropertyArea.bulkCreate(propertyAreas)
          return insertedTopProperty.save()
        })
    })
}

// ************************************************
// To Get Home Featured Property
// ************************************************

function getTopProperty (conditions, property, limit, offset) {
  conditions.isDeleted = false
  limit = Number(limit)

  if (conditions.showOnHome) {
    conditions.showOnHome = (conditions.showOnHome === 'true')
  }

  if (conditions.status) {
    conditions.status = (conditions.status === 'true')
  }

  if (conditions.isApproved) {
    conditions.isApproved = (conditions.isApproved === 'true')
  }

  if (property.title) {
    property.title = {
      [Op.like] : `%` + property.title + `%`
    }
  }

  return db.TopProperty.findAll({
    where: conditions,
    limit: limit,
    include: [{
      model: db.Property,
      as: 'relatedHomeFeaturedProperties',
      where: property,
      include: [{
        model: db.AmenityProperty,
        as: 'propertyAmenities',
        attributes: ['title', 'titleL1'],
        through: {
          attributes: ['value']
        }
      }, {
        model: db.PropertyCategory,
        as: 'categories',
        attributes: ['title', 'titleL1']
      }]
    },
    {
      model: db.CompanyProfile,
      as: 'CompanyFeatured',
      attributes: ['id', 'logo']
    }]
  })
}

function getTopPropertyHistory (conditions) {
  return db.TopPropertyHistory.findAll({
    where: conditions
  })
}
// ********************
// Delete HFP
// ********************

const deleteTopProperty = (input) => {
  return db.TopProperty.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // HomeFeaturedProperty not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // HomeFeaturedProperty found, change value of isDeleted to true
      result.isDeleted = true
      // save HomeFeaturedProperty
      result.save()
      return true
    })
}

// ***********************************
//  Update Home Featured Property
// ***********************************

function updateTopProperty (data, user) {
  return db.TopProperty.findOne({ where: {
    id: data.id
  }
  }).then((result) => {
    if (result) {
      db.TopProperty.update(
        data,
        { where: { id: data.id } }
      )
      if (data.approve) {
        const obj = {
          TopPropertyId: data.id,
          UserId: user.id,
          approvedByName: user.name,
          status: data.status
        }
        return db.TopPropertyHistory.create(obj)
      }
    }
  })
}

module.exports = {
  addTopProperty,
  getTopProperty,
  deleteTopProperty,
  updateTopProperty,
  getTopPropertyHistory
}
