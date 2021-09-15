'use strict'

const userMiddleware = require('../middlewares/user.middleware')
const userController = require('../controllers/user.controller')
const passport = require('../config/passport')
const generalMiddleware = require('../middlewares/general.middleware')

module.exports = function (app, apiVersion) {
  const route = apiVersion

  // ------------- Public Apis Start -------------
  // user-signup
  app.post(route + '/register-account', userMiddleware.validateSignUp, userController.signUp)

  // user login
  app.post(route + '/login', userMiddleware.validateLoginCredentials, userController.login)

  // verify account
  app.post(route + '/verify-otp', userMiddleware.verifyOtp, userController.verifyOtp)

  // resend verification otp.
  app.post(route + '/resend-otp', userMiddleware.resendOtp, userController.resendOtp)

  // forgot password
  app.post(route + '/forgot-password', userMiddleware.validateForgotPassword, userController.forgotPassword)

  // reset password using otp
  app.post(route + '/reset-password', userMiddleware.validateResetPassword, userController.resetPassword)
  // ------------- Public Apis End -------------

  // get users
  app.get(route + '/user', userMiddleware.validateGetUsers, userController.getUsers)

  // get loggedIn User
  app.get(route + '/user/current', passport.authenticate('jwt', { session: false }), userController.getLoggedInUser)

  // update User Company
  app.put(route + '/user/company', userMiddleware.updateCompany, userController.updateCompany)

  // update user
  app.put(route + '/user/:id', passport.authenticate('jwt', { session: false }), generalMiddleware.attachBodyAndFiles, userMiddleware.validateUpdateUser, userController.updateUser)

  // update user
  app.put(route + '/user/update/:id', passport.authenticate('jwt', { session: false }), userMiddleware.validateUpdateUser, userController.updateUser)

  // check user password
  app.post(route + '/check-password', passport.authenticate('jwt', { session: false }), userMiddleware.validateLoginCredentials, userController.checkPassword)

  // change password
  app.put(route + '/user/change-password/:id', passport.authenticate('jwt', { session: false }), userMiddleware.validateChangePassword, userController.changeCurrentPassword)

  // delete user
  app.delete(route + '/user/:id', passport.authenticate('jwt', { session: false }), userMiddleware.validateDeleteUser, userController.deleteUser)
}
