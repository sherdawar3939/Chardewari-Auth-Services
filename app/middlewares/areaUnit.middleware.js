'use strict'
const generalMiddleware = require('./general.middleware')
const _ = require('lodash')

const validateGetAllUnits = (req, res, done) => {
  const errorArray = []
  const query = req.query
  const validatedConditions = {}

  if (!_.isEmpty(errorArray)) {
    return generalMiddleware.standardErrorResponse(res, errorArray, 'area.middleware.validateGetAllUnits')
  }

  req.conditions = validatedConditions
  done()
}

module.exports = {
  validateGetAllUnits
}
