'use strict'

module.exports = function (sequelize, DataTypes) {
  let Purchase = sequelize.define('Purchase', {
    PurchaseDate: {
      type: DataTypes.DATEONLY,
      required: true
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      required: true
    },
    discount: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paymentStatus: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0
    }
  }, {
    associate: function (models) {
      Purchase.belongsTo(models.Package, {
        as: 'purchasePackage',
        foreignKey: 'PackageId'
      })
      Purchase.belongsTo(models.User, {
        as: 'purchaseUser',
        foreignKey: 'UserId'
      })
      Purchase.hasMany(models.UserListingTypeQuota, {
        as: 'purchaseListingTypeQuota'
      })
      Purchase.hasMany(models.UserBannerQuota, {
        as: 'purchaseBannerQuota'
      })
      Purchase.hasMany(models.UserTopPropertyQuota, {
        as: 'purchaseTopPropertyQuota'
      })
      Purchase.hasMany(models.UserTopProjectQuota, {
        as: 'purchaseTopProjectQuota'
      })
      Purchase.hasMany(models.UserTopAgencyQuota, {
        as: 'purchaseTopAgencyQuota'
      })
      Purchase.hasMany(models.Payment, { as: 'purchasePayments' })
    }
  })
  return Purchase
}
