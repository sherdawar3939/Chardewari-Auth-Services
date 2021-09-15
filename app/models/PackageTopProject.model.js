
'use strict'

module.exports = function (sequelize, DataTypes) {
  let PackageTopProjects = sequelize.define('PackageTopProject', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    limit: {
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      PackageTopProjects.belongsTo(models.Package, { foreignKey: 'PackageId' })
    }
  })
  return PackageTopProjects
}
