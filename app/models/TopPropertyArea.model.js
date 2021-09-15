'use strict'

module.exports = function (sequelize, DataTypes) {
  let TopPropertyArea = sequelize.define('TopPropertyArea', {
    TopPropertyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'TopProperty',
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
  return TopPropertyArea
}