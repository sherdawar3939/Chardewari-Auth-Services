'use strict'

module.exports = function (sequelize, DataTypes) {
  let CategoryAmenity = sequelize.define('CategoryAmenity', {
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PropertyCategory',
        key: 'id'
      }
    },
    AmenityId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Amenities',
        key: 'id'
      }
    }
  })
  return CategoryAmenity
}
