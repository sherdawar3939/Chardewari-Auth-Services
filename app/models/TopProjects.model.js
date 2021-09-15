'use strict'

module.exports = function (sequelize, DataTypes) {
  let TopProject = sequelize.define('TopProject', {
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
    isProject: {
      type: DataTypes.BOOLEAN
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
      TopProject.belongsTo(models.Launching, { foreignKey: 'LaunchingId', as: 'relatedTopProjectsLaunching' })
      TopProject.belongsTo(models.User, { foreignKey: 'CreatedById', as: 'relatedUserTopProject' })
      TopProject.belongsTo(models.CompanyProfile, { foreignKey: 'CompanyProfileId', as: 'relatedTopProjectCompany' })
    }
  })
  return TopProject
}
