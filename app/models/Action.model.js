'use strict'

module.exports = function (sequelize, DataTypes) {
  let Action = sequelize.define('Action', {
    name: {
      type: DataTypes.STRING(50)
    },
    description: {
      type: DataTypes.STRING(200)
    },
    identifier: {
      type: DataTypes.STRING(20)
    }
  }, {
    associate: function (models) {
      Action.belongsToMany(models.Module, {
        through: 'ModuleAction',
        as: 'modules',
        foreignKey: 'ActionId'
      })
    }
  }
  )
  return Action
}
