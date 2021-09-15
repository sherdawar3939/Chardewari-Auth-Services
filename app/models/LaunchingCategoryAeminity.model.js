'use strict'

module.exports = function (sequelize, DataTypes) {
  let LaunchingCategoryAmenity = sequelize.define('LaunchingCategoryAmenity', {
    AmenityId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Amenity',
        key: 'id'
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'LaunchingCategory',
        key: 'id'
      }
    }
  })
  return LaunchingCategoryAmenity
}
