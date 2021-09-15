'use strict'

const db = require('../config/sequelize.config')
const _ = require('lodash')
const generalHelpingMethods = require('../helpers/general.helper')

// ***************************
// To Add New Product Category
// ***************************

function addProductCategory (data) {
  if (data.productCategory) {
    data.level = 3
    data.ParentCategoryId = data.productCategory
  } else if (data.productType) {
    data.level = 2
    data.ParentCategoryId = data.productType
  } else {
    data.level = 1
    data.ParentCategoryId = null
  }

  return db.ProductCategory.create(data)
    .then((category) => {
      category.slug = category.title + category.id
      category.save()
    })
}

// ********************
// Get Product Category
// ********************

function getProductCategory (conditions) {
  // Check if ProductCategory exist in conditions
  return db.ProductCategory.findAll({
    where: conditions,
    attributes: ['id', 'title', 'level', 'slug']
  })
}
// ****************************
// Update ProductCategory Info
// ****************************

function updateProductCategory (data, categoryId) {
  if (data.productCategory) {
    data.level = 3
    data.ParentCategoryId = data.productCategory
  } else if (data.productType) {
    data.level = 2
    data.ParentCategoryId = data.productType
  } else {
    data.level = 1
    data.ParentCategoryId = null
  }

  return db.ProductCategory.findOne({ where: { id: categoryId } })
    .then(ProductCategory => {
      if (!ProductCategory) {
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // if Category Found
      return db.ProductCategory.update(data, { where: { id: categoryId } })
    })
}
// ************************
// Delete product Category
// ************************

const deleteProductCategory = (input) => {
  return db.ProductCategory.findOne({
    where: {
      id: input.id,
      isDeleted: false
    }
  })
    .then((result) => {
      if (_.isEmpty(result)) {
        // Employee not found, return error
        return generalHelpingMethods.rejectPromise([{
          field: 'id',
          error: 1575,
          message: 'No Information found against given id.'
        }])
      }
      // employee found, change value of isDeleted to true
      result.isDeleted = true
      // save employee
      result.save()
      return true
    })
}
// *******************************
// To Get Product Category By Id
// *******************************

function getProductCategoriesById (conditions) {
  // Check if Category exist in conditions
  return db.ProductCategory.findOne({
    where: { id: conditions.id },
    raw: true
  })
    .then(async (resp) => {
      if (resp.level === 3) {
        await db.ProductCategory.findOne({
          where: { id: resp.ParentCategoryId },
          raw: true
        }).then(async (respData) => {
          resp.levelTwoData = respData
          await db.ProductCategory.findOne({
            where: { id: respData.ParentCategoryId },
            raw: true
          }).then(async (responseData) => {
            resp.levelOneData = await responseData
          })
        })
      } else if (resp.level === 2) {
        await db.ProductCategory.findOne({
          where: { id: resp.ParentCategoryId },
          raw: true
        }).then(async (responseData) => {
          resp.levelOneData = await responseData
        })
      }
      return resp
    })
}

module.exports = {
  addProductCategory,
  getProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategoriesById
}
