'use strict'

let crypto = require('crypto')

module.exports = function (sequelize, DataTypes) {
  let User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(100),
      require: true
    },
    email: {
      type: DataTypes.STRING(100),
      isEmail: true
    },
    imageUrl: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING(16),
      require: true
      // unique: true
    },
    landphone: {
      type: DataTypes.STRING(16)
    },
    newsLetter: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    otp: DataTypes.STRING(5),
    otpValidTill: DataTypes.DATE,
    language: DataTypes.STRING(3),
    hashedPassword: DataTypes.STRING,
    salt: DataTypes.STRING,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isBlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    associate: function (models) {
      User.hasMany(models.Services, { as: 'userServices' })
      User.hasMany(models.Property, { foreignKey: 'CreatedBy', as: 'relatedProperties' })
      User.hasMany(models.Launching, { foreignKey: 'UserId', as: 'relatedLaunchings' })
      User.belongsTo(models.Role, { as: 'userRole', foreignKey: 'RoleId' })
      User.belongsTo(models.Area, { as: 'areaCountry', foreignKey: 'CountryId' })
      User.belongsTo(models.Area, { as: 'areaCity', foreignKey: 'CityId' })
      User.hasMany(models.CompanyProfile, { foreignKey: 'UserId', as: 'relatedCompanyProfile' })
      User.hasMany(models.TopProject, { foreignKey: 'CreatedById', as: 'relatedUserTopProject' })
      User.hasMany(models.TopCompany, { foreignKey: 'CreatedById', as: 'relatedUserTopCompany' })
      User.hasMany(models.CompanyOffice, { foreignKey: 'UserId', as: 'relatedCompanyOfficeUser' })
      User.hasMany(models.ContactInformation, { foreignKey: 'UserId' })
      User.belongsToMany(models.ListingType, {
        through: 'UserListingType',
        as: 'relatedUserListingType',
        foreignKey: 'UserId'
      })
      User.hasMany(models.Session, { as: 'relatedSession' })
      User.hasMany(models.TopCompanyHistory, { as: 'relatedCompanyUser' })
      User.hasMany(models.TopPropertyHistory, { as: 'relatedProjectsUser' })
      User.hasMany(models.TopProjectsHistory, { as: 'relatedPropertyUser' })
      User.hasMany(models.Banner, { foreignKey: 'CreatedBy', as: 'relatedUserBanner' })
      User.hasMany(models.SundayFridayOffers, { foreignKey: 'CreatedById', as: 'relatedUserSunFriOffers' })
      User.hasMany(models.Purchase, { as: 'userPurchase' })
      User.belongsToMany(models.ListingType, {
        through: 'UserListingTypeQuota',
        as: 'userListingType',
        foreignKey: 'UserId'
      })
      User.belongsToMany(models.BannerType, {
        through: 'UserBannerQuota',
        as: 'userBannerQuota',
        foreignKey: 'UserId'
      })
      User.hasMany(models.UserTopPropertyQuota, { as: 'userTopPropertyQuota' })
      User.hasMany(models.UserTopAgencyQuota, { as: 'userTopAgencyQuota' })
      User.hasMany(models.UserTopProjectQuota, { as: 'userTopProjectQuota' })
      User.hasMany(models.Payment, { as: 'userPayment' })
    }
  })

  User.prototype.toJSON = function () {
    var values = this.get()
    delete values.hashedPassword
    delete values.salt
    delete values.otp
    delete values.otpValidTill
    delete values.balance
    return values
  }

  User.prototype.makeSalt = function () {
    return crypto.randomBytes(16).toString('base64')
  }

  User.prototype.authenticate = function (plainText) {
    return this.encryptPassword(plainText, this.salt).toString() === this.hashedPassword.toString()
  }

  User.prototype.encryptPassword = function (password, salt) {
    if (!password || !salt) {
      return ''
    }
    salt = new Buffer.from(salt, 'base64')
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64')
  }

  return User
}
