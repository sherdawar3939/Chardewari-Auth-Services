'use strict'

module.exports = function (sequelize, DataTypes) {
  let Services = sequelize.define('Services',
    {
      title: {
        type: DataTypes.STRING(100),
        require: true
      },
      titleL1: {
        type: DataTypes.STRING(100)
      },
      thumbnail: {
        type: DataTypes.STRING(100)
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      description: {
        type: DataTypes.STRING(200),
        require: true
      },
      slug: {
        type: DataTypes.STRING(50)
      },
      descriptionL1: {
        type: DataTypes.STRING(200)
      }
    }, {
      associate: function (models) {
        Services.belongsTo(models.User, { foreignKey: 'UserId', as: 'relateUserServices' })
        Services.belongsToMany(models.ServiceCategory, {
          through: 'ServicesHasCategory',
          as: 'RelatedServicesCategories',
          foreignKey: 'ServiceId'
        })
        Services.hasMany(models.ServicesMedia, { as: 'RelatedMediaServices' })
      }
    }
  )

  return Services
}
