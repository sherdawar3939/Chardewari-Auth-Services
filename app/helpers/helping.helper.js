'use strict'

const config = require('../config/environment.config')
const AWS = require('aws-sdk')
const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const _ = require('lodash')
const fs = require('fs')

let newConfig = {
  jwtOptions: {
    'secretOrKey': config.jwtOptions.secretOrKey || process.env.secretOrKey,
    'ignoreExpiration': config.jwtOptions.ignoreExpiration || process.env.ignoreExpiration
  }
}

const awsConfig = config.awsConfig

const s3 = new AWS.S3({
  'accessKeyId': process.env.accessKeyId || awsConfig.accessKeyId,
  'secretAccessKey': process.env.secretAccessKey || awsConfig.secretAccessKey,
  'region': process.env.region || awsConfig.region
})

function uploadFile (file, name) {
  return new Promise(function (resolve, reject) {
    var stream = fs.createReadStream(file.path)
    if (!name) {
      name = Date.now().toString()
    }

    var data = {
      Key: name,
      ACL: 'public-read',
      Body: stream,
      ContentType: file.type,
      Bucket: process.env.Bucket || config.Bucket
    }
    s3.upload(data, function (err, data) {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const generatePassword = () => {
  let password = generator.generate({
    length: 7,
    numbers: true
  })
  return password
}

// sign jwt token
const signLoginData = (userInfo) => {
  return new Promise((resolve, reject) => {
    var token = jwt.sign(userInfo, newConfig.jwtOptions.secretOrKey, { expiresIn: 180000000 })
    return resolve(token)
  })
}

const resizeAndUploadPhotos = (photo, sizes = [], name = '') => {
  if (!sizes || sizes.length < 1 || !_.isArray(sizes)) {
    sizes = []
  }
  sizes = JSON.parse(JSON.stringify(sizes))

  let imageName = name ? name + '-' + Date.now().toString() : Date.now().toString() // For keeping the image name unique

  const uploadedImage = {
    url: '',
    ratio: []
  }
  return applyWatermark(photo)
    .then(async (originalPhoto) => {
      await originalPhoto.quality(97)
      sizes.unshift({ height: originalPhoto.bitmap.height, width: originalPhoto.bitmap.width, ratio: '' })

      for (let i = 0; i < sizes.length; i++) {
        const size = sizes[i]

        await originalPhoto.getBufferAsync('image/jpeg')
          .then(async (imageBuffer) => {
            const [image] = await Promise.all([
              jimp.read(imageBuffer)
            ])
            if (i > 0) {
              // if width height both are given then we will do crop otherwise we will only resize in else portion.
              if (size.width && size.height && !isNaN(size.width) && !isNaN(size.height)) {
                return image.cover(size.width, size.height).getBufferAsync('image/jpeg')
              } else {
                if (size.width && !isNaN(size.width)) { // if width is given then resize by width.
                  return resizeImage(image, size.width, jimp.AUTO)
                    .then((resizedImage) => {
                      return resizedImage.getBufferAsync('image/jpeg')
                    })
                } else if (size.height && !isNaN(size.height)) { // if height is given then resize by height.
                  return resizeImage(image, jimp.AUTO, size.height)
                    .then((resizedImage) => {
                      return resizedImage.getBufferAsync('image/jpeg')
                    })
                }
              }
            }
            return image.getBufferAsync('image/jpeg')
          })
          .then((image) => {
            return uploadFile1(image, imageName + size.ratio)
          })
          .then((uploadedData) => {
            if (!_.isEmpty(uploadedData) && uploadedData.Location) {
              if (i < 1) {
                uploadedImage.url = uploadedData.Location
              }
              if (size.ratio) {
                uploadedImage.ratio.push(size.ratio)
              }
            }
          })
      }
      uploadedImage.ratio = JSON.stringify(uploadedImage.ratio)
      return [uploadedImage]
    })
}

const resizeImage = async (image, width, height) => {
  if (!width) {
    width = jimp.AUTO
  }

  if (!height) {
    height = jimp.AUTO
  }
  return image.resize(width, height)
}

const applyWatermark = async (imageSource) => {
  console.log('Applying watermark')
  const [image, logo] = await Promise.all([
    jimp.read(imageSource),
    jimp.read('https://chardewaridev-assets.s3-ap-southeast-1.amazonaws.com/logo.png')
  ])

  // console.log('Before ===============================================>>>>>>> WIDTH ' + image.bitmap.width + ' <<<<<<<<<=====================================')
  // console.log(' Before ===============================================>>>>>>> HEIGHT ' + image.bitmap.height + ' <<<<<<<<<=====================================')

  // if image width is greater than 1024, reduce it's width to 1024
  if (image.bitmap.width > 1024) {
    await image.resize(1024, jimp.AUTO)
  }

  // set the watermark logo width according to image.
  await logo.resize(image.bitmap.width / 3, jimp.AUTO)

  const xCentre = image.bitmap.width / 2 // Get centre of image at x axis.
  const yCentre = image.bitmap.height / 2 // Get centre of image at y axis.

  const X = xCentre - logo.bitmap.width / 2 // To put the watermark at centre of image minus the half width of watermark from the centre of original image.
  const Y = yCentre - logo.bitmap.height / 2 // To put the watermark at centre of image minus the half width of watermark from the centre of original image.

  console.log('X ==== >  ' + X)
  console.log('Y ==== >  ' + Y)

  return image.composite(logo.opacity(0.4), X, Y, [
    {
      mode: jimp.BLEND_SOURCE_OVER,
      opacitySource: 0.1,
      opacityDest: 1
    }
  ])
}

const resizePhoto = async (photo, sizes = []) => {
  if (!sizes || sizes.length < 1) {
    sizes = []
  }
  sizes = JSON.parse(JSON.stringify(sizes))
  const uploadedImages = []

  if (sizes && _.isArray(sizes) && sizes.length > 0) {
    for (let i = 0; i < sizes.length; i++) {
      const size = sizes[i]

      await new Promise(function (resolve, reject) {
        // executor (the producing code, "singer")
        resolve(jimp.read(photo))
      })
        .then((image) => {
          if (size.width && size.height && !isNaN(size.width) && !isNaN(size.height)) {
            return image.cover(size.width, size.height).getBufferAsync('image/jpeg')
          } else {
            return resizeImage(image, size.width, jimp.AUTO).getBufferAsync('image/jpeg')
          }
        })
        .then((image) => {
          return uploadFile1(image)
        })
        .then((uploadedData) => {
          if (!_.isEmpty(uploadedData) && uploadedData.Location) {
            uploadedImages.push({
              url: uploadedData.Location,
              ratio: size.ratio || '0x'
            })
          }
          return true
        })
    }
  }

  return uploadedImages
}
module.exports.generatePassword = generatePassword
module.exports.signLoginData = signLoginData
module.exports.resizeAndUploadPhotos = resizeAndUploadPhotos
module.exports.uploadFile = uploadFile // upload using aws javascript sdk
module.exports.resizePhoto = resizePhoto
