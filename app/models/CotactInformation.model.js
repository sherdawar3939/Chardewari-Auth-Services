'use strict'

module.exports = function (sequelize, DataTypes) {
  let ContactInformation = sequelize.define('ContactInformation', {
    name: {
      type: DataTypes.STRING(50),
      require: true
    },
    phone: {
      type: DataTypes.STRING(16),
      require: true
    },
    fax: {
      type: DataTypes.STRING(16)
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      ContactInformation.belongsTo(models.User, { foreignKey: 'UserId', as: 'Users' })
    //   ContactInformation.belongsToMany(models.Property, {
    //     through: 'PropertyContact',
    //     as: 'relatedPropertyContact',
    //     foreignKey: 'ContactId'
    //   })
    //   ContactInformation.belongsToMany(models.Launching, {
    //     through: 'LaunchingContact',
    //     as: 'relatedLaunchingContact',
    //     foreignKey: 'ContactId'
    //   })
    }
  })
  return ContactInformation
}
