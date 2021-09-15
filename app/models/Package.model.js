'use strict'

module.exports = function (sequelize, DataTypes) {
  let Package = sequelize.define('Package', {
    packageName: {
      type: DataTypes.STRING(30),
      required: true
    },
    packagePrice: {
      type: DataTypes.INTEGER,
      required: true
    },
    discountedPrice: {
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.DATEONLY
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Package.belongsToMany(models.ListingType, {
        through: 'PackageListingType',
        as: 'PackagesListingType',
        foreignKey: 'PackageId'
      })
      Package.hasMany(models.PackageTopProperty, {
        as: 'PackagesTopProperty'
      })
      Package.belongsToMany(models.BannerType, {
        through: 'PackageBanner',
        as: 'PackagesBanner',
        foreignKey: 'PackageId'
      })
      Package.hasMany(models.PackageTopProject, {
        as: 'PackagesTopProjects'
      })
      Package.hasMany(models.PackageTopAgency, {
        as: 'PackagesTopAgency'
      })
      Package.hasMany(models.Purchase, {
        as: 'packagePurchase'
      })
    }
  })
  return Package
}
