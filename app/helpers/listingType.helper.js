'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')

// ***************************
// To Add listing Type
// ***************************

function addListingType (data) {
  return db.ListingType.findOne({
    where: {
      title: data.title
    }
  }).then((response) => {
    if (response) {
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1577,
        message: 'Listing-Type Already Exist'
      }])
    }
    return db.ListingType.findOne({
      where: {
        priority: data.priority
      }
    })
  })
    .then((res) => {
      if (res) {
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1578,
          message: 'Priority Already Exist'
        }])
      }
      return db.ListingType.create(data)
    })
}

// ***********************************
//  Update Listing Type
// ***********************************

function updateListingType (data) {
  return db.ListingType.findOne({
    where: {
      id: data.id
    }
  }).then((result) => {
    if (result) {
      return db.ListingType.update(
        data,
        { where: { id: data.id } }
      )
    }
    return generalHelpingMethods.rejectPromise([{
      field: 'id',
      error: 1575,
      message: 'No Information found against given id.'
    }])
  })
}

// ********************
// To Get listing Type
// ********************

function getListingType (conditions) {
  conditions.isDeleted = false
  return db.ListingType.findAll({
    where: conditions,
    include: [
      {
        model: db.User,
        as: 'userListingType',
        attributes: ['name'],
        through: {
          attributes: ['UserId', 'ListingTypeId', 'quantity', 'expiry']
        }
      }
    ]
  }).then((res) => {
    return res
  })
}

// ********************
// Delete
// ********************

const deleteListingType = (input) => {
  return db.ListingType.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
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
  addListingType,
  updateListingType,
  getListingType,
  deleteListingType
}
