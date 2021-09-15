'use strict'

module.exports = function (sequelize, DataTypes) {
  let PropertyAmenity = sequelize.define('PropertyAmenity', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    PropertyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Property',
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
      PropertyAmenity.belongsTo(models.Property, { foreignKey: 'PropertyId' })
      PropertyAmenity.belongsTo(models.AmenityProperty, { foreignKey: 'AmenityPropertyId', as: 'amenityValue' })
    }
  })
  return PropertyAmenity
}
