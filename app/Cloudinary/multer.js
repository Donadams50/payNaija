const multer = require("multer")
const cloudinary = require('cloudinary').v2;
const  { cloudinaryStorage }= require("multer-storage-cloudinary");

const storage =  cloudinaryStorage({
    folder: "paynaija",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
    cloudinary: cloudinary
   
});

module.exports = multer({
    // storage: multer.diskStorage({}),
    storage: storage,
    
})