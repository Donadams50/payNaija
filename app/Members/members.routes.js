module.exports = app =>{
    const member = require("../Members/members.controller");
  //  const authentication = require('../Helpers/authentication')
   const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
   const { verifyToken } = jwtTokenUtils;
    
   
   // Create a new member
    app.post("/member", member.create); 

   // to verify new member
     app.get("/verifyuser", member.verifyEmail)

   // Sign In member
     app.post("/authenticateuser", member.signIn); 

     app.post("/authenticateuser/admin", member.signInAdmin); 

    app.post("/forgotpassword", member.forgotPassword); 7

    app.post("/newpassword", member.setnewPassword); 

    app.post("/admin", member.createAdmin);

    app.post("/newadminpassword", member.changeAdminPassword); 
    

    // to get a user details
    app.get("/userdetails", verifyToken, member.getUserDetails)
     
}