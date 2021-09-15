'use strict'

module.exports = function (sequelize, DataTypes) {
  let TopPropertyHistory = sequelize.define('TopPropertyHistory', {
    status: {
      type: DataTypes.BOOLEAN
    },
    approvedByName: {
      type: DataTypes.STRING(30)
    }
  }, {
    associate: function (models) {
      TopPropertyHistory.belongsTo(models.User, { foreignKey: 'UserId', as: 'relatedPropertyUser' })
      TopPropertyHistory.belongsTo(models.TopProperty, { foreignKey: 'TopPropertyId', as: 'relatedTopProperty' })
    }
  })
  return TopPropertyHistory
}
