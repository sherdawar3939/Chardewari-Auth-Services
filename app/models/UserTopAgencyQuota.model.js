'use strict'

module.exports = function (sequelize, DataTypes) {
  let UserTopAgencyQuota = sequelize.define('UserTopAgencyQuota', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.DATEONLY
    }
  }, {
    associate: function (models) {
      UserTopAgencyQuota.belongsTo(models.User, { foreignKey: 'UserId' })
      UserTopAgencyQuota.belongsTo(models.Purchase, { foreignKey: 'PurchaseId', as: 'topAgencyQuotaPurchase' })
    }
  })
  return UserTopAgencyQuota
}
