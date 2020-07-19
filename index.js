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
// const fileUpload=require('express-fileupload')
// app.use(fileUpload())
// set static
app.use(express.static(path.join(__dirname, 'public')));
const axios = require('axios')






  require("./app/Members/members.routes.js")(app)
 
  require("./app/Payments/payments.routes.js")(app)

  require("./app/Notifications/notifications.routes.js")(app)


    
 

    


// Connect to port
const port = process.env.PORT || 4000     

app.listen(port, ()=> console.log(`listening on port ${port}...`)); 