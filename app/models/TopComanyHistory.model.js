'use strict'

module.exports = function (sequelize, DataTypes) {
  let TopCompanyHistory = sequelize.define('TopCompanyHistory', {
    status: {
      type: DataTypes.BOOLEAN
    },
    approvedByName: {
      type: DataTypes.STRING(30)
    }
  }, {
    associate: function (models) {
      TopCompanyHistory.belongsTo(models.User, { foreignKey: 'UserId', as: 'relatedCompanyUser' })
      TopCompanyHistory.belongsTo(models.TopCompany, { foreignKey: 'TopCompanyId', as: 'relatedTopCompany' })
    }
  })
  return TopCompanyHistory
}
