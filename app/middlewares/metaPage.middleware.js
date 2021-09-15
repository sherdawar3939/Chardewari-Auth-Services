'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// **********************************
// Get MetaPage Middleware
// **********************************

const validateGetMetaPage = (req, res, done) => {
  const errorArray = []
  const query = req.query
  console.log(query.id)
  let limit = 50
  let offset = 0
  const validatedConditions = {}

  // id is optional
  if (query.hasOwnProperty('id')) {
    if (!query.id || isNaN(query.id)) {
      errorArray.push({
        field: 'id',
        error: 80710,
        message: 'Please provide only valid \'id\' as numeric.'
      })
    }
    validatedConditions.id = query.id
  }

  // pageIdentifier is optional
  if (query.hasOwnProperty('pageIdentifier')) {
    if (!query.pageIdentifier || _.isEmpty(query.pageIdentifier)) {
      errorArray.push({
        field: 'pageIdentifier',
        error: 80710,
        message: 'Please provide only valid \'pageIdentifier\' as String.'
      })
    }
    validatedConditions.pageIdentifier = query.pageIdentifier
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'metaPage.middleware.validateGetMetaPage')
  }

  req.conditions = validatedConditions
  req.limit = limit
  req.offset = offset
  done()
}

// **********************************
// Update Meta Page  Middleware
// **********************************

const validateUpdateMetaPage = (req, res, done) => {
  const errorArray = []
  const body = req.body
  const id = req.params
  const validatedConditions = {}
  if (body.hasOwnProperty('title')) {
  // title must be required required  Validating as not empty, valid String and length range.
    if (!_.isString(body.title) || body.title.length < 2 || body.title.length > 100) {
      errorArray.push({
        field: 'title',
        error: 80650,
        message: 'Please provide only valid \'title\' as string, length must be between 2 and 100.'
      })
    }
    validatedConditions.title = body.title
  }

  if (body.hasOwnProperty('pageTitle')) {
  // pageTitle is Required as String
    if (_.isEmpty(body.pageTitle) || !_.isString(body.pageTitle) || body.pageTitle.length > 100) {
      errorArray.push({
        field: 'pageTitle',
        error: 80660,
        message: '\'pageTitle\' is required as string, length must be between 2 and 100.'
      })
    }
    validatedConditions.pageTitle = body.pageTitle
  }

  if (body.hasOwnProperty('pageIdentifier')) {
  // pageIdentifier is Required as String
    if (_.isEmpty(body.pageIdentifier) || !_.isString(body.pageIdentifier) || body.pageIdentifier.length > 30) {
      errorArray.push({
        field: 'pageIdentifier',
        error: 80660,
        message: '\'pageIdentifier\' is required as string, length must be between 2 and 30.'
      })
    }
    validatedConditions.pageIdentifier = body.pageIdentifier
  }

  if (body.hasOwnProperty('tags')) {
    body.tags = JSON.stringify(body.tags)
    console.log(body.tags)
    // tags is Required as String
    if (_.isEmpty(body.tags)) {
      errorArray.push({
        field: 'tags',
        error: 80660,
        message: '\'tags\' is required as Array, length must be between 2 and 30.'
      })
    }
    validatedConditions.tags = body.tags
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'metaPage.middleware.validateUpdateMetaPage')
  }

  req.conditions = validatedConditions
  req.id = id
  done()
}

module.exports = {
  validateGetMetaPage,
  validateUpdateMetaPage
}
