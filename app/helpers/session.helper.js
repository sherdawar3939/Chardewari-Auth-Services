'use strict'
const db = require('../config/sequelize.config')
const _ = require('lodash')

// **********************
// To Generate Unique Id
// **********************

const generateUniqueKey = async (keyLength) => {
  let uId
  let date = new Date()
  uId = date.getFullYear().toString().substr(2, 2) + date.getMonth().toString() + date.getDate().toString()
  let key = Math.floor(Math.pow(10, keyLength - 1) + Math.random() * (Math.pow(10, keyLength) - Math.pow(10, keyLength - 1) - 1)).toString()
  uId = uId + key

  await db.Session.findAll({
    where: { identifier: uId }
  })
    .then((result) => {
      if (!_.isEmpty(result)) {
        return generateUniqueKey(keyLength)
      }
    })
  return uId
}

// *******************************
// To Get Unique Id
// *******************************

async function getUniqueId (conditions) {
  // generate uid
  let uId = await generateUniqueKey(9)
  return uId
}

module.exports = {
  getUniqueId
}
