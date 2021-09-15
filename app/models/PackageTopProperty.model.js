'use strict'

module.exports = function (sequelize, DataTypes) {
  let PackageTopProperty = sequelize.define('PackageTopProperty', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    showOnHome: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    limit: {
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      PackageTopProperty.belongsTo(models.Package, { foreignKey: 'PackageId' })
    }
  })
  return PackageTopProperty
}
