'use strict'

module.exports = function (sequelize, DataTypes) {
  let TopConfig = sequelize.define('TopConfig', {
    name: {
      type: DataTypes.STRING(50),
      require: true
    },
    nameL1: {
      type: DataTypes.STRING(50)
    },
    identifier: {
      type: DataTypes.STRING(200)
    },
    price: {
      type: DataTypes.INTEGER
    },
    showAtHomePrice: {
      type: DataTypes.INTEGER
    },
    validTillDay: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
    //   TopConfig.belongsTo(models.Launching, { foreignKey: 'LaunchingId', as: 'relatedTopConfigsLaunching' })
    }
  })
  return TopConfig
}
