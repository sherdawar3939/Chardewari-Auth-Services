'use strict'

module.exports = function (sequelize, DataTypes) {
  let ProductImage = sequelize.define('ProductImage', {
    url: {
      type: DataTypes.STRING(150)
    },
    ratio: {
      type: DataTypes.STRING(20)
    },
    uniqueImages: {
      type: DataTypes.INTEGER(2)
    }
  }, {
    associate: function (models) {
      ProductImage.belongsTo(models.Product, { foreignKey: 'ProductId', as: 'product' })
    }
  })
  return ProductImage
}
