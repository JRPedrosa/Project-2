//connect to the cloudinary cloud
const cloudinary = require("cloudinary").v2;

//requests of the type form-data -> to upload files through forms
const multer = require("multer");

//connects multer with cloudinary and allows to set the storage settings
const { CloudinaryStorage } = require ("multer-storage-cloudinary");

//authenticating in cloudinary using our subscription
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage =  new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "fithub_profiles",
        allowed_formats: ["png", "jpg"],
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});


module.exports = multer({ storage });
