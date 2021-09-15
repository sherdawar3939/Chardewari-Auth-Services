'use strict'

module.exports = function (sequelize, DataTypes) {
  let ModuleAction = sequelize.define('ModuleAction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    ModuleId: {
      type: DataTypes.INTEGER
    },
    ActionId: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      ModuleAction.belongsTo(models.Module, { foreignKey: 'ModuleId' })
      ModuleAction.belongsTo(models.Action, { foreignKey: 'ActionId' })
      ModuleAction.belongsToMany(models.Role, {
        through: 'RolePermission',
        as: 'relatedModuleAction',
        foreignKey: 'ModuleActionId'
      })
    }
  })
  return ModuleAction
}
