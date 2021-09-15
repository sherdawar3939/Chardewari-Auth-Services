'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('../helpers/general.helper')

// ***************************
// To Add New Service Category
// ***************************

function addServiceCategory (data) {
  let newServiceCategory = db.ServiceCategory.build(data)
  return newServiceCategory.save()
}
// ********************
// Get Service Category
// ********************

function getServiceCategory (conditions) {
  // Check if ServiceCategory exist in conditions
  return db.ServiceCategory.findAll({
    where: conditions
  })
}

// ****************************
// Update ServiceCategory Info
// ****************************

function updateServiceCategory (data, categoryId) {
  return db.ServiceCategory.findOne({ where: { id: categoryId } })
    .then(serviceCategory => {
      if (serviceCategory) {
        return db.ServiceCategory.update(data, { where: { id: categoryId } })
      }
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1575,
        message: 'No Information found against given id.'
      }])
    })
}
// ************************
// Delete product Category
// ************************

const deleteServiceCategory = (input) => {
  return db.ServiceCategory.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // Category not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // Category found, change value of isDeleted to true
      result.isDeleted = true
      // save Category
      result.save()
      return true
    })
}

module.exports = {
  addServiceCategory,
  getServiceCategory,
  updateServiceCategory,
  deleteServiceCategory
}
