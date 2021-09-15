'use strict'

module.exports = function (sequelize, DataTypes) {
  let TopProperties = sequelize.define('TopProperty', {
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    order: {
      type: DataTypes.INTEGER
    },
    startDate: {
      type: DataTypes.DATEONLY,
      require: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      require: true
    },
    showOnHome: {
      type: DataTypes.BOOLEAN
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approvedById: {
      type: DataTypes.INTEGER
    },
    approvedByName: {
      type: DataTypes.STRING(30)
    },
    CreatedById: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      TopProperties.hasMany(models.TopPropertyHistory, { as: 'relatedTopProperty' })
      TopProperties.belongsTo(models.Property, { foreignKey: 'PropertyId', as: 'relatedHomeFeaturedProperties' })
      TopProperties.belongsTo(models.CompanyProfile, { foreignKey: 'CompanyProfileId', as: 'CompanyFeatured' })
      TopProperties.belongsToMany(models.Area, {
        through: 'TopPropertyArea',
        as: 'topPropertyAreas',
        foreignKey: 'TopPropertyId'
      })
    }
  })
  return TopProperties
}
