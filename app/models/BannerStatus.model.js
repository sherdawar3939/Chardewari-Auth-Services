'use strict'

module.exports = function (sequelize, DataTypes) {
  let bannerStatus = sequelize.define('BannerStatus', {
    status: {
      type: DataTypes.STRING,
      require: true
    },
    createdBy: {
      type: DataTypes.STRING(30),
      require: true
    },
    createdByName: {
      type: DataTypes.STRING(30),
      require: true
    }
  }, {
    associate: function (models) {
      bannerStatus.belongsTo(models.Banner, { foreignKey: 'BannerId', as: 'relatedBannerAndBannerStatus' })
    }
  })
  return bannerStatus
}
