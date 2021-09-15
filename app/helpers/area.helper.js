'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const Op = require('sequelize').Op

// *************
// To Get Area
// *************

function getArea (conditions) {
  if (conditions.name) {
    conditions.name = {
      [Op.like] : `%` + conditions.name + `%`
    }
  }
  // Check if Area exist in conditions
  return db.Area.findAll({
    where: conditions,
    order: [
      ['name', 'ASC']
    ]
  })
}

// ******************
// To Get AreaDetail
// ******************

function deleteArea (conditions) {
  // Check if Area exist in conditions
  return db.Area.findOne({
    where: { id: conditions.id }
  })
    .then((response) => {
      if (!response) {
        // Area Not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'slug',
          error: 1574,
          message: 'Area Not Found.'
        }])
      }
      return db.Area.destroy({
        where: { id: conditions.id }
      })
    })
}

// *************************
// To Get area/cities
// *************************

function getAreaCities (conditions, limit, offset) {
  let andConditions = []
  let where = ''
  let baseQuery = 'SELECT `Areas`.*, COUNT(`PropertyHasAreas`.`AreaId`) as propertiesCount, `Properties`.`title` FROM `Areas`'
  baseQuery = baseQuery + 'LEFT JOIN `PropertyHasAreas` ON `Areas`.`id` = `PropertyHasAreas`.`AreaId`'

  if (conditions.ParentId) {
    if (conditions.hasOwnProperty('purpose')) {
      baseQuery = baseQuery + 'LEFT JOIN `Properties` ON `PropertyHasAreas`.`PropertyId` = `Properties`.`id` WHERE `Areas`.`ParentId` = ' + conditions.ParentId + ' AND `properties`.`purpose` = ' + conditions.purpose
    } else {
      baseQuery = baseQuery + 'LEFT JOIN `Properties` ON `PropertyHasAreas`.`PropertyId` = `Properties`.`id` WHERE `Areas`.`ParentId` = ' + conditions.ParentId
    }
  } else {
    if (conditions.hasOwnProperty('purpose')) {
      baseQuery = baseQuery + 'LEFT JOIN `Properties` ON `PropertyHasAreas`.`PropertyId` = `Properties`.`id` WHERE `Areas`.`ParentId` = 1 ' + ' AND `properties`.`purpose` = ' + conditions.purpose
    } else {
      baseQuery = baseQuery + 'LEFT JOIN `Properties` ON `PropertyHasAreas`.`PropertyId` = `Properties`.`id` WHERE `Areas`.`ParentId` = 1 '
    }
  }

  if (conditions.category) {
    baseQuery = baseQuery + ' LEFT JOIN `PropertyHasCategories` ON `PropertyHasCategories`.`PropertyId` = `Property`.`id`'
    andConditions.push('`PropertyHasCategories`.`CategoryId` = ' + conditions.category)
  }

  if (andConditions.length) {
    where = 'WHERE' + andConditions.join(' AND ')
    where = ' ' + where + ' '
  }
  baseQuery = baseQuery + where

  // GROUP BY pr id.
  baseQuery = baseQuery + ' GROUP BY `Areas`.`id`'

  if (conditions.sortByDate) {
    if (conditions.sortByDate === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Properties`.`createdAt` ASC'
    } else if (conditions.sortByDate === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Properties`.`createdAt` DESC'
    }
  }

  baseQuery = baseQuery + ' LIMIT :limit'
  conditions.limit = parseInt(limit)

  // Check for offset.
  if (!isNaN(offset)) {
    baseQuery = baseQuery + ' OFFSET  ' + offset
    conditions.offset = offset
  }

  return db.sequelize.query(baseQuery, {
    replacements: conditions,
    type: db.sequelize.QueryTypes.SELECT
  })
}

// *************
// To Add Area
// *************

function addArea (conditions) {
  // Check if Area exist in conditions
  return db.Area.findAll({
    where: { slug: conditions.slug }
  })
    .then((response) => {
      if (response.length) {
        // Area Slug found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'Slug Already Exist.'
        }])
      }
      db.Area.create(conditions)
        .then((createdArea) => {
          if (conditions.ParentId) {
            db.Area.findOne({ where: { id: conditions.ParentId } })
              .then((foundResult) => {
                createdArea.level = foundResult.level + 1
                createdArea.save()
              })
          }
        })
    })
}

// ****************
// To Update Area
// ****************

function updateArea (conditions, id) {
  const Id = id.id
  // Check if Area exist in conditions
  return db.Area.findAll({
    where: { id: { [Op.ne]: Id },
      slug: conditions.slug }
  })
    .then((existingArea) => {
      if (existingArea.length) {
        // Area Slug found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1578,
          message: 'Slug Already Exists'
        }])
      }
      db.Area.update(conditions, { where: { id: Id } })
      if (conditions.ParentId) {
        db.Area.findOne({ where: { id: conditions.ParentId } })
          .then((foundResult) => {
            let condition = {}
            condition.level = foundResult.level + 1
            existingArea.update(condition, { where: { id: Id } })
          })
      }
    })
}

module.exports = {
  getArea,
  getAreaCities,
  addArea,
  deleteArea,
  updateArea
}
