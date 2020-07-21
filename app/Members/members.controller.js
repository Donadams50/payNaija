const Members = require('../Members/members.model.js')
const Notifications = require('../Notifications/notifications.model.js')
 const passwordUtils =require('../Helpers/passwordUtils');
 const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
//const btcconversion = require('../Helpers/btcconversion')
const sendemail = require('../Helpers/emailhelper.js');
// const { getConversionInBtc } = btcconversion;
// const { getConversionInUsd } = btcconversion;
// const Notify = require('../Helpers/notifications.js')
 const { signToken } = jwtTokenUtils;
const uuid = require('uuid')


// create member
exports.create = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
console.log(req.body)
    const {   email, password , country, phoneNo, fullName} = req.body;
  //  let {myrefCode} = req.query;

     const CodeNewUser = getReferralCode()
    // const refarralLink = 'http://localhost:8080/?refarralCode='+refarralCodeNewUser+''
    if ( email &&password && country && phoneNo && fullName){
        if ( email==="" || password==="" || phoneNo==="" || country==="" || fullName ==="" ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
        }else{
            const member = new Members ({
                email:email.toLowerCase(), 
                password: password,
                isVerified: false,
                code: 'PN-'+CodeNewUser+'',
                phoneNo: phoneNo,
                country: country,
                fullName: fullName
                // noOfTransactions:0,
                // refarralCode: refarralCodeNewUser,
                // refarralLink:refarralLink,
                // walletBalance: 0,
                

            });
            try{
                // check if user exists
                const isUserExist = await Members.findByUsername(req.body.email.toLowerCase() )
                if (isUserExist.length>0){
                    res.status(400).send({message:" Email already exists"})
                }else{
                    
                        member.password = await passwordUtils.hashPassword(req.body.password.toLowerCase());
                        const emailFrom = 'Pay  Naija    <noreply@paynaija.com>';
                        const subject = 'Succesful Registration link';                      
                        const hostUrl = "zen-cori-144e1e.netlify.app/"
                         const hostUrl2 = "https://zen-cori-144e1e.netlify.app/" 
                        //   const hostUrl = "localhost:8080"
                     //   const to = req.body.username;
                    const   text = "e're excited to have you get started. Your Registration to pay naija was successful. You can start sending money abroad with out stress "
                        const emailTo = req.body.email.toLowerCase();
                     const link = `${hostUrl}`;
                         const link2 = `${hostUrl2}`;
                         processEmail(emailFrom, emailTo, subject, link, link2, text);
                    
                   // if(sentemail === true){
                     
                        const savedmember =await Members.create(member)
                        if (savedmember.insertId>0){ 
                                // if(referralCode != ""){
                                //     const user = await Members.findByRefarralCode(referralCode) 
                                //   const  createRefarral =await Members.createRefarral(user[0].id, savedmember.insertId)
                                //   const  newMember =await Members.findById( savedmember.insertId)
                                    
                                //     let message = 'Congrats!!, you referred '+newMember[0].username+' you keep getting commision on all his investment' 
                                //     createNotification = await Notifications.createNotifications(user[0].id, message)
                                // }

                            res.status(201).send({message:"member created"})
                        }else{
                            res.status(400).send({message:"Error while creating member "})
                        }
                  ///  }
           //       else{
                //     res.status(500).send({message:"Error while creating member "})
                //  console.log("Email not sent , network error");
            //      }
                       
                  
                    
                }
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating pROFILE "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
}

// create member
exports.createAdmin = async(req,res)=>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
console.log(req.body)
    const {   username, password} = req.body;
  //  let {myrefCode} = req.query;

    // const refarralCodeNewUser = getReferralCode()
    // const refarralLink = 'http://localhost:8080/?refarralCode='+refarralCodeNewUser+''
    if ( username &&password){
        if ( username==="" || password==="" ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
        }else{
          
            try{
                // check if user exists
                const isUserExist = await Members.findAdminUser(username )
                if (isUserExist.length>0){
                    res.status(400).send({message:" Username  already exists"})
                }else{
                    
                        mpassword = await passwordUtils.hashPassword(req.body.password.toLowerCase());
                       
                        const savedadmin =await Members.createAdmin(username, mpassword )
                        if (savedadmin.insertId>0){ 

                            res.status(201).send({message:"Admin created"})
                        }else{
                            res.status(400).send({message:"Error while creating member "})
                        }
                  ///  }
           //       else{
                //     res.status(500).send({message:"Error while creating member "})
                //  console.log("Email not sent , network error");
            //      }
                       
                  
                    
                }
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating pROFILE "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
}
// verify email
exports.verifyEmail = async(req, res) =>{

    try{
       
        let {code , email} = req.query;
    console.log(code)
  
        if (username ==="" || code ===""){
            res.status(400).send({message:"user id not provided"}) 
        }else{

         const verifyemail = await Members.getCode(email , code)
            if (verifyemail.length > 0){
              //  console.log(verifyemail[0])
                if(verifyemail[0].isVerified === 1){
                    res.status(409).send({message:"this user has been verified ",  verifyemail});
                    

                }else{
                    const isVerified = true;
                    const verify = await Members.verifyEmail(email , code, isVerified)
                    console.log(verify)
                    res.status(200).send({message: "Congratulations!! Your email have been verified"})

                }

               
             
            }
            
            else{
                res.status(400).send({message:"issues while verifying email"}) 
            }
        }
           
          
        }
       
    catch(err){
      console.log(err)
        res.status(500).send({message:"issues while verifying email"})
        
    }
  
    
}

// User signIn
exports.signIn = async(req,res)=>{
    console.log(req.body)
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"})
    }
    const { email, password} = req.body
    if (email && password ){
        if (email===""||password===""){
            res.status(400).send({message:"Required fields cannot be empty"})
        }else{
            try{
                const user = await Members.findByEmail(email.toLowerCase())
                console.log(user)
                if (user.length<1){
                    res.status(400).send({message:"User not found"})
                }else{
                    const retrievedPassword = user[0].password
                    const userDetails = await Members.findDetailsByEmail(req.body.email.toLowerCase())
                    const {id , phoneNo,  email, country, fullName}= userDetails[0]
                    const isMatch = await passwordUtils.comparePassword(password.toLowerCase(), retrievedPassword);
                    console.log(isMatch)
                    if (isMatch){
                        const tokens = signToken(id, phoneNo, email, country, fullName) 
                         let user = userDetails[0]
                         const getnotifications = await Notifications.getNotifications(userDetails[0].id)
                        // const refarralDetails = await Members.findRefarral(userDetails[0].id)
                        // let status = "active"
                        //  const activeInvestment = await Investments.findInvestment(userDetails[0].id, status)
                        //  totalValueActiveInvestment = 0
                        //  for( var i = 0; i < activeInvestment.length; i++){
                        //     totalValueActiveInvestment = parseFloat(totalValue) + parseFloat(activeInvestment[i])

                        //  }
                      //   user.totalValueActiveInvestment = totalValueActiveInvestment;
                         // user.noOfRefarrals = refarralDetails.length;
                       //   user.activeInvestment = activeInvestment.length;
                          user.notificationLength = getnotifications.length
                          user.notifications = getnotifications
                            user.token = tokens;
                            
                            res.status(200).send(user)

                        
                      
                       
                    }else{
                        res.status(400).json({message:"Incorrect Login Details"})
                    }
                }
                
            }catch(err){
                console.log(err)
                res.status(500).json({message:"Service not available"})
            }  
        }
    }else{
        res.status(500).send({message:"Enter the required fields"})
    }
    
}

exports.signInAdmin = async(req,res)=>{
    console.log(req.body)
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"})
    }
    const { username, password} = req.body
    if (username && password ){
        if (username===""||password===""){
            res.status(400).send({message:"Required fields cannot be empty"})
        }else{
            try{
                const user = await Members.findAdminUser(username)
                console.log(user)
                if (user.length<1){
                    res.status(400).send({message:"User not found"})
                }else{
                    const retrievedPassword = user[0].password
                    const userDetails = await Members.findDetailsByEmail(username)
                    const {id , phoneNo,  email, country, fullName}= userDetails[0]
                    const isMatch = await passwordUtils.comparePassword(password.toLowerCase(), retrievedPassword);
                    console.log(isMatch)
                    if (isMatch){
                        const tokens = signToken(id, phoneNo, email, country, fullName) 
                         let user = userDetails[0]
                         const getnotifications = await Notifications.getNotifications(userDetails[0].id)
                        // const refarralDetails = await Members.findRefarral(userDetails[0].id)
                        // let status = "active"
                        
                        //  totalValueActiveInvestment = 0
                        //  for( var i = 0; i < activeInvestment.length; i++){
                        //     totalValueActiveInvestment = parseFloat(totalValue) + parseFloat(activeInvestment[i])

                        //  }
                      //   user.totalValueActiveInvestment = totalValueActiveInvestment;
                         // user.noOfRefarrals = refarralDetails.length;
                       //   user.activeInvestment = activeInvestment.length;
                      // user.numberofuser = numberofuser;
                          user.notificationLength = getnotifications.length
                          user.notifications = getnotifications
                            user.token = tokens;
                            
                            res.status(200).send(user)

                        
                      
                       
                    }else{
                        res.status(400).json({message:"Incorrect Login Details"})
                    }
                }
                
            }catch(err){
                console.log(err)
                res.status(500).json({message:"Service not available"})
            }  
        }
    }else{
        res.status(500).send({message:"Enter the required fields"})
    }
    
}

exports.forgotPassword = async(req,res)=>{
    let {email} = req.body
    console.log(email)
    try{
        const isCred = await Members.findByEmail(email.toLowerCase())
        const isMember = await Members.findDetailsByEmail(email.toLowerCase())
        console.log(isCred)
        console.log(isMember)
        if (isCred.length>0 && isMember.length>0){
           
           const code = uuid.v4()
           const emailFrom = 'Pay Naija  <noreply@paynaija.com>';
           const subject = 'Forgot password';                      
         // const hostUrl = " 192.168.43.70:8080"
        const hostUrl2 = "https://zen-cori-144e1e.netlify.app/" 
        const hostUrl = "zen-cori-144e1e.netlify.app/" 
         //  const to = req.body.username;
           const emailTo = req.body.email.toLowerCase();
           const link = `${hostUrl}/setnewpassword.html?email=${emailTo}&code=${code}`;
           const link2 = `${hostUrl2}/setnewpassword.html?email=${emailTo}&code=${code}`;
         //  const text = " "
             processEmail2(emailFrom, emailTo, subject, link, link2);
           // console.log(sentemail)
    //   if(sentemail === true){
        const saveForgetPasswordCode = await Members.saveForgetPasswordCode(email.toLowerCase() , code)
        console.log(saveForgetPasswordCode)
        if (saveForgetPasswordCode.affectedRows===1){
         
            res.status(200).send({message:" Verification Email sent "})
        }else{
            res.status(500).send({message:"Error saving forgot password code."})
        }   
        
          
     //  }
    //  else{
    // console.log("Email not sent , network error");
    //  }
          
     
       
        }else{
            res.status(400).send('User does not exist')
        }
        
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

// set new password

exports.setnewPassword = async(req,res)=>{
    let {email,  password, code} = req.body
   
    console.log(email)
    console.log(password)
    try{
        const isCred = await Members.findByEmail(email.toLowerCase())
        const isMember = await Members.findDetailsByEmail(email.toLowerCase())
        if (isCred.length>0 && isMember.length>0){
            const isCodeValid = await Members.findForgotPasswordCode(code,email.toLowerCase())
            if (isCodeValid.length>0){
            newpassword = await passwordUtils.hashPassword(password.toLowerCase());
           const updatePassword = await Members.updatePassword(email.toLowerCase(), newpassword)
           if (updatePassword.affectedRows===1){
           // const clearForgotPasswordCode = await Members.clearForgotPasswordCode(code, email.toLowerCase())  
                res.status(200).send({message:"Password updated"})
                    }else{
                        res.status(500).send({message:"Password forgot not updated"})
                    }   
                    
                }else{
                    res.status(400).send({message:"Forgot password code not valid"})
                }
       
        }else{
            res.status(400).send('User does not exist')
        }
        
    }catch(err){
        console.log(err)
        res.status(500).json({message:"An error occurred"})
    }
}

exports.changeAdminPassword = async(req,res)=>{
    let {username, password} = req.body
   
    console.log(username)
    console.log(password)
    try{
        const isCred = await Members.findAdminUser(username)
       
        if (isCred.length>0 ){
           
      
            newpassword = await passwordUtils.hashPassword(password.toLowerCase());
           const updatePassword = await Members.updateAdminPassword(username, newpassword)
           if (updatePassword.affectedRows===1){
           // const clearForgotPasswordCode = await Members.clearForgotPasswordCode(code, email.toLowerCase())  
                res.status(200).send({message:"Password updated"})
                    }else{
                        res.status(500).send({message:"Password forgot not updated"})
                    }       
       
        }else{
            res.status(400).send('User does not exist')
        }
        
    }catch(err){
        console.log(err)
        res.status(500).json({message:"An error occurred"})
    }
}





exports.getUserDetails = async(req,res)=>{

            try{
                const user = await Members.findByEmail(req.user.email.toLowerCase())
                console.log(user)
                if (user.length<1){
                    res.status(400).send({message:"User not found"})
                }else{
                   
                    const userDetails = await Members.findDetailsByEmail(req.user.email.toLowerCase())  
                         let user = userDetails[0]
                         const getnotifications = await Notifications.getNotifications(userDetails[0].id)
                         const refarralDetails = await Members.findRefarral(userDetails[0].id)
                         let status = "active"
                         const activeInvestment = await Investments.findInvestment(userDetails[0].id, status)
                         totalValueActiveInvestment = 0
                         for( var i = 0; i < activeInvestment.length; i++){
                            totalValueActiveInvestment = parseFloat(totalValue) + parseFloat(activeInvestment[i])

                         }
                         user.totalValueActiveInvestment = totalValueActiveInvestment;
                          user.noOfRefarrals = refarralDetails.length;
                          user.activeInvestment = activeInvestment.length;
                          user.notificationLength = getnotifications.length
                          user.notifications = getnotifications
                        
                            
                            res.status(200).send(user)

                        
                      
                       
                     
                }
                
            }catch(err){
                console.log(err)
                res.status(500).json({message:"Service not available"})
            }  
        
 
    
}




// process email one
async function processEmail(emailFrom, emailTo, subject, link, link2, text ){
    try{
        //create org details
        // await delay();
       const sendmail =  await sendemail.emailUtility(emailFrom, emailTo, subject, link, link2, text);
     //  console.log(sendmail)
        return sendmail
    }catch(err){
        console.log(err)
        return err
    }

}
// process email two
async function processEmail2(emailFrom, emailTo, subject, link, link2 ){
    try{
        //create org details
        // await delay();
       const sendmail =  await sendemail.emaiforgotPassword(emailFrom, emailTo, subject, link, link2);
     //  console.log(sendmail)
        return sendmail
    }catch(err){
        console.log(err)
        return err
    }

}


function getReferralCode(){
    var numbers = "0123456789";

    var chars= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
    var code_length = 6;
    var number_count = 3;
    var letter_count = 3;
  
    var code = '';
  
    for(var i=0; i < code_length; i++) {
       var letterOrNumber = Math.floor(Math.random() * 2);
       if((letterOrNumber == 0 || number_count == 0) && letter_count > 0) {
          letter_count--;
          var rnum = Math.floor(Math.random() * chars.length);
          code += chars[rnum];
       }
       else {
          number_count--;
          var rnum2 = Math.floor(Math.random() * numbers.length);
          code += numbers[rnum2];
       }
    }
return code
}