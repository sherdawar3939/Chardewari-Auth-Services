'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserBannerQuota = sequelize.define('UserBannerQuota', {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    BannerTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BannerType',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.DATEONLY
    }
  }, {
    associate: function (models) {
      UserBannerQuota.belongsTo(models.User, { foreignKey: 'UserId' })
      UserBannerQuota.belongsTo(models.Purchase, { foreignKey: 'PurchaseId', as: 'purchaseUserBannerQuota' })
    }
  })
  return UserBannerQuota
}
