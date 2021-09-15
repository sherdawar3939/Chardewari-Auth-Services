'use strict'
const db = require('../config/sequelize.config')
const _ = require('lodash')

// ***************************
// To Get Purchase Listings
// ***************************

const getPurchaseListing = async (conditions) => {
  conditions.isActive = true
  conditions.isDeleted = false
  return db.Purchase.findAll({
    where: conditions,
    attributes: [
      'id',
      'PurchaseDate',
      'totalPrice',
      'discount',
      'createdAt',
      'PackageId'
    ]
  })
}

// ***************************
// To Get Purchase Detail
// ***************************

const getPurchaseDetail = async (conditions) => {
  conditions.isDeleted = false
  conditions.isActive = true
  return db.Purchase.findAll({
    where: conditions,
    include: [
      {
        model: db.User,
        as: 'purchaseUser',
        attributes: ['id', 'name', 'email', 'phone', 'landphone']
      },
      {
        model: db.UserListingTypeQuota,
        attributes: ['ListingTypeId', 'quantity', `expiry`],
        as: 'purchaseListingTypeQuota'
      },
      {
        model: db.UserBannerQuota,
        as: 'purchaseBannerQuota'
      },
      {
        model: db.UserTopPropertyQuota,
        as: 'purchaseTopPropertyQuota'
      },
      {
        model: db.UserTopProjectQuota,
        as: 'purchaseTopProjectQuota'
      },
      {
        model: db.UserTopAgencyQuota,
        attributes: ['id', 'createdAt'],
        as: 'purchaseTopAgencyQuota'
      }
    ]
  }).then(async (data) => {
    data = JSON.parse(JSON.stringify(data))
    // for listing type
    let listingTypeIds = []
    for (let i = 0; i < data.length; i++) {
      let ids = data[i].purchaseListingTypeQuota.map((x) => x.ListingTypeId)
      listingTypeIds = listingTypeIds.concat(ids)
    }
    let listingType = await db.ListingType.findAll({
      where: {
        id: listingTypeIds
      },
      attributes: ['id', 'title', 'titleL1', 'unitPrice'],
      raw: true
    })
    data[0].listingType = listingType

    // for banner type
    let bannerTypeIds = []
    for (let i = 0; i < data.length; i++) {
      let ids = data[i].purchaseBannerQuota.map((x) => x.BannerTypeId)
      bannerTypeIds = bannerTypeIds.concat(ids)
    }
    let bannerType = await db.BannerType.findAll({
      where: {
        id: bannerTypeIds
      },
      attributes: ['id', 'title', 'price', `maxBanners`],
      raw: true
    })
    data[0].bannerType = bannerType
    return data
  })
}

const getPurchaseById = (conditions) => {
  return db.Purchase.findOne({
    where: { id: conditions.id },
    raw: true
  })
    .then((res) => {
      return res
    })
}

module.exports = {
  getPurchaseListing,
  getPurchaseDetail,
  getPurchaseById
}
