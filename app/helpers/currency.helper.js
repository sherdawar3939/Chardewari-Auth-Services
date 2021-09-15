'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('../helpers/general.helper')

// ***************************
// To Add New Currency Unit
// ***************************

function addCurrency (data) {
  return db.Currency.findOne({
    where: { name: data.name },
    attributes: ['id', 'name', 'nameL1', 'code', 'codeL1', 'symbol', 'rate', 'symbol']
  })
    .then((response) => {
      if (response) {
        return generalHelpingMethods.rejectPromise([{
          field: 'name',
          error: 1575,
          message: 'Name Already Exist'
        }])
      }
      return db.Currency.create(data)
    })
}

// ********************
// Get Currency Unit
// ********************

function getCurrency (conditions) {
  conditions.isDeleted = false
  // Check if Currency exist in conditions
  return db.Currency.findAll({
    where: conditions,
    attributes: ['id', 'name', 'nameL1', 'code', 'codeL1', 'symbol', 'rate']
  })
}

// ****************************
// Update Currency Unit Info
// ****************************

function updateCurrency (data, id) {
  return db.Currency.findOne({ where: { id: id.id },
    attributes: ['id', 'name', 'nameL1', 'code', 'codeL1', 'symbol', 'rate'] })
    .then(Currency => {
      if (Currency) {
        return db.Currency.update(data, { where: { id: id.id } })
      }
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1575,
        message: 'No Information found against given id.'
      }])
    })
}
// ************************
// Delete Currency Unit
// ************************

const deleteCurrency = (input) => {
  return db.Currency.findOne({
    where: {
      id: input.id,
      isDeleted: false
    },
    attributes: ['id', 'name', 'nameL1', 'code', 'codeL1', 'symbol', 'rate']
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
      // employee found, change symbol of isDeleted to true
      result.isDeleted = true
      // save employee
      result.save()
      return true
    })
}

module.exports = {
  addCurrency,
  getCurrency,
  updateCurrency,
  deleteCurrency
}
