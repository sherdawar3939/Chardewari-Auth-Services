'use strict'

module.exports = function (sequelize, DataTypes) {
  let companyOfficeArea = sequelize.define('CompanyOfficeArea', {
    CompanyOfficeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'CompanyOffice',
        key: 'id'
      }
    },
    AreaId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Area',
        key: 'id'
      }
    }
  })
  return companyOfficeArea
}
