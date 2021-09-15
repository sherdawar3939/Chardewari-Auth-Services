'use strict'

module.exports = function (sequelize, DataTypes) {
  let launchingContacts = sequelize.define('LaunchingContact', {
    LaunchingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Launching',
        key: 'id'
      }
    },
    ContactId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ContactInformation',
        key: 'id' }
    }
  })
  return launchingContacts
}
