'use strict'

module.exports = function (sequelize, DataTypes) {
  let PageMeta = sequelize.define('PageMeta', {
    title: {
      type: DataTypes.STRING(100),
      require: true
    },
    pageTitle: {
      type: DataTypes.STRING(100),
      require: true
    },
    pageIdentifier: {
      type: DataTypes.STRING(30),
      require: true
    },
    tags: {
      type: DataTypes.TEXT,
      require: true
    }
  })
  return PageMeta
}
