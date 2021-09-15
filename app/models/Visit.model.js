'use strict'

module.exports = function (sequelize, DataTypes) {
  let Visit = sequelize.define('Visit', {
  }, {
    associate: function (models) {
      Visit.belongsTo(models.Session, { foreignKey: 'SessionId', as: 'relatedSessionVisits' })
    }
  })
  return Visit
}
