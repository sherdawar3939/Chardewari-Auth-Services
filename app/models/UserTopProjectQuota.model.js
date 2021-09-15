
'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserTopProjectQuota = sequelize.define('UserTopProjectQuota', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    limit: {
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.DATEONLY
    }
  }, {
    associate: function (models) {
      UserTopProjectQuota.belongsTo(models.User, { foreignKey: 'UserId' })
      UserTopProjectQuota.belongsTo(models.Purchase, { foreignKey: 'PurchaseId', as: 'topProjectQuotaPurchase' })
    }
  })
  return UserTopProjectQuota
}
