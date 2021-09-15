'use strict'

module.exports = function (sequelize, DataTypes) {
  let PropertyVideo = sequelize.define('PropertyVideo', {
    url: {
      type: DataTypes.STRING(200)
    },
    source: {
      type: DataTypes.STRING(20)
    }
  }, {
    associate: function (models) {
      PropertyVideo.belongsTo(models.Property, { foreignKey: 'PropertyId', as: 'property' })
    }
  })
  return PropertyVideo
}
