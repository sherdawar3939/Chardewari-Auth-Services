'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('../helpers/general.helper')

// ********************
// To Add New Property
// *******************

function addContactInformation (data) {
  console.log('***********************', data)
  let newContact = db.ContactInformation.build(data)
  return newContact.save()
}

// ********************
// Get Contact Info
// ********************

function getContactInformation (conditions) {
  conditions.isDeleted = false
  // Check if Area exist in conditions
  return db.ContactInformation.findAll({
    where: conditions
  })
}

// ********************
// Update Contact Info
// ********************

function updateContactInformation (data, param) {
  const id = param.id
  if (!data.fax) {
    data.fax = ''
  }
  return db.ContactInformation.findOne({
    where: {
      id: id
    }
  })
    .then((result) => {
      if (result) {
        return db.ContactInformation.update(
          data, { where: { id: id } }
        )
      }
    })
}

// ********************
// Delete Contact Info
// ********************

const deleteContactInformation = (input) => {
  return db.ContactInformation.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // contactInfo not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // contactInfo found, change value of isDeleted to true
      result.isDeleted = true
      // save contactInfo
      result.save()
      return true
    })
}

// ********************
// Details Contact Info
// ********************

const detailContactInformation = (input) => {
  return db.ContactInformation.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
}
module.exports = {
  detailContactInformation,
  addContactInformation,
  getContactInformation,
  updateContactInformation,
  deleteContactInformation
}
