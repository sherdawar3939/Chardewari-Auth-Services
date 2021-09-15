'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **************************************
// Update top Config Middleware
// **************************************

const updateTopConfig = (req, res, done) => {
  const errorArray = []
  const param = req.params
  const body = req.body
  const validatedConditions = {}

  // Validating id as Required, not empty, valid numeric value with range.
  if (!param.id || isNaN(param.id)) {
    errorArray.push({
      field: 'id',
      error: 90340,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  // price is Optional and Required As Numeric
  if (body.hasOwnProperty('price')) {
    if (!(body.price) || isNaN(body.price)) {
      errorArray.push({
        field: 'price',
        error: 30060,
        message: '\'price\' is required as Number.'
      })
    }
    validatedConditions.price = body.price
  }

  // showAtHomePrice is Optional and Required As Numeric
  if (body.hasOwnProperty('showAtHomePrice') && body.showAtHomePrice !== '') {
    if (!(body.showAtHomePrice) || isNaN(body.showAtHomePrice)) {
      errorArray.push({
        field: 'showAtHomePrice',
        error: 30070,
        message: '\'showAtHomePrice\' is required as Number.'
      })
    }
    validatedConditions.showAtHomePrice = body.showAtHomePrice
  }

  // validTillDay is Optional and Required As Numeric
  if (body.hasOwnProperty('validTillDay')) {
    if (!(body.validTillDay) || isNaN(body.validTillDay)) {
      errorArray.push({
        field: 'validTillDay',
        error: 30070,
        message: '\'validTillDay\' is required as Number.'
      })
    }
    validatedConditions.validTillDay = body.validTillDay
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topConfig.middleware.validateUpdateTopConfig')
  }
  req.id = param.id
  req.data = validatedConditions

  done()
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const validateGetDetail = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topConfig.middleware.validateGetDetail')
  }
  done()
}

// **************************************
// Update top Config Middleware
// **************************************

const updateBannerConfig = (req, res, done) => {
  const errorArray = []
  const param = req.params
  const body = req.body
  const validatedConditions = {}

  // Validating id as Required, not empty, valid numeric value with range.
  if (!param.id || isNaN(param.id)) {
    errorArray.push({
      field: 'id',
      error: 90340,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  // price is Optional and Required As Numeric
  if (body.hasOwnProperty('price')) {
    if (!(body.price) || isNaN(body.price)) {
      errorArray.push({
        field: 'price',
        error: 30060,
        message: '\'price\' is required as Number.'
      })
    }
    validatedConditions.price = body.price
  }

  // validTillDay is Optional and Required As Numeric
  if (body.hasOwnProperty('validTillDay')) {
    if (!(body.validTillDay) || isNaN(body.validTillDay)) {
      errorArray.push({
        field: 'validTillDay',
        error: 30070,
        message: '\'validTillDay\' is required as Number.'
      })
    }
    validatedConditions.validTillDay = body.validTillDay
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topConfig.middleware.updateBannerConfig')
  }
  req.id = param.id
  req.data = validatedConditions

  done()
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const validateGetBannerDetail = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'topConfig.middleware.validateGetBannerDetail')
  }
  done()
}

module.exports = {
  updateTopConfig,
  validateGetDetail,
  updateBannerConfig,
  validateGetBannerDetail
}
