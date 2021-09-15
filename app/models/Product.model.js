'use strict'

module.exports = function (sequelize, DataTypes) {
  let Product = sequelize.define('Product',
    {
      title: {
        type: DataTypes.STRING(100),
        require: true
      },
      titleL1: {
        type: DataTypes.STRING(100)
      },
      price: {
        type: DataTypes.INTEGER,
        require: true
      },
      discountedPrice: {
        type: DataTypes.INTEGER
      },
      thumbnail: {
        type: DataTypes.STRING(100)
      },
      description: {
        type: DataTypes.STRING(10000),
        require: true
      },
      descriptionL1: {
        type: DataTypes.STRING(10000)
      },
      slug: {
        type: DataTypes.STRING(50)
      },
      location: {
        type: DataTypes.STRING(100)
      },
      locationL1: {
        type: DataTypes.STRING(100)
      },
      size: {
        type: DataTypes.STRING(50)
      },
      quality: {
        type: DataTypes.STRING(30)
      },
      currency: {
        type: DataTypes.STRING(10)
      },
      UserId: {
        type: DataTypes.INTEGER(11)
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      associate: function (models) {
        Product.hasMany(models.ProductImage, { as: 'images' })
        Product.belongsToMany(models.ProductCategory, {
          through: 'ProductHasCategory',
          as: 'productsCategory',
          foreignKey: 'ProductId'
        })
        Product.belongsTo(models.CompanyProfile, {
          foreignKey: 'CompanyId',
          as: 'relatedCompanyProducts'
        })
        Product.belongsToMany(models.Area, {
          through: 'ProductHasArea',
          as: 'relatedAreaProducts',
          foreignKey: 'ProductId'
        })
        Product.belongsTo(models.ProductUnit, { foreignKey: 'UnitId', as: 'baseUnit' })
        // Product.belongsTo(models.ProductUnit, { foreignKey: 'PurchaseUnitId', as: 'purchaseUnit' })
        // Product.belongsTo(models.ProductUnit, { foreignKey: 'SaleUnitId', as: 'saleUnit' })
      }
    }
  )

  return Product
}
