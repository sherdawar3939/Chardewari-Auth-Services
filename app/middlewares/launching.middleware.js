'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// *********************
// To Add New Launching
// *********************

const validateAddLaunching = (req, res, done) => {
  const body = req.body
  const validatedBody = {}
  const validateContactInfo = {}
  // console.log(body)
  // get all the errors in an array
  const errorArray = []

  // if (req.user.public) {
  //   validatedBody.UserId = req.user.id
  // } else {
  //   // UserId is required, validating as not empty, valid numeric value with range.
  //   if (!body.UserId || isNaN(body.UserId) || body.UserId < 1 || body.UserId > 99999999999) {
  //     errorArray.push({
  //       field: 'UserId',
  //       error: 5001,
  //       message: '\'UserId\' is required as numeric, range must be between 1 and 99999999999.'
  //     })
  //   }
  //   validatedBody.UserId = body.UserId
  // }

  // Amenities is Optional, if given then validating it as not empty, valid Array and length range.
  if (body.hasOwnProperty('amenities') && !_.isArray(body.amenities) && body.amenities !== '') {
    let obj = body.amenities
    let amenities = JSON.parse(obj)
    validatedBody.amenities = []
    for (var i = 0; i < amenities.length; i++) {
      const amenity = amenities[i]
      if (!amenity.amenityPropertyId || isNaN(amenity.amenityPropertyId)) {
        errorArray.push({
          field: 'amenityLaunchingId',
          error: 90050,
          message: '\'amenityLaunchingId\' is required as Number.'
        })
        if (amenity.value === 'null' || typeof amenity.value === 'undefined') {
          errorArray.push({
            field: 'value',
            error: 90060,
            message: '\'value\' is required.'
          })
        }
      }
      validatedBody.amenities.push({
        AmenityPropertyId: amenity.amenityPropertyId,
        value: amenity.value
      })
    }
  }

  // email is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 100) {
    errorArray.push({
      field: 'title',
      error: 90070,
      message: 'Please provide only valid \'title\' as string, length must be between 2 and 100.'
    })
  }

  // expiryDate is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('expiryDate')) {
    if (_.isEmpty(body.expiryDate) || body.expiryDate === '') {
      errorArray.push({
        field: 'expiryDate',
        error: 90220,
        message: '\'expiryDate\' is required as expiryDate .'
      })
    }
    validatedBody.expiry = body.expiryDate
  }

  // minPrice is required, validating as not empty, valid numeric value with range.
  if (!body.minPrice || isNaN(body.minPrice)) {
    errorArray.push({
      field: 'minPrice',
      error: 90171,
      message: '\'minPrice\' is required as numeric.'
    })
  }

  // maxPrice is required, validating as not empty, valid numeric value with range.
  if (!body.maxPrice || isNaN(body.maxPrice)) {
    errorArray.push({
      field: 'maxPrice',
      error: 90172,
      message: '\'maxPrice\' is required as numeric.'
    })
  }
  validatedBody.minPrice = body.minPrice
  validatedBody.maxPrice = body.maxPrice

  // Title is Not required,if given then validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('titleL1') && !_.isEmpty(body.titleL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.titleL1) || body.titleL1.length < 3 || body.titleL1.length > 150) {
      errorArray.push({
        field: 'titleL1',
        error: 90075,
        message: '\'titleL1\' is required as string, length must be between 3 and 150.'
      })
    }
    validatedBody.titleL1 = body.titleL1
  }

  // shortDescription is Not required,if given then validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('shortDescription') && !_.isEmpty(body.shortDescription)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.shortDescription) || body.shortDescription.length < 3 || body.shortDescription.length > 200) {
      errorArray.push({
        field: 'shortDescription',
        error: 90080,
        message: '\'shortDescription\' is required as string, length must be between 3 and 200.'
      })
    }
    validatedBody.shortDescription = body.shortDescription
  }

  // shortDescriptionL1 is Not required,if given then validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('shortDescriptionL1') && !_.isEmpty(body.shortDescriptionL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.shortDescriptionL1) || body.shortDescriptionL1.length < 3 || body.shortDescriptionL1.length > 200) {
      errorArray.push({
        field: 'shortDescriptionL1',
        error: 90090,
        message: '\'shortDescriptionL1\' is required as string, length must be between 3 and 200.'
      })
    }
    validatedBody.shortDescriptionL1 = body.shortDescriptionL1
  }

  // description is required, validating it as not empty, valid String and length range.
  if (_.isEmpty(body.description) || !_.isString(body.description) || body.description.length < 3 || body.description.length > 4000) {
    errorArray.push({
      field: 'description',
      error: 90100,
      message: '\'description\' is required as string, length must be between 3 and 4000.'
    })
  }

  // descriptionL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('descriptionL1') && !_.isEmpty(body.descriptionL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.descriptionL1) || body.descriptionL1.length < 3 || body.descriptionL1.length > 4000) {
      errorArray.push({
        field: 'descriptionL1',
        error: 90101,
        message: 'Please provide only valid \'descriptionL1\' as string, length must be between 3 and 4000.'
      })
    }
    validatedBody.descriptionL1 = body.descriptionL1
  }

  // lat is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('lat') && body.lat !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.lat) || !_.isString(body.lat) || body.lat.length > 45) {
      errorArray.push({
        field: 'lat',
        error: 90110,
        message: '\'lat\' is required as string, length must be 11.'
      })
    }
    validatedBody.lat = body.lat
  }

  // lng is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('lng') && body.lng !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.lng) || !_.isString(body.lng) || body.lng.length > 45) {
      errorArray.push({
        field: 'lng',
        error: 90120,
        message: '\'lng\' is required as string, length must be 11.'
      })
    }
    validatedBody.lng = body.lng
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== 'Yes' && body.isActive !== 'No') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedBody.isActive = body.isActive
  }
  // video is not required, validating it as not empty, valid Array of Strings and length range.
  if (body.hasOwnProperty('videos') && !_.isEmpty(body.videos)) {
    if (!_.isArray(body.videos)) {
      errorArray.push({
        field: 'videos',
        error: 90150,
        message: '\'videos\' should be Array Of strings.'
      })
    } else {
      let videos = body.videos
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i]
        if (!_.isString(video) || video.length < 5) {
          errorArray.push({
            field: 'url',
            error: 90160,
            message: 'Videos \'url\' must be string.'
          })
        }
      }
    }
    validatedBody.videos = body.videos
  }

  if (body.hasOwnProperty('thumbnail') && body.thumbnail && body.thumbnail !== `undefined`) {
    // thumbnail is  required, validating as not empty, valid numeric value.
    if (!body.thumbnail) {
      errorArray.push({
        field: 'thumbnail',
        error: 90171,
        message: '\'thumbnail\' is required as numeric.'
      })
    }
    validatedBody.thumbnailObject = body.thumbnail
  }

  // // currency is required, validating it as not empty.
  // if (_.isEmpty(body.currency) || !_.isString(body.currency) || body.currency.length > 10) {
  //   errorArray.push({
  //     field: 'currency',
  //     error: 90180,
  //     message: '\'currency\' is required '
  //   })
  // }

  if (!body.CurrencyId || isNaN(body.CurrencyId)) {
    errorArray.push({
      field: 'CurrencyId',
      error: 90282,
      message: '\'CurrencyId\' is required as Number.'
    })
  }
  validatedBody.CurrencyId = body.CurrencyId

  // isVerified is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isVerified')) {
    // Validating as not empty, valid String and length range.
    if (body.isVerified !== true && body.isVerified !== false && body.isVerified !== 'true' && body.isVerified !== 'false') {
      errorArray.push({
        field: 'isVerified ',
        error: 90190,
        message: 'Please provide only valid \'isVerified \' as boolean.'
      })
    }
    validatedBody.isVerified = body.isVerified
  }

  // isProject is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isProject')) {
    // Validating as not empty, valid String and length range.
    if (body.isProject !== true && body.isProject !== false && body.isProject !== 'true' && body.isProject !== 'false') {
      errorArray.push({
        field: 'isProject ',
        error: 90190,
        message: 'Please provide only valid \'isProject \' as boolean.'
      })
    }
    validatedBody.isProject = body.isProject
  }

  // expiry is not required, validating it as not empty, valid String and length range.
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
  // area is required, validating as not empty, valid numeric value with range.
  if (!body.area || isNaN(body.area)) {
    errorArray.push({
      field: 'area',
      error: 90200,
      message: '\'area\' is required as numeric.'
    })
  }

  // areaUnit is required, validating it as not empty.
  if (_.isEmpty(body.areaUnit) || !_.isString(body.areaUnit) || body.areaUnit.length > 20) {
    errorArray.push({
      field: 'areaUnit',
      error: 90210,
      message: '\'areaUnit\' is required and it must be string length less then 10 '
    })
  }

  // isApproved is required Boolean property, if it is given than validate it.
  // if (!body.isApproved || (body.isApproved !== true && body.isApproved !== false)) {
  //   errorArray.push({
  //     field: 'isApproved ',
  //     error: 1152,
  //     message: 'Please provide only valid \'isApproved \' as boolean.'
  //   })
  // }

  // launchingDate is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('launchDate')) {
    if (_.isEmpty(body.launchDate) || body.launchDate === '') {
      errorArray.push({
        field: 'launchDate',
        error: 90220,
        message: '\'launchDate\' is required as launchingDate .'
      })
    }
    validatedBody.launchDate = body.launchDate
  }

  // company is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('company') && body.company) {
    if (isNaN(body.company)) {
      errorArray.push({
        field: 'company',
        error: 90230,
        message: '\'company\' is required as string.'
      })
    }
    validatedBody.company = body.company
  }
  body.CategoryIds = body.CategoryIds ? body.CategoryIds.split(',') : []

  // CategoryIds are required As Array
  if (_.isEmpty(body.CategoryIds) || !_.isArray(body.CategoryIds) || body.CategoryIds.length < 1) {
    errorArray.push({
      field: 'CategoryIds',
      error: 90240,
      message: '\'CategoryIds\' is required as Array Provide Valid Array of CategoryIds.'
    })
  }
  const categoriesIds = body.CategoryIds
  for (const id in categoriesIds) {
    if (!id || isNaN(id)) {
      errorArray.push({
        field: 'categoryIds',
        error: 90250,
        message: 'Please provide only valid numeric ids in Property CategoryIds only.'
      })
    }
  }

  body.AreaIds = body.AreaIds ? body.AreaIds.split(',') : []

  // AreaIds Are required As Array
  if (_.isEmpty(body.AreaIds) || !_.isArray(body.AreaIds) || body.AreaIds.length < 1) {
    errorArray.push({
      field: 'AreaIds',
      error: 90260,
      message: '\'AreaIds\' is required as Array Provide Valid Array of AreaIds.'
    })
  }

  const areaIds = body.AreaIds
  for (const id in areaIds) {
    if (!id || isNaN(id)) {
      errorArray.push({
        field: 'AreaIds',
        error: 90270,
        message: 'Please provide only valid numeric ids in Property  AreaIds only.'
      })
    }
  }

  // address is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('address') && !_.isEmpty(body.address)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.address) || body.address.length < 3 || body.address.length > 50) {
      errorArray.push({
        field: 'address',
        error: 90331,
        message: 'Please provide only valid \'address\' as string, length must be between 3 and 50.'
      })
    }
    validatedBody.address = body.address
  }

  // addressL1 is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('addressL1') && !_.isEmpty(body.addressL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.addressL1) || body.addressL1.length < 3 || body.addressL1.length > 70) {
      errorArray.push({
        field: 'addressL1',
        error: 90332,
        message: 'Please provide only valid \'addressL1\' as string, length must be between 3 and 70.'
      })
    }
    validatedBody.addressL1 = body.addressL1
  }

  // Validate ContactInformation
  if (body.hasOwnProperty('ContactId') && body.ContactId && body.ContactId !== 'null') {
    if (!body.ContactId || isNaN(body.ContactId)) {
      errorArray.push({
        field: 'ContactId',
        error: 90280,
        message: '\'ContactId\' is required as Number.'
      })
    }
    validateContactInfo.ContactId = body.ContactId
  } else {
    // Validate Contact Information
    // name is an required  Validating as not empty, valid String and length range.
    if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
      errorArray.push({
        field: 'name',
        error: 90290,
        message: 'Please provide only valid \'name\' as string, length must be between 2 and 100.'
      })
    }

    // phone is Requires As Number
    if (!(body.phone) || isNaN(body.phone)) {
      errorArray.push({
        field: 'phone',
        error: 90300,
        message: '\'phone\' is required as Number.'
      })
    }

    // email is an optional  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('email') && body.email && body.email !== 'null') {
      if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
        errorArray.push({
          field: 'email',
          error: 90320,
          message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
        })
      }
      validateContactInfo.email = body.email
    }

    // fax is not required, validating it as not empty, valid String and length range.
    if (body.hasOwnProperty('fax') && body.fax && body.fax !== 'null') {
      if (!(body.fax) || isNaN(body.fax)) {
        errorArray.push({
          field: 'fax',
          error: 90330,
          message: 'fax is required as number'
        })
      }
      validateContactInfo.fax = body.fax
    }

    validateContactInfo.name = body.name
    validateContactInfo.phone = body.phone
  }

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'launching.middleware.validateAddLaunching')
  }

  let slug = body.title.replace(/ /g, '-')
  validatedBody.title = body.title
  validatedBody.isApproved = false
  validatedBody.areaUnit = body.areaUnit
  validatedBody.area = body.area
  // validatedBody.currency = body.currency
  validatedBody.slug = slug
  validatedBody.description = body.description
  validatedBody.AreaId = body.AreaId
  validatedBody.CategoryIds = body.CategoryIds
  validatedBody.AreaIds = body.AreaIds
  validatedBody.CompanyId = body.hasOwnProperty('Company') ? body.CompanyId : null
  validatedBody.contactInformation = validateContactInfo
  validatedBody.UserId = req.user.id

  req.body = validatedBody
  done()
}

// **********************
// Get Launching Listing
// **********************

const validateGetLaunchingsListing = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (req.user.public) {
    validatedConditions.UserId = req.user.id
  }
  // area is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('area') && query.area) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.area)) {
      errorArray.push({
        field: 'area',
        error: 90000,
        message: 'Please provide only valid \'area\' as numeric.'
      })
    }
    validatedConditions.AreaId = query.area
  }

  // CompanyId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('CompanyId') && query.CompanyId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.CompanyId)) {
      errorArray.push({
        field: 'CompanyId',
        error: 90010,
        message: 'Please provide only valid \'CompanyId\' as numeric.'
      })
    }
    validatedConditions.CompanyId = query.CompanyId
  }

  // CompanyId is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('CompanyId') && query.CompanyId) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.CompanyId)) {
      errorArray.push({
        field: 'CompanyId',
        error: 90000,
        message: 'Please provide only valid \'CompanyId\' as numeric.'
      })
    }
    validatedConditions.CompanyId = query.CompanyId
  }

  // category is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('category') && query.category) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.category)) {
      errorArray.push({
        field: 'category',
        error: 90010,
        message: 'Please provide only valid \'category\' as numeric.'
      })
    }
    validatedConditions.category = query.category
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

  // isProject is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('isProject')) {
    // Validating as not empty, valid String and length range.
    if (query.isProject !== true && query.isProject !== false && query.isProject !== 'true' && query.isProject !== 'false') {
      errorArray.push({
        field: 'isProject ',
        error: 90190,
        message: 'Please provide only valid \'isProject \' as boolean.'
      })
    }
    validatedConditions.isProject = query.isProject
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

  // minprice is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('minprice') && query.minprice) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.minprice)) {
      errorArray.push({
        field: 'minprice',
        error: 90030,
        message: 'Please provide only valid \'minprice\' as numeric.'
      })
    }
    validatedConditions.minprice = query.minprice
  }

  // isActive is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (query.isActive !== true && query.isActive !== false && query.isActive !== 'true' && query.isActive !== 'false') {
      errorArray.push({
        field: 'isActive',
        error: 90332,
        message: 'Please provide only valid \'isActive\' as string, length must be between 2 and 10.'
      })
    }
    validatedConditions.isActive = query.isActive
  }

  // maxprice is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('maxprice') && query.maxprice) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.maxprice)) {
      errorArray.push({
        field: 'maxprice',
        error: 90040,
        message: 'Please provide only valid \'maxprice\' as numeric.'
      })
    }
    validatedConditions.maxprice = query.maxprice
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'property.middleware.validateGetLaunchingsListing')
  }

  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }

  // validatedConditions.status = query.hasOwnProperty('status') ? query.status : 'active'
  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const validateGetLaunching = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const validatedConditions = {}

  // Validating id as Required, not empty, valid numeric value with range.
  if (!params.id || isNaN(params.id)) {
    errorArray.push({
      field: 'id',
      error: 90340,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'launching.middleware.validateGetLaunching')
  }
  validatedConditions.id = params.id
  req.conditions = validatedConditions
  done()
}

// ****************************
// To Update Existing Launching
// ****************************

const validateUpdateLaunching = (req, res, done) => {
  const body = req.body
  const validatedBody = {}
  const validateContactInfo = {}
  const validatedLaunching = {}
  const id = req.params.id

  // get all the errors in an array
  const errorArray = []
  // Amenities is Optional, if given then validating it as not empty, valid Array and length range.
  if (body.hasOwnProperty('amenities') && !_.isArray(body.amenities) && body.amenities !== '') {
    let obj = body.amenities
    let incomingAmenities = JSON.parse(obj)
    validatedBody.updateAmenities = []

    for (var i = 0; i < incomingAmenities.length; i++) {
      const amenity = incomingAmenities[i]
      if (!amenity.amenityPropertyId || isNaN(amenity.amenityPropertyId)) {
        errorArray.push({
          field: 'amenityPropertyId',
          error: 90050,
          message: '\'amenityPropertyId\' is required as Number.'
        })
        if (amenity.value === '' || amenity.value === 'null' || typeof amenity.value === 'undefined') {
          errorArray.push({
            field: 'value',
            error: 90060,
            message: '\'value\' is required.'
          })
        }
      }
      validatedBody.updateAmenities.push({
        AmenityPropertyId: amenity.amenityPropertyId,
        value: amenity.value
      })
    }
  }

  // // expiryDate is not required, validating it as not empty, valid String and length range.
  // if (body.hasOwnProperty('expiryDate')) {
  //   if (_.isEmpty(body.expiryDate) || body.expiryDate === '') {
  //     errorArray.push({
  //       field: 'expiryDate',
  //       error: 90220,
  //       message: '\'expiryDate\' is required as expiryDate .'
  //     })
  //   }
  //   validatedBody.expiry = body.expiryDate
  // }

  if (body.hasOwnProperty('title') && body.title && body.title !== 'null') {
    // title is an required  Validating as not empty, valid String and length range.
    if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 100) {
      errorArray.push({
        field: 'title',
        error: 90070,
        message: 'Please provide only valid \'title\' as string, length must be between 2 and 100.'
      })
    }
    validatedLaunching.title = body.title
  }

  if (body.hasOwnProperty('listingType') && body.listingType && body.listingType !== 'null') {
    // listingType is required, validating as not empty, valid numeric value with range.
    if (!body.listingType || isNaN(body.listingType)) {
      errorArray.push({
        field: 'listingType',
        error: 90071,
        message: '\'listingType\' is required as numeric.'
      })
    }
    validatedLaunching.listingType = body.listingType
  }

  // Title is Not required,if given then validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('titleL1') && !_.isEmpty(body.titleL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.titleL1) || body.titleL1.length < 3 || body.titleL1.length > 150) {
      errorArray.push({
        field: 'titleL1',
        error: 90075,
        message: '\'titleL1\' is required as string, length must be between 3 and 150.'
      })
    }
    validatedLaunching.titleL1 = body.titleL1
  }

  // shortDescription is Not required,if given then validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('shortDescription') && !_.isEmpty(body.shortDescription)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.shortDescription) || body.shortDescription.length < 3 || body.shortDescription.length > 200) {
      errorArray.push({
        field: 'shortDescription',
        error: 90080,
        message: '\'shortDescription\' is required as string, length must be between 3 and 200.'
      })
    }
    validatedLaunching.shortDescription = body.shortDescription
  }

  if (body.hasOwnProperty('thumbnail') && body.thumbnail && body.thumbnail !== `undefined`) {
    // thumbnailIndex is  required, validating as not empty, valid numeric value.
    if (!body.thumbnail) {
      errorArray.push({
        field: 'thumbnailIndex',
        error: 90091,
        message: '\'thumbnailIndex\' is required as valid Object.'
      })
    }
    validatedLaunching.thumbnailObject = body.thumbnail
  }

  // shortDescriptionL1 is Not required,if given then validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('shortDescriptionL1') && !_.isEmpty(body.shortDescriptionL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.shortDescriptionL1) || body.shortDescriptionL1.length < 3 || body.shortDescriptionL1.length > 200) {
      errorArray.push({
        field: 'shortDescriptionL1',
        error: 90090,
        message: '\'shortDescriptionL1\' is required as string, length must be between 3 and 200.'
      })
    }
    validatedLaunching.shortDescriptionL1 = body.shortDescriptionL1
  }

  // description is Optional, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('description') && !_.isEmpty(body.description)) {
    if (_.isEmpty(body.description) || !_.isString(body.description) || body.description.length < 3 || body.description.length > 4000) {
      errorArray.push({
        field: 'description',
        error: 90100,
        message: '\'description\' is required as string, length must be between 3 and 4000.'
      })
    }
    validatedLaunching.description = body.description
  }

  // descriptionL1 is an optional string launching, if it is given than validate it.
  if (body.hasOwnProperty('descriptionL1') && !_.isEmpty(body.descriptionL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.descriptionL1) || body.descriptionL1.length < 3 || body.descriptionL1.length > 4000) {
      errorArray.push({
        field: 'descriptionL1',
        error: 90101,
        message: 'Please provide only valid \'descriptionL1\' as string, length must be between 3 and 4000.'
      })
    }
    validatedLaunching.descriptionL1 = body.descriptionL1
  }

  // lat is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('lat') && body.lat !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.lat) || !_.isString(body.lat) || body.lat.length > 45) {
      errorArray.push({
        field: 'lat',
        error: 90110,
        message: '\'lat\' is required as string, length must be 11.'
      })
    }
    validatedLaunching.lat = body.lat
  }

  // lng is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('lng') && body.lng !== '') {
    // Validating as not empty, valid String and length range.
    if (_.isEmpty(body.lng) || !_.isString(body.lng) || body.lng.length > 45) {
      errorArray.push({
        field: 'lng',
        error: 90120,
        message: '\'lng\' is required as string, length must be 11.'
      })
    }
    validatedLaunching.lng = body.lng
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive !== 'Yes' && body.isActive !== 'No') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedLaunching.isActive = body.isActive
  }
  // address is an optional string launching, if it is given than validate it.
  if (body.hasOwnProperty('address') && !_.isEmpty(body.address)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.address) || body.address.length < 3 || body.address.length > 50) {
      errorArray.push({
        field: 'address',
        error: 90331,
        message: 'Please provide only valid \'address\' as string, length must be between 3 and 50.'
      })
    }
    validatedLaunching.address = body.address
  }

  // addressL1 is an optional string launching, if it is given than validate it.
  if (body.hasOwnProperty('addressL1') && !_.isEmpty(body.addressL1)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(body.addressL1) || body.addressL1.length < 3 || body.addressL1.length > 70) {
      errorArray.push({
        field: 'addressL1',
        error: 90332,
        message: 'Please provide only valid \'addressL1\' as string, length must be between 3 and 70.'
      })
    }
    validatedLaunching.addressL1 = body.addressL1
  }

  if (body.hasOwnProperty('minPrice')) {
    // minPrice is required, validating as not empty, valid numeric value with range.
    if (!body.minPrice || isNaN(body.minPrice)) {
      errorArray.push({
        field: 'minPrice',
        error: 90170,
        message: '\'minPrice\' is required as numeric.'
      })
    }
    validatedLaunching.minPrice = body.minPrice
  }

  if (body.hasOwnProperty('maxPrice')) {
    // maxPrice is required, validating as not empty, valid numeric value with range.
    if (!body.maxPrice || isNaN(body.maxPrice)) {
      errorArray.push({
        field: 'maxPrice',
        error: 90170,
        message: '\'maxPrice\' is required as numeric.'
      })
    }
    validatedLaunching.maxPrice = body.maxPrice
  }

  console.log(body)
  if (body.hasOwnProperty('CurrencyId')) {
    // CurrencyId is required, validating it as not empty.
    if (!body.CurrencyId || isNaN(body.CurrencyId)) {
      errorArray.push({
        field: 'CurrencyId',
        error: 90282,
        message: '\'CurrencyId\' is required as Number.'
      })
    }
    validatedLaunching.CurrencyId = body.CurrencyId
  }

  // isVerified is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isVerified')) {
    // Validating as not empty, valid String and length range.
    if (body.isVerified !== true && body.isVerified !== false && body.isVerified !== 'true' && body.isVerified !== 'false') {
      errorArray.push({
        field: 'isVerified ',
        error: 90190,
        message: 'Please provide only valid \'isVerified \' as boolean.'
      })
    }
    validatedLaunching.isVerified = body.isVerified
  }

  // area is an optional string launching, if it is given than validate it.
  if (body.hasOwnProperty('area')) {
    // area is required, validating as not empty, valid numeric value with range.
    if (!body.area || isNaN(body.area)) {
      errorArray.push({
        field: 'area',
        error: 90200,
        message: '\'area\' is required as numeric.'
      })
    }
    validatedLaunching.area = body.area
  }

  // areaUnit is an optional string launching, if it is given than validate it.
  if (body.hasOwnProperty('areaUnit')) {
    // areaUnit is required, validating it as not empty.
    if (_.isEmpty(body.areaUnit) || !_.isString(body.areaUnit) || body.areaUnit.length > 20) {
      errorArray.push({
        field: 'areaUnit',
        error: 90210,
        message: '\'areaUnit\' is required and it must be string length less then 10 '
      })
    }
    validatedLaunching.areaUnit = body.areaUnit
  }

  // launchingDate is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('launchingDate')) {
    if (_.isEmpty(body.launchingDate)) {
      errorArray.push({
        field: 'launchingDate',
        error: 90220,
        message: '\'launchingDate\' is required as launchingDate .'
      })
    }
    validatedBody.launchDate = body.launchingDate
  }

  // CompanyId is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('CompanyId') && body.CompanyId) {
    if (isNaN(body.CompanyId)) {
      errorArray.push({
        field: 'CompanyId',
        error: 90230,
        message: '\'CompanyId\' is required as string.'
      })
    }
    validatedLaunching.CompanyId = body.CompanyId
  }

  // isApproved is required Boolean launching, if it is given than validate it.
  // if (!body.property.isApproved || (body.property.isApproved !== true && body.property.isApproved !== false)) {
  //   errorArray.push({
  //     field: 'isApproved ',
  //     error: 1152,
  //     message: 'Please provide only valid \'isApproved \' as boolean.'
  //   })
  // }

  // video is not required, validating it as not empty, valid Array of Strings and length range.
  if (body.hasOwnProperty('videos') && !_.isEmpty(body.videos)) {
    if (!_.isArray(body.videos)) {
      errorArray.push({
        field: 'videos',
        error: 90150,
        message: '\'videos\' should be Array Of strings.'
      })
    } else {
      let videos = body.videos
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i]
        if (!_.isString(video) || video.length < 5) {
          errorArray.push({
            field: 'url',
            error: 90160,
            message: 'Videos \'url\' must be string.'
          })
        }
      }
    }
    validatedBody.videos = body.videos
  }

  // date is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('date')) {
    if (_.isEmpty(body.date) || !_.isDate(body.date)) {
      errorArray.push({
        field: 'date',
        error: 90220,
        message: '\'date\' is required as Date .'
      })
    }
    validatedBody.date = body.date
  }

  // deletedImages is an optional numeric property, if it is given than validate it.
  if (body.hasOwnProperty('deletedImages') && body.deletedImages && body.deletedImages !== `undefined`) {
    body.deletedImages = body.deletedImages ? body.deletedImages.split(',') : []
    // Validating as not empty, valid numeric value with range.
    if (!_.isArray(body.deletedImages)) {
      errorArray.push({
        field: 'deletedImages',
        error: 90000,
        message: 'Please provide only valid \'deletedImages\' as numeric.'
      })
    }
    validatedBody.deletedImages = body.deletedImages
  }

  if (body.hasOwnProperty('CategoryIds')) {
    body.CategoryIds = body.CategoryIds ? body.CategoryIds.split(',') : []

    // CategoryIds are required As Array
    if (_.isEmpty(body.CategoryIds) || !_.isArray(body.CategoryIds) || body.CategoryIds.length < 1) {
      errorArray.push({
        field: 'CategoryIds',
        error: 90240,
        message: '\'CategoryIds\' is required as Array Provide Valid Array of CategoryIds.'
      })
    }
    const categoriesIds = body.CategoryIds
    for (const id in categoriesIds) {
      if (!id || isNaN(id)) {
        errorArray.push({
          field: 'categoryIds',
          error: 90250,
          message: 'Please provide only valid numeric ids in Property CategoryIds only.'
        })
      }
    }
    validatedBody.CategoryIds = body.CategoryIds
  }

  if (body.hasOwnProperty('AreaIds')) {
    body.AreaIds = body.AreaIds ? body.AreaIds.split(',') : []

    // AreaIds Are required As Array
    if (_.isEmpty(body.AreaIds) || !_.isArray(body.AreaIds) || body.AreaIds.length < 1) {
      errorArray.push({
        field: 'AreaIds',
        error: 90260,
        message: '\'AreaIds\' is required as Array Provide Valid Array of AreaIds.'
      })
    }

    const areaIds = body.AreaIds
    for (const id in areaIds) {
      if (!id || isNaN(id)) {
        errorArray.push({
          field: 'AreaIds',
          error: 90270,
          message: 'Please provide only valid numeric ids in Property  AreaIds only.'
        })
      }
    }
    validatedBody.AreaIds = body.AreaIds
  }
  // Validate ContactInformation
  if (body.hasOwnProperty('ContactId') && body.ContactId && body.ContactId !== 'null') {
    if (!body.ContactId || isNaN(body.ContactId)) {
      errorArray.push({
        field: 'ContactId',
        error: 90280,
        message: '\'ContactId\' is required as Number.'
      })
    }
    validateContactInfo.ContactId = body.ContactId
  } else {
    // Validate Contact Information
    if (body.hasOwnProperty('name')) {
      // name is an required  Validating as not empty, valid String and length range.
      if (!_.isString(body.name) || body.name.length < 2 || body.name.length > 100) {
        errorArray.push({
          field: 'name',
          error: 90290,
          message: 'Please provide only valid \'name\' as string, length must be between 2 and 100.'
        })
      }
      validateContactInfo.name = body.name
    }
    if (body.hasOwnProperty('phone') && body.phone && body.phone !== 'null') {
      // phone is Requires As Number
      if (!(body.phone) || isNaN(body.phone)) {
        errorArray.push({
          field: 'phone',
          error: 90300,
          message: '\'phone\' is required as Number.'
        })
      }
      validateContactInfo.phone = body.phone
    }

    // UserId is Requires As Number
    // if (!(body.UserId) || isNaN(body.UserId)) {
    //   errorArray.push({
    //     field: 'UserId',
    //     error: 90310,
    //     message: '\'UserId\' is required as Number.'
    //   })
    //   validateContactInfo.UserId = body.UserId
    // }

    // email is an optional  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('email') && body.email && body.email !== 'null') {
      if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
        errorArray.push({
          field: 'email',
          error: 90320,
          message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
        })
      }
      validateContactInfo.email = body.email
    }

    // fax is not required, validating it as not empty, valid String and length range.
    if (body.hasOwnProperty('fax') && body.fax && body.fax !== 'null') {
      if (!(body.fax) || isNaN(body.fax)) {
        errorArray.push({
          field: 'fax',
          error: 90330,
          message: 'fax is required as number And Must be length of 11'
        })
      }
      validateContactInfo.fax = body.fax
    }
  }

  // expiry is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('expiry')) {
    if (_.isEmpty(body.expiry) || body.expiry === '') {
      errorArray.push({
        field: 'expiry',
        error: 90220,
        message: '\'expiry\' is required as Date .'
      })
    }
    validatedLaunching.expiry = body.expiry
  }

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'property.middleware.validateUpdateLaunching')
  }
  validatedLaunching.CompanyId = null
  validatedBody.launching = validatedLaunching
  validatedBody.AreaId = body.AreaId
  validatedBody.UserId = req.user.id
  validatedBody.contactInformation = validateContactInfo

  req.body = {
    data: validatedBody,
    id: id
  }

  done()
}

module.exports = {
  validateAddLaunching,
  validateGetLaunchingsListing,
  validateGetLaunching,
  validateUpdateLaunching
}
