'use strict'

module.exports = function (sequelize, DataTypes) {
  let PropertyCategory = sequelize.define('PropertyCategory', {
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
      PropertyCategory.belongsToMany(models.Property, {
        through: 'PropertyHasCategory',
        as: 'properties',
        foreignKey: 'CategoryId'
      })
      PropertyCategory.belongsToMany(models.Amenities, {
        through: 'CategoryAmenity',
        as: 'amenities',
        foreignKey: 'CategoryId'
      })
      PropertyCategory.hasOne(models.PropertyCategory, { foreignKey: 'ParentCategoryId', as: 'parentCategory' })
    }
  })
  return PropertyCategory
}
