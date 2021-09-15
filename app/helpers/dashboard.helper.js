'use strict'

const db = require('../config/sequelize.config')

// ********************
// Get Property Count
// ********************

function getCount () {
  let data = {}
  let conditions = {}
  conditions.isDeleted = false
  conditions.isApproved = true
  // Check if Currency exist in conditions
  return db.Property.count({
    where: conditions
  })
    .then((count) => {
      data.propertyCount = count
      let projectConditions = {}
      projectConditions.isDeleted = false
      projectConditions.isProject = true
      return db.Launching.count({
        where: projectConditions
      })
    })
    .then((projectCount) => {
      data.projectCount = projectCount
      let launchingConditions = {}
      launchingConditions.isDeleted = false
      launchingConditions.isProject = false
      // Check if Currency exist in conditions
      return db.Launching.count({
        where: conditions
      })
    })
    .then((launching) => {
      data.launchingCount = launching
      let productConditions = {}
      productConditions.isDeleted = false
      // Check if Currency exist in productConditions
      return db.Product.count({
        where: productConditions
      })
    })
    .then((product) => {
      data.productCount = product
      let conditions = {}
      conditions.isDeleted = false
      // Check if Currency exist in conditions
      return db.Services.count({
        where: conditions
      })
    })
    .then((services) => {
      data.servicesCount = services
      let userConditions = {}
      userConditions.isDeleted = false
      // Check if Currency exist in userConditions
      return db.User.count({
        where: userConditions
      })
    })
    .then(async (user) => {
      data.userCount = user
      let companyCount = await db.CompanyProfile.count()
      let visitorCount = await db.Session.count()
      data.visit = visitorCount
      data.companyCount = companyCount
      return data
    })
}

// ********************
// Get Properties/Day
// ********************

function getDailyPropertyCount (conditions) {
  // min max Date format '2020-04-15'
  let andConditions = []
  let where = ''
  conditions.isDeleted = false
  let baseQuery = ''
  let selectStatement = 'SELECT `Property`.`createdAt`, COUNT(*) AS `count` FROM `Properties` AS `Property`'

  andConditions.push('`Property`.`isDeleted` = false')

  if (conditions.minDate) {
    andConditions.push('`Property`.`createdAt` >= :minDate')
  }

  if (conditions.maxDate) {
    andConditions.push('`Property`.`createdAt` <= :maxDate')
  }

  if (andConditions.length) {
    where = 'WHERE' + andConditions.join(' AND ')
    where = ' ' + where + ' '
  }
  baseQuery = baseQuery + where
  // GROUP BY pr id.
  baseQuery = baseQuery + ' GROUP BY CAST(`Property`.`createdAt` AS DATE)'

  let result
  baseQuery = selectStatement + baseQuery
  return db.sequelize.query(baseQuery, {
    replacements: conditions,
    type: db.sequelize.QueryTypes.SELECT
  })
    .then((queryResult) => {
      result = queryResult
      return {
        result: result
      }
    })
}

// ********************
// Get Projects Count
// ********************

function getWebsiteVisitor (conditions) {
  // min max Date format '2020-04-15'
  let andCondition = []
  let where1 = ''
  let Query = ''
  let statement = 'SELECT `Visit`.`createdAt`, COUNT(*) AS `count` FROM `Visits` AS `Visit`'

  if (conditions.minDate) {
    andCondition.push('`Visit`.`createdAt` >= :minDate')
  }

  if (conditions.maxDate) {
    andCondition.push('`Visit`.`createdAt` <= :maxDate')
  }

  if (andCondition.length) {
    where1 = 'WHERE' + andCondition.join(' AND ')
    where1 = ' ' + where1 + ' '
  }

  Query = Query + where1
  // GROUP BY pr id.
  Query = Query + ' GROUP BY `Visit`.`SessionId`, CAST(`Visit`.`createdAt` AS DATE)'
  Query = statement + Query
  return db.sequelize.query(Query, {
    replacements: conditions,
    type: db.sequelize.QueryTypes.SELECT
  })
    .then(async (resp) => {
      let data = await uniqueUsersCount(resp)
      return data
    })
}

function uniqueUsersCount (resp) {
  let logic = []
  const formatter = new Intl.DateTimeFormat(`en-US`)
  for (let i = 0; i < resp.length; i++) {
    let count = 0
    let condition = true
    let user = 0
    if (i !== 0) {
      for (let k = 0; k < logic.length; k++) {
        if (formatter.format(resp[i].createdAt) === formatter.format(logic[k].createdAt)) {
          condition = false
          break
        }
      }
    }
    if (condition) {
      for (let j = 1; j < resp.length; j++) {
        count = resp[i].count
        if (formatter.format(resp[i].createdAt) === formatter.format(resp[j].createdAt)) {
          count = count + resp[j].count
          user = user + 1
        }
      }
      if (user === 0) {
        user = 1
      }
      logic.push({
        createdAt: resp[i].createdAt,
        count: count,
        user: user
      })
    }
  }
  // sort by date
  return logic.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
}

// **********************************
// Get Property with category  Count
// **********************************

function getCategoryCount () {
  let conditions = {}
  let data = {}
  conditions.isDeleted = false
  conditions.isApproved = true
  // Check if Currency exist in conditions
  return db.Property.count({
    where: conditions,
    group: ['purpose']
  })
    .then((purpose) => {
      data.purpose = purpose
      let condition = {
        isApproved: false
      }
      return db.Property.count({
        where: condition
      })
    })
    .then((result) => {
      data.unApproved = result
      return data
    })
}

module.exports = {
  getCount,
  getDailyPropertyCount,
  getWebsiteVisitor,
  getCategoryCount
}
