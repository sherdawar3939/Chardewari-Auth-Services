'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('../helpers/general.helper')

// ***************************
// To Add New Product Unit
// ***************************

function addProductUnit (data) {
  return db.ProductUnit.findOne({
    where: { name: data.name },
    attributes: ['id', 'name', 'nameL1', 'code', 'codeL1', 'value', 'operation', 'ParentId']
  })
    .then((response) => {
      if (response) {
        return generalHelpingMethods.rejectPromise([{
          field: 'name',
          error: 1575,
          message: 'Name Already Exist'
        }])
      }
      return db.ProductUnit.create(data)
    })
}

// ********************
// Get Product Unit
// ********************

function getProductUnit (conditions) {
  conditions.isDeleted = false
  // Check if ProductUnit exist in conditions
  return db.ProductUnit.findAll({
    where: conditions,
    attributes: ['id', 'name', 'nameL1', 'code', 'codeL1', 'value', 'operation', 'ParentId']
  })
}

// ****************************
// Update Product Unit Info
// ****************************

function updateProductUnit (data, id) {
  return db.ProductUnit.findOne({ where: { id: id.id },
    attributes: ['id', 'name', 'nameL1', 'code', 'codeL1', 'value', 'operation', 'ParentId'] })
    .then(ProductUnit => {
      if (ProductUnit) {
        return db.ProductUnit.update(data, { where: { id: id.id } })
      }
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1575,
        message: 'No Information found against given id.'
      }])
    })
}
// ************************
// Delete product Unit
// ************************

const deleteProductUnit = (input) => {
  return db.ProductUnit.findOne({
    where: {
      id: input.id,
      isDeleted: false
    },
    attributes: ['id', 'name', 'nameL1', 'code', 'codeL1', 'value', 'operation', 'ParentId']
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // employee found, change value of isDeleted to true
      result.isDeleted = true
      // save employee
      result.save()
      return true
    })
}

module.exports = {
  addProductUnit,
  getProductUnit,
  updateProductUnit,
  deleteProductUnit
}
