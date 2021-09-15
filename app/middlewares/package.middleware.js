'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************
// Add Package Middleware
// **********************

const validateAddPackage = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}
  const listingTypeArray = []
  const BannerArray = []
  const AgencyArray = []
  const propertyArray = []
  const projectArray = []

  // packageName is required  Validating as not empty, valid String and length range.
  if (!_.isString(body.packageName) || body.packageName.length < 2 || body.packageName.length > 60) {
    errorArray.push({
      field: 'packageName',
      error: 90070,
      message: 'Please provide only valid \'packageName\' as string, length must be between 2 and 100.'
    })
  }

  // packagePrice is required, validating as not empty.
  if (!body.packagePrice || isNaN(body.packagePrice)) {
    errorArray.push({
      field: 'packagePrice',
      error: 90170,
      message: '\'packagePrice\' is required as numeric.'
    })
  }

  // discountedPrice is Optional, validating as not empty.
  if (body.hasOwnProperty('discountedPrice') && body.discountedPrice !== '') {
    if (!body.discountedPrice || isNaN(body.discountedPrice)) {
      errorArray.push({
        field: 'discountedPrice',
        error: 90170,
        message: '\'discountedPrice\' is required as numeric.'
      })
    }
    validatedBody.discountedPrice = body.discountedPrice
  }

  // expiry is required, validating it as not empty.
  if (_.isEmpty(body.expiry) || body.expiry === '') {
    errorArray.push({
      field: 'expiry',
      error: 90220,
      message: '\'expiry\' is required as INTEGER .'
    })
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== true && body.isActive !== false && body.isActive !== 'true' && body.isActive !== 'false') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedBody.isActive = body.isActive
  }

  if (body.listingType.length) {
    let data = body.listingType
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      // Validating ListingTypeId as Required, not empty, valid numeric value with range.
      if (!data[i].ListingTypeId || isNaN(data[i].ListingTypeId)) {
        errorArray.push({
          field: 'ListingTypeId',
          error: 90340,
          message: 'Please provide only valid \'ListingTypeId\' as numeric.'
        })
      }

      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      listingTypeArray.push({
        expiry: data[i].expiry,
        limit: data[i].limit,
        ListingTypeId: data[i].ListingTypeId
      })
    }
  }

  if (body.bannerPackage.length) {
    let data = body.bannerPackage
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as Integer .'
        })
      }

      // Validating BannerId as Required, not empty, valid numeric value with range.
      if (!data[i].BannerTypeId || isNaN(data[i].BannerTypeId)) {
        errorArray.push({
          field: 'BannerId',
          error: 90340,
          message: 'Please provide only valid \'BannerId\' as numeric.'
        })
      }

      BannerArray.push({
        expiry: data[i].expiry,
        BannerTypeId: data[i].BannerTypeId
      })
    }
  }

  if (body.agencyPackage.length) {
    let data = body.agencyPackage
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      AgencyArray.push({
        expiry: data[i].expiry
      })
    }
  }

  if (body.topPropertyPackage.length) {
    let data = body.topPropertyPackage
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      propertyArray.push({
        expiry: data[i].expiry,
        limit: data[i].limit
      })
    }
  }

  if (body.topProjectPackage.length) {
    let data = body.topProjectPackage
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      projectArray.push({
        expiry: data[i].expiry,
        limit: data[i].limit
      })
    }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'package.middleware.validateAddPackage')
  }

  validatedBody.expiry = body.expiry
  validatedBody.packageName = body.packageName
  validatedBody.packagePrice = body.packagePrice
  validatedBody.listingType = listingTypeArray
  validatedBody.banner = BannerArray
  validatedBody.companyProfile = AgencyArray
  validatedBody.property = propertyArray
  validatedBody.project = projectArray

  req.data = validatedBody

  done()
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const validateGetPackageDetail = (req, res, done) => {
  const errorArray = []
  const params = req.params

  // Validating id as Required, not empty, valid numeric value with range.
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 90340,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'package.middleware.validateGetPackageDetail')
  }

  done()
}

// **********************
// Package Update Middleware
// **********************

const validateUpdatePackage = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const param = req.params
  const validatedBody = {}
  const listingTypeArray = []
  const BannerArray = []
  const AgencyArray = []
  const propertyArray = []
  const projectArray = []

  // packageName is Optional  Validating as not empty, valid String and length range.
  if (body.hasOwnProperty('packageName') && body.packageName && body.packageName !== 'null') {
    if (!_.isString(body.packageName) || body.packageName.length < 2 || body.packageName.length > 60) {
      errorArray.push({
        field: 'packageName',
        error: 90070,
        message: 'Please provide only valid \'packageName\' as string, length must be between 2 and 100.'
      })
    }
    validatedBody.packageName = body.packageName
  }

  // packagePrice is Optional, validating as not empty.
  if (body.hasOwnProperty('packagePrice')) {
    if (!body.packagePrice || isNaN(body.packagePrice)) {
      errorArray.push({
        field: 'packagePrice',
        error: 90170,
        message: '\'packagePrice\' is required as numeric.'
      })
    }
    validatedBody.packagePrice = body.packagePrice
  }

  // discountedPrice is Optional, validating as not empty.
  if (body.hasOwnProperty('discountedPrice') && body.discountedPrice !== '') {
    if (!body.discountedPrice || isNaN(body.discountedPrice)) {
      errorArray.push({
        field: 'discountedPrice',
        error: 90170,
        message: '\'discountedPrice\' is required as numeric.'
      })
    }
    validatedBody.discountedPrice = body.discountedPrice
  }

  // expiry is Optional, validating it as not empty.
  if (body.hasOwnProperty('expiry')) {
    if (_.isEmpty(body.expiry) || body.expiry === '') {
      errorArray.push({
        field: 'expiry',
        error: 90220,
        message: '\'expiry\' is required as Date .'
      })
    }
    validatedBody.expiry = body.expiry
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== true && body.isActive !== false && body.isActive !== 'true' && body.isActive !== 'false') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedBody.isActive = body.isActive
  }

  if (body.listingType.length) {
    let data = body.listingType
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      // Validating ListingTypeId as Required, not empty, valid numeric value with range.
      if (!data[i].ListingTypeId || isNaN(data[i].ListingTypeId)) {
        errorArray.push({
          field: 'ListingTypeId',
          error: 90340,
          message: 'Please provide only valid \'ListingTypeId\' as numeric.'
        })
      }

      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      listingTypeArray.push({
        expiry: data[i].expiry,
        limit: data[i].limit,
        ListingTypeId: data[i].ListingTypeId
      })
    }
  }

  if (body.bannerPackage.length) {
    let data = body.bannerPackage
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      // Validating BannerId as Required, not empty, valid numeric value with range.
      if (!data[i].BannerTypeId || isNaN(data[i].BannerTypeId)) {
        errorArray.push({
          field: 'BannerId',
          error: 90340,
          message: 'Please provide only valid \'BannerId\' as numeric.'
        })
      }

      BannerArray.push({
        expiry: data[i].expiry,
        BannerTypeId: data[i].BannerTypeId
      })
    }
  }

  if (body.agencyPackage.length) {
    let data = body.agencyPackage
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      AgencyArray.push({
        expiry: data[i].expiry
      })
    }
  }

  if (body.topPropertyPackage.length) {
    let data = body.topPropertyPackage
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      propertyArray.push({
        expiry: data[i].expiry,
        limit: data[i].limit
      })
    }
  }

  if (body.topProjectPackage.length) {
    let data = body.topProjectPackage
    for (let i = 0; i < data.length; i++) {
      // expiry is required, validating it as not empty.
      if (!data[i].expiry || isNaN(data[i].expiry)) {
        errorArray.push({
          field: 'expiry',
          error: 90220,
          message: '\'expiry\' is required as INTEGER .'
        })
      }

      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      projectArray.push({
        expiry: data[i].expiry,
        limit: data[i].limit
      })
    }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'package.middleware.validateUpdatePackage')
  }

  validatedBody.listingType = listingTypeArray
  validatedBody.banner = BannerArray
  validatedBody.companyProfile = AgencyArray
  validatedBody.property = propertyArray
  validatedBody.project = projectArray

  req.data = validatedBody
  req.id = param
  done()
}

// **********************************
// Get All Packages Middleware
// **********************************

const validateGetPackages = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (query.hasOwnProperty('id')) {
  // Must Be Required Validating as not empty, valid numeric value with range.
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 80560,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'packages.middleware.validateGetPackages')
  }

  req.conditions = validatedConditions
  done()
}

// *****************************
// Validate delete package
// *****************************

const validateDeletePackage = (req, res, next) => {
  const errorArray = []
  const validatedBody = {}
  const id = req.params
  // id is required, validating it as not empty, valid mongo db collection id.
  if (!id.id || isNaN(id.id)) {
    errorArray.push({
      field: '',
      error: 90280,
      message: '\'id\' is required as Number.'
    })
  }
  validatedBody.id = id.id

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'package.middleware.validateDeletePackage')
  }
  req.conditions = validatedBody
  next()
}

// *******************************
// Add Custom Package Middleware
// *******************************

const validateAddCustomPackage = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedBody = {}
  const listingTypeArray = []
  const BannerArray = []
  const AgencyArray = []
  const propertyArray = []
  const projectArray = []

  // Validating BannerId as Required, not empty, valid numeric value with range.
  if (!body.totalPrice || isNaN(body.totalPrice)) {
    errorArray.push({
      field: 'totalPrice',
      error: 90340,
      message: 'Please provide only valid \'totalPrice\' as numeric.'
    })
  }

  // For Listing Type
  if (body.listingType.length) {
    let data = body.listingType
    for (let i = 0; i < data.length; i++) {
      // Validating ListingTypeId as Required, not empty, valid numeric value with range.
      if (!data[i].ListingTypeId || isNaN(data[i].ListingTypeId)) {
        errorArray.push({
          field: 'ListingTypeId',
          error: 90340,
          message: 'Please provide only valid \'ListingTypeId\' as numeric.'
        })
      }

      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      listingTypeArray.push({
        quantity: data[i].limit,
        ListingTypeId: data[i].ListingTypeId
      })
    }
  }

  if (body.bannerPackage.length) {
    let data = body.bannerPackage
    for (let i = 0; i < data.length; i++) {
      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      // Validating BannerId as Required, not empty, valid numeric value with range.
      if (!data[i].BannerTypeId || isNaN(data[i].BannerTypeId)) {
        errorArray.push({
          field: 'BannerId',
          error: 90340,
          message: 'Please provide only valid \'BannerId\' as numeric.'
        })
      }

      BannerArray.push({
        quantity: data[i].limit,
        BannerTypeId: data[i].BannerTypeId
      })
    }
  }

  if (body.agencyPackage.length) {
    let data = body.agencyPackage

    for (let i = 0; i < data.length; i++) {
      // Validating agency as Required, not empty, valid Boolean value.
      if (data[i].agency !== true && data[i].agency !== false && data[i].agency !== 'true' && data[i].agency !== 'false') {
        errorArray.push({
          field: 'agency',
          error: 90340,
          message: 'Please provide only valid \'agency\' as Boolean.'
        })
      }
      AgencyArray.push({
        agency: data[i].agency
      })
    }
  }

  if (body.topPropertyPackage.length) {
    let data = body.topPropertyPackage
    for (let i = 0; i < data.length; i++) {
      // Validating home as Required, not empty, valid Boolean value.
      if (data[i].home !== true && data[i].home !== false && data[i].home !== 'true' && data[i].home !== 'false') {
        errorArray.push({
          field: 'home',
          error: 90340,
          message: 'Please provide only valid \'home\' as Boolean.'
        })
      }
      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      propertyArray.push({
        showOnHome: data[i].home,
        limit: data[i].limit
      })
    }
  }

  if (body.topProjectPackage.length) {
    let data = body.topProjectPackage
    for (let i = 0; i < data.length; i++) {
      // Validating limit as Required, not empty, valid numeric value with range.
      if (!data[i].limit || isNaN(data[i].limit)) {
        errorArray.push({
          field: 'limit',
          error: 90340,
          message: 'Please provide only valid \'limit\' as numeric.'
        })
      }

      projectArray.push({
        limit: data[i].limit
      })
    }
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'package.middleware.validateAddCustomPackage')
  }
  validatedBody.totalPrice = body.totalPrice
  validatedBody.listingType = listingTypeArray
  validatedBody.banner = BannerArray
  validatedBody.companyProfile = AgencyArray
  validatedBody.property = propertyArray
  validatedBody.project = projectArray

  req.data = validatedBody

  done()
}

// ********************
// validateUserPackage
// ********************

const validateUserPackage = (req, res, next) => {
  const errorArray = []
  const validatedBody = {}
  const id = req.params
  // id is required, validating it as not empty, valid mongo db collection id.
  if (!id.id || isNaN(id.id)) {
    errorArray.push({
      field: '',
      error: 90280,
      message: '\'id\' is required as Number.'
    })
  }
  validatedBody.id = id.id

  // Check if error exists
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'package.middleware.validateUserPackage')
  }
  req.conditions = validatedBody
  next()
}

module.exports = {
  validateAddPackage,
  validateGetPackageDetail,
  validateUpdatePackage,
  validateGetPackages,
  validateDeletePackage,
  validateAddCustomPackage,
  validateUserPackage
}
