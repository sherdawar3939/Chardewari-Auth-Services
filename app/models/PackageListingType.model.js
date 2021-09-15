'use strict'

module.exports = function (sequelize, DataTypes) {
  let PackageListingType = sequelize.define('PackageListingType', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PackageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'package',
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
    limit: {
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      PackageListingType.belongsTo(models.Package, { foreignKey: 'PackageId' })
      PackageListingType.belongsTo(models.ListingType, { foreignKey: 'ListingTypeId', as: 'packageListingType' })
    }
  })
  return PackageListingType
}
