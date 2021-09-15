'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const _ = require('lodash')

// *******************************
// To Get Property Meta
// *******************************

function getPropertyMeta (conditions) {
  // Check if page Meta exist in conditions
  return db.PropertyMeta.findAll({
    where: conditions
  })
}

// ***********************
// To updatePropertyMeta
// ***********************

function updatePropertyMeta (data, id) {
  let Id = Number(id.id)
  return db.PropertyMeta.findAll({
    where: { PropertyId: Id }
  })
    .then((response) => {
      if (!response) {
        // Meta not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'PropertyMeta not found.'
        }])
      }
      // if id given then update else create new record
      for (let i = 0; i < data.meta.length; i++) {
        let objData = data.meta[i]
        if (objData.id) {
          db.PropertyMeta.update(objData, { where: { id: objData.id } })
        } else {
          objData.PropertyId = Id
          db.PropertyMeta.create(objData)
        }
      }
      if (data.deletedMeta.length) {
        db.PropertyMeta.destroy({ where: { id: data.deletedMeta } })
      }
    })
}

module.exports = {
  getPropertyMeta,
  updatePropertyMeta
}
