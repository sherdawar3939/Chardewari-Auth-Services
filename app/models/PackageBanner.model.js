'use strict'

module.exports = function (sequelize, DataTypes) {
  let PackageBanner = sequelize.define('PackageBanner', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PackageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Package',
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
    expiry: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      PackageBanner.belongsTo(models.Package, { foreignKey: 'PackageId' })
      PackageBanner.belongsTo(models.BannerType, { foreignKey: 'BannerTypeId', as: 'PackagesBanner' })
    }
  })
  return PackageBanner
}
