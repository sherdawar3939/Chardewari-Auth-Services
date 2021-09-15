'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// ********************
// Get Property Listing
// ********************

const validateGetPropertiesListing = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}
  let limit = 50
  let offset = 0

  if (req.user.public) {
    validatedConditions.UserId = req.user.id
  }

  // area is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('area') && query.area && query.area !== `undefined`) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.area) && !_.isArray(query.area)) {
      errorArray.push({
        field: 'area',
        error: 90000,
        message: 'Please provide only valid \'area\' as numeric.'
      })
    }
    validatedConditions.AreaId = query.area
  }

  // company is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('company') && query.company && query.company !== '') {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.company)) {
      errorArray.push({
        field: 'company',
        error: 90000,
        message: 'Please provide only valid \'company\' as numeric.'
      })
    }
    validatedConditions.CompanyId = query.company
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

  // minprice is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('minprice') && query.minprice && query.minprice !== ` `) {
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

  // totalArea is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('totalArea') && query.totalArea) {
    // Validating as not empty, valid numeric value with range.
    if (isNaN(query.totalArea)) {
      errorArray.push({
        field: 'totalArea',
        error: 90030,
        message: 'Please provide only valid \'totalArea\' as numeric.'
      })
    }
    validatedConditions.totalArea = query.totalArea
  }

  // AreaUnit is Not required,if given then validating it as not empty, valid String and length range.
  if (query.hasOwnProperty('areaUnit') && !_.isEmpty(query.areaUnit)) {
    // Validating as not empty, valid String and length range.
    if (!_.isString(query.areaUnit) || query.areaUnit.length < 3 || query.areaUnit.length > 150) {
      errorArray.push({
        field: 'areaUnit',
        error: 90075,
        message: '\'areaUnit\' is required as string, length must be between 3 and 150.'
      })
    }
    validatedConditions.areaUnit = query.areaUnit
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

  // isApproved is an optional string property, if it is given than validate it.
  if (query.hasOwnProperty('isApproved')) {
    // Validating as not empty, valid String and length range.
    if (query.isApproved !== true && query.isApproved !== false && query.isApproved !== 'true' && query.isApproved !== 'false') {
      errorArray.push({
        field: 'isApproved',
        error: 90332,
        message: 'Please provide only valid \'isApproved\' as string, length must be between 2 and 10.'
      })
    }
    validatedConditions.isApproved = query.isApproved
  }

  // maxprice is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('maxprice') && query.maxprice && query.maxprice !== ` `) {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'property.middleware.validateGetPropertiesListing')
  }

  if (query.limit && query.limit > 0) {
    limit = query.limit
  }

  if (query.offset && query.offset > 0) {
    offset = query.offset
  }

  // validatedConditions.purpose = validatedConditions.hasOwnProperty('purpose') ? validatedConditions.purpose : true
  // validatedConditions.status = query.hasOwnProperty('status') ? query.status : 'active'
  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

// *********************
// To Add New Property
// *********************

const validateAddProperty = (req, res, done) => {
  const body = req.body
  const validatedBody = {}
  const validateContactInfo = {}

  // get all the errors in an array
  const errorArray = []
  if (req.user.public) {
    validatedBody.UserId = req.user.id
  } else {
    // UserId is required, validating as not empty, valid numeric value with range.
    if (!body.UserId || isNaN(body.UserId) || body.UserId < 1 || body.UserId > 99999999999) {
      errorArray.push({
        field: 'UserId',
        error: 5001,
        message: '\'UserId\' is required as numeric, range must be between 1 and 99999999999.'
      })
    }
    validatedBody.UserId = body.UserId
  }

  // Validate CurrencyId

  if (!body.CurrencyId || isNaN(body.CurrencyId)) {
    errorArray.push({
      field: 'CurrencyId',
      error: 90282,
      message: '\'CurrencyId\' is required as Number.'
    })
  }
  validatedBody.CurrencyId = body.CurrencyId

  // Amenities is Optional, if given then validating it as not empty, valid Array and length range.
  if (body.hasOwnProperty('amenities') && !_.isArray(body.amenities) && body.amenities !== '') {
    let obj = body.amenities
    let amenities = JSON.parse(obj)
    validatedBody.amenities = []
    for (var i = 0; i < amenities.length; i++) {
      const amenity = amenities[i]
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
      validatedBody.amenities.push({
        AmenityPropertyId: amenity.amenityPropertyId,
        value: amenity.value
      })
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
    validatedBody.expiry = body.expiry
  }

  // email is an required  Validating as not empty, valid String and length range.
  if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 100) {
    errorArray.push({
      field: 'title',
      error: 90070,
      message: 'Please provide only valid \'title\' as string, length must be between 2 and 100.'
    })
  }

  // listingType is required, validating as not empty, valid numeric value with range.
  if (!body.listingType || isNaN(body.listingType)) {
    errorArray.push({
      field: 'listingType',
      error: 90071,
      message: '\'listingType\' is required as numeric.'
    })
  }

  // purpose is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('purpose')) {
    // Validating as not empty, valid string and length range.
    if ((body.purpose !== 'rent' && body.purpose !== 'sale')) {
      errorArray.push({
        field: 'purpose ',
        error: 90140,
        message: 'Please provide only valid \'purpose \' as String.'
      })
    }
    validatedBody.purpose = body.purpose != 'rent'
  }

  // price is required, validating as not empty, valid numeric value with range.
  if (!body.price || isNaN(body.price)) {
    errorArray.push({
      field: 'price',
      error: 90170,
      message: '\'price\' is required as numeric.'
    })
  }

  validatedBody.ListingTypeId = body.listingType
  validatedBody.price = body.price

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
    if (body.isActive != 'Yes' && body.isActive != 'No') {
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
    // thumbnailIndex is  required, validating as not empty, valid numeric value.
    if (!body.thumbnail) {
      errorArray.push({
        field: 'thumbnailIndex',
        error: 90171,
        message: '\'thumbnailIndex\' is required as valid Object.'
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

  // isVerified is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isVerified')) {
    // Validating as not empty, valid String and length range.
    if (body.isVerified !== true && body.isVerified !== false && body.isVerified != 'true' && body.isVerified != 'false') {
      errorArray.push({
        field: 'isVerified ',
        error: 90190,
        message: 'Please provide only valid \'isVerified \' as boolean.'
      })
    }
    validatedBody.isVerified = body.isVerified
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

  // CompanyId is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('CompanyId') && body.CompanyId) {
    if (isNaN(body.CompanyId)) {
      errorArray.push({
        field: 'CompanyId',
        error: 90230,
        message: '\'CompanyId\' is required as Number.'
      })
    }
    validatedBody.CompanyId = body.CompanyId
  }

  body.CategoryIds = body.CategoryIds ? body.CategoryIds.split(',') : []

  // // ProjectId is not required, validating it as not empty, valid String and length range.
  if (body.ProjectId && body.ProjectId != 'undefined') {
    validatedBody.LaunchingId = body.ProjectId
  } else {
    validatedBody.LaunchingId = null
  }

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
  if (body.hasOwnProperty('ContactId') && body.ContactId && body.ContactId != 'null') {
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
    if (body.hasOwnProperty('email') && body.email && body.email != 'null') {
      if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
        errorArray.push({
          field: 'email',
          error: 90320,
          message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
        })
      }
      validateContactInfo.email = body.email
    }

    // fax is not required, validating it as not empty, valid String and length range.
    if (body.hasOwnProperty('fax') && body.fax && body.fax != 'null') {
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
    validateContactInfo.UserId = body.UserId
  }

  // Validating as not empty, valid String.
  if (body.multipleUnits != 'Yes' && body.multipleUnits != 'No') {
    errorArray.push({
      field: 'multipleUnits',
      error: 90190,
      message: 'Please provide only valid \'multipleUnits \' as String Yes and No.'
    })
  }
  validatedBody.multipleUnits = body.multipleUnits

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'property.middleware.validateAddProperty')
  }

  let slug = body.title.replace(/ /g, '-')
  validatedBody.title = body.title
  validatedBody.isApproved = false
  validatedBody.areaUnit = body.areaUnit
  validatedBody.area = body.area
  validatedBody.currency = body.currency
  validatedBody.slug = slug
  validatedBody.description = body.description
  validatedBody.AreaId = body.AreaId
  validatedBody.CategoryIds = body.CategoryIds
  validatedBody.AreaIds = body.AreaIds
  validatedBody.CompanyId = body.hasOwnProperty('Company') ? body.CompanyId : null
  validatedBody.LaunchingId = body.hasOwnProperty('ProjectId') ? body.LaunchingId : null
  validatedBody.contactInformation = validateContactInfo

  req.body = validatedBody

  done()
}

// ***********************************
// To Get All Details Against Given Id
// ***********************************

const validateGetProperties = (req, res, done) => {
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
    return generalMiddleware.standardErrorResponse(res, errorArray, 'property.middleware.validateGetProperties')
  }
  validatedConditions.id = params.id
  req.conditions = validatedConditions
  done()
}

// ***********************************
// To Get 6 Related Records
// ***********************************

const validateGetRelatedProperties = (req, res, done) => {
  const errorArray = []
  const params = req.params
  const validatedConditions = {}

  // Validating id as Required, not empty, valid numeric value with range.
  if (!params.propertyId || isNaN(params.propertyId)) {
    errorArray.push({
      field: 'propertyId',
      error: 90341,
      message: 'Please provide only valid \'id\' as numeric.'
    })
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'property.middleware.validateGetRelatedProperties')
  }
  validatedConditions.propertyId = params.propertyId
  req.conditions = validatedConditions
  done()
}

// ****************************
// To Update Existing Property
// ****************************

const validateUpdateProperty = (req, res, done) => {
  let body = req.body
  const validatedBody = {}
  const validateContactInfo = {}
  const validatedProperty = {}
  const id = req.params.id
  // get all the errors in an array
  const errorArray = []

  // isApproved is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isApproved')) {
    // Validating as not empty, valid String and length range.
    if (body.isApproved !== true && body.isApproved !== false && body.isApproved != 'true' && body.isApproved != 'false') {
      errorArray.push({
        field: 'isApproved ',
        error: 90130,
        message: 'Please provide only valid \'isApproved \' as boolean.'
      })
    }
    validatedProperty.isApproved = body.isApproved
  }

  // Validate CurrencyId
  if (body.hasOwnProperty('CurrencyId') && body.CurrencyId && body.CurrencyId != 'null') {
    if (!body.CurrencyId || isNaN(body.CurrencyId)) {
      errorArray.push({
        field: 'CurrencyId',
        error: 90282,
        message: '\'CurrencyId\' is required as Number.'
      })
    }
    validatedProperty.CurrencyId = body.CurrencyId
  }
  // expiry is not required, validating it as not empty, valid String and length range.
  if (body.hasOwnProperty('expiry')) {
    if (_.isEmpty(body.expiry) || body.expiry === '') {
      errorArray.push({
        field: 'expiry',
        error: 90220,
        message: '\'expiry\' is required as expiry .'
      })
    }
    validatedProperty.expiry = body.expiry
  }

  if (body.ProjectId && body.ProjectId != 'undefined') {
    validatedProperty.LaunchingId = body.ProjectId
  } else {
    validatedProperty.LaunchingId = null
  }
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

  try {
    body.property = body.property ? JSON.parse(req.body.property) : {}
  } catch (error) {
    body.property = {}
  }

  if (body.hasOwnProperty('title') && body.title && body.title != 'null') {
    // title is an required  Validating as not empty, valid String and length range.
    if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 100) {
      errorArray.push({
        field: 'title',
        error: 90070,
        message: 'Please provide only valid \'title\' as string, length must be between 2 and 100.'
      })
    }
    validatedProperty.title = body.title
  }
  if (body.hasOwnProperty('listingType') && body.listingType && body.listingType != 'null') {
    // listingType is required, validating as not empty, valid numeric value with range.
    if (!body.listingType || isNaN(body.listingType)) {
      errorArray.push({
        field: 'listingType',
        error: 90071,
        message: '\'listingType\' is required as numeric.'
      })
    }
    validatedProperty.listingType = body.listingType
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
    validatedProperty.titleL1 = body.titleL1
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
    validatedProperty.shortDescription = body.shortDescription
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
    validatedProperty.shortDescriptionL1 = body.shortDescriptionL1
  }

  if (body.hasOwnProperty('thumbnail') && body.thumbnail && body.thumbnail !== `undefined`) {
    // thumbnailIndex is  required, validating as not empty, valid numeric value.
    if (!body.thumbnail) {
      errorArray.push({
        field: 'thumbnailIndex',
        error: 90171,
        message: '\'thumbnailIndex\' is required as valid Object.'
      })
    }
    validatedProperty.thumbnailObject = body.thumbnail
  }

  // multipleUnits is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('multipleUnits') && body.multipleUnits) {
    // Validating as not empty, valid String.
    if (body.multipleUnits != 'Yes' && body.multipleUnits != 'No') {
      errorArray.push({
        field: 'multipleUnits',
        error: 90190,
        message: 'Please provide only valid \'multipleUnits \' as String Yes and No.'
      })
    }
    validatedBody.multipleUnits = body.multipleUnits
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
    validatedProperty.description = body.description
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
    validatedProperty.descriptionL1 = body.descriptionL1
  }

  // lat is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('lat') && body.lat !== '') {
    // Validating as not empty, valid String and length range.
    if (body.lat.length > 45) {
      errorArray.push({
        field: 'lat',
        error: 90110,
        message: '\'lat\' is required as string, length must be 11.'
      })
    }
    validatedProperty.lat = body.lat
  }

  // lng is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('lng') && body.lng !== '') {
    // Validating as not empty, valid String and length range.
    if (body.lng.length > 45) {
      errorArray.push({
        field: 'lng',
        error: 90120,
        message: '\'lng\' is required as string, length must be 11.'
      })
    }
    validatedProperty.lng = body.lng
  }

  // isActive is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isActive')) {
    // Validating as not empty, valid String and length range.
    if (body.isActive != 'Yes' && body.isActive != 'No') {
      errorArray.push({
        field: 'isActive ',
        error: 90130,
        message: 'Please provide only valid \'isActive \' as boolean.'
      })
    }
    validatedProperty.isActive = body.isActive
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
    validatedProperty.address = body.address
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
    validatedProperty.addressL1 = body.addressL1
  }

  // purpose is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('purpose')) {
    // Validating as not empty, valid string and length range.
    if ((body.purpose !== 'rent' && body.purpose !== 'sale')) {
      errorArray.push({
        field: 'purpose ',
        error: 90140,
        message: 'Please provide only valid \'purpose \' as String.'
      })
    }
    validatedProperty.purpose = body.purpose != 'rent'
  }

  if (body.hasOwnProperty('price')) {
    // price is required, validating as not empty, valid numeric value with range.
    if (!body.price || isNaN(body.price)) {
      errorArray.push({
        field: 'price',
        error: 90170,
        message: '\'price\' is required as numeric.'
      })
    }
    validatedProperty.price = body.price
  }

  if (body.hasOwnProperty('currency')) {
    // currency is required, validating it as not empty.
    if (_.isEmpty(body.currency) || !_.isString(body.currency) || body.currency.length > 10) {
      errorArray.push({
        field: 'currency',
        error: 90180,
        message: '\'currency\' is Optional and must be String '
      })
    }
    validatedProperty.currency = body.currency
  }
  // isVerified is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('isVerified')) {
    // Validating as not empty, valid String and length range.
    if (body.isVerified !== true && body.isVerified !== false && body.isVerified != 'true' && body.isVerified != 'false') {
      errorArray.push({
        field: 'isVerified ',
        error: 90190,
        message: 'Please provide only valid \'isVerified \' as boolean.'
      })
    }
    validatedProperty.isVerified = body.isVerified
  }

  // area is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('area')) {
    // area is required, validating as not empty, valid numeric value with range.
    if (!body.area || isNaN(body.area)) {
      errorArray.push({
        field: 'area',
        error: 90200,
        message: '\'area\' is required as numeric.'
      })
    }
    validatedProperty.area = body.area
  }

  // areaUnit is an optional string property, if it is given than validate it.
  if (body.hasOwnProperty('areaUnit')) {
    // areaUnit is required, validating it as not empty.
    if (_.isEmpty(body.areaUnit) || !_.isString(body.areaUnit) || body.areaUnit.length > 20) {
      errorArray.push({
        field: 'areaUnit',
        error: 90210,
        message: '\'areaUnit\' is required and it must be string length less then 10 '
      })
    }
    validatedProperty.areaUnit = body.areaUnit
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
    validatedProperty.CompanyId = body.CompanyId
  }

  // isApproved is required Boolean property, if it is given than validate it.
  // if (!body.isApproved || (body.isApproved !== true && body.isApproved !== false)) {
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
  if (body.hasOwnProperty('ContactId') && body.ContactId && body.ContactId != 'null') {
    if (isNaN(body.ContactId)) {
      errorArray.push({
        field: 'ContactId',
        error: 90280,
        message: '\'ContactId\' is required as Number.'
      })
    }
    validateContactInfo.ContactId = body.ContactId
  } else {
    // Validate Contact Information
    if (body.hasOwnProperty('name') && body.name && body.name != 'null') {
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

    if (body.hasOwnProperty('phone') && body.phone && body.phone != 'null') {
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

    // email is an optional  Validating as not empty, valid String and length range.
    if (body.hasOwnProperty('email') && body.email && body.email != 'null') {
      if (!_.isString(body.email) || body.email.length < 5 || body.email.length > 100 || !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email))) {
        errorArray.push({
          field: 'email',
          error: 90320,
          message: 'Please provide only valid \'email\' as string, length must be between 5 and 100.'
        })
      }
      validateContactInfo.email = body.email
    }

    // fax is not required, validating it as not empty, valid String and length range.
    if (body.hasOwnProperty('fax') && body.fax && body.fax != 'null') {
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

  // send array if error(s)
  if (errorArray.length) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'property.middleware.validateUpdateProperty')
  }
  validatedProperty.CompanyId = null
  validatedProperty.LaunchingId = body.hasOwnProperty('ProjectId') ? body.LaunchingId : null
  validatedBody.property = validatedProperty
  validatedBody.contactInformation = validateContactInfo

  req.body = {
    data: validatedBody,
    id: id
  }

  done()
}

module.exports = {
  validateGetRelatedProperties,
  validateGetPropertiesListing,
  validateAddProperty,
  validateGetProperties,
  validateUpdateProperty
}
