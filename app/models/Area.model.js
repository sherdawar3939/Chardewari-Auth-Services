'use strict'

module.exports = function (sequelize, DataTypes) {
  let Areas = sequelize.define('Area', {
    title: {
      type: DataTypes.STRING(50)
    },
    name: {
      type: DataTypes.STRING(60)
    },
    titleL1: {
      type: DataTypes.STRING(100)
    },
    nameL1: {
      type: DataTypes.STRING(100)
    },
    level: {
      type: DataTypes.INTEGER
    },
    slug: {
      type: DataTypes.STRING(100)
    }
  }, {
    associate: function (models) {
      Areas.belongsToMany(models.Property, {
        through: 'PropertyHasArea',
        as: 'propertyAreas',
        foreignKey: 'AreaId'
      })
      Areas.belongsToMany(models.TopProperty, {
        through: 'TopPropertyArea',
        as: 'topPropertyAreas',
        foreignKey: 'AreaId'
      })
      Areas.belongsToMany(models.Product, {
        through: 'ProductHasArea',
        as: 'relatedAreaProducts',
        foreignKey: 'AreaId'
      })
      Areas.belongsToMany(models.TopProperty, {
        through: 'HomeFeaturedPropertyArea',
        as: 'relatedHomeFeaturedPropertyAreas',
        foreignKey: 'AreaId'
      })
      Areas.hasOne(models.Area, { foreignKey: 'ParentId', as: 'childArea' })
      Areas.belongsToMany(models.CompanyOffice, {
        through: 'CompanyOfficeArea',
        as: 'relatedCompanyOfficeArea',
        foreignKey: 'AreaId'
      })
      Areas.hasMany(models.User, { as: 'CountryUsers', foreignKey: 'CountryId' })
    }
  })
  return Areas
}
