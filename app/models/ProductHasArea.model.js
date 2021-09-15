'use strict'

module.exports = function (sequelize, DataTypes) {
  let ProductHasArea = sequelize.define('ProductHasArea', {
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
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
  return ProductHasArea
}
