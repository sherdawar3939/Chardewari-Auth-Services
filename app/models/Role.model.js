'use strict'

module.exports = function (sequelize, DataTypes) {
  let Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING(50),
      require: true
    },
    description: {
      type: DataTypes.STRING(250)
    },
    isCompany: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPublic: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
      Role.belongsToMany(models.ModuleAction, {
        through: 'RolePermission',
        as: 'relatedRole',
        foreignKey: 'RoleId'
      })
      Role.hasMany(models.User, { foreignKey: 'UserId', as: 'users' })
    //   Role.hasMany(models.TopCompany, { foreignKey: 'RoleId', as: 'relatedRoleTopCompany' })
    }
  })
  return Role
}
