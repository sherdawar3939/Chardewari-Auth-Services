'use strict'

module.exports = function (sequelize, DataTypes) {
  let AmenityProperties = sequelize.define('AmenityProperty', {
    AmenityId: {
      type: DataTypes.INTEGER,
      require: true
    },
    title: {
      type: DataTypes.STRING(50),
      require: true
    },
    titleL1: {
      type: DataTypes.STRING(100)
    },
    format: {
      type: DataTypes.STRING(20)
    },
    isRequired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isInFilters: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    orderSequence: { // Sorting order sequence number.
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      AmenityProperties.belongsToMany(models.Property, {
        through: 'PropertyAmenity',
        as: 'properties',
        foreignKey: 'AmenityPropertyId'
      })
      AmenityProperties.belongsToMany(models.Launching, {
        through: 'LaunchingAmenity',
        as: 'launchings',
        foreignKey: 'AmenityPropertyId'
      })
      AmenityProperties.belongsToMany(models.TopProperty, {
        through: 'HFPropertyAmenity',
        as: 'relatedFeaturedPA',
        foreignKey: 'AmenityPropertyId'
      })
      AmenityProperties.belongsTo(models.Amenities, { foreignKey: 'AmenityId', as: 'amenity' })
      AmenityProperties.hasMany(models.PropertyAmenity, { as: 'amenityValue' })
      AmenityProperties.hasMany(models.LaunchingAmenity, { as: 'amenityLaunchingValue' })
    }
  })
  return AmenityProperties
}
