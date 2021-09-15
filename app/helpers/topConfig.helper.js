'use strict'

const db = require('../config/sequelize.config')
const generalHelpingMethods = require('../helpers/general.helper')

// ********************
// Get Top Config
// ********************

function getTopConfig () {
  // Check if Top Config exist in conditions
  return db.TopConfig.findAll()
}

// ********************
// Get Top Config Detail
// ********************

function getTopConfigDetail (id) {
  // Check if Top Config exist in conditions
  return db.TopConfig.findOne({
    where: { id: id.id }
  })
}

// ****************************
// Update TopConfig
// ****************************

function updateTopConfig (data, id) {
  return db.TopConfig.findOne({ where: { id: id } })
    .then(topConfig => {
      if (!topConfig) {
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      return db.TopConfig.update(data, { where: { id: id } })
    })
}

// ********************
// Get Banner Config
// ********************

function getBannerConfig () {
  // Check if Top Config exist in conditions
  return db.BannerType.findAll()
}

// ********************
// Get Banner Config Detail
// ********************

function getBannerConfigDetail (id) {
  // Check if Top Config exist in conditions
  return db.BannerType.findOne({
    where: { id: id.id }
  })
}

// ****************************
// Update Banner Config
// ****************************

function updateBannerConfig (data, id) {
  return db.BannerType.findOne({ where: { id: id } })
    .then(topConfig => {
      if (!topConfig) {
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      return db.BannerType.update(data, { where: { id: id } })
    })
}

module.exports = {
  updateTopConfig,
  getTopConfig,
  getTopConfigDetail,
  updateBannerConfig,
  getBannerConfigDetail,
  getBannerConfig
}
