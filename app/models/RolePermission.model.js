'use strict'

module.exports = function (sequelize, DataTypes) {
  let RolePermission = sequelize.define('RolePermission', {
    RoleId: {
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    ModuleActionId: {
      type: DataTypes.INTEGER,
      require: true,
      references: {
        model: 'ModuleAction',
        key: 'id'
      }
    }
  })
  return RolePermission
}
