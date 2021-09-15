'use strict'

module.exports = function (sequelize, DataTypes) {
  let companyOffice = sequelize.define('CompanyOffice', {
    personName: {
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
      type: DataTypes.STRING(100),
      isEmail: true
    },
    address: {
      type: DataTypes.STRING(100)
    },
    addressL1: {
      type: DataTypes.STRING(100)
    },
    formatedAddress: {
      type: DataTypes.STRING(150)
    },
    formatedAddressL1: {
      type: DataTypes.STRING(150)
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
  ,
  {
    associate: function (models) {
      companyOffice.belongsToMany(models.Area, {
        through: 'CompanyOfficeArea',
        as: 'relatedCompanyOfficeAreas',
        foreignKey: 'CompanyOfficeId'
      })
      companyOffice.belongsToMany(models.AmenityProperty, {
        through: 'HFPropertyAmenity',
        as: 'relatedFeaturedPA',
        foreignKey: 'HomeFeaturedId'
      })
      companyOffice.belongsTo(models.CompanyProfile, { foreignKey: 'CompanyId', as: 'relatedCompanyOfficeProfile' })
      companyOffice.belongsTo(models.User, { foreignKey: 'UserId', as: 'relatedCompanyOfficeUser' })
    }
  }
  )
  return companyOffice
}
