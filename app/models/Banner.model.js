'use strict'

module.exports = function (sequelize, DataTypes) {
  let Banner = sequelize.define('Banner', {
    url: {
      type: DataTypes.STRING(150),
      require: true
    },
    size: {
      type: DataTypes.STRING(200)
    },
    status: {
      type: DataTypes.STRING,
      require: true
    },
    createdByName: {
      type: DataTypes.STRING(30),
      require: true
    },
    identifiers: {
      type: DataTypes.STRING(30),
      require: true,
    },
    validTill: {
      type: DataTypes.DATE,
      require: true
    }
  }, {
    associate: function (models) {
      Banner.belongsTo(models.BannerType, { foreignKey: 'BannerTypeId', as: 'relatedBannerAndBannerType' })
      Banner.hasMany(models.BannerStatus, { as: 'relatedBannerAndBannerStatus' })
      Banner.belongsTo(models.CompanyProfile, { foreignKey: 'CompanyProfileId', as: 'relatedCompanyBanner' })
      Banner.belongsTo(models.User, { foreignKey: 'CreatedBy', as: 'relatedUserBanner' })
    }
  })
  return Banner
}
