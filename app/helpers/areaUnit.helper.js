'use strict'
const db = require('../config/sequelize.config')

function getAllUnits (conditions) {
  // Check if Area exist in conditions
  return db.AreaUnit.findAll({
    where: conditions
  })
}

module.exports = {
  getAllUnits
}
