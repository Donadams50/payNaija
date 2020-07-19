module.exports = app =>{
    const payments = require("../Payments/payments.controller.js");
    const Members = require('../Members/members.model.js')
     const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
     const { verifyToken } = jwtTokenUtils;
      
     require('../Cloudinary/cloudinary.js')
    const upload = require('../Cloudinary/multer.js');
    

    //    to get all plan
    //    app.get("/notification", verifyToken, investments.getPlan)

     app.post("/payment", verifyToken, payments.create)

     app.get("/allpayment", verifyToken, payments.getAllPayment)

      app.get("/rate", verifyToken, payments.getRate)

     app.post("/rate", verifyToken, payments.createRate)

     app.post("/confirmpayment/:paymentId", verifyToken, payments.confirmPayment)

     app.post("/completepayment/:paymentId", verifyToken, upload.single("image") ,  payments.completePayment)

     app.put("/completepayment/:paymentId", verifyToken, upload.single("image") ,  payments.updatePayment)

     app.get("/payment/:paymentId", verifyToken, payments.allPayment)
  }