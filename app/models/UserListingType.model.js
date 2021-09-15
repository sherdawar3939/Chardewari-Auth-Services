'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserListingType = sequelize.define('UserListingType', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quota: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    usedQuota: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    ListingTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ListingType',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  })
  return UserListingType
}
