'use strict'

module.exports = function (sequelize, DataTypes) {
  let sunFriOffers = sequelize.define('SundayFridayOffers', {
    PropertyId: {
      type: DataTypes.INTEGER(5),
      require: true
    },
    discountedPrice: {
      type: DataTypes.INTEGER(10),
      require: true
    },
    sunday: {
      type: DataTypes.DATEONLY
    },
    friday: {
      type: DataTypes.DATEONLY
    },
    status: {
      type: DataTypes.STRING(10)
    },
    isApproved: {
      type: DataTypes.BOOLEAN
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approvedBy: {
      type: DataTypes.INTEGER(20)
    },
    createdBy: {
      type: DataTypes.STRING(25)
    }
  }, {
    associate: function (models) {
      sunFriOffers.belongsTo(models.User, { foreignKey: 'CreatedById', as: 'relatedUserSunFriOffers' })
      sunFriOffers.belongsTo(models.Property, { foreignKey: 'PropertyId', as: 'relatedPropertySunFriOffers' })
    }
  })
  return sunFriOffers
}
