'use strict'

module.exports = function (sequelize, DataTypes) {
  let Launching = sequelize.define('Launching', {
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
    isProject: {
      type: DataTypes.BOOLEAN
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    minPrice: {
      type: DataTypes.INTEGER
    },
    maxPrice: {
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
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
    launchDate: {
      type: DataTypes.DATE
    },
    location: { // System generated string using city and child areas.
      type: DataTypes.STRING(100),
      require: true
    },
    locationL1: { // System generated string using city and child areas.
      type: DataTypes.STRING(100),
      require: true
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
      Launching.belongsTo(models.User)
      Launching.hasMany(models.LaunchingImage, { as: 'LaunchingImages' })
      Launching.hasMany(models.LaunchingPaymentImages, { as: 'LaunchingsPaymentImages' })
      Launching.hasMany(models.Property, { foreignKey: 'LaunchingId', as: 'relatedPropertyLaunching' })
      Launching.hasMany(models.LaunchingVideo, { as: 'LaunchingVideos' })
      Launching.belongsToMany(models.LaunchingCategory, {
        through: 'LaunchingHasCategory',
        as: 'launchings',
        foreignKey: 'LaunchingId'
      })
      Launching.belongsToMany(models.Area, {
        through: 'LaunchingHasArea',
        as: 'launchingAreas',
        foreignKey: 'LaunchingId'
      })
      Launching.belongsToMany(models.AmenityProperty, {
        through: 'LaunchingAmenity',
        as: 'launchingsAmenities',
        foreignKey: 'LaunchingId'
      })
      Launching.hasOne(models.TopProject, { foreignKey: 'LaunchingId', as: 'relatedTopProjectsLaunching' })
      Launching.belongsToMany(models.ContactInformation, {
        through: 'LaunchingContact',
        as: 'launchingContacts',
        foreignKey: 'LaunchingId'
      })
      Launching.belongsTo(models.Currency, { foreignKey: 'CurrencyId', as: 'relatedCurrencyLaunching' })
        Launching.belongsTo(models.ListingType, { foreignKey: 'ListingTypeId', as: 'LaunchingListingType' })
      Launching.belongsTo(models.CompanyProfile, { foreignKey: 'CompanyId', as: 'LaunchingCompany' })
      Launching.hasMany(models.SundayFridayOffers, { foreignKey: 'LaunchingId', as: 'relatedLaunchingSunFriOffers' })
    }
  })
  return Launching
}
