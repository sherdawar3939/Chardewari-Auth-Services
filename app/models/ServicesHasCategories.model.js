'use strict'

module.exports = function (sequelize, DataTypes) {
  let ServicesHasCategory = sequelize.define('ServicesHasCategory', {
    ServiceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Services',
        key: 'id'
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ServiceCategory',
        key: 'id'
      }
    }
  })
  return ServicesHasCategory
}
