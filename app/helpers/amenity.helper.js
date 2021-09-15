'use strict'

const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')
const Op = require('sequelize').Op

// ************************
// To Get Amenity Category
// ************************

function getCategoryAmenities (conditions) {
  let amenityIds = []
  // Check if Category exist in conditions
  return db.CategoryAmenity.findAll({
    where: {
      CategoryId: conditions
    },
    group: ['AmenityId']
  })
    .then(async (result) => {
      if (!result || !result.length) {
        return result
      }
      for (let i = 0; i < result.length; i++) {
        const element = result[i]
        amenityIds.push(element.AmenityId)
      }

      return db.Amenities.findAll({
        where: {
          id: amenityIds
        },
        include: [{
          model: db.AmenityProperty,
          as: 'amenity'
        }],
        order: [
          ['orderSequence'],
          [{ model: db.AmenityProperty, as: 'amenity' }, 'format', 'DESC']
        ]
      })
    })
}

// ************************
// To Get Launching Amenity Category
// ************************

function getLaunchingCategoryAmenities (conditions) {
  let amenityIds = []
  // Check if Category exist in conditions
  return db.LaunchingCategoryAmenity.findAll({
    where: {
      CategoryId: conditions
    },
    group: ['AmenityId']
  })
    .then(async (result) => {
      if (!result || !result.length) {
        return result
      }
      for (let i = 0; i < result.length; i++) {
        const element = result[i]
        amenityIds.push(element.AmenityId)
      }

      return db.Amenities.findAll({
        where: {
          id: amenityIds
        },
        include: [{
          model: db.AmenityProperty,
          as: 'amenity',
          order: [
            [db.AmenityProperty, 'format', 'asc']
          ]
        }]
      })
    })
}

// ************************
// To Get Amenities
// ************************

function getAmenities (conditions) {
  // Check if Amenities exist in conditions
  return db.Amenities.findAll({
    where: conditions
  })
}

// ************************
// To Get Amenities Properties
// ************************

function getAmenityProperties (conditions) {
  // Check if Amenities exist in conditions
  return db.AmenityProperty.findAll({
    where: conditions
  })
}

// ************************
// To Get Amenities
// ************************

function getCategoryAmenity (conditions) {
  console.log(conditions)
  // Check if Amenities exist in conditions
  return db.CategoryAmenity.findAll({
    where: conditions
    // attributes: ['CategoryId']
  })
}

// ******************
// To Delete Amenities
// ******************

function deleteAmenities (conditions) {
  // Check if Area exist in conditions
  return db.Amenities.findOne({
    where: { id: conditions.id }
  })
    .then((response) => {
      if (!response) {
        // Amenities Not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'slug',
          error: 1574,
          message: 'Amenity Not Found.'
        }])
      }
      return db.Amenities.destroy({
        where: { id: conditions.id }
      })
    })
}

// ***************
// To addAmenity
// ***************

function addAmenity (data) {
  // Check if Amenities exist in data
  return db.Amenities.findAll({
    where: { title: data.title }
  })
    .then((response) => {
      if (response.length) {
        // Amenities title found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'title Already Exist.'
        }])
      }
      return db.Amenities.create(data)
    })
    .then((createdAmenity) => {
      // add categories
      const CategoryIds = data.categoryIds
      const propertyCategories = []
      for (let i = 0; i < CategoryIds.length; i++) {
        propertyCategories.push({
          AmenityId: createdAmenity.id,
          CategoryId: CategoryIds[i]
        })
      }
      db.CategoryAmenity.bulkCreate(propertyCategories)
      for (let j = 0; j < data.amenityProperties.length; j++) {
        data.amenityProperties[j].AmenityId = createdAmenity.id
      }

      db.AmenityProperty.bulkCreate(data.amenityProperties)
      return createdAmenity
    })
}

// ******************
// To updateAmenity
// ******************

function updateAmenity (data, id) {
  // Check if Amenities exist in data
  return db.Amenities.findAll({
    where: {
      id: {
        [Op.ne]: id.id
      },
      title: data.title
    }
  })
    .then((response) => {
      if (response.length) {
        // Amenities title found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1572,
          message: 'title Already Exist.'
        }])
      }
      db.Amenities.update(data, { where: { id: id.id } })
        .then((createdAmenity) => {
          db.CategoryAmenity.destroy({ where: { AmenityId: id.id } })
        })
        .then((response) => {
          // add categories
          const CategoryIds = data.categoryIds
          const propertyCategories = []
          for (let i = 0; i < CategoryIds.length; i++) {
            propertyCategories.push({
              AmenityId: id.id,
              CategoryId: CategoryIds[i]
            })
          }
          db.CategoryAmenity.bulkCreate(propertyCategories)
          // if Amenities Given
          if (data.amenityProperties.length) {
            // to insert AmenityId into Array Of Objects
            for (let j = 0; j < data.amenityProperties.length; j++) {
              data.amenityProperties[j].AmenityId = id.id
            }
            // if id given then update else create new record
            for (let i = 0; i < data.amenityProperties.length; i++) {
              let objData = data.amenityProperties[i]
              if (objData.id) {
                db.AmenityProperty.update(objData, { where: { id: objData.id } })
              } else {
                db.AmenityProperty.create(objData)
              }
            }
            if (data.deletedAmenityProperties.length) {
              db.AmenityProperty.destroy({ where: { id: data.deletedAmenityProperties } })
            }
          }
        })
    })
}

module.exports = {
  getAmenityProperties,
  updateAmenity,
  addAmenity,
  deleteAmenities,
  getAmenities,
  getCategoryAmenities,
  getCategoryAmenity,
  getLaunchingCategoryAmenities
}
