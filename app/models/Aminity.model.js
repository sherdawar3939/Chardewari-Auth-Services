'use strict'

module.exports = function (sequelize, DataTypes) {
  let Amenities = sequelize.define('Amenities', {
    title: {
      type: DataTypes.STRING(100)
    },
    titleL1: {
      type: DataTypes.STRING(150)
    },
    isActive: {
      type: DataTypes.STRING(5)
    },
    orderSequence: { // Sorting order sequence number.
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      Amenities.belongsToMany(models.PropertyCategory, {
        through: 'CategoryAmenity',
        as: 'propertyCategories',
        foreignKey: 'AmenityId'
      })
      Amenities.hasMany(models.AmenityProperty, { as: 'amenity' })
      Amenities.belongsToMany(models.LaunchingCategory, {
        through: 'LaunchingCategoryAmenity',
        as: 'LaunchingAmenityCategories',
        foreignKey: 'AmenityId'
      })
    }
  }
  )
  return Amenities
}
