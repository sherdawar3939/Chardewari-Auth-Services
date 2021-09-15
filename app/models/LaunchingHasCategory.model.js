'use strict'

module.exports = function (sequelize, DataTypes) {
  let LaunchingHasCategory = sequelize.define('LaunchingHasCategory', {
    LaunchingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Launching',
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
  return LaunchingHasCategory
}
