'use strict'

module.exports = function (sequelize, DataTypes) {
  let Property = sequelize.define('Property', {
    title: {
      type: DataTypes.STRING(100),
      require: true
    },
    titleL1: {
      type: DataTypes.STRING(150)
    },
    shortDescription: {
      type: DataTypes.STRING(200)
    },
    shortDescriptionL1: {
      type: DataTypes.STRING(200)
    },
    description: {
      type: DataTypes.TEXT,
      require: true
    },
    descriptionL1: {
      type: DataTypes.TEXT,
      require: false
    },
    lat: {
      type: DataTypes.STRING(45)
    },
    lng: {
      type: DataTypes.STRING(45)
    },
    purpose: { // false=rent, true=sale
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    price: {
      type: DataTypes.INTEGER
    },
    thumbnail: {
      type: DataTypes.STRING(150),
      require: true
    },
    currency: {
      type: DataTypes.STRING(10),
      require: true
    },
    slug: {
      type: DataTypes.STRING(100),
      require: true
    },
    uId: {
      type: DataTypes.STRING(40),
      require: true
    },
    area: {
      type: DataTypes.STRING(45),
      require: true
    },
    areaUnit: {
      type: DataTypes.STRING(20),
      require: true
    },
    address: { // Address which user enters.
      type: DataTypes.STRING(50),
      require: false
    },
    location: { // System generated string using city and child areas.
      type: DataTypes.STRING(100),
      require: true
    },
    locationL1: { // System generated string using city and child areas.
      type: DataTypes.STRING(100),
      require: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    multipleUnits: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      require: true
    },
    approvedBy: {
      type: DataTypes.INTEGER
    },
    expiry: {
      type: DataTypes.DATE
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {
    associate: function (models) {
      Property.belongsTo(models.User)
      Property.hasMany(models.PropertyImage, { as: 'images' })
      Property.hasMany(models.PropertyVideo, { as: 'videos' })
      Property.hasOne(models.TopProperty, { foreignKey: 'PropertyId', as: 'relatedHomeFeaturedProperties' })
      Property.belongsToMany(models.PropertyCategory, {
        through: 'PropertyHasCategory',
        as: 'categories',
        foreignKey: 'PropertyId'
      })
      Property.hasMany(models.PropertyInsights, { as: 'relatedPropertyInsights' })
      Property.belongsToMany(models.Area, {
        through: 'PropertyHasArea',
        as: 'propertyAreas',
        foreignKey: 'PropertyId'
      })
      Property.belongsToMany(models.AmenityProperty, {
        through: 'PropertyAmenity',
        as: 'propertyAmenities',
        foreignKey: 'PropertyId'
      })
      Property.belongsToMany(models.ContactInformation, {
        through: 'PropertyContact',
        as: 'propertyContacts',
        foreignKey: 'PropertyId'
      })
      Property.belongsTo(models.Currency, { foreignKey: 'CurrencyId', as: 'relatedCurrencyProperty' })
      Property.belongsTo(models.ListingType, { foreignKey: 'ListingTypeId', as: 'propertyListingType' })
      Property.belongsTo(models.Launching, { foreignKey: 'LaunchingId', as: 'relatedPropertyLaunching' })
      Property.belongsTo(models.CompanyProfile, { foreignKey: 'CompanyId', as: 'propertyCompany' })
      Property.hasMany(models.SundayFridayOffers, { foreignKey: 'PropertyId', as: 'relatedPropertySunFriOffers' })
      Property.hasMany(models.PropertyMeta, { as: 'relatedPropertyMeta' })
    }
  })
  return Property
}
