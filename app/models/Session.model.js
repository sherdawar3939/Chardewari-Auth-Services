'use strict'

module.exports = function (sequelize, DataTypes) {
  let Session = sequelize.define('Session', {
    identifier: {
      type: DataTypes.STRING(100)
    },
    expiredAt: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      Session.belongsTo(models.User, { foreignKey: 'UserId', as: 'Session' })
       Session.hasMany(models.PropertyInsights, { as: 'relatedSessionPropertyInsight' })
       Session.hasMany(models.Visit, { as: 'relatedSessionVisits' })
    }
  })
  return Session
}
