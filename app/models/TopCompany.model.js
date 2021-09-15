'use strict'

module.exports = function (sequelize, DataTypes) {
  let TopCompany = sequelize.define('TopCompany', {
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    order: {
      type: DataTypes.INTEGER
    },
    startDate: {
      type: DataTypes.DATEONLY,
      require: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      require: true
    },
    showOnHome: {
      type: DataTypes.BOOLEAN
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approvedById: {
      type: DataTypes.INTEGER
    },
    approvedByName: {
      type: DataTypes.STRING(30)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      TopCompany.hasMany(models.TopCompanyHistory, { as: 'relatedCompany' })
      TopCompany.belongsTo(models.Role, { foreignKey: 'RoleId', as: 'relatedRoleTopCompany' })
      TopCompany.belongsTo(models.CompanyProfile, { foreignKey: 'CompanyProfileId', as: 'relatedTopCompany' })
      TopCompany.belongsTo(models.User, { foreignKey: 'CreatedById', as: 'relatedUserTopCompany' })
    }
  })
  return TopCompany
}
