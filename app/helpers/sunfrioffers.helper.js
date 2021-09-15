'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')
const dateFormat = require('dateformat')

// **************************
// To Add New SunFriProperty
// **************************

function addSundayFridayOffers (data) {
  return db.SundayFridayOffers.findAll({ where: { PropertyId: data.PropertyId } })
    .then((offer) => {
      if (offer) {
        if (data.date.friday) {
          const day = dateFormat(new Date(data.date.friday), 'yyyy-mm-dd')
          for (let i = 0; i < offer.length; i++) {
            let incommingDate = offer[i].friday
            const newDate = dateFormat(new Date(incommingDate), 'yyyy-mm-dd')
            if (day === newDate) {
              // Add Already Exist, return error
              return generalHelpingMethods.rejectPromise([{
                field: 'id',
                error: 80730,
                message: 'ad already exist For Same Day Please Choose Different Property.'
              }])
            }
          }
        }
        if (data.date.sunday) {
          const day = dateFormat(new Date(data.date.sunday), 'yyyy-mm-dd')
          for (let i = 0; i < offer.length; i++) {
            let incommingDate = offer[i].sunday
            const newDate = dateFormat(new Date(incommingDate), 'yyyy-mm-dd')
            if (day === newDate) {
              // Add Already Exist, return error
              return generalHelpingMethods.rejectPromise([{
                field: 'id',
                error: 80730,
                message: 'ad already exist For Same Day Please Choose Different Day.'
              }])
            }
          }
        }
        return db.SundayFridayOffers.create(data)
          .then((insertedOffer) => {
            if (data.date.sunday) {
              insertedOffer.sunday = data.date.sunday
              insertedOffer.save()
            }
            if (data.date.friday) {
              insertedOffer.friday = data.date.friday
              insertedOffer.save()
            }
          })
      }
    })
}

// *****************************
// Update sunfrioffers Status
// *****************************

function updateOffersStatus (data, id) {
  return db.SundayFridayOffers.findOne({ where: {
    id: id
  }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // sunfrioffers not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'Offer not found.'
        }])
      }
      return db.SundayFridayOffers.update(
        data,
        { where: { id: id } }
      )
    })
}

// **********************
// To Get sunfrioffers
// **********************

function getSundayFridayOffers (conditions, limit, offset) {
  let andConditions = []
  let where = ''
  let baseQuery = ''
  let queryForCount = '' // we will return total records of condition.

  let selectStatement = 'SELECT `SundayFridayOffers`.`PropertyId`, `Properties`.`title`, `Properties`.`thumbnail`, `Properties`.`location`, `Properties`.`thumbnail`, `Properties`.`description`, `Properties`.`lat`, `Properties`.`lng`, `Properties`.`createdAt`, `Properties`.`purpose`, `Properties`.`price`, `Properties`.`CompanyId`, `Properties`.`UserId`, `Users`.`name`, `Users`.`phone`, `SundayFridayOffers`.`discountedPrice`, `SundayFridayOffers`.`sunday`, `SundayFridayOffers`.`friday`, `SundayFridayOffers`.`status`, `SundayFridayOffers`.`approvedBy` FROM `SundayFridayOffers`'

  baseQuery = baseQuery + ' LEFT JOIN `Properties` ON `SundayFridayOffers`.`PropertyId` = `Properties`.`id`'

  baseQuery = baseQuery + ' LEFT JOIN `Users` ON `Properties`.`UserId` = `Users`.`id`'

  andConditions.push(' `SundayFridayOffers`.`isDeleted` = false')

  if (conditions.userId) {
    andConditions.push('`Properties`.`UserId` = :userId')
  }

  if (conditions.AreaId) {
    andConditions.push('`Properties`.`area` = :AreaId')
  }

  if (conditions.hasOwnProperty('title')) {
    conditions.title = '%' + conditions.title + '%'
    andConditions.push('`Properties`.`title` like :title')
  }

  if (conditions.hasOwnProperty('purpose')) {
    andConditions.push('`Properties`.`purpose` = :purpose')
  }

  if (conditions.hasOwnProperty('id')) {
    andConditions.push(' `SundayFridayOffers`.`id` = :id')
  }

  if (conditions.hasOwnProperty('status')) {
    andConditions.push(' `SundayFridayOffers`.`status` = :status')
  }

  if (conditions.hasOwnProperty('friday')) {
    andConditions.push(' `SundayFridayOffers`.`friday` = :friday')
  }

  if (conditions.hasOwnProperty('sunday')) {
    andConditions.push(' `SundayFridayOffers`.`sunday` = :sunday')
  }

  if (conditions.minPrice) {
    andConditions.push(' `SundayFridayOffers`.`discountedPrice` >= :minPrice')
  }

  if (conditions.maxPrice) {
    andConditions.push('`SundayFridayOffers`.`discountedPrice` <= :maxPrice')
  }

  if (conditions.hasOwnProperty('CreatedById')) {
    andConditions.push(' `SundayFridayOffers`.`CreatedById` = :CreatedById')
  }

  if (andConditions.length) {
    where = 'WHERE' + andConditions.join(' AND ')
    where = ' ' + where + ' '
  }
  baseQuery = baseQuery + where

  if (conditions.sortByDate) {
    if (conditions.sortByDate === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `SundayFridayOffers`.`createdAt` ASC'
    } else if (conditions.sortByDate === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `SundayFridayOffers`.`createdAt` DESC'
    }
  }

  if (conditions.sortByPrice) {
    if (conditions.sortByPrice === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `SundayFridayOffers`.`discountedPrice` ASC'
    } else if (conditions.sortByPrice === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `SundayFridayOffers`.`discountedPrice` DESC'
    }
  }

  baseQuery = baseQuery + ' LIMIT :limit'
  conditions.limit = parseInt(limit)

  // Check for offset.
  if (!isNaN(offset)) {
    baseQuery = baseQuery + ' OFFSET  ' + offset
    conditions.offset = offset
  }

  queryForCount = baseQuery // copy the base query into query for total without applying limit offset

  let result
  baseQuery = selectStatement + baseQuery
  return db.sequelize.query(baseQuery, {
    replacements: conditions,
    type: db.sequelize.QueryTypes.SELECT
  })
    .then((queryResult) => {
      result = queryResult
      if (_.isEmpty(queryResult)) {
        return 0
      }

      queryForCount = 'SELECT COUNT(*) as count FROM `SundayFridayOffers` ' + queryForCount
      return db.sequelize.query(queryForCount, {
        replacements: conditions,
        type: db.sequelize.QueryTypes.SELECT
      })
    })
    .then((countQueryResult) => {
      let count = 0
      if (!_.isEmpty(countQueryResult)) {
        count = countQueryResult[0].count
      }
      return {
        result: result,
        count: count
      }
    })
}

// *******************************
// Update SundayFriday isApproved
// *******************************

function updateOffersApproved (data, id) {
  return db.SundayFridayOffers.findOne({ where: {
    id: id
  }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // sunfrioffers not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'Offer not found.'
        }])
      }
      return db.SundayFridayOffers.update(
        data,
        { where: { id: id } }
      )
    })
}

module.exports = {
  addSundayFridayOffers,
  updateOffersStatus,
  getSundayFridayOffers,
  updateOffersApproved
}
