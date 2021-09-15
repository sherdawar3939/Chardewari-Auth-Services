'use strict'

const db = require('../config/sequelize.config')
const generalHelpingMethods = require('../helpers/general.helper')

// ***************************
// To Add Package
// ***************************

function addPackage (data) {
  return db.Package.findOne({
    where: {
      packageName: data.packageName
    }
  }).then((response) => {
    if (response) {
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1577,
        message: 'Package Name Already Exist'
      }])
    }
    return db.Package.create(data)
  })
    .then((createdPackage) => {
      // for listing Type
      if (data.listingType.length) {
        let listingTypeArray = data.listingType
        for (let i = 0; i < listingTypeArray.length; i++) {
          listingTypeArray[i].PackageId = createdPackage.id
        }
        db.PackageListingType.bulkCreate(listingTypeArray)
      }
      // for banners
      if (data.banner.length) {
        let bannerArray = data.banner
        for (let i = 0; i < bannerArray.length; i++) {
          bannerArray[i].PackageId = createdPackage.id
        }
        db.PackageBanner.bulkCreate(bannerArray)
      }
      // for projects
      if (data.project.length) {
        let projectArray = data.project
        for (let i = 0; i < projectArray.length; i++) {
          projectArray[i].PackageId = createdPackage.id
        }
        db.PackageTopProject.bulkCreate(projectArray)
      }

      // for property
      if (data.property.length) {
        let propertyArray = data.property
        for (let i = 0; i < propertyArray.length; i++) {
          propertyArray[i].PackageId = createdPackage.id
        }
        db.PackageTopProperty.bulkCreate(propertyArray)
      }

      // for Agency
      if (data.companyProfile.length) {
        let companyProfileArray = data.companyProfile
        for (let i = 0; i < companyProfileArray.length; i++) {
          companyProfileArray[i].PackageId = createdPackage.id
        }
        db.PackageTopAgency.bulkCreate(companyProfileArray)
      }
      return createdPackage
    })
}

// ***********************************
// To Get Package Details Against Id
// ***********************************

function getPackageDetail (conditions) {
  return db.Package.findOne({
    where: { id: conditions.id },
    include: [
      {
        model: db.BannerType,
        as: 'PackagesBanner'
      },
      {
        model: db.ListingType,
        as: 'PackagesListingType'
      },
      {
        model: db.PackageTopProperty,
        as: 'PackagesTopProperty'
      },
      {
        model: db.PackageTopProject,
        as: 'PackagesTopProjects'
      },
      {
        model: db.PackageTopAgency,
        as: 'PackagesTopAgency'
      }
    ]
  })
}

// *************************
// Update Package
// *************************

function updatePackage (data, id) {
  return db.Package.findOne({
    where: {
      id: id.id
    }
  }).then((result) => {
    if (!result) {
      return generalHelpingMethods.rejectPromise([{
        field: 'id',
        error: 1575,
        message: 'No Information found against given id.'
      }])
    }
    return db.Package.update(
      data,
      { where: { id: id.id } }
    )
      .then((updated) => {
        // for listing Type
        if (data.listingType.length) {
          db.PackageListingType.destroy({ where: { PackageId: id.id } })
            .then(() => {
              let listingTypeArray = data.listingType
              for (let i = 0; i < listingTypeArray.length; i++) {
                listingTypeArray[i].PackageId = id.id
              }
              db.PackageListingType.bulkCreate(listingTypeArray)
            })
        }

        // for banners
        if (data.banner.length) {
          db.PackageBanner.destroy({ where: { PackageId: id.id } })
            .then(() => {
              let bannerArray = data.banner
              for (let i = 0; i < bannerArray.length; i++) {
                bannerArray[i].PackageId = id.id
              }
              db.PackageBanner.bulkCreate(bannerArray)
            })
        }

        // for projects
        if (data.project.length) {
          db.PackageTopProject.destroy({ where: { PackageId: id.id } })
            .then(() => {
              let projectArray = data.project
              for (let i = 0; i < projectArray.length; i++) {
                projectArray[i].PackageId = id.id
              }
              db.PackageTopProject.bulkCreate(projectArray)
            })
        }

        // for property
        if (data.property.length) {
          db.PackageTopProperty.destroy({ where: { PackageId: id.id } })
            .then(() => {
              let propertyArray = data.property
              for (let i = 0; i < propertyArray.length; i++) {
                propertyArray[i].PackageId = id.id
              }
              db.PackageTopProperty.bulkCreate(propertyArray)
            })
        }

        // for Agency
        if (data.companyProfile.length) {
          db.PackageTopAgency.destroy({ where: { PackageId: id.id } })
            .then(() => { })
          let companyProfileArray = data.companyProfile
          for (let i = 0; i < companyProfileArray.length; i++) {
            companyProfileArray[i].PackageId = id.id
          }
          db.PackageTopAgency.bulkCreate(companyProfileArray)
        }
        return updated
      })
  })
}

// *******************************
// To Get Packages
// *******************************

function getPackages (conditions) {
  // Check if Packages exist in conditions
  return db.Package.findAll({
    where: conditions
  })
}

// *******************************
// To delete Packages
// *******************************

function deletePackages (conditions) {
  return db.Package.findOne({
    where: {
      id: conditions.id
    }
  })
    .then((foundPackage) => {
      if (foundPackage) {
        db.Package.destroy({ where: { id: conditions.id } })
        db.PackageListingType.destroy({ where: { PackageId: conditions.id } })
        db.PackageTopProject.destroy({ where: { PackageId: conditions.id } })
        db.PackageBanner.destroy({ where: { PackageId: conditions.id } })
        db.PackageTopProperty.destroy({ where: { PackageId: conditions.id } })
        db.PackageTopAgency.destroy({ where: { PackageId: conditions.id } })
        return foundPackage
      } else {
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
    })
}

const getAllPackages = (conditions) => {
  conditions.isActive = true
  // Check if Packages exist in conditions
  return db.Package.findAll({
    where: conditions,
    include: [
      {
        model: db.BannerType,
        as: 'PackagesBanner'
      },
      {
        model: db.ListingType,
        as: 'PackagesListingType'
      },
      {
        model: db.PackageTopProperty,
        as: 'PackagesTopProperty'
      },
      {
        model: db.PackageTopProject,
        as: 'PackagesTopProjects'
      },
      {
        model: db.PackageTopAgency,
        as: 'PackagesTopAgency'
      }
    ]
  })
}

// ***********************
// addCustomPackage
// ***********************

function addCustomPackage (data, id) {
  return db.User.findOne({
    where: { id: id }
  }).then((response) => {
    if (response) {
      data.UserId = id
      data.isActive = false
      data.PurchaseDate = new Date(Date.now())
      return db.Purchase.create(data)
        .then(async (createdPurchase) => {
          // for listing Type
          if (data.listingType.length) {
            let listingTypeArray = data.listingType
            for (let i = 0; i < listingTypeArray.length; i++) {
              listingTypeArray[i].UserId = id
              listingTypeArray[i].PurchaseId = createdPurchase.id
              let listingTypeData = await db.ListingType.findOne({
                where: { id: listingTypeArray[i].ListingTypeId },
                raw: true
              })
              let days = listingTypeData.validTillDay
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days) // number  of days to add, e.x. 15 days
              let dateFormatted = someDate.toISOString().substr(0, 10)
              listingTypeArray[i].expiry = dateFormatted
            }
            db.UserListingTypeQuota.bulkCreate(listingTypeArray)
          }

          // for banners
          if (data.banner.length) {
            let bannerArray = data.banner
            for (let i = 0; i < bannerArray.length; i++) {
              bannerArray[i].UserId = id
              bannerArray[i].PurchaseId = createdPurchase.id
              let bannerTypeData = await db.BannerType.findOne({
                where: { id: bannerArray[i].BannerTypeId },
                raw: true
              })
              let days = bannerTypeData.validTillDay
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days)
              let dateFormatted = someDate.toISOString().substr(0, 10)
              bannerArray[i].expiry = dateFormatted
            }
            db.UserBannerQuota.bulkCreate(bannerArray)
          }

          // for projects
          if (data.project.length) {
            let projectArray = data.project
            for (let i = 0; i < projectArray.length; i++) {
              projectArray[i].UserId = id
              projectArray[i].PurchaseId = createdPurchase.id
              let projectData = await db.TopConfig.findOne({
                where: { identifier: 'TopProject' },
                raw: true
              })
              let days = projectData.validTillDay
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days) // number  of days to add, e.x. 15 days
              let dateFormatted = someDate.toISOString().substr(0, 10)
              projectArray[i].expiry = dateFormatted
            }
            db.UserTopProjectQuota.bulkCreate(projectArray)
          }

          // for property
          if (data.property.length) {
            let propertyArray = data.property
            for (let i = 0; i < propertyArray.length; i++) {
              propertyArray[i].UserId = id
              propertyArray[i].PurchaseId = createdPurchase.id
              let propertyData = await db.TopConfig.findOne({
                where: { identifier: 'TopProperty' },
                raw: true
              })
              let days = propertyData.validTillDay
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days) // number  of days to add, e.x. 15 days
              let dateFormatted = someDate.toISOString().substr(0, 10)
              propertyArray[i].expiry = dateFormatted
            }
            db.UserTopPropertyQuota.bulkCreate(propertyArray)
          }

          // for Agency
          if (data.companyProfile.length) {
            let companyProfileArray = data.companyProfile
            for (let i = 0; i < companyProfileArray.length; i++) {
              companyProfileArray[i].UserId = id
              companyProfileArray[i].PurchaseId = createdPurchase.id
              let agencyData = await db.TopConfig.findOne({
                where: { identifier: 'TopAgency' },
                raw: true
              })
              let days = agencyData.validTillDay
              let someDate = new Date(Date.now())
              someDate.setDate(someDate.getDate() + days) // number  of days to add, e.x. 15 days
              let dateFormatted = someDate.toISOString().substr(0, 10)
              companyProfileArray[i].expiry = dateFormatted
            }
            if (companyProfileArray[0].agency) {
              db.UserTopAgencyQuota.bulkCreate(companyProfileArray)
            }
          }
          return response
        })
    }
  })
}

// ***********************
// userPackages
// ***********************

function userPackages (id, userId) {
  return db.Package.findOne({
    where: { id: id.id }
  }).then((response) => {
    if (response) {
      return db.Purchase.findOne({
        where: { PackageId: id.id, isActive: true, UserId: userId }
      })
        .then((pkg) => {
          if (pkg) {
            return generalHelpingMethods.rejectPromise([{
              field: 'id',
              error: 1575,
              message: 'You Already Have subscription Of this Package.'
            }])
          } else {
            let data = {
              PurchaseDate: new Date(Date.now()),
              totalPrice: response.dataValues.packagePrice,
              discount: response.dataValues.discountedPrice,
              isActive: true,
              UserId: userId,
              PackageId: id.id
            }
            db.Purchase.create(data)
              .then((purchase) => {
                db.PackageBanner.findAll({
                  where: { PackageId: id.id },
                  raw: true
                }).then((PackageBanner) => {
                // For User Banner Package
                  let bannerArray = []
                  for (let i = 0; i < PackageBanner.length; i++) {
                    let someDate = new Date(Date.now())
                    someDate.setDate(someDate.getDate() + PackageBanner[i].expiry) // number  of days to add, e.x. 15 days
                    let dateFormatted = someDate.toISOString().substr(0, 10)
                    bannerArray.push({
                      UserId: userId,
                      BannerTypeId: PackageBanner[i].BannerTypeId,
                      quantity: PackageBanner[i].quantity,
                      expiry: dateFormatted,
                      PurchaseId: purchase.id
                    })
                  }
                  db.UserBannerQuota.bulkCreate(bannerArray)
                })

                // For Listing Type
                db.PackageListingType.findAll({
                  where: { PackageId: id.id },
                  raw: true
                }).then((PackageListingType) => {
                // For User Banner Package
                  let listingTypeArray = []
                  for (let i = 0; i < PackageListingType.length; i++) {
                    let someDate = new Date(Date.now())
                    someDate.setDate(someDate.getDate() + PackageListingType[i].expiry) // number  of days to add, e.x. 15 days
                    let dateFormatted = someDate.toISOString().substr(0, 10)
                    listingTypeArray.push({
                      UserId: userId,
                      ListingTypeId: PackageListingType[i].ListingTypeId,
                      quantity: PackageListingType[i].limit,
                      expiry: dateFormatted,
                      PurchaseId: purchase.id
                    })
                  }
                  db.UserListingTypeQuota.bulkCreate(listingTypeArray)
                })

                // For Top Property
                db.PackageTopProperty.findAll({
                  where: { PackageId: id.id },
                  raw: true
                }).then((packageTopProperty) => {
                // For User Banner Package
                  let topPropertyArray = []
                  for (let i = 0; i < packageTopProperty.length; i++) {
                    let someDate = new Date(Date.now())
                    someDate.setDate(someDate.getDate() + packageTopProperty[i].expiry)
                    let dateFormatted = someDate.toISOString().substr(0, 10)
                    topPropertyArray.push({
                      UserId: userId,
                      showOnHome: packageTopProperty[i].showOnHome,
                      limit: packageTopProperty[i].limit,
                      expiry: dateFormatted,
                      PurchaseId: purchase.id
                    })
                  }
                  db.UserTopPropertyQuota.bulkCreate(topPropertyArray)
                })

                // For Top Project
                db.PackageTopProject.findAll({
                  where: { PackageId: id.id },
                  raw: true
                }).then((packageTopProject) => {
                // For User Banner Package
                  let topProjectArray = []
                  for (let i = 0; i < packageTopProject.length; i++) {
                    let someDate = new Date(Date.now())
                    someDate.setDate(someDate.getDate() + packageTopProject[i].expiry)
                    let dateFormatted = someDate.toISOString().substr(0, 10)
                    topProjectArray.push({
                      UserId: userId,
                      limit: packageTopProject[i].limit,
                      expiry: dateFormatted,
                      PurchaseId: purchase.id
                    })
                  }
                  db.UserTopProjectQuota.bulkCreate(topProjectArray)
                })

                // For Top Agency
                db.PackageTopAgency.findAll({
                  where: { PackageId: id.id },
                  raw: true
                }).then((packageTopAgency) => {
                // For User Banner Package
                  let topAgencyArray = []
                  for (let i = 0; i < packageTopAgency.length; i++) {
                    let someDate = new Date(Date.now())
                    someDate.setDate(someDate.getDate() + packageTopAgency[i].expiry)
                    let dateFormatted = someDate.toISOString().substr(0, 10)
                    topAgencyArray.push({
                      UserId: userId,
                      limit: packageTopAgency[i].limit,
                      expiry: dateFormatted,
                      PurchaseId: purchase.id
                    })
                  }
                  db.UserTopAgencyQuota.bulkCreate(topAgencyArray)
                })
              })
          }
        })
    }
  })
}
// ***************************
// To Get Offers against User
// ***************************

const userOffers = (id) => {
  return db.Purchase.findAll({
    where: { UserId: id }
  })
}

// ****************************
// top Config
// ****************************

const topConfig = () => {
  return db.TopConfig.findAll()
}

module.exports = {
  addPackage,
  getPackageDetail,
  updatePackage,
  getPackages,
  deletePackages,
  getAllPackages,
  addCustomPackage,
  userPackages,
  userOffers,
  topConfig
}
