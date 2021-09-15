'use strict'
const SERVER_RESPONSE = require('../config/serverResponses')
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const helpingHelperMethods = require('./helping.helper')
const _ = require('lodash')
// const rabbitMq = require('./rabbitMQ.helper')
const uuid = require('uuid/v4')

// *************
// User signUp
// *************

function signUp (input) {
  const now = new Date()
  const otpValidTill = new Date(now)
  otpValidTill.setMinutes(now.getMinutes() + 15)
  const userObj = {
    name: input.name,
    email: input.email,
    otp: uuid(),
    otpValidTill: otpValidTill,
    phone: input.phone,
    landphone: input.landphone || '',
    CountryId: input.CountryId,
    CityId: input.CityId,
    newsLetter: input.newsLetter || true,
    RoleId: input.RoleId,
    isVerified: 0
  }

  // check if input email already exist
  return db.User.findOne({ where: { email: userObj.email } })
    .then(async (user) => {
      // check user existence
      if (user) {
        // user email already exist.
        return generalHelpingMethods.rejectPromise([{
          field: 'email',
          error: 1500,
          message: 'email already exist'
        }], SERVER_RESPONSE.CONFLICT)
      }

      const newUser = db.User.build(userObj)
      newUser.salt = newUser.makeSalt()
      newUser.hashedPassword = newUser.encryptPassword(input.password, newUser.salt)
      await newUser.save()

      const data = {
        name: newUser.name,
        email: newUser.email,
        otp: newUser.otp
      }

      // send verification email/sms code here
      let html = generalHelpingMethods.getTemplate('registration', data)
      if (newUser.RoleId === 3 || newUser.RoleId === 4) {
        html = generalHelpingMethods.getTemplate('registration', data)
      }
      await generalHelpingMethods.sendEmailUsingSendGrid('hamzaaslam769@gmail.com', newUser.email, 'Please confirm your account', 'message', html)
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        RoleId: newUser.RoleId,
        landphone: newUser.landphone,
        countryId: newUser.countryId,
        cityId: newUser.cityId,
        newsLetter: newUser.newsLetter
        // : 1: newUser.isVerified,
        // isBlocked: newUser.isBlocked,
      }
    })
}

// *************
// user Login
// *************

function login (input) {
  const email = input.email
  const password = input.password
  const userData = {}

  // check if email exist and isDeleted equal to false
  return db.User.findOne({ where: { email: email, isDeleted: false } })
    .then((user) => {
      if (!user || !user.salt || !user.hashedPassword) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'email',
          error: 1540,
          message: 'Invalid email or Password'
        }])
      } else if (!user.authenticate(password)) {
        // user not authenticated, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'email',
          error: 1543,
          message: 'Invalid email or Password'
        }])
      } else {
        // convert mongoose document object to plain json object and return user
        return user.toJSON()
      }
    })
    .then((user) => {
      userData.userInfo = user
      return db.Role.findOne({ where: { id: user.RoleId, isDeleted: false, isActive: true } })
    })
    .then(async (role) => {
      if (!role) {
        // Active and not deleted role not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'Role',
          error: 1546,
          message: 'Role is not defined'
        }])
      }
      userData.userInfo.role = role.title

      await db.RolePermission.findAll({
        where: { RoleId: userData.userInfo.RoleId },
        attributes: ['ModuleActionId']
      })
        .then(async (result) => {
          if (result) {
            const moduleActionIds = result.map(x => x.ModuleActionId)
            await db.Module.findAll({
              attributes: ['id', 'title', 'identifier'],
              include: [{
                model: db.Action,
                required: true,
                as: 'actions',
                attributes: ['id', 'name', 'identifier'],
                through: {
                  where: { id: moduleActionIds },
                  attributes: []
                }
              }]
            }).then(result => {
              // console.log((result))
              userData.userInfo.permissions = result
            })
          }
        })
      const tokenData = {
        id: userData.userInfo.id,
        name: userData.userInfo.name,
        email: userData.userInfo.email,
        phone: userData.userInfo.phone,
        RoleId: userData.userInfo.RoleId,
        public: role.isPublic
      }

      userData.userInfo = {
        ...tokenData,
        permissions: userData.userInfo.permissions,
        isVerified: userData.userInfo.isVerified,
        isBlocked: userData.userInfo.isBlocked,
        language: userData.userInfo.language
      }

      return helpingHelperMethods.signLoginData({ data: tokenData })
    })
    .then((tokenData) => {
      userData.tokenInfo = tokenData
      // console.log(userData)
      return userData
    })
}

// **********
// get users
// **********

function getUsers (conditions, limit, offset) {
  limit = Number(limit)
  offset = Number(offset)

  // Check if user exist in conditions
  return db.User.findAll({
    where: conditions,
    limit: limit,
    offset: offset
  })
    .then(async (users) => {
      const count = await db.User.count({
        where: conditions
      })
      // return user
      return {
        records: users,
        count: count
      }
    })
}

// ****************
// Forgot Password
// ***************

// Forgot Password
function forgotPassword (conditions) {
  // Check if user exist in conditions
  return db.User.findOne({ where: conditions })
    .then((user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'Role',
          error: 1561,
          message: 'No user found against this phone/email'
        }])
      }
      // console.log(user)
      let now = new Date()
      now.setMinutes(now.getMinutes() + 10) // timestamp
      now = new Date(now) // Date object

      user.otpValidTill = now
      user.otp = uuid()
      return user.save().then(async (response) => {
        console.log('email******', response.email)
        let html
        const data = {
          name: response.name,
          email: response.email,
          otp: response.otp
        }
        console.log(data)

        if (response.dataValues.RoleId === 3 || response.dataValues.RoleId === 4) {
          html = generalHelpingMethods.getTemplate('webForgetPassword', data)
        } else {
          html = generalHelpingMethods.getTemplate('webForgetPassword', data)
        }
        // Send email
        await generalHelpingMethods.sendEmailUsingSendGrid('<hamzaaslam769@gmail.com>', response.email, 'Please confirm your account', 'message', html)
        console.log('Send email', user)
        return true
      })
    })
}

// *************************
// check reset passwords
// *************************

// check reset passwords
const resetPassword = (input) => {
  // check if email exist and isDeleted equal to false
  return db.User.findOne({
    where: {
      email: input.email,
      isDeleted: false
    }
  })
    .then(async (user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 1569,
          message: 'User not found'
        }])
      }

      // Validate otp
      if (user.otp !== input.otp || !input.otp || Date.parse(user.otpValidTill) < Date.parse(new Date())) {
        return generalHelpingMethods.rejectPromise([{
          field: 'otp',
          error: 1570,
          message: 'Otp not valid or expired'
        }])
      }

      user.salt = user.makeSalt()
      // hashing password, encrypted
      user.hashedPassword = user.encryptPassword(input.password, user.salt)
      console.log(user.hashedPassword)
      user.isVerified = true
      user.otp = ''

      // save user
      await user.save()
      await generalHelpingMethods.sendEmail({
        email: email
      })
      return user.toJSON()
    })
}

function getLoggedInUser (UserId) {
  // Find user against id.
  return db.User.findOne({
    where: {
      id: UserId,
      isDeleted: false
    },
    include: [{
      model: db.Role,
      as: 'userRole',
      attributes: ['title']
    },
    {
      model: db.Area,
      as: 'areaCountry',
      attributes: ['id', 'name']
    },
    {
      model: db.Area,
      as: 'areaCity',
      attributes: ['id', 'name']
    }
    ]
  })
    .then((user) => {
      return user.toJSON()
    })
}

// ***************
// Check password
// ***************

const checkPassword = (input) => {
  const email = input.email
  const password = input.password
  // check if email exist and isDeleted equal to false
  return db.User.findOne({
    where: {
      email: email,
      isDeleted: false
    }
  })
    .then((user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'Role',
          error: 1564,
          message: 'User not found'
        }])
      }

      if (!user.authenticate(password)) {
        return 'false'
      }
      return true
    })
}

// **********************
// change/update  passwords
// **********************

const changePassword = (data, id) => {
  // check if phone exist and isDeleted equal to false
  return db.User.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then(async (user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 1903,
          message: 'User not found'
        }])
      }

      // Validate password
      if (!user.authenticate(data.oldPassword)) {
        return generalHelpingMethods.rejectPromise([{
          field: 'password',
          error: 1906,
          message: 'Old Password is wrong'
        }])
      }

      user.salt = user.makeSalt()
      // hashing newPassword, encrypted
      user.hashedPassword = user.encryptPassword(data.newPassword, user.salt)

      // save user
      await user.save()
      return user.toJSON()
    })
}

// ************
// Update User
// ************

const updateUser = (data, id, files) => {
  return db.User.findOne({
    where: {
      id: id,
      isDeleted: false
    }
  })
    .then((user) => {
      if (_.isEmpty(user)) {
        // User not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'User not found.'
        }])
      }
      // Update user
      if (data) {
        user.set(data)
        user.save()
      }
      if (files) {
        uploadFiles(id, files)
      }
      return user.toJSON()
    })
}

// This is private method, not exported.
const uploadFiles = async (id, files) => {
  // Traverse each file
  const urlArray = []
  const sizes = [{ height: 300, width: 300, ratio: '1x' }]
  for (let k = 0; k < files.length; k++) {
    await helpingHelperMethods.uploadFile(files[k], files[k].name)
      .then((images) => {
        urlArray.push({
          url: images.Location
        })
      })
  }
  const data = {}
  data.Id = id
  data.urlArray = urlArray
  data.sizes = sizes
  data.replyQueue = 'userImages'
  rabbitMq.sendMessage(data, 'resizeImages')
}
// ************
// Delete User
// ************

const deleteUser = (input) => {
  return db.User.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((user) => {
      if (_.isEmpty(user)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No user found against given id.'
        }])
      }
      // employee found, change value of isDeleted to true
      user.isDeleted = true
      // save employee
      user.save()
      return true
    })
}

// **************
// Verify phone
// **************

function verifyOtp (input) {
  // let email = input.email
  let otp = input.otp

  // check if email exist and isDeleted equal to false
  return db.User.findOne({ where: { email: input.email, isVerified: false, isDeleted: false } })
    .then((user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'email',
          error: 1578,
          message: 'No user found against this email'
        }])
      }

      // Validate otp
      if (user.otp !== otp || !otp) {
        return generalHelpingMethods.rejectPromise([{
          field: 'otp',
          error: 1570,
          message: 'Otp not valid or expired'
        }])
      }

      user.otp = ''
      user.isVerified = true
      user.save()
      return true
    })
}

// ************
// Resend otp
// ************

function resendOtp (input) {
  let email = input.email
  // check if phone exist and isDeleted equal to false
  return db.User.findOne({ where: { email: email, isBlocked: false } })
    .then((user) => {
      if (!user) {
        // user not found, throw error
        return generalHelpingMethods.rejectPromise([{
          field: 'email',
          error: 1583,
          message: 'Invalid email'
        }])
      }

      let now = new Date()
      now.setMinutes(now.getMinutes() + 10) // timestamp
      now = new Date(now) // Date object

      user.otpValidTill = now
      user.otp = uuid()

      return user.save().then(async (response) => {
        let html
        const data = {
          name: response.name,
          email: response.email,
          otp: response.otp
        }
        if (response.dataValues.RoleId === 3 || response.dataValues.RoleId === 4) {
          html = generalHelpingMethods.getTemplate('registration', data)
        } else {
          html = generalHelpingMethods.getTemplate('registration', data)
        }
        // Send email
        await generalHelpingMethods.sendEmailUsingSendGrid('<hamzaaslam769@gmail.com>', response.email, 'Please confirm your account', 'message', html)
        console.log('Send email', user)
        return true
      })
    })
}

// ***************
// Update Company
// ***************

// function updateCompany (data, userId) {
//   return db.CompanyProfile.findOne({
//     where: {
//       UserId: userId
//     }
//   })
//     .then((company) => {
//       if (company) {
//         return db.CompanyProfile.update(
//           data, { where: { UserId: userId } }
//         )
//       }
//       const newCompany = db.CompanyProfile.build(data)
//       // return newCompany.save()
//     })
// }

// ********************************************************
// Receive Images from Microservice and Save To Database
// ********************************************************

// function insertImages (imagesData, userData) {
//   db.User.findOne({
//     where: { id: userData.Id }
//   })
//     .then((foundUser) => {
//       foundUser.imageUrl = imagesData[0].url
//       foundUser.save()
//     })
// }

module.exports = {
  signUp,
  login,
  getUsers,
  forgotPassword,
  checkPassword,
  resetPassword,
  changePassword,
  getLoggedInUser,
  updateUser,
  deleteUser,
  verifyOtp,
  resendOtp,
  // updateCompany,
  //insertImages
}
