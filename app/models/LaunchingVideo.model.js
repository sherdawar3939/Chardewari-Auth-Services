'use strict'

module.exports = function (sequelize, DataTypes) {
  let LaunchingVideo = sequelize.define('LaunchingVideo', {
    url: {
      type: DataTypes.STRING(200)
    },
    source: {
      type: DataTypes.STRING(20)
    }
  }, {
    associate: function (models) {
      LaunchingVideo.belongsTo(models.Launching, { foreignKey: 'LaunchingId', as: 'launching' })
    }
  })
  return LaunchingVideo
}
