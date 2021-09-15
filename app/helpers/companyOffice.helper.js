'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('./general.helper')

// ***************************
// To Add New Company Office
// ***************************

function addCompanyOffice(data) {
    console.log(data);
    return db.CompanyOffice.findOne({ where: { UserId: data.UserId } })
        .then(office => {
            if (office) {
                return db.CompanyOffice.update(data, { where: { UserId: data.UserId } })
            }
            return db.CompanyOffice.create(data)
        })
}

// ********************
// Get CompanyOffice
// ********************

function getCompanyOffice(conditions) {
    return db.CompanyOffice.findAll({
        where: conditions
    })
}

// ********************
// Delete CompanyOffice
// ********************

const deleteCompanyOffice = (input) => {
    return db.CompanyOffice.findOne({
            where: {
                id: input.id,
                isDeleted: false
            }
        })
        .then((result) => {
            if (_.isEmpty(result)) {
                // CompanyOffice not found, return error
                return generalHelpingMethods.rejectPromise([{
                    field: 'id',
                    error: 80730,
                    message: 'No Information found against given id.'
                }])
            }
            // CompanyOffice found, change value of isDeleted to true
            result.isDeleted = true
                // save CompanyOffice
            result.save()
            return true
        })
}

module.exports = {
    addCompanyOffice,
    getCompanyOffice,
    deleteCompanyOffice
}