'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// *****************************************
// POST validatePostSunFriOffers Middleware
// ****************************************

const validatePostSunFriOffers = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const validatedConditions = {}

  // PropertyId Is required as Date
  if (!(body.propertyId) || isNaN(body.propertyId)) {
    errorArray.push({
      field: 'propertyId',
      error: 90220,
      message: '\'propertyId\' is required as Numeric .'
    })
  }
  validatedConditions.PropertyId = body.propertyId
  // discountedPrice Is required as Date
  if (!(body.discountedPrice) || isNaN(body.discountedPrice)) {
    errorArray.push({
      field: 'discountedPrice',
      error: 90220,
      message: '\'discountedPrice\' is required as Numeric .'
    })
  }
  validatedConditions.discountedPrice = body.discountedPrice

  // // day Is required as Date
  // if (_.isEmpty(body.day) || !(body.day)) {
  //   errorArray.push({
  //     field: 'day',
  //     error: 90220,
  //     message: '\'day\' is required as Date .'
  //   })
  // }
  // validatedConditions.day = body.day

  // date is an optional string property, if it is given than validate it.
  if (_.isEmpty(body.date) || !(body.date)) {
    errorArray.push({
      field: 'date',
      error: 90220,
      message: 'At least One \'date\' is required.'
    })
  } else {
    let day = body.date
    if (day.hasOwnProperty('sunday') && (day.sunday) && day.sunday != 'null') {
      if (_.isEmpty(day.sunday) || body.sunday === '') {
        errorArray.push({
          field: 'sunday',
          error: 90220,
          message: '\'sunday\' is required as Date .'
        })
      }
    }
    if (day.hasOwnProperty('friday') && (day.friday) && day.friday != 'null') {
      if (_.isEmpty(day.friday) || body.friday === '') {
        errorArray.push({
          field: 'friday',
          error: 90220,
          message: '\'friday\' is required as Date .'
        })
      }
    }
  }
  validatedConditions.date = body.date
  // isApproved is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isApproved')) {
    // Validating as not empty, valid String and length range.
    if (body.isApproved !== true && body.isApproved !== false && body.isApproved != 'true' && body.isApproved != 'false') {
      errorArray.push({
        field: 'isApproved ',
        error: 90190,
        message: 'Please provide only valid \'isApproved \' as boolean.'
      })
    }
    validatedConditions.isApproved = body.isApproved
  }

  // approvedBy is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('approvedBy') && !_.isEmpty(body.approvedBy)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.approvedBy) || body.approvedBy.length < 2 || body.approvedBy.length > 20) {
      errorArray.push({
        field: 'approvedBy',
        error: 90331,
        message: 'Please provide only valid \'approvedBy\' as string, length must be between 3 and 20.'
      })
    }
    validatedConditions.approvedBy = body.approvedBy
  }

  // Validating as not empty, valid String and length range.
  if (!_.isString(body.isActive) || body.isActive.length < 2 || body.isActive.length > 10) {
    errorArray.push({
      field: 'isActive',
      error: 90331,
      message: 'Please provide only valid \'isActive\' as string, length must be between 2 and 10.'
    })
  }
  validatedConditions.status = body.isActive

  // createdBy is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('createdBy')) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.createdBy) || body.createdBy.length < 2 || body.createdBy.length > 20) {
      errorArray.push({
        field: 'createdBy',
        error: 90331,
        message: 'Please provide only valid \'createdBy\' as string, length must be between 2 and 20.'
      })
    }
    validatedConditions.createdBy = body.createdBy
  }
  // createdById Is required as Numeric
  if (!(body.createdById) || isNaN(body.createdById)) {
    errorArray.push({
      field: 'createdById',
      error: 90220,
      message: '\'createdById\' is required as Numeric .'
    })
  }
  validatedConditions.CreatedById = body.createdById

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'sunfiroffers.middleware.validatePostSunFriOffers')
  }

  req.conditions = validatedConditions
  done()
}

// ************************************
// PUT validateUpdateOffers Middleware
// ************************************

const validateUpdateOffers = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'sunfrioffers.middleware.validateUpdateOffers')
  }

  validatedConditions.status = body.status
  req.body = { data: validatedConditions,
    id: param.id }
  done()
}

// ************************************
// PUT validateUpdateApprove Middleware
// ************************************

const validateUpdateApprove = (req, res, done) => {
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

  if (body.isApproved !== true && body.isApproved !== false && body.isApproved != 'true' && body.isApproved != 'false') {
    errorArray.push({
      field: 'isApproved ',
      error: 90130,
      message: 'Please provide only valid \'isApproved \' as boolean.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'sunfiroffers.middleware.validateUpdateApprove')
  }

  validatedConditions.isApproved = body.isApproved
  req.body = { data: validatedConditions,
    id: param.id }
  done()
}

// ***********************************************************
// Get SundayFriday Offer By id,date,status,minPrice,maxPrice
// ***********************************************************

const validateGetSunFriOffers = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (req.user.public) {
    validatedConditions.UserId = req.user.id
  }

  // sortByDate is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('sortByPrice') && query.sortByPrice) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.sortByPrice) || !_.isString(query.sortByPrice) || (query.sortByPrice !== 'ascending' && query.sortByPrice !== 'descending')) {
      errorArray.push({
        field: 'sortByPrice',
        error: 90002,
        message: 'Please provide only valid \'sortByPrice\' as string ascending and descending.'
      })
    }
    validatedConditions.sortByPrice = query.sortByPrice
  }

  // sortByDate is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('sortByDate') && query.sortByDate) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.sortByDate) || !_.isString(query.sortByDate) || (query.sortByDate !== 'ascending' && query.sortByDate !== 'descending')) {
      errorArray.push({
        field: 'sortByDate',
        error: 90001,
        message: 'Please provide only valid \'sortByDate\' as string ascending and descending'
      })
    }
    validatedConditions.sortByDate = query.sortByDate
  }

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

  // // userId is an optional numeric, if it is given than validate it.
  // if (query.hasOwnProperty('userId')) {
  // // Validating as not empty, valid numeric value with range.
  //   if (!query.userId || isNaN(query.userId)) {
  //     errorArray.push({
  //       field: 'userId',
  //       error: 60000,
  //       message: 'Please provide only valid \'userId\' as numeric.'
  //     })
  //   }
  //   validatedConditions.UserId = query.userId
  // }

  // purpose is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('purpose') && query.purpose) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.purpose) || !_.isString(query.purpose) || (query.purpose !== 'rent' && query.purpose !== 'sale' && query.purpose !== 'buy')) {
      errorArray.push({
        field: 'purpose',
        error: 90020,
        message: 'Please provide only valid \'purpose\' as string, and in rent and sale.'
      })
    }
    validatedConditions.purpose = query.purpose !== 'rent'
  }

  // area is an optional numeric, if it is given than validate it.
  if (query.hasOwnProperty('area')) {
    // Validating as not empty, valid numeric value with range.
    if (!query.area || isNaN(query.area)) {
      errorArray.push({
        field: 'area',
        error: 60000,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.AreaId = query.area
  }

  // minPrice is not required, validating it as not empty, valid String and length range.
  if (query.hasOwnProperty('minprice') && query.minprice) {
    if (isNaN(query.minprice)) {
      errorArray.push({
        field: 'minPrice',
        error: 90230,
        message: '\'minPrice\' is required as string.'
      })
    }
    validatedConditions.minPrice = query.minprice
  }

  // maxPrice is not required, validating it as not empty, valid String and length range.
  if (query.hasOwnProperty('maxprice') && query.maxprice) {
    if (isNaN(query.maxprice)) {
      errorArray.push({
        field: 'maxPrice',
        error: 90230,
        message: '\'maxPrice\' is required as string.'
      })
    }
    validatedConditions.maxPrice = query.maxprice
  }

  // sunday is Optional nd Required As sunday.
  if (query.hasOwnProperty('sunday') && query.sunday) {
    if (_.isEmpty(query.sunday)) {
      errorArray.push({
        field: 'sunday',
        error: 90220,
        message: '\'sunday\' is required as sunday .'
      })
    }
    validatedConditions.sunday = query.sunday
  }

  // friday is Optional nd Required As friday.
  if (query.hasOwnProperty('friday') && query.friday) {
    if (_.isEmpty(query.friday)) {
      errorArray.push({
        field: 'friday',
        error: 90220,
        message: '\'friday\' is required as friday .'
      })
    }
    validatedConditions.friday = query.friday
  }

  // title is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('title')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.title) || !_.isString(query.title)) {
      errorArray.push({
        field: 'title ',
        error: 90130,
        message: 'Please provide only valid \'title \' as string.'
      })
    }
    validatedConditions.title = query.title
  }

  // status is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('status')) {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(query.status) || !_.isString(query.status) || (query.status != 'active' && query.status != 'inactive')) {
      errorArray.push({
        field: 'status ',
        error: 90130,
        message: 'Please provide only valid \'status \' as string.'
      })
    }
    validatedConditions.status = query.status
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'sunfrioffers.middleware.validateGetsunfiroffers')
  }

  // validatedConditions.status = query.hasOwnProperty('status') ? query.status : 'active'
  req.conditions = validatedConditions
  req.limit = 10 // query.limit
  req.offset = 0 // query.offset
  done()
}

module.exports = {
  validatePostSunFriOffers,
  validateUpdateOffers,
  validateGetSunFriOffers,
  validateUpdateApprove
}
