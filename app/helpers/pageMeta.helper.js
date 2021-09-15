'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const _ = require('lodash')

// *******************************
// To Get Page Meta
// *******************************

function getPageMeta (conditions) {
  // Check if page Meta exist in conditions
  return db.PageMeta.findAll({
    where: conditions
  })
}

// ********************
// To Update Page Meta
// ********************

function updatePageMeta (data, id) {
  return db.PageMeta.findOne({
    where: { id: id.id }
  }).then(async (propertyCategory) => {
    if (_.isEmpty(propertyCategory)) {
      // PageMeta not found, return error
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1572,
        message: 'PageMeta not found.'
      }])
    }
    propertyCategory.set(data)
    propertyCategory.save()
  })
}

module.exports = {
  getPageMeta,
  updatePageMeta
}
