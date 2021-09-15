'use strict'
const db = require('../config/sequelize.config')
const generalHelpingMethods = require('./general.helper')

// *****************************
// getRoleDetails against Id
// *****************************

function getRoleDetails (conditions) {
  conditions.isDeleted = false
  // conditions.isActive = true
  return db.Role.findOne({
    where: conditions,
    include: [
      {
        model: db.ModuleAction,
        as: 'relatedRole',
        required: false,
        // where: {RoleId: conditions.id},
        attributes: ['id', 'ModuleId', 'ActionId'],
        through: {
          attributes: ['ModuleActionId']
        },
        include: [ {
          model: db.Action
        }]
      }
    ]
  }).then((response) => {
    if (!response) {
      return {}
    }
    response = JSON.parse(JSON.stringify(response))
    // console.log(response.relatedRole)
    let RoleActionIds = []
    let data = response.relatedRole
    for (let i = 0; i < data.length; i++) {
      let temp = data[i].RolePermission.ModuleActionId
      RoleActionIds.push(temp)
    }
    response['ModuleActionId'] = RoleActionIds
    return response
  })
    .catch(generalHelpingMethods.catchException)
}

// *****************************
// Get All Role
// *****************************

function getRoles (conditions) {
  conditions.isDeleted = false
  // conditions.isActive = true
  return db.Role.findAll({
    where: conditions,
    order: [
      ['isCompany', 'ASC']
    ]
  })
    .catch(generalHelpingMethods.catchException)
}

// ****************
// Add Role
// ****************

function addRole (data, moduleActionIds, UserId) {
  // Find role, if it is already exists or not
  return db.Role.findOne({ where: {
    title: data.title,
    isDeleted: false
  } })
    .then(role => {
      if (role) {
        // Role already found against same company
        // Return with error of role already exists
        return generalHelpingMethods.rejectPromise([{
          field: 'title',
          error: 5507,
          message: 'Role with same title already exists.'
        }])
      }

      // Create new role
      return db.Role.create(data)
    })
    .then(createdRole => {
      // return created role
      if (createdRole) {
        // add areas
        const roles = []
        for (let i = 0; i < moduleActionIds.length; i++) {
          roles.push({
            RoleId: createdRole.id,
            ModuleActionId: moduleActionIds[i]
          })
        }
        db.RolePermission.bulkCreate(roles)

        return data
      }
    })
    .catch(generalHelpingMethods.catchException)
}

// **************
// update Role
// **************

function updateRole (role, moduleActionIds, id) {
  return db.Role.findOne({
    id: id,
    isDeleted: false
  })
    .then((dbRole) => {
      if (!dbRole) {
        // No role found to update, return error.
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 5548,
          message: 'No role found to update.'
        }])
      }

      if (moduleActionIds) {
        db.RolePermission.destroy({ where: { RoleId: id } })
          .then(() => {
            // add permissions
            const roles = []
            for (let i = 0; i < moduleActionIds.length; i++) {
              roles.push({
                RoleId: id,
                ModuleActionId: moduleActionIds[i]
              })
            }
            db.RolePermission.bulkCreate(roles)
          })
      }

      if (role) {
        return db.Role.update(role, { returning: true, where: { id: id } })
      }

      return dbRole
    })
    .catch(generalHelpingMethods.catchException)
}

// ***************
// Delete Role
// ***************

function deleteRole (userId, roleId) {
  const id = roleId.id
  return db.User.findOne({ where: {
    id: userId,
    isDeleted: false
  } })
    .then(user => {
      // Check user enter a valid password or not
      if (!user) {
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 5553,
          message: 'Invalid password.'
        }])
      }

      // Assign companyId
      // userCompanyId have value only if logged in user is employee,
      // otherwise it will be null or undefined and the logged in user will be an admin
      // const companyId = userCompanyId || userId

      // Find role
      return db.Role.findOne({ where: {
        id: id,
        isDeleted: false
      } })
    })
    .then(role => {
      if (!role) {
        // No role found to delete, return error.
        return generalHelpingMethods.rejectPromise([{
          field: '',
          error: 5546,
          message: 'No role found to delete.'
        }])
      }

      // Role found, update role isDelete to true and save.
      role.isDeleted = true
      role.save()

      // Return role
      return role
    })
    .catch(generalHelpingMethods.catchException)
}

module.exports = {
  addRole,
  getRoles,
  updateRole,
  deleteRole,
  getRoleDetails
}
