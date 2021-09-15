'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('../helpers/general.helper')

// ***************************
// To add Payment
// ***************************

async function PostPayment (data) {
  let user = await db.User.findOne({
    where: { id: data.UserId },
    raw: true
  })
  data.receivedByName = user.name
  data.ReceivedById = user.id

  let purchaseData = {
    paymentStatus: data.paymentStatus
  }
  return db.Payment.findOne({
    where: { PurchaseId: data.PurchaseId },
    attributes: ['id', 'receivedByName']
  })
    .then((found) => {
      if (found) {
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1500,
          message: 'Payment Already Added Please Update Now.'
        }])
      }
      if (Number(data.paymentStatus) === 2) {
        purchaseData.isActive = true
        updatePackagesDate(data.PurchaseId)
      }
      return db.Payment.create(data)
    })
    .then((payment) => {
      if (payment) {
        return db.Purchase.update(
          purchaseData, {
            where: { id: data.PurchaseId }
          }
        )
      }
    })
}

// ************************
// To Update Packages Date
// ************************

const updatePackagesDate = (id) => {
  return db.Purchase.findOne({
    where: { id: id },
    attributes: ['id', 'PackageId'],
    raw: true
  })
    .then(async (foundPurchase) => {
      if (foundPurchase.PackageId == null) {
        // to get User Listing Quota Data
        let quotaData = await db.UserListingTypeQuota.findAll({
          where: { PurchaseId: id },
          raw: true
        })

        // To Get User Listing Ids In ListingArray
        let listingArray = []
        for (let i = 0; i < quotaData.length; i++) {
          listingArray.push(quotaData[i].ListingTypeId)
        }

        // Query To Find ALl ListingType Valid Days
        let listingData = await db.ListingType.findAll({
          where: { id: listingArray },
          attributes: ['id', 'validTillDay'],
          raw: true
        })
        // To Separate Update Data
        let updateArray = []
        for (let j = 0; j < listingArray.length; j++) {
          for (let k = 0; k < listingData.length; k++) {
            if (listingArray[j] === listingData[k].id) {
              let days = listingData[k].validTillDay
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days)
              let dateFormatted = someDate.toISOString().substr(0, 10)
              updateArray.push({
                PurchaseId: id,
                expiry: dateFormatted,
                ListingTypeId: listingArray[j]
              })
            }
          }
        }
        // To Update User Quota
        for (let l = 0; l < updateArray.length; l++) {
          db.UserListingTypeQuota.update(updateArray[l], { where: {
            PurchaseId: updateArray[l].PurchaseId,
            ListingTypeId: updateArray[l].ListingTypeId } })
        }

        // to get User Banner Quota Data
        let bannerQuotaData = await db.UserBannerQuota.findAll({
          where: { PurchaseId: id },
          raw: true
        })

        // To Get User Banner Ids In BannerTypeId
        let bannerTypeIds = []
        for (let i = 0; i < bannerQuotaData.length; i++) {
          bannerTypeIds.push(bannerQuotaData[i].BannerTypeId)
        }

        // Query To Find ALl ListingType Valid Days
        let bannerData = await db.BannerType.findAll({
          where: { id: bannerTypeIds },
          attributes: ['id', 'validTillDay'],
          raw: true
        })
        // To Separate Update Data
        let updateBannerArray = []
        for (let j = 0; j < bannerTypeIds.length; j++) {
          for (let k = 0; k < bannerData.length; k++) {
            if (bannerTypeIds[j] === bannerData[k].id) {
              let days = bannerData[k].validTillDay
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days)
              let dateFormatted = someDate.toISOString().substr(0, 10)
              updateBannerArray.push({
                PurchaseId: id,
                expiry: dateFormatted,
                BannerTypeId: bannerTypeIds[j]
              })
            }
          }
        }
        // To Update Banner Quota
        for (let l = 0; l < updateBannerArray.length; l++) {
          db.UserBannerQuota.update(updateBannerArray[l], { where: {
            PurchaseId: updateBannerArray[l].PurchaseId,
            BannerTypeId: updateBannerArray[l].BannerTypeId } })
        }

        // for Property
        let propertyData = await db.TopConfig.findOne({
          where: { identifier: 'TopProperty' },
          attributes: ['id', 'validTillDay'],
          raw: true
        })
        let newDays = propertyData.validTillDay
        let someNewDate = new Date(Date.now())
        someNewDate.setDate(someNewDate.getDate() + newDays)
        let newDateFormatted = someNewDate.toISOString().substr(0, 10)
        let propertyUpdateData = {
          expiry: newDateFormatted
        }
        db.UserTopPropertyQuota.update(propertyUpdateData, { where: { PurchaseId: id } })

        // For Project
        let projectData = await db.TopConfig.findOne({
          where: { identifier: 'TopProject' },
          attributes: ['id', 'validTillDay'],
          raw: true
        })
        let newDay = projectData.validTillDay
        let nowDate = new Date(Date.now())
        nowDate.setDate(nowDate.getDate() + newDay)
        let nowDateFormatted = nowDate.toISOString().substr(0, 10)
        let projectUpdateData = {
          expiry: nowDateFormatted
        }
        db.UserTopProjectQuota.update(projectUpdateData, { where: { PurchaseId: id } })

        let agencyData = await db.TopConfig.findOne({
          where: { identifier: 'TopAgency' },
          attributes: ['id', 'validTillDay'],
          raw: true
        })
        let nowDays = agencyData.validTillDay
        let someNowDate = new Date(Date.now())
        someNowDate.setDate(someNowDate.getDate() + nowDays)
        let formatted = someNowDate.toISOString().substr(0, 10)
        let AgencyUpdateData = {
          expiry: formatted
        }
        db.UserTopAgencyQuota.update(AgencyUpdateData, { where: { PurchaseId: id } })
      } else {
        const PackageId = foundPurchase.PackageId
        // to get User Listing Quota Data
        let quotaData = await db.UserListingTypeQuota.findAll({
          where: { PurchaseId: id },
          raw: true
        })
        // To Get User Listing Ids In ListingArray
        let listingArray = []
        for (let i = 0; i < quotaData.length; i++) {
          listingArray.push(quotaData[i].ListingTypeId)
        }
        // Query To Find ALl PackageListingType Valid Days
        let listingData = await db.PackageListingType.findAll({
          where: { PackageId: PackageId, ListingTypeId: listingArray },
          attributes: ['id', 'ListingTypeId', 'expiry'],
          raw: true
        })
        // To Separate Update Data
        let updateArray = []
        for (let j = 0; j < listingArray.length; j++) {
          for (let k = 0; k < listingData.length; k++) {
            if (listingArray[j] === listingData[k].ListingTypeId) {
              let days = listingData[k].expiry
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days)
              let dateFormatted = someDate.toISOString().substr(0, 10)
              updateArray.push({
                PurchaseId: id,
                expiry: dateFormatted,
                ListingTypeId: listingArray[j]
              })
            }
          }
        }
        // To Update User Quota
        for (let l = 0; l < updateArray.length; l++) {
          db.UserListingTypeQuota.update(updateArray[l], { where: {
            PurchaseId: updateArray[l].PurchaseId,
            ListingTypeId: updateArray[l].ListingTypeId } })
        }

        // to get User Listing Quota Data
        let quotaBannerData = await db.UserBannerQuota.findAll({
          where: { PurchaseId: id },
          raw: true
        })
        // To Get User Listing Ids In bannerArray
        let bannerArray = []
        for (let i = 0; i < quotaBannerData.length; i++) {
          bannerArray.push(quotaBannerData[i].BannerTypeId)
        }
        // Query To Find ALl PackageBanner Valid Days
        let bannerData = await db.PackageBanner.findAll({
          where: { PackageId: PackageId, BannerTypeId: bannerArray },
          attributes: ['id', 'BannerTypeId', 'expiry'],
          raw: true
        })
        // To Separate Update Data
        let updateBannerArray = []
        for (let j = 0; j < bannerArray.length; j++) {
          for (let k = 0; k < bannerData.length; k++) {
            if (bannerArray[j] === bannerData[k].BannerTypeId) {
              let days = bannerData[k].expiry
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days)
              let dateFormatted = someDate.toISOString().substr(0, 10)
              updateBannerArray.push({
                PurchaseId: id,
                expiry: dateFormatted,
                BannerTypeId: bannerArray[j]
              })
            }
          }
        }
        // To Update User Quota
        for (let l = 0; l < updateBannerArray.length; l++) {
          db.UserBannerQuota.update(updateBannerArray[l], { where: {
            PurchaseId: updateBannerArray[l].PurchaseId,
            BannerTypeId: updateBannerArray[l].BannerTypeId } })
        }

        // for Property
        let propertyData = await db.PackageTopProperty.findOne({
          where: { PackageId: PackageId },
          attributes: ['id', 'expiry'],
          raw: true
        })
        let newPropertyDays = propertyData.expiry
        let someNewDate = new Date(Date.now())
        someNewDate.setDate(someNewDate.getDate() + newPropertyDays)
        let newDateFormatted = someNewDate.toISOString().substr(0, 10)
        let propertyUpdateData = {
          expiry: newDateFormatted
        }
        db.UserTopPropertyQuota.update(propertyUpdateData, { where: { PurchaseId: id } })

        // for Project
        let projectData = await db.PackageTopProject.findOne({
          where: { PackageId: PackageId },
          attributes: ['id', 'expiry'],
          raw: true
        })
        let newProjectDays = projectData.expiry
        let someNDate = new Date(Date.now())
        someNDate.setDate(someNDate.getDate() + newProjectDays)
        let newDFormatted = someNDate.toISOString().substr(0, 10)
        let projectUpdateData = {
          expiry: newDFormatted
        }
        db.UserTopProjectQuota.update(projectUpdateData, { where: { PurchaseId: id } })

        // for Project
        let agencyData = await db.PackageTopProject.findOne({
          where: { PackageId: PackageId },
          attributes: ['id', 'expiry'],
          raw: true
        })
        let newAgencyDays = agencyData.expiry
        let someNew = new Date(Date.now())
        someNew.setDate(someNew.getDate() + newAgencyDays)
        let newFormatted = someNew.toISOString().substr(0, 10)
        let agencyUpdateData = {
          expiry: newFormatted
        }
        db.UserTopAgencyQuota.update(agencyUpdateData, { where: { PurchaseId: id } })
      }
    })
}

// ***********************************
//  Update Payment
// ***********************************

function updatePayment (data, id) {
  return db.Payment.findOne({
    where: {
      id: id
    },
    attributes: ['id']
  }).then((result) => {
    if (!result) {
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1575,
        message: 'No Information found against given id.'
      }])
    }
    return db.Payment.update(
      data,
      { where: { id: id } }
    )
      .then((updated) => {
        if (updated) {
          if (Number(data.paymentStatus) === 2) {
            updatePackagesDate(data.PurchaseId)
          }
          db.Purchase.findOne({
            where: { id: data.PurchaseId }
          }).then((res) => {
            if (Number(data.paymentStatus) === 2) {
              res.isActive = true
            }
            res.paymentStatus = data.paymentStatus
            res.save()
          })
        }
      })
  })
}

// ********************
// To Get Payment
// ********************

function getPayments () {
  return db.Payment.findAll({
    where: { isDeleted: false },
    attributes: ['id', 'receivedByName', 'paymentDate', 'paymentMethod']
  })
}

// ********************
// Delete Payment
// ********************

const deletePayment = (data) => {
  return db.Payment.findOne({
    where: {
      id: data.id,
      isDeleted: false
    },
    attributes: ['id']
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // payment not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // payment found, change value of isDeleted to true
      result.isDeleted = true
      // save payment
      result.save()
      return true
    })
}

// ********************
// get Payment
// ********************

const getPaymentById = (data) => {
  return db.Payment.findOne({
    where: {
      id: data.id,
      isDeleted: false
    },
    attributes: ['id', 'amount', 'paymentMethod', 'paymentDate'],
    include: [
      {
        model: db.Purchase,
        as: 'purchasePayments'
      }
    ]
  })
}

module.exports = {
  PostPayment,
  updatePayment,
  getPayments,
  deletePayment,
  getPaymentById
}
