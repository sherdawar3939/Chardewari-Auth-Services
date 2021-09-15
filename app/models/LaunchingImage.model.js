'use strict'

module.exports = function (sequelize, DataTypes) {
  let LaunchingImage = sequelize.define('LaunchingImage', {
    url: {
      type: DataTypes.STRING(150)
    },
    ratio: {
      type: DataTypes.STRING(200)
    },
    uniqueImages: {
      type: DataTypes.INTEGER(3)
    }
  }, {
    associate: function (models) {
      LaunchingImage.belongsTo(models.Launching, { foreignKey: 'LaunchingId', as: 'Launching' })
    }
  })
  return LaunchingImage
}
