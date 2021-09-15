'use strict'

module.exports = function (sequelize, DataTypes) {
  let AreaUnit = sequelize.define('AreaUnit', {
    name: {
      type: DataTypes.STRING(50)
    },
    nameL1: {
      type: DataTypes.STRING(100)
    },
    code: {
      type: DataTypes.STRING(20)
    },
    codeL1: {
      type: DataTypes.STRING(20)
    }
    // operation: {
    //   type: DataTypes.STRING(20)
    // },
    // value: {
    //   type: DataTypes.DECIMAL(11, 4)
    // },
    // ParentId: {
    //   type: DataTypes.INTEGER
    // }
  // },
  // {
  //   associate: function (models) {
  //     AreaUnit.hasOne(models.AreaUnit, { foreignKey: 'ParentId', as: 'relatedAreaUnit' })
  //   }
  })
  return AreaUnit
}
