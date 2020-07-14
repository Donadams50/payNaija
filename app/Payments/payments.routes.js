module.exports = app =>{
    const payments = require("../Payments/payments.controller.js");
    const Members = require('../Members/members.model.js')
     const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
     const { verifyToken } = jwtTokenUtils;
      
     
    
  
    
    //   // to get all plan
    //    app.get("/notification", verifyToken, investments.getPlan)

     app.post("/payment", verifyToken, payments.create)

     app.get("/allpayment", verifyToken, payments.getAllPayment)
       
  }