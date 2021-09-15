'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

// launchingCategory Middleware
const validateGetLaunchingCategory = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  // id is an optional numeric property, if it is given than validate it.
  if (query.hasOwnProperty('ParentCategoryId')) {
    if (query.ParentCategoryId !== 'null') {
      // Validating as not empty, valid numeric value with range.
      if (query.ParentCategoryId != null && (!query.ParentCategoryId || isNaN(query.ParentCategoryId))) {
        errorArray.push({
          field: 'id',
          error: 50500,
          message: 'Please provide only valid \'id\' as numeric.'
        })
      }
    }
    validatedConditions.ParentCategoryId = query.ParentCategoryId === 'null' ? null : query.ParentCategoryId
  }

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'launchingCategory.middleware.validateGetLaunchingCategory')
  }

  req.conditions = validatedConditions

  done()
}

module.exports = {
  validateGetLaunchingCategory
}
