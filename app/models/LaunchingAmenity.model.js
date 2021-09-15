'use strict'

module.exports = function (sequelize, DataTypes) {
  let LaunchingAmenity = sequelize.define('LaunchingAmenity', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    LaunchingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Launching',
        key: 'id'
      }
    },
    AmenityPropertyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'AmenityProperty',
        key: 'id'
      }
    },
    value: {
      type: DataTypes.STRING
    }
  }, {
    associate: function (models) {
      LaunchingAmenity.belongsTo(models.Launching, { foreignKey: 'LaunchingId' })
      LaunchingAmenity.belongsTo(models.AmenityProperty, { foreignKey: 'AmenityPropertyId', as: 'amenityLaunchingValue' })
    }
  })
  return LaunchingAmenity
}
