'use strict'

module.exports = function (sequelize, DataTypes) {
  let Module = sequelize.define('Module', {
    title: {
      type: DataTypes.STRING(50),
      require: true
    },
    description: {
      type: DataTypes.STRING(200)
    },
    identifier: {
      type: DataTypes.STRING(20),
      require: true
    }
  }, {
    associate: function (models) {
      Module.belongsToMany(models.Action, {
        through: 'ModuleAction',
        as: 'actions',
        foreignKey: 'ModuleId'
      })
    }
  })
  return Module
}
