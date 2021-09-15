'use strict'

module.exports = function (sequelize, DataTypes) {
  let payment = sequelize.define('Payment', {
    amount: {
      type: DataTypes.INTEGER,
      require: true
    },
    paymentDate: {
      type: DataTypes.DATEONLY
    },
    receivedByName: {
      type: DataTypes.STRING(100)
    },
    paymentMethod: {
      type: DataTypes.STRING(50)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      payment.belongsTo(models.Purchase, {
        as: 'purchasePayments',
        foreignKey: 'PurchaseId'
      })
      payment.belongsTo(models.User, {
        as: 'userPayments',
        foreignKey: 'ReceivedById'
      })
    }
  })
  return payment
}
