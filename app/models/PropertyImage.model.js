'use strict'

module.exports = function (sequelize, DataTypes) {
  let PropertyImage = sequelize.define('PropertyImage', {
    url: {
      type: DataTypes.STRING(150)
    },
    ratio: {
      type: DataTypes.STRING(20)
    },
    uniqueImages: {
      type: DataTypes.INTEGER(2)
    }
  }, {
    associate: function (models) {
      PropertyImage.belongsTo(models.Property, { foreignKey: 'PropertyId', as: 'property' })
    }
  })
  return PropertyImage
}
