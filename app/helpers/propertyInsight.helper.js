'use strict'
const db = require('../config/sequelize.config')
const _ = require('lodash')
const Sequelize = require('sequelize')

// *******************************
// To Post Property Insight
// *******************************

async function postPropertyInsight (data) {
  return db.PropertyInsights.create(data)
    .then((createdPropertyInsight) => {
      if (createdPropertyInsight) {
        return db.Session.findOne({
          where: { identifier: data.identifier }
        })
          .then((resp) => {
            if (resp) {
              createdPropertyInsight.SessionId = resp.id
              createdPropertyInsight.save()
            }
          })
      }
    })
}

// ***************************
// Property Views
// ***************************

const getPropertyViews = (id) => {
  return db.PropertyInsights.findAndCountAll({
    where: {
      PropertyId: id.id
    },
    group: ['createdAt'],
    raw: true
  })
}

// ***************************
// Property Total Visitors
// ***************************

const getPropertyVisitor = (id) => {
  return db.PropertyInsights.count({
    where: {
      PropertyId: id.id
    },
    distinct: true,
    col: 'SessionId',
    group: ['createdAt'],
    order: [
      ['createdAt', 'DESC']
    ]
  })
}

module.exports = {
  postPropertyInsight,
  getPropertyViews,
  getPropertyVisitor
}
