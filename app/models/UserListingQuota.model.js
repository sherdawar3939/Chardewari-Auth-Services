'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserListingTypeQuota = sequelize.define('UserListingTypeQuota', {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    ListingTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ListingType',
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
      UserListingTypeQuota.belongsTo(models.User, { foreignKey: 'UserId' })
      UserListingTypeQuota.belongsTo(models.ListingType, { foreignKey: 'ListingTypeId' })
      UserListingTypeQuota.belongsTo(models.Purchase, { foreignKey: 'PurchaseId', as: 'purchaseUserListingTypeQuota' })
    }
  })
  return UserListingTypeQuota
}
