'use strict'

const db = require('../config/sequelize.config')
const helpingHelperMethods = require('./helping.helper')
const rabbitMq = require('./rabbitMQ.helper')
const _ = require('lodash')

// *****************************
// To Add/Update Company Profile
// *****************************

function addCompanyProfile (data, files) {
  return db.CompanyProfile.findOne({ where: { UserId: data.UserId } })
    .then(profile => {
      if (profile) {
        return db.CompanyProfile.update(data, { where: { UserId: data.UserId } })
          .then((updated) => {
            uploadFiles(data.UserId, files)
          })
      }
      return db.CompanyProfile.create(data)
        .then((createdProfile) => {
          uploadFiles(createdProfile.UserId, files)
        })
    })
}

// This is private method, not exported.
const uploadFiles = async (ProfileId, files) => {
  // Traverse each file
  const urlArray = []
  const sizes = [{ height: 250, width: 350, ratio: '1x' }]
  for (let k = 0; k < files.length; k++) {
    await helpingHelperMethods.uploadFile(files[k], files[k].name)
      .then((images) => {
        urlArray.push({
          url: images.Location
        })
      })
  }
  let data = {}
  data.Id = ProfileId
  data.urlArray = urlArray
  data.sizes = sizes
  data.replyQueue = 'companyProfileImages'
  console.log(data)
  rabbitMq.sendMessage(data, 'resizeImages')
}

// ********************
// Get CompanyProfile
// ********************

function getCompanyProfile (conditions, limit, offset) {
  return db.CompanyProfile.findAndCountAll({
    where: conditions,
    limit: limit
  })
}

// ***************************
// Get CompanyProfile Details
// ***************************

function getCompanyProfileDetails (conditions) {
  return db.CompanyProfile.findOne({
    where: conditions
  })
}

// ***************************
// Get userCompanyProfile
// ***************************

function userCompanyProfile (conditions, limit, offset) {
  let andConditions = []
  let where = ''
  let baseQuery = ''
  let queryForCount = '' // we will return total records of condition.

  let selectStatement = 'SELECT `Users`.`name` As UserName, `Users`.`RoleId` As RoleId, `Users`.`id` As UserId,`CompanyProfiles`.`name`, `CompanyProfiles`.`nameL1`, `CompanyProfiles`.`description`, `CompanyProfiles`.`descriptionL1`, `CompanyProfiles`.`phone`, `CompanyProfiles`.`fax`, `CompanyProfiles`.`address`, `addressL1`, `formatedAddress`, `formatedAddressL1`, `CompanyProfiles`.`email`, `logo`, `facebook`, `linkedIn`, `twitter`, `instagram`, `CompanyProfiles`.`createdAt`, `CompanyProfiles`.`updatedAt`, `CompanyProfiles`.`UserId` FROM `CompanyProfiles`'

  baseQuery = baseQuery + ' INNER JOIN `Users` ON `CompanyProfiles`.`UserId` = `Users`.`id` '

  if (conditions.CompanyId) {
    andConditions.push('`CompanyProfiles`.`id` = :CompanyId')
  }

  if (conditions.RoleId) {
    andConditions.push('`Users`.`RoleId` = :RoleId')
  }

  if (conditions.UserId) {
    andConditions.push('`CompanyProfiles`.`UserId` = :UserId')
  }
  if (andConditions.length) {
    where = 'WHERE' + andConditions.join(' AND ')
    where = ' ' + where + ' '
  }
  baseQuery = baseQuery + where

  queryForCount = baseQuery // copy the base query into query for total without applying limit offset

  baseQuery = baseQuery + ' LIMIT :limit'
  conditions.limit = parseInt(limit)

  // Check for offset.
  if (!isNaN(offset)) {
    baseQuery = baseQuery + ' OFFSET  ' + offset
    conditions.offset = offset
  }

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

      queryForCount = 'SELECT COUNT(*) as count FROM `CompanyProfiles` ' + queryForCount
      return db.sequelize.query(queryForCount, {
        replacements: conditions,
        type: db.sequelize.QueryTypes.SELECT
      })
    })
    .then((countQueryResult) => {
      let count = 0
      if (!_.isEmpty(countQueryResult)) {
        count = countQueryResult.length
      }
      return {
        result: result,
        count: count
      }
    })
}

// ********************************************************
// Receive Images from Microservice and Save To Database
// ********************************************************

function insertImages (imagesData, companyProfileData) {
  db.CompanyProfile.findOne({
    where: { UserId: companyProfileData.Id }
  })
    .then((foundProfile) => {
      foundProfile.logo = imagesData[0].url
      foundProfile.save()
    })
}

module.exports = {
  addCompanyProfile,
  getCompanyProfile,
  getCompanyProfileDetails,
  userCompanyProfile,
  insertImages
}
