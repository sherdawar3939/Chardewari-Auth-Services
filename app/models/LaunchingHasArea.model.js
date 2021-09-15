'use strict'

module.exports = function (sequelize, DataTypes) {
  let LaunchingHasArea = sequelize.define('LaunchingHasArea', {
    LaunchingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Launching',
        key: 'id'
      }
    },
    AreaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Area',
        key: 'id'
      }
    }
  })
  return LaunchingHasArea
}
