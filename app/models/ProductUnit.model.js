'use strict'

module.exports = function (sequelize, DataTypes) {
  let ProductUnit = sequelize.define('ProductUnit', {
    name: {
      type: DataTypes.STRING(50),
      require: true
    },
    nameL1: {
      type: DataTypes.STRING(100)
    },
    code: {
      type: DataTypes.STRING(20),
      require: true
    },
    codeL1: {
      type: DataTypes.STRING(20)
    },
    operation: {
      type: DataTypes.STRING(20),
      require: true
    },
    value: {
      type: DataTypes.DECIMAL(11, 4),
      require: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    associate: function (models) {
      ProductUnit.hasMany(models.Product, { as: 'relatedProduct' })
      ProductUnit.hasOne(models.ProductUnit, { foreignKey: 'ParentId', as: 'parentUnit' })
    }
  })
  return ProductUnit
}
