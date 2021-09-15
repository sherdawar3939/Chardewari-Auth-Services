'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const _ = require('lodash')

// *******************************
// To Get property Category
// *******************************

function getPropertyCategory (conditions) {
  // Check if Category exist in conditions
  return db.PropertyCategory.findAll({
    where: conditions
  })
}

// *******************************
// To Get property Category By Id
// *******************************

function getPropertyCategoriesById (conditions) {
  // Check if Category exist in conditions
  return db.PropertyCategory.findOne({
    where: { id: conditions.id }
  })
}

// *******************************
// To Add property Category
// *******************************

function addPropertyCategory (data) {
  console.log(data)
  return db.PropertyCategory.create(data)
    .then((insertedData) => {
      if (data.ParentCategoryId) {
        insertedData.level = 2
      } else {
        insertedData.level = 1
      }
      insertedData.slug = data.title
      insertedData.save()
    })
}

// *******************************
// To Update property Category
// *******************************

function updatePropertyCategory (data, id) {
  console.log(data)
  return db.PropertyCategory.findOne({
    where: { id: id.id }
  }).then(async (propertyCategory) => {
    if (_.isEmpty(propertyCategory)) {
      // User not found, return error
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1572,
        message: 'Category not found.'
      }])
    }
    if (data.title) {
      data.slug = data.title
      if (data.ParentCategoryId) {
        propertyCategory.level = 2
      } else {
        propertyCategory.level = 1
      }
      propertyCategory.set(data)
      propertyCategory.save()
    }
  })
}

module.exports = {
  getPropertyCategory,
  getPropertyCategoriesById,
  addPropertyCategory,
  updatePropertyCategory
}
