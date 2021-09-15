'use strict'

module.exports = function (sequelize, DataTypes) {
  let PropertyMeta = sequelize.define('PropertyMeta', {
    key: {
      type: DataTypes.STRING(100),
      require: true
    },
    value: {
      type: DataTypes.TEXT,
      require: true
    }
  },
  {
    associate: function (models) {
      PropertyMeta.belongsTo(models.Property, { foreignKey: 'PropertyId', as: 'relatedPropertyMeta' })
    }
  })
  return PropertyMeta
}
