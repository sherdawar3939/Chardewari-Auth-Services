'use strict'
const faker = require('faker')

module.exports = async function dbseed (db, sequelize) {
  // Inserting predefined data
  await db.Role.create({
    id: 1,
    title: 'SuperAdmin',
    description: 'System generated SuperAdmin',
    isCompany: false,
    isActive: true,
    isDeleted: false,
    isPublic: false
  })
    .then((role) => {
      let user = new db.User({
        name: 'Muhammad Fazeel',
        isVerified: 1,
        phone: '03001231234',
        language: 'eng',
        RoleId: role.id
      })

      user.salt = user.makeSalt()
      user.hashedPassword = user.encryptPassword('123456789', user.salt)
      user.save()
    })

  // Inserting Company Profile
  await db.CompanyProfile.create({
    name: 'Royal Real Estate',
    nameL1: 'Royal Real Estate',
    description: 'ASDFGH ASDFGH ASDFGHJ ASDFGHJ',
    phone: '03425495747',
    address: faker.address.streetAddress(),
    email: faker.internet.email(),
    UserId: 1,
    logo: 'https://image.shutterstock.com/z/stock-vector-website-icon-318872585.jpg'
  })
  // Faker
  const properties = []
  var purpose
  // for (let i = 1; i < 11; i++) {
  //   let title = faker.name.title()
  //   let slug = title.replace(/ /g, '-')
  //   slug = slug + '-' + i
  //   if (i < 5) {
  //     purpose = '1'
  //   } else {
  //     purpose = '0'
  //   }
  //   properties.push({
  //     title: title,
  //     titleL1: faker.name.title(),
  //     email: faker.internet.email(),
  //     shortDescription: faker.lorem.sentence(),
  //     shortDescriptionL1: faker.lorem.sentence(),
  //     description: faker.lorem.paragraph(),
  //     descriptionL1: faker.lorem.paragraph(),
  //     lat: faker.address.latitude(),
  //     lng: faker.address.longitude(),
  //     isActive: true,
  //     price: faker.commerce.price(),
  //     thumbnail: faker.image.imageUrl(),
  //     currency: 'PK',
  //     slug: slug,
  //     uid: 1,
  //     area: 20,
  //     areaUnit: 'Marla',
  //     address: faker.address.streetAddress(),
  //     location: faker.address.streetAddress(),
  //     ListingTypeId: 1,
  //     CompanyId: 1,
  //     purpose: purpose,
  //     minPrice: 120000,
  //     maxPrice: 500000,
  //     launchDate: Date.now(),
  //     UserId: 1,
  //     CreatedBy: 1
  //   })
  // }

  // Inserting area units
  db.AreaUnit.bulkCreate([{
    name: 'Marla',
    nameL1: 'Marla',
    code: 'Marla',
    codeL1: 'Marla'
  },
  {
    name: 'Kanal',
    nameL1: 'Kanal',
    code: 'Kanal',
    codeL1: 'Kanal'
  },
  {
    name: 'Square Feet',
    nameL1: 'Square Feet',
    code: 'Square Feet',
    codeL1: 'Square Feet'
  },
  {
    name: 'Square Yards',
    nameL1: 'Square Yards',
    code: 'Square Yards',
    codeL1: 'Square Yards'
  },
  {
    name: 'Square Meters',
    nameL1: 'Square Meters',
    code: 'Square Meters',
    codeL1: 'Square Meters'
  }])

  db.ListingType.bulkCreate([{
    title: 'Basic',
    description: 'System generated Basic type.',
    priority: '100',
    unitPrice: '0',
    isDeleted: false
  }])

  db.Role.bulkCreate([{
    title: 'Agency',
    description: 'System generated Agency role.',
    isCompany: false,
    isActive: true,
    isDeleted: false,
    isPublic: true
  }, {
    title: 'Owner',
    description: 'System generated owner role.',
    isCompany: false,
    isActive: true,
    isDeleted: false,
    isPublic: true
  },
  {
    title: 'Architect',
    description: 'System generated Architect role.',
    isActive: true,
    isDeleted: false,
    isPublic: true
  },
  {
    title: 'Builder',
    description: 'System generated Builder role.',
    isActive: true,
    isDeleted: false,
    isPublic: true
  },
  {
    title: 'Developer',
    description: 'System generated Developer role.',
    isActive: true,
    isDeleted: false,
    isPublic: true
  }
  ])

  // *********************
  // Module Names
  // *********************

  await db.Module.bulkCreate([{
    id: 1,
    title: 'Property',
    identifier: 'property'
  }, {
    id: 2,
    title: 'Sunday Friday Offer',
    identifier: 'sunday-friday-offer'
  },
  {
    id: 3,
    title: 'Projects',
    identifier: 'projects'
  },
  {
    id: 4,
    title: 'Launchings',
    identifier: 'launchings'
  },
  {
    id: 5,
    title: 'Company Profile',
    identifier: 'company-profile'
  },
  {
    id: 6,
    title: 'Banner',
    identifier: 'banner'
  },
  {
    id: 7,
    title: 'Top',
    identifier: 'top'
  },
  {
    id: 8,
    title: 'User',
    identifier: 'user'
  },
  {
    id: 9,
    title: 'Role',
    identifier: 'role'
  },
  {
    id: 10,
    title: 'Listing Type',
    identifier: 'listing-type'
  },
  {
    id: 11,
    title: 'Property Category',
    identifier: 'property-category'
  },
  {
    id: 12,
    title: 'PageMeta',
    identifier: 'PageMeta'
  },
  {
    id: 13,
    title: 'Area',
    identifier: 'Area'
  },
  {
    id: 14,
    title: 'Amenity',
    identifier: 'Amenity'
  },
  {
    id: 15,
    title: 'ContactInfo',
    identifier: 'ContactInfo'
  },
  {
    id: 16,
    title: 'Product',
    identifier: 'Product'
  },
  {
    id: 17,
    title: 'ProductUnit',
    identifier: 'ProductUnit'
  },
  {
    id: 18,
    title: 'Currency',
    identifier: 'Currency'
  },
  {
    id: 19,
    title: 'Product Category',
    identifier: 'Product Category'
  },
  {
    id: 20,
    title: 'Services',
    identifier: 'Services'
  },
  {
    id: 21,
    title: 'Package',
    identifier: 'Package'
  },
  {
    id: 22,
    title: 'Offers',
    identifier: 'Offers'
  },
  {
    id: 23,
    title: 'TopConfig',
    identifier: 'TopConfig'
  },
  {
    id: 24,
    title: 'Payment',
    identifier: 'Payment'
  },
  {
    id: 25,
    title: 'Purchase',
    identifier: 'Purchase'
  }
  ])

  // *********************
  // Actions
  // *********************

  await db.Action.bulkCreate([{
    id: 1,
    name: 'Create',
    identifier: 'create'
  }, {
    id: 2,
    name: 'Retrieve',
    identifier: 'retrieve'
  },
  {
    id: 3,
    name: 'Update',
    identifier: 'update'
  },
  {
    id: 4,
    name: 'Delete',
    identifier: 'delete'
  },
  {
    id: 5,
    name: 'Approve',
    identifier: 'approve'
  },
  {
    id: 6,
    name: 'Change Status',
    identifier: 'change-status'
  }
  ])

  const moduleActions = [{
    ModuleId: 1,
    ActionId: 1
  },
  {
    ModuleId: 1,
    ActionId: 2
  },
  {
    ModuleId: 1,
    ActionId: 3
  },
  {
    ModuleId: 1,
    ActionId: 4
  },
  {
    ModuleId: 1,
    ActionId: 5
  },
  {
    ModuleId: 2,
    ActionId: 1
  },
  {
    ModuleId: 2,
    ActionId: 2
  },
  {
    ModuleId: 2,
    ActionId: 5
  },
  {
    ModuleId: 2,
    ActionId: 6
  },
  {
    ModuleId: 3,
    ActionId: 1
  },
  {
    ModuleId: 3,
    ActionId: 2
  },
  {
    ModuleId: 3,
    ActionId: 3
  },
  {
    ModuleId: 4,
    ActionId: 1
  },
  {
    ModuleId: 4,
    ActionId: 2
  },
  {
    ModuleId: 4,
    ActionId: 3
  },
  {
    ModuleId: 5,
    ActionId: 1
  },
  {
    ModuleId: 6,
    ActionId: 1
  },
  {
    ModuleId: 6,
    ActionId: 2
  },
  {
    ModuleId: 6,
    ActionId: 6
  },
  {
    ModuleId: 7,
    ActionId: 1
  },
  {
    ModuleId: 7,
    ActionId: 2
  },
  {
    ModuleId: 7,
    ActionId: 3
  },
  {
    ModuleId: 7,
    ActionId: 4
  },
  {
    ModuleId: 7,
    ActionId: 5
  },
  {
    ModuleId: 7,
    ActionId: 6
  },
  {
    ModuleId: 8,
    ActionId: 1
  },
  {
    ModuleId: 8,
    ActionId: 2
  },
  {
    ModuleId: 8,
    ActionId: 3
  },
  {
    ModuleId: 8,
    ActionId: 4
  },
  {
    ModuleId: 9,
    ActionId: 1
  },
  {
    ModuleId: 9,
    ActionId: 2
  },
  {
    ModuleId: 9,
    ActionId: 3
  },
  {
    ModuleId: 9,
    ActionId: 4
  },
  {
    ModuleId: 10,
    ActionId: 1
  },
  {
    ModuleId: 10,
    ActionId: 2
  },
  {
    ModuleId: 10,
    ActionId: 3
  },
  {
    ModuleId: 10,
    ActionId: 4
  },
  {
    ModuleId: 11,
    ActionId: 1
  },
  {
    ModuleId: 11,
    ActionId: 2
  },
  {
    ModuleId: 11,
    ActionId: 3
  },
  {
    ModuleId: 11,
    ActionId: 4
  },
  {
    ModuleId: 12,
    ActionId: 1
  },
  {
    ModuleId: 12,
    ActionId: 2
  },
  {
    ModuleId: 12,
    ActionId: 3
  },
  {
    ModuleId: 12,
    ActionId: 4
  },
  {
    ModuleId: 13,
    ActionId: 1
  },
  {
    ModuleId: 13,
    ActionId: 2
  },
  {
    ModuleId: 13,
    ActionId: 3
  },
  {
    ModuleId: 13,
    ActionId: 4
  },
  {
    ModuleId: 14,
    ActionId: 1
  },
  {
    ModuleId: 14,
    ActionId: 2
  },
  {
    ModuleId: 14,
    ActionId: 3
  },
  {
    ModuleId: 14,
    ActionId: 4
  },
  {
    ModuleId: 15,
    ActionId: 1
  },
  {
    ModuleId: 15,
    ActionId: 2
  },
  {
    ModuleId: 15,
    ActionId: 3
  },
  {
    ModuleId: 15,
    ActionId: 4
  },
  {
    ModuleId: 16,
    ActionId: 1
  },
  {
    ModuleId: 16,
    ActionId: 2
  },
  {
    ModuleId: 16,
    ActionId: 3
  },
  {
    ModuleId: 16,
    ActionId: 4
  },
  {
    ModuleId: 17,
    ActionId: 1
  },
  {
    ModuleId: 17,
    ActionId: 2
  },
  {
    ModuleId: 17,
    ActionId: 3
  },
  {
    ModuleId: 17,
    ActionId: 4
  },
  {
    ModuleId: 18,
    ActionId: 1
  },
  {
    ModuleId: 18,
    ActionId: 2
  },
  {
    ModuleId: 18,
    ActionId: 3
  },
  {
    ModuleId: 18,
    ActionId: 4
  },
  {
    ModuleId: 19,
    ActionId: 1
  },
  {
    ModuleId: 19,
    ActionId: 2
  },
  {
    ModuleId: 19,
    ActionId: 3
  },
  {
    ModuleId: 19,
    ActionId: 4
  },
  {
    ModuleId: 20,
    ActionId: 1
  },
  {
    ModuleId: 20,
    ActionId: 2
  },
  {
    ModuleId: 20,
    ActionId: 3
  },
  {
    ModuleId: 20,
    ActionId: 4
  },
  {
    ModuleId: 21,
    ActionId: 1
  },
  {
    ModuleId: 21,
    ActionId: 2
  },
  {
    ModuleId: 21,
    ActionId: 3
  },
  {
    ModuleId: 21,
    ActionId: 4
  },
  {
    ModuleId: 22,
    ActionId: 1
  },
  {
    ModuleId: 22,
    ActionId: 2
  },
  {
    ModuleId: 23,
    ActionId: 2
  },
  {
    ModuleId: 23,
    ActionId: 3
  },
  {
    ModuleId: 24,
    ActionId: 1
  },
  {
    ModuleId: 24,
    ActionId: 2
  },
  {
    ModuleId: 24,
    ActionId: 3
  },
  {
    ModuleId: 24,
    ActionId: 4
  },
  {
    ModuleId: 25,
    ActionId: 2
  }]

  db.ModuleAction.bulkCreate(moduleActions).then((result) => {
    const rolePermissions = []
    for (let i = 0; i < result.length; i++) {
      const moduleActionId = result[i].id
      rolePermissions.push({
        RoleId: 1,
        ModuleActionId: moduleActionId
      })
    }
    db.RolePermission.bulkCreate(rolePermissions)
  })

  // *********************
  // Banner Types
  // *********************

  await db.BannerType.bulkCreate([{
    title: '330x215',
    identifiers: '330x215',
    description: 'Ad of size 330x215, Shown in Property Listing Page',
    width: 300,
    height: 215,
    minWidth: 300,
    minHeight: 215,
    maxBanners: 5
  }
  ])

  // *********************
  // Launching Category
  // *********************

  await db.LaunchingCategory.create({
    title: 'Housing Society',
    titleL1: 'Housing Society',
    level: 1,
    slug: 'Housing Society',
    singularName: 'Housing Society',
    singularNameL1: 'Housing Society'
  })
    .then((category) => {
      db.LaunchingCategory.bulkCreate([{
        title: 'House',
        titleL1: 'House',
        level: 2,
        slug: 'House',
        singularName: 'House',
        singularNameL1: 'House',
        ParentCategoryId: category.id
      },
      {
        title: 'Flat',
        titleL1: 'Flat',
        level: 2,
        slug: 'Flat',
        singularName: 'Flat',
        singularNameL1: 'Flat',
        ParentCategoryId: category.id
      },
      {
        title: 'Shops',
        titleL1: 'Shops',
        level: 2,
        slug: 'Shops',
        singularName: 'Shops',
        singularNameL1: 'Shops',
        ParentCategoryId: category.id
      },
      {
        title: 'Office',
        titleL1: 'Office',
        level: 2,
        slug: 'Office',
        singularName: 'Lower',
        singularNameL1: 'Lower',
        ParentCategoryId: category.id
      }])
    })

  await db.LaunchingCategory.create({
    title: 'Building',
    titleL1: 'Building',
    level: 1,
    slug: 'Building',
    singularName: 'Building',
    singularNameL1: 'Building'
  })
    .then((category) => {
      db.LaunchingCategory.bulkCreate([
        {
          title: 'Flat',
          titleL1: 'Flat',
          level: 2,
          slug: 'Flat',
          singularName: 'Flat',
          singularNameL1: 'Flat',
          ParentCategoryId: category.id
        },
        {
          title: 'Shops',
          titleL1: 'Shops',
          level: 2,
          slug: 'Shops',
          singularName: 'Shops',
          singularNameL1: 'Shops',
          ParentCategoryId: category.id
        },
        {
          title: 'Office',
          titleL1: 'Office',
          level: 2,
          slug: 'Office',
          singularName: 'Lower',
          singularNameL1: 'Lower',
          ParentCategoryId: category.id
        }])
    })

  // *********************
  // Property Category
  // *********************

  await db.PropertyCategory.create({
    title: 'Home',
    titleL1: 'Home',
    level: 1,
    slug: 'home',
    singularName: 'Home',
    singularNameL1: 'Home'
  })
    .then((category) => {
      db.PropertyCategory.bulkCreate([{
        title: 'House',
        titleL1: 'House',
        level: 2,
        slug: 'House',
        singularName: 'House',
        singularNameL1: 'House',
        ParentCategoryId: category.id
      },
      {
        title: 'Flat',
        titleL1: 'Flat',
        level: 2,
        slug: 'Flat',
        singularName: 'Flat',
        singularNameL1: 'Flat',
        ParentCategoryId: category.id
      },
      {
        title: 'Upper Portion',
        titleL1: 'Upper Portion',
        level: 2,
        slug: 'Upper Portion',
        singularName: 'Upper',
        singularNameL1: 'Upper',
        ParentCategoryId: category.id
      },
      {
        title: 'Lower Portion',
        titleL1: 'Lower Portion',
        level: 2,
        slug: 'Lower Portion',
        singularName: 'Lower',
        singularNameL1: 'Lower',
        ParentCategoryId: category.id
      },
      {
        title: 'Farm House',
        titleL1: 'Farm House',
        level: 2,
        slug: 'Farm House',
        singularName: 'Farm House',
        singularNameL1: 'Farm House',
        ParentCategoryId: category.id
      },
      {
        title: 'Room',
        titleL1: 'Room',
        level: 2,
        slug: 'Room',
        singularName: 'Room',
        singularNameL1: 'Room',
        ParentCategoryId: category.id
      }])
    })

  await db.PropertyCategory.create({
    title: 'Plots',
    titleL1: 'Plots',
    level: 1,
    slug: 'Plots',
    singularName: 'Plots',
    singularNameL1: 'Plots'
  })
    .then((category) => {
      db.PropertyCategory.bulkCreate([{
        title: 'Residential',
        titleL1: 'Residential',
        level: 2,
        slug: 'Residential',
        singularName: 'Residential',
        singularNameL1: 'Residential',
        ParentCategoryId: category.id
      },
      {
        title: 'Commercial',
        titleL1: 'Commercial',
        level: 2,
        slug: 'Commercial',
        singularName: 'Commercial',
        singularNameL1: 'Commercial',
        ParentCategoryId: category.id
      },
      {
        title: 'Agriculture',
        titleL1: 'Agriculture',
        level: 2,
        slug: 'Agriculture',
        singularName: 'Agriculture',
        singularNameL1: 'Agriculture',
        ParentCategoryId: category.id
      },
      {
        title: 'Industrial',
        titleL1: 'Industrial',
        level: 2,
        slug: 'Industrial',
        singularName: 'Industrial',
        singularNameL1: 'Industrial',
        ParentCategoryId: category.id
      }])
    })

  await db.PropertyCategory.create({
    title: 'Commercial',
    titleL1: 'Commercial',
    level: 1,
    slug: 'Commercial',
    singularName: 'Commercial',
    singularNameL1: 'Commercial'
  })
    .then((category) => {
      db.PropertyCategory.bulkCreate([{
        title: 'Office',
        titleL1: 'Office',
        level: 2,
        slug: 'Office',
        singularName: 'Office',
        singularNameL1: 'Office',
        ParentCategoryId: category.id
      },
      {
        title: 'Shop',
        titleL1: 'Shop',
        level: 2,
        slug: 'Shop',
        singularName: 'Shop',
        singularNameL1: 'Shop',
        ParentCategoryId: category.id
      },
      {
        title: 'Warehouse',
        titleL1: 'Warehouse',
        level: 2,
        slug: 'Warehouse',
        singularName: 'Warehouse',
        singularNameL1: 'Warehouse',
        ParentCategoryId: category.id
      },
      {
        title: 'Building',
        titleL1: 'Building',
        level: 2,
        slug: 'Building',
        singularName: 'Building',
        singularNameL1: 'Building',
        ParentCategoryId: category.id
      },
      {
        title: 'Factory',
        titleL1: 'Factory',
        level: 2,
        slug: 'Factory',
        singularName: 'Factory',
        singularNameL1: 'Factory',
        ParentCategoryId: category.id
      }])
    })

  await db.Amenities.create({
    title: 'Main Features',
    titleL1: 'اہم خصوصیات',
    orderSequence: 1
  })
    .then((amenity) => {
      db.AmenityProperty.bulkCreate([{
        title: 'Floors',
        titleL1: 'Floors',
        AmenityId: amenity.id,
        format: 'number'
      },
      {
        title: 'Other Main Features',
        titleL1: 'دیگر خصوصیات',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Floors',
        titleL1: 'منزلوں کی کل تعداد',
        AmenityId: amenity.id,
        format: 'number'
      },
      {
        title: 'Waste Disposal',
        titleL1: 'فضلات کا رفع',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Electricity Backup',
        titleL1: 'بجلی کا بیک اپ',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Flooring',
        titleL1: 'فرش',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Parking Spaces',
        titleL1: 'پارکنگ کی جگہ',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'View',
        titleL1: 'ویو',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Built in year',
        titleL1: 'تعمیر کا سال',
        AmenityId: amenity.id,
        format: 'number'
      }
      ])
    })

  await db.Amenities.create({
    title: 'Rooms',
    titleL1: 'کمرہ جات',
    orderSequence: 1
  })
    .then((amenity) => {
      db.AmenityProperty.bulkCreate([
        { title: 'Other Rooms', isRequired: false, titleL1: 'دیگر کمرے', format: 'text', AmenityId: amenity.id },
        { title: 'Bathrooms', isRequired: true, titleL1: 'باتھ رومز کی تعداد', format: 'number', AmenityId: amenity.id },
        { title: 'Drawing Room', titleL1: 'ڈرائنگ روم', format: 'checkbox', AmenityId: amenity.id },
        { title: 'Servant Quarters', titleL1: 'ملازمین کے کوارٹرز کی تعداد', format: 'number', AmenityId: amenity.id },
        { title: 'Bedrooms', isRequired: false, titleL1: 'بیڈرومز کی تعداد', format: 'number', AmenityId: amenity.id },
        { title: 'Lounge or Sitting Room', titleL1: 'لائونج یا سٹنگ روم', format: 'checkbox', AmenityId: amenity.id },
        { title: 'Store Rooms', titleL1: 'سٹورز کی تعداد', format: 'number', AmenityId: amenity.id },
        { title: 'Powder Room ', titleL1: 'پائوڈر روم', format: 'checkbox', AmenityId: amenity.id },
        { title: 'Kitchens', titleL1: 'کچنز کی تعداد', format: 'number', AmenityId: amenity.id },
        { title: 'Dining Room', titleL1: 'ڈائننگ روم', format: 'checkbox', AmenityId: amenity.id }
      ])
    })

  await db.Amenities.create({
    title: 'PLOT FEATURES',
    titleL1: '',
    orderSequence: 1
  })
    .then((amenity) => {
      db.AmenityProperty.bulkCreate([{
        title: 'Sewerage',
        titleL1: 'Sewerage',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Electricity',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Water Supply',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Waste Disposal',
        titleL1: 'فضلات کا رفع',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Electricity Backup',
        titleL1: 'بجلی کا بیک اپ',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Sui Gas',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Accessible by Road',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      }
      ])
    })

  await db.Amenities.create({
    title: 'NEARBY LOCATIONS AND OTHER FACILITIES',
    titleL1: '',
    orderSequence: 1
  })
    .then((amenity) => {
      db.AmenityProperty.bulkCreate([{
        title: 'Nearby Schools',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Nearby Hospitals',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Nearby Shopping Malls',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Nearby Restaurants',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Nearby Public Transport Service',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      }
      ])
    })

  await db.Amenities.create({
    title: 'OTHER FACILITIES',
    titleL1: '',
    orderSequence: 1
  })
    .then((amenity) => {
      db.AmenityProperty.bulkCreate([{
        title: 'Maintenance Staff',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Security Staff',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'CCTV Security',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Emergency Help Line',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      }
      ])
    })

  await db.Amenities.create({
    title: 'BUSINESS AND COMMUNICATION',
    titleL1: '',
    orderSequence: 1
  })
    .then((amenity) => {
      db.AmenityProperty.bulkCreate([{
        title: 'Broadband Internet Access',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      },
      {
        title: 'Satellite or Cable TV Ready',
        titleL1: '',
        AmenityId: amenity.id,
        format: 'checkbox'
      }
      ])
    })
  await db.Area.create({
    title: 'Country',
    name: 'Pakistan',
    titleL1: 'Country',
    nameL1: 'Pakistan',
    level: 1
  })
  // seeds For Cities
  // AbbotAbad
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Abbot Abad',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Habibullah Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kaghan Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bilal Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Officers Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Askari Housing Abbottaabad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jinnahabad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Main Mansehra Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nawansher',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ayub Medical Complex',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jhangi Syedan',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Supply',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Allama Iqbal Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'PMA Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Thanda Choha',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Murree Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hassan Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sir Syed Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mandian',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Usamanabad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gohar Ayub Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Supply',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khaira Gali',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Havelian',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shahzaman COlony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bilqias Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'College Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Circular Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulfam Town Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bhu Mirpur',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kakul Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mirpur Maira',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Salhad',
        nameL1: '',
        ParentId: city.id
      }])
    })

  // Alipur
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Alipur',
    nameL1: '',
    ParentId: 1
  })
    .then((Alipur) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rajput Colony',
        nameL1: '',
        ParentId: Alipur.id
      }])
    })

  // Arifwala
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Arifwala',
    nameL1: '',
    ParentId: 1
  })
    .then((arifwala) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Burewala Road',
        nameL1: '',
        ParentId: arifwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bahawalnagar Bypass Road',
        nameL1: '',
        ParentId: arifwala.id
      }])
    })

  // Attock
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Attock',
    nameL1: '',
    ParentId: 1
  })
    .then((attock) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'kamra Road',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Darul Islam Colony',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Railway Road',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mirza Road',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Fateh Jang Road',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Peoples Colony',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Cantt',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kamra',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Farooq-e-Azam',
        nameL1: '',
        ParentId: attock.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hamza Town',
        nameL1: '',
        ParentId: attock.id
      }])
    })

  // Badin
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Badin',
    nameL1: '',
    ParentId: 1
  })
    .then((badin) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Matli',
        nameL1: '',
        ParentId: badin.id
      }])
    })

  // Bahauddin
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Bahauddin',
    nameL1: '',
    ParentId: 1
  })
    .then((bahauddin) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sufi City',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wasu Road',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sultan Town',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lila Town',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gilani Town',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'MalakWal',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Doctor Town',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gondal Town',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Rasool Road',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Arshad Town',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Phalia Mandi Bahauddin Road',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Old Rasool Road',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hamza Town',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jail Road',
        nameL1: '',
        ParentId: bahauddin.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sargodha Road',
        nameL1: '',
        ParentId: bahauddin.id
      }])
    })

  // Bahawalnagar
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Bahawalnagar',
    nameL1: '',
    ParentId: 1
  })
    .then((bahawalnagar) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Madina Town',
        nameL1: '',
        ParentId: bahawalnagar.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: bahawalnagar.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chishtian',
        nameL1: '',
        ParentId: bahawalnagar.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dahranwala',
        nameL1: '',
        ParentId: bahawalnagar.id
      }])
    })

  // Bahawalpur
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Bahawalpur',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'jhangi Wala Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rafi Qamar Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town A',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Government Employees Coopertaive Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bahawalpur Yazman Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Cheema Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chaudhary Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Goheer Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Paragon Ideal Homes',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khayaban-e-Ali Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hasilpur Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shadab Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town B',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hashmi Garden',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Green Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Railway Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Haroon Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Satellite Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Johar Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Millat Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Girls College Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Multan Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town C',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Royal City Housing Scheme',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'jail Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sajid Awan Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Government Servants Housing Scheme',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sadiq Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Samma Satta Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: '100 Feet Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rehmat Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muhammadia Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hamza Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faisal Bagh Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Akbar Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Trust Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Maqbool Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nishat Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muslim Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Allama Iqbal Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Darbar Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Riaz ul Jannah Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Tibba Badar Sher',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ahmedpur Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Band Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulistan Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dilawar Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faride Gate',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Satellite Extension',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Satellite Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Haseeb Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mohalla Nawaban',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Noor Mahal Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Pelican Homes',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Islamia Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'One Unit Chowk',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Darbar Mahal Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Farid Gate Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Qasim Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jillani Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Canal Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Middle City',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'DHA Defence',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulberg Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bahawalpur Bypass',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Univeristy Chowk',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Fauji Basti',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Islampura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Circular Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Riaz Colony',
        nameL1: '',
        ParentId: city.id
      }])
    })

  // Bhakkar
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Bhakkar',
    nameL1: '',
    ParentId: 1
  })
    .then((Bhakkar) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mandi Town',
        nameL1: '',
        ParentId: Bhakkar.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: Bhakkar.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mankera',
        nameL1: '',
        ParentId: Bhakkar.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Darya Khan Road',
        nameL1: '',
        ParentId: Bhakkar.id
      }])
    })

  // Bhalwal
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Bhalwal',
    nameL1: '',
    ParentId: 1
  })
    .then((Bhalwal) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ali Zahoor Colony',
        nameL1: '',
        ParentId: Bhalwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: Bhalwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sulaiman Pura',
        nameL1: '',
        ParentId: Bhalwal.id
      }])
    })

  // Burewala
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Burewala',
    nameL1: '',
    ParentId: 1
  })
    .then((burewala) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Waraich Town',
        nameL1: '',
        ParentId: burewala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: burewala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Burewala Vehari Road',
        nameL1: '',
        ParentId: burewala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Block X',
        nameL1: '',
        ParentId: burewala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mujahid Colony',
        nameL1: '',
        ParentId: burewala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Block D',
        nameL1: '',
        ParentId: burewala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lalazar Housing Scheme',
        nameL1: '',
        ParentId: burewala.id
      }])
    })

  // Chakwal
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Chakwal',
    nameL1: '',
    ParentId: 1
  })
    .then((chakwal) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ashraf Town',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Millat Chowk',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Talagang Road',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dhako Road',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mohalla Dhoke Feroz',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mohalla Jafarabad',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muzalfa Town',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Executive Town',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nishat Cinema Road',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hospital Road',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Anwarabad',
        nameL1: '',
        ParentId: chakwal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kallar kahar Road',
        nameL1: '',
        ParentId: chakwal.id
      }])
    })
  // Chichawatni
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Chichawatni',
    nameL1: '',
    ParentId: 1
  })
    .then((chichawatni) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hayat Abad',
        nameL1: '',
        ParentId: chichawatni.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: chichawatni.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Housing Colony',
        nameL1: '',
        ParentId: chichawatni.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Old Chichawatni',
        nameL1: '',
        ParentId: chichawatni.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kassowal',
        nameL1: '',
        ParentId: chichawatni.id
      }])
    })

  // Chiniot
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Chiniot',
    nameL1: '',
    ParentId: 1
  })
    .then((chiniot) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jhang Chiniot Road',
        nameL1: '',
        ParentId: chiniot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: chiniot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sargodha Faisalabad Road',
        nameL1: '',
        ParentId: chiniot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rajoa Sadat Road',
        nameL1: '',
        ParentId: chiniot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lahore Road',
        nameL1: '',
        ParentId: chiniot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rajay Wala Road',
        nameL1: '',
        ParentId: chiniot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chinioti Road',
        nameL1: '',
        ParentId: chiniot.id
      }])
    })

  // Chistian
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Chistian',
    nameL1: '',
    ParentId: 1
  })
    .then((Chistian) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Satellite Town',
        nameL1: '',
        ParentId: Chistian.id
      }])
    })

  // Chunian
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Chunian',
    nameL1: '',
    ParentId: 1
  })
    .then((Chunian) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chunian Main Road',
        nameL1: '',
        ParentId: Chunian.id
      }])
    })

  // Dadu
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Dadu',
    nameL1: '',
    ParentId: 1
  })
    .then((Dadu) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: Dadu.id
      }])
    })

  // Daska
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Daska',
    nameL1: '',
    ParentId: 1
  })
    .then((Daska) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Stadium Road',
        nameL1: '',
        ParentId: Daska.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: Daska.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sambrial Road',
        nameL1: '',
        ParentId: Daska.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jamke Road',
        nameL1: '',
        ParentId: Daska.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ramzan Town',
        nameL1: '',
        ParentId: Daska.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gujranwala Road',
        nameL1: '',
        ParentId: Daska.id
      }])
    })

  // Dera Ghazi Khan
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Dera Ghazi Khan',
    nameL1: '',
    ParentId: 1
  })
    .then((dera) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Multan Road',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khayaban-e-Sarwar',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Garden Town',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Defence',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Balakh Sarwar',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sakhi Sarwar Road',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Fort Monroe',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shahzad Colony',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Fareed Abad',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gaddai',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mankha Road',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shah Sikandar Road',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Leghari Colony',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Drishak Town',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ameen Town - Phase 2',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Block 17',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Allahabad',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Block 28',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khitran Colony',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Taunsa',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jampur Road',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Younas Khosa Road',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chowk Chohratha',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Block 35',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nasir Abad Colony',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mujahid Abad Colony',
        nameL1: '',
        ParentId: dera.id
      }])
    })

  // Dera Ismail Khan
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Dera Ismail Khan',
    nameL1: '',
    ParentId: 1
  })
    .then((dera) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan Colony',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Grid Station Road',
        nameL1: '',
        ParentId: dera.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chashma Right Bank Road',
        nameL1: '',
        ParentId: dera.id
      }])
    })

  // Dina
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Dina',
    nameL1: '',
    ParentId: 1
  })
    .then((dina) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mangla Road',
        nameL1: '',
        ParentId: dina.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: dina.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Quaid-e-Azam Town',
        nameL1: '',
        ParentId: dina.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bhagan',
        nameL1: '',
        ParentId: dina.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hadali',
        nameL1: '',
        ParentId: dina.id
      }])
    })

  // Dipalpur
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Dipalpur',
    nameL1: '',
    ParentId: 1
  })
    .then((dipalpur) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Okara Road',
        nameL1: '',
        ParentId: dipalpur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: dipalpur.id
      }])
    })

  // Djkot
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Djkot',
    nameL1: '',
    ParentId: 1
  })
    .then((djkot) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mangla Road',
        nameL1: '',
        ParentId: djkot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: djkot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bhagan',
        nameL1: '',
        ParentId: djkot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hadali',
        nameL1: '',
        ParentId: djkot.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Quaid-e-Azam Town',
        nameL1: '',
        ParentId: djkot.id
      }])
    })

  // Faisalabad
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Faisalabad',
    nameL1: '',
    ParentId: 1
  })
    .then((faislabad) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Satiana Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Eden Valley',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Canal Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Green Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wapda City',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Eden Orchard',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Madina Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ghalib City',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Eden Gardens',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al Noor Garden',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Four Season Housing',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Samundari Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Millat Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Millat Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan Colony No 1',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan-e-Haram',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muslim Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Saeed Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rehman Gardens',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khayaban-e-Madina',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Samanabad',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Peoples Colony No 2',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Susan Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Amin Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mansoorabad',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulberg Valley',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khayaban Gardens',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Citi Housing Society',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ali Housing Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Civil Lines',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jhang Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sargodha Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khayaban Colony 2',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Abdullah Garden',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khayaban Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulfishan Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jaranwala Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Riaz ul Jannah',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al Fayaz Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Green Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sitara Superme City',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shehbaz Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ghulam Mohammad Abad',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lahore',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sheikj Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Makkah Garden',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chak 208 Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Officers Colony 2',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'D Type Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al Najaf Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulberg',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ahmadabad',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Green View Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Garden Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Yousaf Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Narwala Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rehman Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nazimaba',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Daewoo Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hassan Villas',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Tariqabad',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rasool Park',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Riaz Garden',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jinnah Colony',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'University Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Manawala',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Canal Park',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Islamia Park',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Paradise valley',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faisal Gardens',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Punjab Govt. Servants Housing Foundation',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ali Garden',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nemat Colony No 1',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jhumra Road',
        nameL1: '',
        ParentId: faislabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nishatabad',
        nameL1: '',
        ParentId: faislabad.id
      }])
    })

  // Galyat
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Galyat',
    nameL1: '',
    ParentId: 1
  })
    .then((galyat) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dunga Gali',
        nameL1: '',
        ParentId: galyat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: galyat.id
      }])
    })

  // Ghotki
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Ghotki',
    nameL1: '',
    ParentId: 1
  })
    .then((ghotki) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Daharki',
        nameL1: '',
        ParentId: ghotki.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: ghotki.id
      }])
    })

  // Gilgit
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Gilgit',
    nameL1: '',
    ParentId: 1
  })
    .then((Gilgit) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Other',
        nameL1: '',
        ParentId: Gilgit.id
      }])
    })

  // Gojra
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Gojra',
    nameL1: '',
    ParentId: 1
  })
    .then((Gojra) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Other',
        nameL1: '',
        ParentId: Gojra.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mehdi Mohallah',
        nameL1: '',
        ParentId: Gojra.id
      }])
    })

  // Gujranwala
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Gujranwala',
    nameL1: '',
    ParentId: 1
  })
    .then((gujranwala) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Garden Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Allama Iqbal Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sialkot Bypass',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rahwali Cantt',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wapda Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Master City Housing Scheme',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sialkot Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Satellite Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Popular Nursery Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muslim Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khokar Ke',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nowshera Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shaheen Abad',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ratta Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Madina Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Farid Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulzar Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Professor Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jalil Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'College Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Usman Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wafi Citi Housing Scheme',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nomania Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'DC Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khiali Shahpura',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Baghbanpura',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bakhtey Wala',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wahdat Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jinnah Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'GT Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Arfaat Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gujranwala Bypass',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hafizabad Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ghordor Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sessiojn Court Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Katchi Fatto Mand',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gill Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Quaid-e-Azam Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ittefaq Garden',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Aziza Housing Scheme',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Abid Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bilal Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ittihad Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kotli Rustam',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulberg Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kashmir Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bismillah Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khiali',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Zahid Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Guru Nanak Pura',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faqirpura',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jalal Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shahrukh Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Siddque Akber Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nursery',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan-e-Iyaz Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Salamat Pura',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Asif Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al Mujeeb Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dhule',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Behari Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muslim Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Noshera Sansi',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Canal View Road',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muhafiz Town',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Eminabad More',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Allah Buksh Colony',
        nameL1: '',
        ParentId: gujranwala.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Green Town',
        nameL1: '',
        ParentId: gujranwala.id
      }])
    })

  // Gujrat
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Gujrat',
    nameL1: '',
    ParentId: 1
  })
    .then((gujrat) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bhimber Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Model Town',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al Nabi Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Zaib Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Haryawala',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'GT Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Asghar Town',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Qadir Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dar-e-Islam Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Service Morh',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shadman Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Green Town',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Marghzar Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ali Pura Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sargodha Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gujrat Bypass',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shadiwal Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Star Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kashmir Pura',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jalalpur Jattan Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Qamar Sayalvi Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Aadowal',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faisal Town',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jinnah Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Shadman Colony',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Court Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lundpur',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ramtali Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rehman Shaheed Road',
        nameL1: '',
        ParentId: gujrat.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: gujrat.id
      }
      ])
    })

  // Gwadar
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Gwadar',
    nameL1: '',
    ParentId: 1
  })
    .then((gwadar) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Town',
        nameL1: '',
        ParentId: gwadar.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: gwadar.id
      }])
    })

  // Hafizabad
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Hafizabad',
    nameL1: '',
    ParentId: 1
  })
    .then((hafizabad) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Canal Colony',
        nameL1: '',
        ParentId: hafizabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: hafizabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mohalla Rashid Pura',
        nameL1: '',
        ParentId: hafizabad.id
      }])
    })

  // Haripur
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Haripur',
    nameL1: '',
    ParentId: 1
  })
    .then((haripur) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dheenda Road',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'TIP Housing Society',
        nameL1: '',
        ParentId: haripur.id
      }, {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Main Bazar Road',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Karakoram Highway',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sarai Saleh',
        nameL1: '',
        ParentId: haripur.id
      }, {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khalabat Township',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sikandarpur',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Malikyar',
        nameL1: '',
        ParentId: haripur.id
      }, {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Darvesh',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khanpur',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gehr Khan',
        nameL1: '',
        ParentId: haripur.id
      }, {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mohalla Khoo',
        nameL1: '',
        ParentId: haripur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model City',
        nameL1: '',
        ParentId: haripur.id
      }])
    })

  // Haroonabad
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Haroonabad',
    nameL1: '',
    ParentId: 1
  })
    .then((Haroonabad) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: Haroonabad.id
      }])
    })

  // Hasilpur
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Hasilpur',
    nameL1: '',
    ParentId: 1
  })
    .then((Hasilpur) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: Hasilpur.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Vehari Road',
        nameL1: '',
        ParentId: Hasilpur.id
      }])
    })

  // HassanAbdal
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Hassan Abdal',
    nameL1: '',
    ParentId: 1
  })
    .then((hassanAbdal) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: hassanAbdal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'GT Road',
        nameL1: '',
        ParentId: hassanAbdal.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Main Bazar',
        nameL1: '',
        ParentId: hassanAbdal.id
      }])
    })

  // Hyderabad
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Hyderabad',
    nameL1: '',
    ParentId: 1
  })
    .then((hyderabad) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Latifabad',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Qasimabad',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan-E-Zealpak Cooperative Housing Society',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hyderabad Bypass',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Abdullah Garden',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kohsar',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulistan-e-Sajjad',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mir Hussainabad',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Isra Village',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Naqash Villas',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jamshoro Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'SITE Area',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Auto Bhan Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ammar City',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Abdullah Heaven',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'GMB Colony',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Heerabad',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hussainabad',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Daman-e-Kohsar Housing Society',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan e Mehran Phase 2',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'London Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan-e-Mustafa Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Pathan Colony',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Zafar Housing Scheme',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hala Naka',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Labour Colony',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hali Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Qasimabad Main Bypass',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bismillah Garden',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Prince Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulistan-e-Sajjad Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nasim Nagar Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al Rahmeen Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Defence',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Qasim Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hussain City',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Tando Jam',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Airport Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Main Qasimabad Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al Wahid Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shehbaz Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shahi Bazar',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nasim Nagar',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faraz Villas',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Abdullah Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Abdullah Sports City',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan-e-Hali',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sadar',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ali Abad',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Sabzi Mandi Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mustafa Bungalows',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khursheed Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gospel Homes Housing Society',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ferozabad Colony Unit 12',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'HDA Bungalows',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan-e-karim',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mirfazal Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jamia Cloth Market',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Old City',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mir Afzal Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shahrish Nagar',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gul-e-Lateef',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jail Road',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hosri Town',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Memon CIty',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Downtown Residency',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan-e-Shahbaz',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Iqbal Colony',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Tando Jahanian',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'panyari Canal',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Tilak Incline',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sachalabad',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan-e-karim',
        nameL1: '',
        ParentId: hyderabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Garikhata',
        nameL1: '',
        ParentId: hyderabad.id
      }
      ])
    })

  // Islamabad
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Islamabad',
    nameL1: '',
    ParentId: 1
  })
    .then((islamabad) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'DHA Defence',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G-13',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bahria Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'E-11',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ghauri Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'I-8',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'D-12',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bani Gala',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'CBR Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G-11',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'I-10',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'F-8',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'F-11',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Soan Garden',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'B-17',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'F-7',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'F-10',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'F-6',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Pakistan Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G-9',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'PWD Housing Scheme',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bhara Kahu',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G-10',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'H-13',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G-15',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'FECHS',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Korang Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G-8',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'E-7',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lehtarar Road',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'I-14',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Naval Anchorage',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'National Police Foundation O-9',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kuri Road',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G-6',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'D-17',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G-14',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'F-17',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'National Police Foundation',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'I-9',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kashmir Highway',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khana Pul',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Koral Chowk',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faisal Town F-18',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Emmar Canyon Views',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ali Pur',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jhangi Syedan',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulberg',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Margala Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Tarnol',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Simply Dam Road',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Royal Avenue',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Islamabad Expressway',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Marwa Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shah Allah Ditta',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shaheen Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chatha Bakhtawar',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'PWD Road',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Burma Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Tarlai',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Arsalan Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Zaraj Housing Scheme',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Alipur Farash',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Thanda Pani',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'D-18',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Taramrri',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'I-13',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Green Avenue',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'E-16',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chak Shehzad',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Koral Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Park Road',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'E-18',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shehzad Town',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'River Garden',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'I-16',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sohan Valley',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'IJP Road',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Park View City',
        nameL1: '',
        ParentId: islamabad.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Meherban Colony',
        nameL1: '',
        ParentId: islamabad.id
      }
      ])
    })

  // Jamshoro
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Jamshoro',
    nameL1: '',
    ParentId: 1
  })
    .then((jamshoro) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: 'Area',
        level: 3,
        name: 'Mehran University Employees Cooperative Housing Society',
        nameL1: '',
        ParentId: jamshoro.id
      },
      {
        title: 'Area',
        titleL1: 'Area',
        level: 3,
        name: 'Karachi - Hyderabad Motorway',
        nameL1: '',
        ParentId: jamshoro.id
      },
      {
        title: 'Area',
        titleL1: 'Area',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: jamshoro.id
      },
      {
        name: 'Indus Highway',
        title: 'Area',
        titleL1: 'Area',
        level: 3,
        nameL1: '',
        ParentId: jamshoro.id
      },
      {
        title: 'Area',
        titleL1: 'Area',
        level: 3,
        name: '"',
        nameL1: '',
        ParentId: jamshoro.id
      }])
    })

  // jauharabad
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Jauharabad',
    nameL1: '',
    ParentId: 1
  })
    .then((Jauharabad) => {
      db.Area.bulkCreate([
        {
          title: 'Area',
          titleL1: 'Area',
          name: 'Burhan Town',
          nameL1: '',
          ParentId: Jauharabad.id
        },
        {
          title: 'Area',
          titleL1: 'Area',
          name: 'Aslam Colony',
          nameL1: '',
          ParentId: Jauharabad.id
        },
        {
          title: 'Area',
          titleL1: 'Area',
          name: 'Shabeer Colony',
          nameL1: '',
          ParentId: Jauharabad.id
        },
        {
          title: 'Area',
          titleL1: 'Area',
          name: 'Old Satellite Town',
          nameL1: '',
          ParentId: Jauharabad.id
        }
      ])
    })

  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Jauharabad',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([
        {
          name: 'Toba Road',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gojara Road',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Mohalla Bhagwala',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jhang Sadar',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Madina Colony',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Canal Road',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jhang City',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bhakkar Road',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Faisalabad Road',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sargodha Road',
          title: 'Area',
          titleL1: 'Area',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Wazirabad
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Wazirabad',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sialkot Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Cheema Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hajipura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wazirabad-Dhonkal Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bharoke Cheema Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Circular Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Allahabad',
        nameL1: '',
        ParentId: city.id
      }
      ])
    })
  // Wah
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Wah',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New City',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'GT Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wah Cannt',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Officers Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faisal Iqbal Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nowababad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lalazar Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lalarukh Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sattelite Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shah Wali Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chairman Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lalarukh Colony 2',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Multi Residencia & Orchards',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wah Gardens',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gadwall Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Tameere-e-Hayat Cooprerative Housing Socity',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kohistan Enclave',
        nameL1: '',
        ParentId: city.id
      }
      ])
    })

  // Vehari
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Vehari',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faosal Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Danewal Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Batha Ikram Ul Haq Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faisal Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G Block',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Multan Vehari Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hasilpur to Vehari Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mian Channu Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sharqi Colony',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Tooba Tek Singh
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Tooba Tek Singh',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Canal Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shlimar Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Pera Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'G Block',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mohammadpura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jhang to Toba Tek Singh Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mustafabad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Islampura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Islampura',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Thatta
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Thatta',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  // Taxila
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Taxila',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Koshisar Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wahdat Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kot Najeebullah Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'GT Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Intizar Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jamilabad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Taxila Garden Housing Scheme',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bohudu',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bohudu',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sarai Khola',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dhok Wajan',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shahpur',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Thatha Khalil Road',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  // Tando Muhammad Khan
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Tando Muhammad Khan',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan Faiz Colony',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  // Tando Allahyar
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Tando Allahyar',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hyderabad-Mirpurkhas Road',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  // Swat
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Swat',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kanju Township',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mingora',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sidu Sharif',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bahrain Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Charbagh',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kalam',
        nameL1: '',
        ParentId: city.id
      }
      ])
    })
  // Swabi
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Sawabi',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Manki',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  // Sukkur
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Sukkar',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sukkur Township',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sukkar Bupass',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Delhi Muslim Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Old Sukkar',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mehran Housing Scheme',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sukkar Co-operative Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shikarpur Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Akhuwat Nagar Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jaffria Cooperative Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Pind',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Qureshi Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Canal Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sindh Muslim Coop Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Barrage Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'GECHS Govt Employees Coop Housing',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Professor Cooperative Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wari-Tar Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Millat Cooperative Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sadat Nagar Housing Scheme',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Soarth Memon Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Local Board',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: '100 Ft Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Station Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Barrage Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bandar Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al Madina Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Masoom Shah Minar Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Pano Akil',
        nameL1: '',
        ParentId: city.id
      }
      ])
    })
  // Skardu
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Skardu',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Airport Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'College Road',
        nameL1: '',
        ParentId: city.id
      }
      ])
    })
  // Sialkot
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Sialkot',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wazirabad Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Citi Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Aziz Garden',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kashmir Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sambrial',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Cantt',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Defence Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gulshan Iqbal',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hajipura Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Aimanabad Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Airport Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khokhar Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chenab Ranger Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Others',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ugoke Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Azeem Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Defence Home Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Askari 1',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muradpur',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Dinpura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Zafarwal Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Nishat Park',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rangpura Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Askari 2',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Madina Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Commissioner Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mag Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Marala Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kachehri Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Pakki kotli',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Adalat Garh',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town Coop Housing Society',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Neka Pura Amina Abad Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Daska Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Mianapura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Circular Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Zeeshan Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shahabpura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kaake Wali',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Cantt Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jinnah Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Chaprar Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Pasrur Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kharkana',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Langeriali',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Church Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Talwara Mughlan',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kawarpur',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Akberabad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Cantt Avenue',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mudassar Shaheed Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Allama Iqbal Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Mubarikpura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muslim Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ajmal Garden Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Trunk Bazar',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Toheed Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khadim Ali Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shahabpura Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'christian Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jajay',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Hadi Town',
        nameL1: '',
        ParentId: city.id
      }
      ])
    })
  // Shorkot
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Shorkot',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shorkot Cantt Road',
        nameL1: '',
        ParentId: city.id
      }])
    })
  // Skardu
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Skardu',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Airport Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'College Road',
        nameL1: '',
        ParentId: city.id
      }
      ])
    })
  // Sheikhopura
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Sheikhopura',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Gugranwala Link Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bhikhi Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lahore Sargodha Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Housing Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Ghang Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lahore-Sheikhopura-Faisalabad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Regal City',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Muslim Gunj',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sharaqpur Sharif',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khan Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'VIP City',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Old Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lahore Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faisalabad Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Malik Anwar Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Kot Abdul Malik',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jahangirabad',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Defence Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Wapda Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Model Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rehmat Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Rasulpura',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Begum Kot',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Jhugian Sialan',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Al-Azeem Green Villas',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sharaqpur Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Officers Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Shaheen Villas',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Civil Line',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  // Shakargarh
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Shakargarh',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Railway Road',
        nameL1: '',
        ParentId: city.id
      }])
    })
  // Sarghoda
  await db.Area.create({
    title: 'City',
    titleL1: '',
    level: 2,
    name: 'Sarghoda',
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Iqbal Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Farooq Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Faisalabad Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: '14 Block',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Block 9',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'New Satellite Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: '23-A Block',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Sargodha to Bhalwal Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Maqam-e-Hayat',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Khayaban-e-Naveed',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Satellite Town',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Asad Park',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Bissmillah Park',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Lahore Road',
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'Javed Colony',
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Kot Fareed Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        title: 'Area',
        titleL1: '',
        level: 3,
        name: 'University Road',
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  //  Jhang

  await db.Area.create({
    name: 'Jhang',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Toba Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gojara Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Mohalla Bhagwala',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jhang Sadar',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Madina Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Canal Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jhang City',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bhakkar Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Faisalabad Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sargodha Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })
  // Jhelum

  await db.Area.create({
    name: 'Jhelum',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Bilal Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Cantt',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Civil Line',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Karimpura',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulshan Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Dhok Muqarab',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Professor Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mohalla Islamia School',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mahmoodabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Dhok Firdous',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Kala Gujran',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Rohtas Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mohalla Mohammadi Chowk',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Dhok Jumma',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Islampura Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Lalazar Colony Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Jada',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Sultan Pura',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Karimpura Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Abbas Pura',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Shamali Mohalla',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'River Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mujahid Abad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Chishtian Mohalla',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  // Kamalia

  await db.Area.create({
    name: 'Kamalia',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }

      ])
    })

  // Kamoki

  await db.Area.create({
    name: 'Kamoki',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Karachi

  await db.Area.create({
    name: 'Karachi',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gadap Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Scheme 33(938)',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulistan-e-Jauhar',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulshan-e-Iqbal Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'North Karachi',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'North Nazimabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Malir',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Cantt',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Korangi',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Federal B Area',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Jamshed Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bin Qasim Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Clifton',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Navy Housing Scheme Karsaz',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Shah Faisal Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Orangi Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Naya Nazimabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Nazimabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'New Karachi',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Qayyumabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Shahra-e-Faisal',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mehmoodabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'KDA Scheme 1',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Liaquatabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulberg Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bath Island',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Saima Luxury Homes',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Landhi',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'University Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Abul Hassan Isphani Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gohar Green City',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Defence View Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Dalmia Cement Factory Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Manzoor Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Hill Park',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulshan-e-Usman Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Amir Khusro',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Baldia Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'PTV Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Tipu Sultan Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Naval Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Muslimabad Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Zamzama',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Karachi Motorway',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Falcon Complex Faisal',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Karachi Golf City',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Khuda Ki Basti',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Jinnah Avenue',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Stadium Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Super Highway',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'National Highway',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Sindh Industrial Trading Estate (SITE)',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Kemari Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Airport',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Shah Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Khayaban-e-Ittehad Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Azam Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Shaheed Millat Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulshan-e-Umair',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Abid Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Anda Mor Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Rashid Minhas Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Scheme 45',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Metrovil Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Aisha Manzil',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Kashmir Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Naval Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Golimar',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Khalid Bin Walid Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Police Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Manghopir Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Darul Aman Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Baloch Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Malir Link To Super Highway',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Chapal Uptown',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulistan-e-Malir',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Falaknaz Dynasty',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'PAF Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Kasur

  await db.Area.create({
    name: 'Kasur',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Gulberg Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Peer Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Steel Bagh',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Wapda Town Kasur',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ali Ahmad Shah Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Kot Radha Kishan',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Defence Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sadar Dewan Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Pattoki',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Munir Shaheed Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bhai Pheru',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Kot Molvi Abdul Qadar',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Changa Manga',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Lahore - Kasur Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'M.A. Jinnah Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Kot Murad Khan',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Qadiwind Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ferozpur Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Khara Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Khanpur

  await db.Area.create({
    name: 'Khanpur',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Khanpur Bypass',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Model Town B',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ravi Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jinnah Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Zahir Pir Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Satellite Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Kharian

  await db.Area.create({
    name: 'Kharian',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Defence Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Mujahid Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sitar Pura',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Iftikhar Janjua Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Cantt',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Kharipur

  await db.Area.create({
    name: 'Kharipur',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Kharor pakka

  await db.Area.create({
    name: 'Kharor Pakka',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Kohat

  await db.Area.create({
    name: 'Kohat',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'KDA Kohat',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bannu Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }

      ])
    })

  // Kot Addu

  await db.Area.create({
    name: 'Kot Adu',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Kotli

  await db.Area.create({
    name: 'Kotli',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Kotri

  await db.Area.create({
    name: 'Kotri',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Lahore

  await db.Area.create({
    name: 'Lahore',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Bahria Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Johar Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'State Life Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Wapda Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulberg',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Allama Iqbal Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Cantt',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Model Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Paragon City',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Valencia Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Al Rehman Garden',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Eden',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Samanabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Pak Arab Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Sabzazar Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Lahore Medical Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Canal Garden',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Township',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Gulshan-e-Ravi',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'DHA 11 Rahbar',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bahria Orchard',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Raiwind Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Military Accounts Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Central Park Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Punjab Coop Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Garden Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Khayaban-e-Amin',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Harbanspura',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Ferozepur Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Architects Engineers Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Lalazaar Garden',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Marghzar Officers Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Tajpura',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Lake City',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'GT Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bismillah Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Cavalry Ground',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Divine Gardens',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Faisal Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'PIA Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Jubilee Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Canal Bank Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mughalpura',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Defence Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Multan Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Park View Villas',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Islampura',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'PCSIR Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'EME Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Tariq Gardens',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bedian Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Nasheman-e-Iqbal',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Lahore Garden Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Punjab Govt Employees Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'NFC 1',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Nishtar Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Main Canal Bank Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bahria Nasheman',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Al Hafeez Gardens',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Sui Gas Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'College Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Shahdara',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Ghous Garden',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Ichhra',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Izmir Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Lalazar',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Kahna',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'OPF Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Taj Bagh Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Revenue Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Walton Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Manawan',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Punjab Govt Servant Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Green Cap Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Audit & Accounts Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Aashiana Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Punjab University Employees Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bankers Co-operative Housing Society',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Larkana

  await db.Area.create({
    name: 'Larkana',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Khaliq Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Empire Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Doctors Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }

      ])
    })

  // Layyah

  await db.Area.create({
    name: 'Layyah',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Lodhran

  await db.Area.create({
    name: 'Lodhran',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Kahror Pakka Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Multan Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'National Highway 5',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Mandi Bahauddin

  await db.Area.create({
    name: 'Mandi Bahauddin',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Model Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Wasu Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sultan Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Lila Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gilani Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Malakwal',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Doctor Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gondal Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'New Rasool Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Arshad Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Phalia Mandi Bahauddin Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Old Rasool Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Hamza Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jail Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sargodha Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Lodhran

  await db.Area.create({
    name: 'Mangla',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Mansehra

  await db.Area.create({
    name: 'Mansehra',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mansehra International College Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Karakoram Highway',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Chikriyali Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })

  // Mardan

  await db.Area.create({
    name: 'Mardan',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Green Acres Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Charsadda Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Irum Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Shamsi Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Nisata Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Nowshera Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Sharifabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Baghdada',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bicket Gunj',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Katlung Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Canal Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mardan Khas',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Sugar Mill Bypass Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Cantt',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Guli Bagh Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Ring Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'GT Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Baghdada Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Shergarh',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Mall Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Bijli Ghar',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Janabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Hoti',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      },
      {
        name: 'Par Hoti',
        title: 'Area',
        titleL1: '',
        level: 3,
        nameL1: '',
        ParentId: city.id
      }

      ])
    })
  // Mian Chanuu

  await db.Area.create({
    name: 'Mian Channu',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })
  // Mianwali

  await db.Area.create({
    name: 'Mianwali',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Kalabagh',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }

      ])
    })

  // Mirpur Khas

  await db.Area.create({
    name: 'Mirpur Khas',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Hyderabad Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Satellite Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Liaqat Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Sir Syed Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Teen Talwar Jarwari Shakh',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Walkert Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Nai Para',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Khipro Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Saad Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Ali Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Gharibabad',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        }
      ])
    })

  // Mirpur

  await db.Area.create({
    name: 'Mirpur',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Haul Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sector F-2',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }

      ])
    })
  // Multan

  await db.Area.create({
    name: 'Multan',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Wapda Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Multan Public School Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Shalimar Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Garden Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Zakariya Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Buch Executive Villas',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Shah Rukn-e-Alam Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Bahadurpur',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Purana Shujabad Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'MA Jinnah Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Bosan Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Khanewal Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'New Shalimar Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Model Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Al Mustafa Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Askari Bypass',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Pearl City',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Nawabpur Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Piran Ghaib Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'New Multan',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Al Quresh Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sabzazar Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Gulgasht Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Satellite Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Niaz Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sameeja Abad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sher Shah Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Tariq Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Nasheman Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Khan Village',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Jahangirabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Old Shujabad Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Meherban Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Mujahid Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Qasim Bela',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Gulshan-e-Mehar',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Cantt',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Jalilabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Vehari Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Bahawalpur Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Bodla Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Galaxy Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Shah Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Bilal Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Chowk Kumharanwala',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'MDA Co-operative Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Punjab Govt Servants Housing Foundation Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'North Gulgasht',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Punjab Small Industries',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Askari Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Airport Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Suraj Miani Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Chungi No 9',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Bukhari Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Shamasabad Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sadiqabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Wapda Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Fort Avenue',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Southern Bypass',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Altaf Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'BZU Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Lodhi Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Jamilabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'MDA Chowk',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Mukhtar Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Chowk Nagshah',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Green Homes',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Fatima Jinnah Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Basti Kayaan Pur',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Chah Boharwala',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Dera Adda',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Northern Bypass',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Hassanabad Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Naqshband Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Peoples Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Mumtazabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Muzaffargarh Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Qaiserabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }
      ])
    })

  // Muridke

  await db.Area.create({
    name: 'Muridke',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },

        {
          name: 'Canal Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Galla Mandi',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        }

      ])
    })

  // Murree

  await db.Area.create({
    name: 'Murree',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Murree Expressway',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''

        },
        {
          name: 'Bhurban',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Ayubia Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Kashmir Point',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Pindi Point',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Murree City',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Ghora Gali',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Kashmiri Mohalla',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Murree Improvement Trust Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Gharial Camp',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Angoori Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Cuart Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Darya Gali',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Murree Resorts',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Lower Jhika Gali Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Mall Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Jhika Gali',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'GPO Chowk',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Wapda Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Ihata Noor Khan',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        }
      ])
    })
  // Muzaffarabad

  await db.Area.create({
    name: 'Muzaffarabad',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Muzzaffarabad City',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Center Gojra',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }

      ])
    })
  // Muzaffargarh

  await db.Area.create({
    name: 'Muzaffarabad',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Chowk Sarwar Shaheed',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        }
      ])
    })
  // Nankana Sahib

  await db.Area.create({
    name: 'Nankana Sahib',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }

      ])
    })
  // Narowal

  await db.Area.create({
    name: 'Narowal',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Judicial Complex Narowal',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Circular Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Zafarwal Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        }
      ])
    })
  // Nasirabad

  await db.Area.create({
    name: 'Nasirabad',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }

      ])
    })
  // Nawabshah

  await db.Area.create({
    name: 'Nawabshah',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Sanghar Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Afzal Shah Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Ghulam Hyder Shah Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'DCO Secretrait Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Mariam Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Mian Qazi Ahmed Mor',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Daulat Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Azim Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Bhangwar Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Sakrand Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Jam Sahib Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        }
      ])
    })
  // Nowshera

  await db.Area.create({
    name: 'Nowshera',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Pabbi',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Armour Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Cantt',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Hakimabad',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Madina Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Risalpur Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Badrashi',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Azakhel',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'GT Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        }
      ])
    })

  // Okara

  await db.Area.create({
    name: 'Okara',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Ayub Park',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'GT Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Hassan Block',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Green City',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Ameer Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Shah Din Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Jawad Avenue',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Al-Raheem City',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Al Kheer City',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Government Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Khan Colony Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Depalpur Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'One 4-L Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Ali Orchard',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Javed Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Canal View',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: '2/4-L Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Shalimar Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Rahim Karim Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Aziz Yaqoob Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Gulberg City',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Al Qadoos Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Karem Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Faisalabad Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Akbar Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Benazir Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Haroon Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Gulshan Fatima',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Fateh Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Azhar Residences',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Usman Block',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Rehmat Ullah Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Model Cooperative Housing Society',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Imran Akram Villas',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Makkah Madina Town 1',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Dar-ul-Ehsan',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Model Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Saad City',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Al Rehman Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Mohammad Ali Jinnah Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Sukh Chain Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Umer Din Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Basti Baba Mehardin',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        },
        {
          name: 'Cantt',
          title: 'Area',
          titleL1: '',
          level: 3,
          ParentId: city.id,
          nameL1: ''
        }
      ])
    })
  // Pakpatan

  await db.Area.create({
    name: 'Pakpatan',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Green Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Pine Valley',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }
      ])
    })
  // Peshawar

  await db.Area.create({
    name: 'Peshawar',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Warsak Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Ring Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Dalazak Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Gulbahar',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Doranpur',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Pajagi Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Al Haram Model Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Dora Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Gulberg',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Muslim City',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'University Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Academy Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Kohati Gate',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Ijazabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Charsadda Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Cantt',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Tajabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Latifabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Pakha Ghulam',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Canal Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Regi Model Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Govt. Superior Science College Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Phandu Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Kakshal',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'New City Homes',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Shami Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Afghan Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'GT Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Defence Officer Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Madina Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Askari 6',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Shinwari Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Zaryab Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'University Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Old Bara Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Swati Gate',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Wapda Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sher Ali Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Nasir Bagh Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Zargarabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Pahari Pora',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Nishterabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Eid Gah Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Wazir Bagh Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Gunj',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Qissa Khawani Bazar',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Momin Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Irshadabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Yakatoot',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Saddar',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Mall Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Hussain Abad Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Arbab Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'OPF Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Lahori Gate',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Rashid Garhi',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sarki Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Tehkal',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Hashtnagri',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Nothia Jadeed',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Professor Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Gulbahar Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sethi Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Kohat Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Civil Quarters',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Waris Abad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sunehri Masjid Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Ashrafia Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Nothia Qadeem',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Ijaz Abad Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Saeedabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'City Circular Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Tehsil Park',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Bashirabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Landi Arbab',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'AWT Housing Scheme Badabair',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Rahatabad',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Bamba Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }
      ])
    })
  // Pir Mahal

  await db.Area.create({
    name: 'Pir Mahal',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }

      ])
    })
  // Quetta

  await db.Area.create({
    name: 'Quetta',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([{
        name: 'Nawai Killi Bhittani',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Jinnah Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Baleli Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Chilten Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Shahbaz Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sirki Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Kasi Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Gulshan-e-Jinnah',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Spinny Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Jan Mohammad Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Others',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Wapda Colony',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Arbab Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Arif Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Faqeer Mohammad Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Patel Bagh',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Defence Officers Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Kawari Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Essa Nagri',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Killi Paind Khan Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Garden Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Nawa Killi Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Satellite Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Airport Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'McConaghey Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sariab',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Quetta Avenue',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Sabzal Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Gulshan-e-Afrasyab',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Khaizi',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Zarghoonabad Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Stewart Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Akhtar Muhammad Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Pashtun Bagh',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Balochi Street',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'New Al Gillani Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Green Town',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Al-Khair Housing Scheme',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      },
      {
        name: 'Masjid Road',
        title: 'Area',
        titleL1: '',
        level: 3,
        ParentId: city.id,
        nameL1: ''
      }
      ])
    })

  // Rahim Yar Khan
  await db.Area.create({
    name: 'Rahim Yar Khan',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([
        {
          name: 'Khanpur Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Abbasia Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulshan-e-Iqbal',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jinnah Park',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Fazeelat Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Abu Dhabi Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Allama Iqbal Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulshan-e-Usman Society',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Canal Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Abbasia Bungalows',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Khanpur Adda',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Shanwaz Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sakhi Sarwar Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Hassan Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Satellite Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Shahbaz Pur Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sadiq Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Thali Chowk',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Airport Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Zafar Abad Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Rahim Yar Khan Bypass',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Rehmat Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Hafiz Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Niazi Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Christian Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Babar Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulshan-e-Nasir',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Haji Mohammad Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Rehmat Niazi Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Habib Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ittehad Garden',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Officers Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chak 11P East',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }

      ])
    })

  // Ranjanpur
  await db.Area.create({
    name: 'Ranjanpur',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([
        {
          name: 'Kachehri Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Manzoor Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }

      ])
    })

  // Rawalpindi
  await db.Area.create({
    name: 'Rawalpindi',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Adiala Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Airport Housing Society',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Media Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Capital Smart City',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chaklala Scheme',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulshan Abad',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulraiz Housing Scheme',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Satellite Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Islamabad Highway',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Range Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Askari 14',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Muslim Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Misryal Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Westridge',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Peshawar Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chakri Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Khayaban-e-Sir Syed',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Defence Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Shalley Valley',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Girja Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Khurram Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chakra Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulzar-e-Quaid Housing Society',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Lalazar',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'New Lalazar',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Afshan Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Samarzar Housing Society',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhok Sayedan Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhok Paracha',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Farooq-e-Azam Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhoke Syedan',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulshan-e-Iqbal',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Allahabad Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Shakrial',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulistan Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Peer Meher Ali Shah Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhoke Hassu',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhok Kashmirian',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Askari 13',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sadiqabad',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Rail View Housing Society',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Tulsa Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Affandi Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Lalazar 2',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Pindora',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chakra',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Caltex Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhamyal Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhoke Gangal',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Model Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Rawat',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sir Syed Chowk',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Palm City',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Saddar',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'High Court Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Askari 12',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Faisal Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhok Gujran',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Askari 10',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhok Kala Khan',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'KRL Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bakra Mandi',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Harley Street',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'People Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ayub Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhok Elahi Baksh',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dhoke Khabba',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Janjua Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Railway Scheme 9',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Kurri Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ghaziabad',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bostan Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Lalarukh Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'New Afzal Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Murree Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Liaquat Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Mumtaz Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Morgah',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ali Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Rohri
  await db.Area.create({
    name: 'Rohri',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }

      ])
    })

  // Sadiqabad
  await db.Area.create({
    name: 'Sadiqabad',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Tillu Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Model Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'KLP Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Manthar Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jamaldin Wali Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ahmadpur Lumma',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Sahiwal
  await db.Area.create({
    name: 'Sahiwal',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

        {
          name: 'Farid Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Kot Khadim Ali Shah',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Pak Avenue Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Rafi Gardens',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Tariq Bin Ziad Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Razzaq Villas Housing Scheme',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Palm View Housing Society',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Fateh Sher Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Arra Tulla Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Shadman Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Naiki Midhali Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulistan Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Kot Allah Din',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Model Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Muslim Bin Aqeel Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sahiwal - Faisalabad Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chak 82/6R',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Royal Palm City Sahiwal',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Mohalla Noor Park',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Habib Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Shadab Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Lalazar Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bilal Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bashir Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulshan Ali Housing Scheme',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Al Razzaq Executive',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sultan Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Fateh Sher Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Saeed Ullah Mokal Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Arifwala Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Pakpatan Bazar',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Officers Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Al Razzaq Royals Housing Scheme',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Garden Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Karabla Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Farid Town Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jahaz Ground',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'GT Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'High Street',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gulshan-e-Zainab',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'College Chowk',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Hussainabad Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chak 86/6-R',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Small Industries State',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ansar Gali',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Canal View Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Midhali',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'M.S Homes',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chak 85/6-R',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Dispensary Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Chak 90/9L',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Canal Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Noor Shah Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Medical College Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Haseeb Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Pakpattan Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Tufail Shaheed Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Jhall Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Canal Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Nai Abadi',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Girls College Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Johar Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ganj Shakar Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Gol Chakar',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }
      ])
    })

  // Sarai Alamgir
  await db.Area.create({
    name: 'Sarai Alamgir',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([
        {
          name: 'Others',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }

      ])
    })

  // Sarghoda
  await db.Area.create({
    name: 'Sarghoda',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([
        {
          name: 'Iqbal Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id

        },
        {
          name: 'Farooq Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Faisalabad Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: '14 Block',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Block 9',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'New Satellite Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: '23-A Block',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sargodha to Bhalwal Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Maqam-e-Hayat',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Khayaban-e-Naveed',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Satellite Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Asad Park',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Bissmillah Park',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Lahore Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Javed Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Kot Fareed Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'University Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Khayaban-e-Sadiq',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Old Civil Lines',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Officers Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Muhafiz Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sargodha to Sillanwali Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Fatima Jinnah Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Ikram Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Queens Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: '24 Block',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Shaheenabad Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: '31 Block',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Khayaban-e-Shair',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Mohammadi Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Al Fareed Garden',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Siraj Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Qainchi Mor',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Roshaan Homes',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: '15 Block',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Sargodha Bypass',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Waris Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Canal Park',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Istaqlalabad Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Shadman Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: '33 Block',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Stadium Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Society Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Aziz Bhatti Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Block Y',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Qartaba Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Johar Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Model Town Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Wapda Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Block W',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Aheer Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Corporation Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'PAF Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Madina Town',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Khushab Road',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Services Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        },
        {
          name: 'Aziz Colony',
          title: 'Area',
          titleL1: '',
          level: 3,
          nameL1: '',
          ParentId: city.id
        }

      ])
    })

  // Sarghoda
  await db.Area.create({
    name: 'Sarghoda',
    title: 'City',
    titleL1: '',
    level: 2,
    nameL1: '',
    ParentId: 1
  })
    .then((city) => {
      db.Area.bulkCreate([

      ])
    })

  // ******************
  // ProductCategories
  // ******************
  await db.ProductCategory.create({
    title: 'HomeConstruction',
    titleL1: 'HomeConstruction',
    level: 1,
    slug: 'HomeConstruction',
    singularName: 'HomeConstruction',
    singularNameL1: 'HomeConstruction'
  }).then(async (category) => {
    await db.ProductCategory.create({
      title: 'Construction Materials',
      titleL1: 'Construction Materials',
      level: 2,
      slug: 'ConstructionMaterials',
      singularName: 'Construction Materials',
      singularNameL1: 'Construction Materials',
      ParentCategoryId: category.id
    })
  })

  await db.ProductCategory.findOne({
    where: { slug: 'ConstructionMaterials' },
    raw: true
  })
    .then(async (category) => {
      await db.ProductCategory.bulkCreate([{
        title: 'Metals',
        titleL1: 'Metals',
        level: 3,
        slug: 'Metals',
        singularName: 'Metals',
        singularNameL1: 'Metals',
        ParentCategoryId: category.id
      },
      {
        title: 'Electrical',
        titleL1: 'Electrical',
        level: 3,
        slug: 'Electrical',
        singularName: 'Electrical',
        singularNameL1: 'Electrical',
        ParentCategoryId: category.id
      },
      {
        title: 'Tiles',
        titleL1: 'Tiles',
        level: 3,
        slug: 'Tiles',
        singularName: 'Tiles',
        singularNameL1: 'Tiles',
        ParentCategoryId: category.id
      },
      {
        title: 'PVC Pipes',
        titleL1: 'PVC Pipes',
        level: 3,
        slug: 'PVC Pipes',
        singularName: 'PVC',
        singularNameL1: 'PVC',
        ParentCategoryId: category.id
      },
      {
        title: 'Water System',
        titleL1: 'Water System',
        level: 3,
        slug: 'Water System',
        singularName: 'Water System',
        singularNameL1: 'Water System',
        ParentCategoryId: category.id
      },
      {
        title: 'Electrical System',
        titleL1: 'Electrical System',
        level: 3,
        slug: 'Electrical System',
        singularName: 'Electrical System',
        singularNameL1: 'Electrical System',
        ParentCategoryId: category.id
      },
      {
        title: 'Texture Coating',
        titleL1: 'Texture Coating',
        level: 3,
        slug: 'Texture Coating',
        singularName: 'Texture Coating',
        singularNameL1: 'Texture Coating',
        ParentCategoryId: category.id
      },
      {
        title: 'Residential',
        titleL1: 'Residential',
        level: 3,
        slug: 'Residential',
        singularName: 'Residential',
        singularNameL1: 'Residential',
        ParentCategoryId: category.id
      },
      {
        title: 'PPR Pipes and Fittings',
        titleL1: 'PPR Pipes and Fittings',
        level: 3,
        slug: 'PPR Pipes and Fittings',
        singularName: 'PPR Pipes and Fittings',
        singularNameL1: 'PPR Pipes and Fittings',
        ParentCategoryId: category.id
      },
      {
        title: 'PP Sound Proof Push Fit Pipes & Fittings',
        titleL1: 'PP Sound Proof Push Fit Pipes & Fittings',
        level: 3,
        slug: 'PP Sound Proof Push Fit Pipes & Fittings',
        singularName: 'PP Sound Proof Push Fit Pipes & Fittings',
        singularNameL1: 'PP Sound Proof Push Fit Pipes & Fittings',
        ParentCategoryId: category.id
      },
      {
        title: 'UPVC Solvent Fit Pipes and Fittings',
        titleL1: 'UPVC Solvent Fit Pipes and Fittings',
        level: 3,
        slug: 'UPVC Solvent Fit Pipes and Fittings',
        singularName: 'UPVC Solvent Fit Pipes and Fittings',
        singularNameL1: 'UPVC Solvent Fit Pipes and Fittings',
        ParentCategoryId: category.id
      },
      {
        title: 'UPVC Push Fit Pipes and Fittings',
        titleL1: 'UPVC Push Fit Pipes and Fittings',
        level: 3,
        slug: 'UPVC Push Fit Pipes and Fittings',
        singularName: 'UPVC Push Fit Pipes and Fittings',
        singularNameL1: 'UPVC Push Fit Pipes and Fittings',
        ParentCategoryId: category.id
      },
      {
        title: 'Solvent Cements',
        titleL1: 'Solvent Cements',
        level: 3,
        slug: 'Solvent Cements',
        singularName: 'Solvent Cements',
        singularNameL1: 'Solvent Cements',
        ParentCategoryId: category.id
      },
      {
        title: 'Brass valves',
        titleL1: 'Brass valves',
        level: 3,
        slug: 'Brass valves',
        singularName: 'Brass valves',
        singularNameL1: 'Brass valves',
        ParentCategoryId: category.id
      },
      {
        title: 'Sewerage Back Flow Preventive Valves',
        titleL1: 'Sewerage Back Flow Preventive Valves',
        level: 3,
        slug: 'Sewerage Back Flow Preventive Valves',
        singularName: 'Sewerage Back Flow Preventive Valves',
        singularNameL1: 'Sewerage Back Flow Preventive Valves',
        ParentCategoryId: category.id
      },
      {
        title: 'HDPE Corrugated',
        titleL1: 'HDPE Corrugated',
        level: 3,
        slug: 'HDPE Corrugated',
        singularName: 'HDPE Corrugated',
        singularNameL1: 'HDPE Corrugated',
        ParentCategoryId: category.id
      }])
    })

  db.ProductCategory.findOne({
    where: { title: 'Metals' },
    raw: true
  })
    .then((category) => {
      db.ProductCategory.bulkCreate([{
        title: 'Steel & Iron Bars',
        titleL1: 'Steel & Iron Bars',
        level: 4,
        slug: 'Steel & Iron Bars',
        singularName: 'Steel & Iron Bars',
        singularNameL1: 'Steel & Iron Bars',
        ParentCategoryId: category.id
      },
      {
        title: 'Aluminium',
        titleL1: 'Aluminium',
        level: 4,
        slug: 'Aluminium',
        singularName: 'Aluminium',
        singularNameL1: 'Aluminium',
        ParentCategoryId: category.id
      }])
    })

  // await db.Property.bulkCreate(properties)
  // await db.Launching.bulkCreate(properties)

  // db.PropertyHasCategory.bulkCreate([{
  //   PropertyId: 1,
  //   CategoryId: 1
  // },
  // {
  //   PropertyId: 1,
  //   CategoryId: 2
  // },
  // {
  //   PropertyId: 2,
  //   CategoryId: 8
  // },
  // {
  //   PropertyId: 2,
  //   CategoryId: 9
  // },
  // {
  //   PropertyId: 3,
  //   CategoryId: 13
  // },
  // {
  //   PropertyId: 3,
  //   CategoryId: 14
  // },
  // {
  //   PropertyId: 4,
  //   CategoryId: 1
  // },
  // {
  //   PropertyId: 4,
  //   CategoryId: 3
  // },
  // {
  //   PropertyId: 5,
  //   CategoryId: 1
  // },
  // {
  //   PropertyId: 5,
  //   CategoryId: 2
  // }
  // ])

  // db.PropertyHasArea.bulkCreate([{
  //   PropertyId: 1,
  //   AreaId: 2
  // },
  // {
  //   PropertyId: 1,
  //   AreaId: 15
  // },
  // {
  //   PropertyId: 2,
  //   AreaId: 36
  // },
  // {
  //   PropertyId: 2,
  //   AreaId: 37
  // },
  // {
  //   PropertyId: 3,
  //   AreaId: 38
  // },
  // {
  //   PropertyId: 3,
  //   AreaId: 40
  // },
  // {
  //   PropertyId: 4,
  //   AreaId: 558
  // },
  // {
  //   PropertyId: 4,
  //   AreaId: 574
  // },
  // {
  //   PropertyId: 5,
  //   AreaId: 41
  // },
  // {
  //   PropertyId: 5,
  //   AreaId: 51
  // }
  // ])

  // db.PropertyAmenity.bulkCreate([{
  //   PropertyId: 1,
  //   AmenityPropertyId: 10,
  //   value: 5
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 11,
  //   value: 3
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 12,
  //   value: 1
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 13,
  //   value: 1
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 14,
  //   value: 4
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 15,
  //   value: 1
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 16,
  //   value: 3
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 17,
  //   value: 1
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 18,
  //   value: 2
  // },
  // {
  //   PropertyId: 1,
  //   AmenityPropertyId: 19,
  //   value: 1
  // }
  // ])
  // db.LaunchingHasArea.bulkCreate([{
  //   LaunchingId: 1,
  //   AreaId: 2
  // },
  // {
  //   LaunchingId: 1,
  //   AreaId: 15
  // },
  // {
  //   LaunchingId: 2,
  //   AreaId: 36
  // },
  // {
  //   LaunchingId: 2,
  //   AreaId: 37
  // },
  // {
  //   LaunchingId: 3,
  //   AreaId: 38
  // },
  // {
  //   LaunchingId: 3,
  //   AreaId: 40
  // },
  // {
  //   LaunchingId: 4,
  //   AreaId: 558
  // },
  // {
  //   LaunchingId: 4,
  //   AreaId: 574
  // },
  // {
  //   LaunchingId: 5,
  //   AreaId: 41
  // },
  // {
  //   LaunchingId: 5,
  //   AreaId: 51
  // }
  // ])

  db.Area.findAll({ raw: true })
    .then((resp) => {
      for (let i = 0; i < resp.length; i++) {
        let id = resp[i].id
        const name = resp[i].name
        let slug = name.replace(/ /g, '-')
        slug = slug + '-' + id
        let data = { slug: slug }
        db.Area.update(data, { where: { id: id } }).then().catch(e => console.log(e))
      }
    })
  let data = [{
    title: 'Home',
    pageTitle: 'Home',
    pageIdentifier: 'home',
    tags: [{
      title: 'Meta Description',
      key: 'meta-description',
      value: 'Properties In Pakistan, Properties for Sale, Properties For Rent'
    }]
  },
  {
    title: 'Property Listing',
    pageTitle: 'Property Listing',
    pageIdentifier: 'property-listing',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'Properties In Pakistan, Properties for Sale'
      }
    ]
  },
  {
    title: 'Project Listing',
    pageTitle: 'Project Listing',
    pageIdentifier: 'project-listing',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'Properties In Pakistan, Building for Sale, Flat For Sale, Flat for Rent, Housig Scheme Homes, Plots'
      }
    ]
  },
  {
    title: 'Launching Listing',
    pageTitle: 'Launching Listing',
    pageIdentifier: 'launching-listing',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'Future Projects In Pakistan, Building for Sale, Flat For Sale, Flat for Rent, Housig Scheme Homes, Plots, Rent'
      }
    ]
  },
  {
    title: 'Offers Listing',
    pageTitle: 'Offers Listing',
    pageIdentifier: 'offers-listing',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'Discount Offers, Building for Sale, Flat For Sale, Flat for Rent, Housig Scheme, Homes, Plots, Rent'
      }
    ]
  },
  {
    title: 'Launch Projects',
    pageTitle: 'Launch Projects',
    pageIdentifier: 'launch-projects',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'Future Projects In Pakistan, Building for Sale, Flat For Sale, Flat for Rent, Housig Scheme, Homes, Plots, Rent'
      }
    ]
  },
  {
    title: 'Mission',
    pageTitle: 'Mission',
    pageIdentifier: 'Mission',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'Buy a Property, Our Mission, Achievements'
      }
    ]
  },
  {
    title: 'Buy Property',
    pageTitle: 'Buy Property',
    pageIdentifier: 'buy-property',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'Properties In Pakistan, Building for Sale, Flat For Sale, Flat for Rent, Housig Scheme, Homes, Plots, Rent'
      }
    ]
  },
  {
    title: 'Sunday and Friday Offers',
    pageTitle: 'Sunday and Friday Offers',
    pageIdentifier: 'sunday-friday-offers',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'sunday Offers, Friday Offers, Special Discount, Buy Property, Rent Property'
      }
    ]
  },
  {
    title: 'Rent a Property',
    pageTitle: 'Rent a Property',
    pageIdentifier: 'rent-property',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'Property For Rent In Pakistan, Building for Rent, Flat For Rent, Form for Rent, Housig Scheme Homes, Plots, Rent'
      }
    ]
  },
  {
    title: 'Contact Us',
    pageTitle: 'Contact Us',
    pageIdentifier: 'contact-us',
    tags: [
      {
        title: 'Meta Description',
        key: 'meta-desription',
        value: 'contact us, Property Dealer, Buy Property, Rent Property, Sale Property, NearBy Sale Properties, NearBy Rent Properties'
      }
    ]
  }]

  let Data = data
  for (let i = 0; i < data.length; i++) {
    Data[i].tags = JSON.stringify(data[i].tags)
  }
  // Inserting PageMetaw
  db.PageMeta.bulkCreate(Data)
  db.TopConfig.bulkCreate([{
    identifier: 'TopProject',
    name: 'TopProject',
    nameL1: 'TopProject',
    price: 1500,
    validTillDay: 5
  },
  {
    identifier: 'TopAgency',
    name: 'TopAgency',
    nameL1: 'TopAgency',
    price: 1500,
    validTillDay: 5
  },
  {
    identifier: 'TopProperty',
    name: 'TopProperty',
    nameL1: 'TopProperty',
    price: 1500,
    showAtHomePrice: 2000,
    validTillDay: 5
  }])
}
