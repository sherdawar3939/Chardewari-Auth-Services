'use strict'

module.exports = function (sequelize, DataTypes) {
  let ProductCategory = sequelize.define('ProductCategory', {
    title: {
      type: DataTypes.STRING(50),
      require: true
    },
    titleL1: {
      type: DataTypes.STRING(100)
    },
    level: {
      type: DataTypes.INTEGER
    },
    slug: {
      type: DataTypes.STRING(100)
    },
    singularName: {
      type: DataTypes.STRING(50)
    },
    singularNameL1: {
      type: DataTypes.STRING(50)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      ProductCategory.belongsToMany(models.Product, {
        through: 'ProductHasCategory',
        as: 'productsCategory',
        foreignKey: 'CategoryId'
      })
      ProductCategory.hasOne(models.ProductCategory, { foreignKey: 'ParentCategoryId', as: 'parentCategory' })
    }
  })
  return ProductCategory
}
