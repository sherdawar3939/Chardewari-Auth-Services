'use strict'

module.exports = function (sequelize, DataTypes) {
  let PropertyInsights = sequelize.define('PropertyInsights', {
    type: {
      type: DataTypes.STRING(100)
    }
  }, {
    associate: function (models) {
      PropertyInsights.belongsTo(models.Property, { foreignKey: 'PropertyId', as: 'PropertyInsights' })
      PropertyInsights.belongsTo(models.Session, { foreignKey: 'SessionId', as: 'PropertyInsightsSession' })
    }
  })
  return PropertyInsights
}
