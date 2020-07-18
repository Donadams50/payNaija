// import packages into the app. Express, body-parser, 
//const sql=require("./app/Database/db")
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());
const cors = require("cors");
const uuid = require('uuid')
app.use(cors()); 
const path = require('path')
const fileUpload=require('express-fileupload')
app.use(fileUpload())
// set static folder
app.use(express.static(path.join(__dirname, 'public')));
const axios = require('axios')






  require("./app/Members/members.routes.js")(app)
 
  require("./app/Payments/payments.routes.js")(app)

  require("./app/Notifications/notifications.routes.js")(app)

  // require('./app/Cloudinary/cloudinary.config.js')
  const multer = require("multer")
const cloudinary = require("cloudinary");
//const  { cloudinaryStorage } = require("multer-storage-cloudinary");

// const   cloudinary = require("multer-storage-cloudinary");

// const storage =  cloudinary({
//     folder: "paynaija",
//     allowedFormats: ["jpg", "png"],
//     transformation: [{ width: 500, height: 500, crop: "limit" }],
//     cloudinary: cloudinary
   
// });
// const parser = multer({
//     // storage: multer.diskStorage({}),
//     storage: storage,
//     // fileFilter:(req,file, cb)=>{
//     //     if(!file.mimetype.match(/jpe|jpeg|png|gif$i/)){
//     //         cb(new Error('file is not supported'), false)
//     //         return
//     //     }
//     //     cb(null, true )
//     // }
// })

   // const upload = require('./app/Cloudinary/multer.js')

// app.post('/image', parser.single('image'), async(req, res) =>{
//     try{
      
//       console.log(req.file)
//         res.status(200).send(req.file)
//         //res.json(req.file);
//     }catch(err){
//         console.log(err)
//         res.status(500).send({message:"Error while retrieving config"}) 
        
//     }
  
    
// })

// Connect to port
const port = process.env.PORT || 4000     

app.listen(port, ()=> console.log(`listening on port ${port}...`)); 