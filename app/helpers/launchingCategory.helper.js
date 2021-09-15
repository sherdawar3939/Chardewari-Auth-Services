'use strict'
const db = require('../config/sequelize.config')

// *******************************
// To Get launching Category
// *******************************

function getLaunchingCategory (conditions) {
  // Check if Category exist in conditions
  return db.LaunchingCategory.findAll({
    where: conditions
  })
}

module.exports = {
  getLaunchingCategory
}
