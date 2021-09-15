'use strict'

module.exports = function (sequelize, DataTypes) {
  let bannerType = sequelize.define('BannerType', {
    title: {
      type: DataTypes.STRING(30),
      require: true
    },
    description: {
      type: DataTypes.STRING(200),
      require: true
    },
    width: {
      type: DataTypes.INTEGER(10)
    },
    height: {
      type: DataTypes.INTEGER(10)
    },
    identifiers: {
      type: DataTypes.STRING(30),
      require: true,
      unique: true
    },
    minWidth: {
      type: DataTypes.INTEGER(10)
    },
    minHeight: {
      type: DataTypes.INTEGER(10)
    },
    maxBanners: {
      type: DataTypes.INTEGER(2)
    },
    price: {
      type: DataTypes.INTEGER
    },
    validTillDay: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      bannerType.hasMany(models.Banner, { as: 'relatedBannerAndBannerType' })
      bannerType.belongsToMany(models.Package, {
        through: 'PackageBanner',
        as: 'PackagesBanner',
        foreignKey: 'BannerTypeId'
      })
      bannerType.belongsToMany(models.User, {
        through: 'UserBannerQuota',
        as: 'userBannerQuota',
        foreignKey: 'BannerTypeId'
      })
    }
  })
  return bannerType
}
