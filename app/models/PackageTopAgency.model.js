'use strict'

module.exports = function (sequelize, DataTypes) {
  let PackageTopAgency = sequelize.define('PackageTopAgency', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      PackageTopAgency.belongsTo(models.Package, { foreignKey: 'PackageId' })
    }
  })
  return PackageTopAgency
}
