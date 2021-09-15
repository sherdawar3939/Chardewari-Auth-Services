'use strict'

module.exports = function (sequelize, DataTypes) {
  let ServicesMedia = sequelize.define('ServicesMedia', {
    url: {
      type: DataTypes.STRING(150)
    },
    ratio: {
      type: DataTypes.STRING(20)
    },
    uniqueImages: {
      type: DataTypes.INTEGER(2)
    },
    type: {
      type: DataTypes.INTEGER
    }
  }, {
    associate: function (models) {
      ServicesMedia.belongsTo(models.Services, { foreignKey: 'ServiceId', as: 'RelatedMediaServices' })
    }
  })
  return ServicesMedia
}
