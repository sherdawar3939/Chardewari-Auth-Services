'use strict'
const db = require('../config/sequelize.config')
const _ = require('lodash')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

// ***************************
// To Get Listing Type Quota
// ***************************

const getListingTypeQuota = async (userId) => {
  let userQuota = await db.UserListingTypeQuota.findAll({
    where: { UserId: userId,
      expiry: {
        [Op.gte]: new Date()
      }
    },
    raw: true
  })
  let listingTypeIds = []
  for (let i = 0; i < userQuota.length; i++) {
    listingTypeIds.push(userQuota[i].ListingTypeId)
  }
  let listingProperty = await db.Property.findAll({
    where: { UserId: userId,
      isActive: true,
      isApproved: true,
      ListingTypeId: listingTypeIds,
      expiry: {
        [Op.gte]: new Date()
      }
    },
    attributes: ['id', 'ListingTypeId'],
    raw: true
  })
  for (let k = 0; k < userQuota.length; k++) {
    let addedProperty = 0
    for (let j = 0; j < listingProperty.length; j++) {
      if (userQuota[k].ListingTypeId === listingProperty[j].ListingTypeId) {
        addedProperty = addedProperty + 1
      }
    }
    userQuota[k].limit = userQuota[k].quantity - addedProperty
  }
  return userQuota
}

// ***************************
// To getAgencyQuota
// ***************************

const getAgencyQuota = async (userId) => {
  let userQuota = await db.UserTopAgencyQuota.findAll({
    where: { UserId: userId,
      expiry: {
        [Op.gte]: new Date()
      }
    },
    raw: true
  })
  let agencyAdded = await db.TopCompany.findAll({
    where: { CreatedById: userId,
      status: true,
      isDeleted: false,
      endDate: {
        [Op.gte]: new Date()
      }
    },
    attributes: ['id'],
    raw: true
  })
  userQuota[0].agencyAdded = agencyAdded.length
  return userQuota
}

// ***************************
// To getTopPropertyQuota
// ***************************

const getTopPropertyQuota = async (userId) => {
  let userQuota = await db.UserTopPropertyQuota.findAll({
    where: { UserId: userId,
      expiry: {
        [Op.gte]: new Date()
      }
    },
    raw: true
  })
  let topPropertyCount = await db.TopProperty.findAll({
    where: { CreatedById: userId,
      status: true,
      isDeleted: false,
      endDate: {
        [Op.gte]: new Date()
      }
    },
    attributes: ['id'],
    raw: true
  })
  userQuota[0].topPropertyCount = topPropertyCount.length
  return userQuota
}

// ***************************
// To getTopProjectQuota
// ***************************

const getTopProjectQuota = async (userId) => {
  let userQuota = await db.UserTopProjectQuota.findAll({
    where: { UserId: userId,
      expiry: {
        [Op.gte]: new Date()
      }
    },
    raw: true
  })
  let topProjectCount = await db.TopProject.findAll({
    where: { CreatedById: userId,
      status: true,
      isDeleted: false,
      endDate: {
        [Op.gte]: new Date()
      }
    },
    attributes: ['id'],
    raw: true
  })
  userQuota[0].topProjectCount = topProjectCount.length
  return userQuota
}

// ***************************
// To getTopLaunchingQuota
// ***************************

const getTopLaunchingQuota = async (userId) => {
  let userQuota = await db.UserTopProjectQuota.findAll({
    where: { UserId: userId,
      expiry: {
        [Op.gte]: new Date()
      }
    },
    raw: true
  })
  let topProjectCount = await db.TopProject.findAll({
    where: { CreatedById: userId,
      status: true,
      isProject: false,
      isDeleted: false,
      endDate: {
        [Op.gte]: new Date()
      }
    },
    attributes: ['id'],
    raw: true
  })
  userQuota[0].topProjectCount = topProjectCount.length
  return userQuota
}

// ***************************
// To getBannerQuota Quota
// ***************************

const getBannerQuota = async (userId) => {
  let userQuota = await db.UserBannerQuota.findAll({
    where: { UserId: userId,
      expiry: {
        [Op.gte]: new Date()
      }
    },
    raw: true
  })
  let BannerTypeIds = []
  for (let i = 0; i < userQuota.length; i++) {
    BannerTypeIds.push(userQuota[i].BannerTypeId)
  }
  let banner = await db.Banner.findAll({
    where: { CreatedBy: userId,
      status: true,
      BannerTypeId: BannerTypeIds,
      validTill: {
        [Op.gte]: new Date()
      }
    },
    attributes: ['id', 'BannerTypeId'],
    raw: true
  })
  for (let k = 0; k < userQuota.length; k++) {
    let addedBanner = 0
    for (let j = 0; j < banner.length; j++) {
      if (userQuota[k].BannerTypeId === banner[j].BannerTypeId) {
        addedBanner = addedBanner + 1
      }
    }
    userQuota[k].limit = userQuota[k].quantity - addedBanner
  }
  return userQuota
}

module.exports = {
  getListingTypeQuota,
  getAgencyQuota,
  getTopPropertyQuota,
  getTopProjectQuota,
  getTopLaunchingQuota,
  getBannerQuota
}
