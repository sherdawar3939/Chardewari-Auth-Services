
'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserTopPropertyQuota = sequelize.define('UserTopPropertyQuota', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    showOnHome: {
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
      UserTopPropertyQuota.belongsTo(models.User, { foreignKey: 'UserId' })
      UserTopPropertyQuota.belongsTo(models.Purchase, { foreignKey: 'PurchaseId', as: 'topPropertyQuotaPurchase' })
    }
  })
  return UserTopPropertyQuota
}
