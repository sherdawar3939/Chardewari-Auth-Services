'use strict'

module.exports = function (sequelize, DataTypes) {
  let Currency = sequelize.define('Currency', {
    code: {
      type: DataTypes.STRING(10)
    },
    codeL1: {
      type: DataTypes.STRING(10)
    },
    name: {
      type: DataTypes.STRING(50)
    },
    nameL1: {
      type: DataTypes.STRING(50)
    },
    rate: {
      type: DataTypes.DECIMAL(10, 4)
    },
    symbol: {
      type: DataTypes.STRING(5)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      Currency.hasMany(models.Launching, { as: 'relatedCurrencyLaunching' })
      Currency.hasMany(models.Property, { as: 'relatedCurrencyProperty' })
    }
  })

  return Currency
}
