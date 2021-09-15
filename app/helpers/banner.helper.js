'use strict'

// var Sequelize = require('sequelize')
// const Op = Sequelize.Op
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')
const _ = require('lodash')

// *****************************
// To Add New Banner
// *****************************

function addBanner (data, file) {
  return db.BannerType.findOne({
    where: { id: data.BannerTypeId }
  })
    .then((bannersType) => {
      let maxBanner = bannersType.maxBanners
      let identifier = bannersType.identifiers
      db.Banner.count({ identifiers: identifier, status: 'active' })
        .then((count) => {
          if (count >= maxBanner) {
            return generalHelpingMethods.rejectPromise([{
              field: 'Banner',
              error: 1564,
              message: 'You Have Already Added 5 Banners Please Delete One to Add New'
            }])
          }
          db.User.findOne({
            where: { id: data.CreatedBy }
          }).then((user) => {
            if (!user) {
              return generalHelpingMethods.rejectPromise([{
                field: 'UserId',
                error: 1572,
                message: 'User Not Found Against Given Id'
              }])
            }
            return db.Banner.create(data)
              .then(async (insertedBanner) => {
                // upload images
                // Upload to s3 bucket.
                insertedBanner.createdByName = user.name
                insertedBanner.CreatedBy = user.id
                insertedBanner.identifiers = bannersType.identifiers
                insertedBanner.save()

                uploadFiles(insertedBanner.id, file)
                  .then(async (insertedImages) => {
                    if (insertedImages) {
                      insertedBanner.url = insertedImages[0].url
                      insertedBanner.size = insertedImages[0].size
                      insertedBanner.save()
                      return db.BannerStatus.create(data)
                        .then(async (response) => {
                          response.createdBy = user.id
                          response.createdByName = user.name
                          response.BannerId = insertedBanner.id
                          response.save()
                        })
                    }
                  })
              })
          })
        })
    })
}

// This is private method, not exported.
const uploadFiles = async (BannerId, files) => {
  // Traverse each file
  const bannerImage = []
  for (var k in files) {
    const file = files[k]
    // Upload to s3 bucket.
    await helpingHelperMethods.uploadFile(file, file.name)
      .then((uploadData) => {
        // Check for upload url existence.
        if (!_.isEmpty(uploadData.Location)) {
          // Push in to charges object, will save it at end after each file upload.
          bannerImage.push({
            url: uploadData.Location,
            // type: file.type,
            size: file.size
          })
        }
      })
      .catch(generalHelpingMethods.catchException)
  }
  return bannerImage
}

// **************
// To Get Banner
// **************

function getBanner (conditions, limit, offset) {
  let andConditions = []
  let where = ''
  let baseQuery = ''
  let queryForCount = '' // we will return total records of condition.
  let selectStatement = 'SELECT `id`, `url`, `size` , `status` , `createdByName` , `validTill` , `createdAt` FROM `Banners`'

  if (conditions.hasOwnProperty('status')) {
    andConditions.push(' `Banners`.`status` = :status')
  }

  if (conditions.hasOwnProperty('CompanyProfileId')) {
    andConditions.push(' `Banners`.`CompanyProfileId` = :CompanyProfileId')
  }

  if (conditions.hasOwnProperty('CreatedByName')) {
    andConditions.push(' `Banners`.`CreatedByName` = :CreatedByName')
  }
  const d = new Date()
  const n = d.toISOString()
  conditions.n = n
  if (conditions.hasOwnProperty('validTill')) {
    andConditions.push(' `Banners`.`validTill` BETWEEN :n' + ' AND :validTill')
  }
  if (andConditions.length) {
    where = 'WHERE' + andConditions.join(' AND ')
    where = ' ' + where + ' '
  }
  baseQuery = baseQuery + where

  if (conditions.sortByDate) {
    if (conditions.sortByDate === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Banners`.`createdAt` ASC'
    } else if (conditions.sortByDate === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Banners`.`createdAt` DESC'
    }
  }
  if (conditions.sortByPrice) {
    if (conditions.sortByPrice === 'ascending') {
      baseQuery = baseQuery + 'ORDER BY `Banners`.`validTill` ASC'
    } else if (conditions.sortByPrice === 'descending') {
      baseQuery = baseQuery + 'ORDER BY `Banners`.`validTill` DESC'
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

      queryForCount = 'SELECT COUNT(*) as count FROM `Banners` ' + queryForCount
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

// ********************
// To Get BannerTypes
// *******************

function getBannerTypes (conditions) {
  // Check if BannerType exist in conditions
  return db.BannerType.findAll({
    where: conditions
  }
  )
}

// **********************
// Update Banner Status
// **********************

function updateBannerStatus (data, id) {
  return db.Banner.findOne({ where: {
    id: id
  }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // Banner not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'Banner not found.'
        }])
      }
      return db.Banner.update(
        data,
        { where: { id: id } }
      )
    })
    .then((bannerStatus) => {
      if (_.isEmpty(bannerStatus)) {
        // BannerStatus not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'BannerStatus not found.'
        }])
      }
      return db.BannerStatus.update(
        data,
        { where: { BannerId: id } }
      )
    })
}

module.exports = {
  addBanner,
  getBanner,
  updateBannerStatus,
  getBannerTypes
}
