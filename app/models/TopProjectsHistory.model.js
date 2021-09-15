'use strict'

module.exports = function (sequelize, DataTypes) {
  let TopProjectsHistory = sequelize.define('TopProjectsHistory', {
    status: {
      type: DataTypes.BOOLEAN
    },
    approvedByName: {
      type: DataTypes.STRING(30)
    }
  }, {
    associate: function (models) {
      TopProjectsHistory.belongsTo(models.User, { foreignKey: 'UserId', as: 'relatedProjectUser' })
      TopProjectsHistory.belongsTo(models.TopProject, { foreignKey: 'TopProjectId', as: 'relatedTopProject' })
    }
  })
  return TopProjectsHistory
}
