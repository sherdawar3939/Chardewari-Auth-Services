

'use strict'

module.exports = function (sequelize, DataTypes) {
  let LaunchingPaymentImages = sequelize.define('LaunchingPaymentImages', {
    url: {
      type: DataTypes.STRING(150)
    },
    ratio: {
      type: DataTypes.STRING(20)
    }
  }, {
    associate: function (models) {
      LaunchingPaymentImages.belongsTo(models.Launching, { foreignKey: 'LaunchingId', as: 'LaunchingsPaymentImages' })
    }
  })
  return LaunchingPaymentImages
}
