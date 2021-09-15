'use strict'

module.exports = function (sequelize, DataTypes) {
  let serviceCategory = sequelize.define('ServiceCategory', {
    title: {
      type: DataTypes.STRING(50),
      require: true
    },
    titleL1: {
      type: DataTypes.STRING(100)
    },
    level: {
      type: DataTypes.INTEGER
    },
    slug: {
      type: DataTypes.STRING(100)
    },
    singularName: {
      type: DataTypes.STRING(50)
    },
    singularNameL1: {
      type: DataTypes.STRING(50)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      serviceCategory.belongsToMany(models.Services, {
        through: 'ServicesHasCategory',
        as: 'RelatedServicesCategories',
        foreignKey: 'CategoryId'
      })
      serviceCategory.hasOne(models.ServiceCategory, { foreignKey: 'ParentCategoryId', as: 'parentCategory' })
    }
  })
  return serviceCategory
}
