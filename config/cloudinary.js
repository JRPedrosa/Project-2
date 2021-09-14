const cloudinary = require('cloudinary').v2;

// requests of type form-data (i'm sending a file in my request)
const multer = require('multer');

// Connect multer with cloudinary
const {
  CloudinaryStorage
} = require('multer-storage-cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'profiles',
    allowed_formats: ['jpg', 'png']
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const uploadCloud = multer({
  storage
});

module.exports = uploadCloud;