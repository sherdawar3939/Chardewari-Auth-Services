'use strict'

module.exports = function (sequelize, DataTypes) {
  let LaunchingCategory = sequelize.define('LaunchingCategory', {
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
    }
  },
  {
    associate: function (models) {
      LaunchingCategory.belongsToMany(models.Launching, {
        through: 'LaunchingHasCategory',
        as: 'launchings',
        foreignKey: 'CategoryId'
      })
      LaunchingCategory.belongsToMany(models.Amenities, {
        through: 'LaunchingCategoryAmenity',
        as: 'LaunchingAmenityCategories',
        foreignKey: 'CategoryId'
      })
      LaunchingCategory.hasOne(models.LaunchingCategory, { foreignKey: 'ParentCategoryId', as: 'launchingParentCategory' })
    }
  })
  return LaunchingCategory
}
