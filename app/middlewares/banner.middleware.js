'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ************************************
// POST Banner Middleware
// ************************************

const validatePostBanner = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const file = req.files
  const validatedConditions = {}

  // file is an required  Validating as not empty.
  if (!_.isEmpty(file.image)) {
    errorArray.push({
      field: 'file',
      error: 70000,
      message: 'Please provide only One valid \'file\' Image.'
    })
  }

  // // url is an required  Validating as not empty, valid String and length range.
  // if (!_.isString(body.url) || body.url.length < 2 || body.url.length > 150) {
  //   errorArray.push({
  //     field: 'url',
  //     error: 70000,
  //     message: 'Please provide only valid \'url\' as string, length must be between 2 and 150.'
  //   })
  // }

  // status is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.status) || body.status.length < 2 || body.status.length > 10) {
    errorArray.push({
      field: 'status',
      error: 70000,
      message: 'Please provide only valid \'status\' as string, length must be between 2 and 10.'
    })
  }

  // validTill Is required as Date
  if (_.isEmpty(body.validTill) || !(body.validTill)) {
    errorArray.push({
      field: 'validTill',
      error: 90220,
      message: '\'validTill\' is required as Date .'
    })
  }

  // bannerTypeId Is required as Date
  if (_.isEmpty(body.bannerTypeId) || !(body.bannerTypeId) || isNaN(body.bannerTypeId)) {
    errorArray.push({
      field: 'bannerTypeId',
      error: 90220,
      message: '\'bannerTypeId\' is required as Numeric .'
    })
  }

  // companyId is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('companyId') && body.companyId && body.companyId !== 'null') {
    if (isNaN(body.companyId)) {
      errorArray.push({
        field: 'companyId',
        error: 90230,
        message: '\'companyId\' is required as Numeric.'
      })
    }
    validatedConditions.CompanyProfileId = body.companyId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'banner.middleware.validatePostBanner')
  }
  validatedConditions.CreatedBy = req.user.id
  validatedConditions.validTill = body.validTill
  validatedConditions.status = body.status
  validatedConditions.BannerTypeId = body.bannerTypeId
  req.conditions = validatedConditions
  req.file = file
  done()
}

// ********************
// Get Banners
// ********************

const validateGetBanner = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // id is an optional numeric, if it is given than validate it.
  if (query.hasOwnProperty('id')) {
    // Validating as not empty, valid numeric value with range.
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 60000,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  // CompanyProfileId is not required, validating it as not empty, valid String and length range.
  if (query.hasOwnProperty('CompanyProfileId') && query.CompanyProfileId) {
    if (isNaN(query.CompanyProfileId)) {
      errorArray.push({
        field: 'CompanyProfileId',
        error: 90230,
        message: '\'CompanyProfileId\' is required as string.'
      })
    }
    validatedConditions.CompanyProfileId = query.CompanyProfileId
  }

  // CreatedBy is not required, validating it as not empty, valid String and length range.
  if (query.hasOwnProperty('createdByName') && query.createdByName) {
    if (_.isEmpty(query.createdByName) || !_.isString(query.createdByName)) {
      errorArray.push({
        field: 'createdByName',
        error: 90230,
        message: '\'createdByName\' is required as string.'
      })
    }
    validatedConditions.CreatedByName = query.createdByName
  }

  // validTill is Optional nd Required As Date.
  if (query.hasOwnProperty('validTill') && query.validTill) {
    if (_.isEmpty(query.validTill)) {
      errorArray.push({
        field: 'validTill',
        error: 90220,
        message: '\'date\' is required as Date .'
      })
    }
    validatedConditions.validTill = query.validTill
  }

  // status is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('status')) {
  // Validating as not empty, valid String and length range.
    if (query.status !== 'active' && query.status !== 'inactive') {
      errorArray.push({
        field: 'status ',
        error: 90190,
        message: 'Please provide only valid \'status \' as boolean.'
      })
    }
    validatedConditions.status = query.status
  }
  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetBanner')
  }
  // validatedConditions.status = query.hasOwnProperty('status') ? query.status : 'active'
  req.conditions = validatedConditions
  req.limit = 10
  req.offset = 0
  done()
}

// ************************************
// PUT Banner Middleware
// ************************************

const validateUpdateBanner = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const param = req.params
  const validatedConditions = {}
  // Validating as not empty, valid numeric value with range.
  if (!param.id || isNaN(param.id)) {
    errorArray.push({
      field: 'id',
      error: 60000,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  // status is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.status) || body.status.length < 2 || body.status.length > 10) {
    errorArray.push({
      field: 'status',
      error: 70000,
      message: 'Please provide only valid \'status\' as string, length must be between 2 and 10.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'banner.middleware.validateUpdateBanner')
  }

  validatedConditions.status = body.status
  req.body = { data: validatedConditions,
    id: param.id }
  done()
}

// ********************
// Get Banner Types
// ********************

const validateGetBannerTypes = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // id is an optional numeric, if it is given than validate it.
  if (query.hasOwnProperty('id')) {
    // Validating as not empty, valid numeric value with range.
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 60000,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetBannerTypes')
  }

  req.conditions = validatedConditions
  done()
}

module.exports = {
  validatePostBanner,
  validateGetBanner,
  validateUpdateBanner,
  validateGetBannerTypes
}
