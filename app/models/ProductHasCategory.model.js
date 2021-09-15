'use strict'

module.exports = function (sequelize, DataTypes) {
  let ProductHasCategory = sequelize.define('ProductHasCategory', {
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductCategory',
        key: 'id'
      }
    }
  })
  return ProductHasCategory
}
