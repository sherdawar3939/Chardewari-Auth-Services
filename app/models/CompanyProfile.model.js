'use strict'

module.exports = function (sequelize, DataTypes) {
  let CompanyProfile = sequelize.define('CompanyProfile', {
    name: {
      type: DataTypes.STRING(100),
      require: true
    },
    nameL1: {
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.TEXT
    },
    descriptionL1: {
      type: DataTypes.TEXT
    },
    phone: {
      type: DataTypes.STRING(16),
      require: true
    },
    fax: {
      type: DataTypes.STRING(16)
    },
    address: {
      type: DataTypes.STRING(100)
    },
    addressL1: {
      type: DataTypes.STRING(100)
    },
    formatedAddress: {
      type: DataTypes.STRING(100)
    },
    formatedAddressL1: {
      type: DataTypes.STRING(100)
    },
    email: {
      type: DataTypes.STRING(100),
      isEmail: true
    },
    logo: {
      type: DataTypes.STRING(150)
    },
    facebook: {
      type: DataTypes.STRING(200)
    },
    linkedIn: {
      type: DataTypes.STRING(200)
    },
    twitter: {
      type: DataTypes.STRING(200)
    },
    instagram: {
      type: DataTypes.STRING(200)
    }
  }, {
    associate: function (models) {
      CompanyProfile.belongsTo(models.User, { foreignKey: 'UserId', as: 'companyOwner' })
      CompanyProfile.hasOne(models.TopCompany, { foreignKey: 'CompanyProfileId', as: 'relatedTopCompany' })
      CompanyProfile.hasOne(models.TopProject, { foreignKey: 'CompanyProfileId', as: 'relatedTopProjectCompany' })
      CompanyProfile.hasOne(models.TopProperty, { foreignKey: 'CompanyProfileId', as: 'CompanyFeatured' })
      CompanyProfile.hasMany(models.CompanyOffice, {
        as: 'relatedCompanyOfficeProfile',
        foreignKey: 'CompanyId'
      })
      CompanyProfile.hasMany(models.Property, { foreignKey: 'CompanyId', as: 'propertyCompany' })
      CompanyProfile.hasMany(models.Launching, { foreignKey: 'CompanyId', as: 'LaunchingCompany' })
      CompanyProfile.hasMany(models.Banner, { as: 'relatedCompanyBanner' })
      CompanyProfile.hasMany(models.Product, {
        foreignKey: 'CompanyId',
        as: 'relatedCompanyProducts'
      })
    }
  })
  return CompanyProfile
}
