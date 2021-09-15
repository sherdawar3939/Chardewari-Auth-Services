'use strict'

module.exports = function (sequelize, DataTypes) {
  let listingType = sequelize.define('ListingType', {
    title: {
      type: DataTypes.STRING(50),
      require: true
    },
    titleL1: {
      type: DataTypes.STRING(100)
    },
    priority: {
      type: DataTypes.INTEGER
    },
    unitPrice: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    validTillDay: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      listingType.hasMany(models.Property, {
        as: 'listingTypeProperties',
        foreignKey: 'ListingTypeId'
      })
      listingType.belongsToMany(models.User, {
        through: 'UserListingType',
        as: 'relatedUserListingType',
        foreignKey: 'ListingTypeId'
      })
      listingType.belongsToMany(models.Package, {
        through: 'PackageListingType',
        as: 'PackagesListingType',
        foreignKey: 'ListingTypeId'
      })
      listingType.belongsToMany(models.User, {
        through: 'UserListingTypeQuota',
        as: 'userListingType',
        foreignKey: 'ListingTypeId'
      })
    }
  })
  return listingType
}
