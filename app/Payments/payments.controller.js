const Members = require('../Members/members.model.js')
const Payments = require('../Payments/payments.model.js')
const Notifications = require('../Notifications/notifications.model.js')
const sendemail = require('../Helpers/emailhelper.js');
// create new payment
exports.create = async(req, res) =>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
    console.log(req.body)
    console.log(req.user)
    const {   fName, lName , mName, country, state, stateZipCode, phoneNo, address, email, accountNumber, accountName, bankName, amountNaira, amountDollar } = req.body;
    const   userId = req.user.id
    if ( fName && lName && mName && country && state && stateZipCode && phoneNo && address && email && accountNumber && accountName && bankName && amountNaira && amountDollar){
        if ( fName==="" || lName==="" || mName==="" || country==="" ||  state==="" || stateZipCode==="" || phoneNo==="" || address==="" ||  email==="" || accountNumber==="" || accountName==="" || bankName===""|| amountNaira === "" || amountDollar === ""){
            res.status(400).send({
                message:"Incorrect entry format"
            });
        }else{
            const payment = new Payments ({
                email: email.toLowerCase(), 
                fName: fName,
                lName: lName,
                mName: mName,
                phoneNo: phoneNo,
                country: country,
                stateZipCode: stateZipCode,
                state:state,
                address: address,
                accountNumber:accountNumber,
                accountName: accountName,
                status: "Pending",
                amountNaira: amountNaira,
                amountDollar: amountDollar,
                bankName: bankName
                // noOfRatings: 0,
                // walletBalanceUsd:0.0,
                // walletBalanceBtc: 0.0,
                // level: 1,
                // noOfTransactions:0,
                // totalRatings:0,
                // twoFactor: false,
                // escrowWalletUsd: 0.0

            });
            try{
    
           
               // processEmail(emailFrom, emailTo, subject, link, link2);
                    
                   // if(sentemail === true){
                     
                        const savedpayment =await Payments.create(payment, userId)
                        if (savedpayment.insertId>0){ 
                            let isRead = false;
                            let userFor = 1;
                            let message = 'New payment request from  '+req.user.fullName+''
                            let title = ' New payment request from  '+req.user.fullName+' ' 
                            let paymentId = savedpayment.insertId
                            const createnotification = await Notifications.createNotifications( userFor, isRead, message, userId, title , paymentId)
                        const subject = 'New payment request';                      
                        const hostUrl = "zen-cori-144e1e.netlify.app/"
                         const hostUrl2 = "https://zen-cori-144e1e.netlify.app/" 
                        //   const hostUrl = "localhost:8080"
                       const   text = ' A new payment has been submmited by '+req.user.fullName+', please log in to the admin dashboard to follow up'
                       const emailTo = "seyiekundayo879@gmail.com";
                       const emailFrom = 'Pay  Naija    <noreply@paynaija.com>';
                       const link = `${hostUrl}`;
                         const link2 = `${hostUrl2}`;
                                    processEmail(emailFrom, emailTo, subject, link, link2, text)
                            res.status(201).send({message:"Payment created"})
                        }else{
                            res.status(400).send({message:"Error while creating member "})
                        }
                  ///  }
           //       else{
                //     res.status(500).send({message:"Error while creating member "})
                //  console.log("Email not sent , network error");
            //      }
                       
                  
                    
                
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

// get all payment
exports.getAllPayment = async(req, res) =>{
   
    console.log(req.user)
 // userId = req.user  
           
            try{
                     
                        const  numberofuser = await Members.getNoOfUsers()
                        console.log(numberofuser)
                        if (numberofuser){ 
                            
                            res.status(200).send(numberofuser)
                        }else{
                            res.status(400).send({message:"Error while creating member "})
                        }
                       
                  
                 
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating pROFILE "})
            }
        
    
  
    
}

 // create rate
exports.createRate = async(req, res) =>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
    console.log(req.body)
    console.log(req.user)
    const {   rate } = req.body;
    const   userId = req.user.id
    if ( rate ){
        if ( rate===" "  ){
            res.status(400).send({
                message:"Incorrect entry format"
            });
        }else{
           
            try{
    
           
              
                     
                        const createrate =await Payments.createRate(rate, userId)
                        if (createrate.affectedRows >0){ 
                            // let isRead = false;
                            // let userFor = 1;
                            // let message = 'New payment request from  '+req.user.fullName+'' 
                            // const createnotification = await Notifications.createNotifications( userFor, isRead, message, userId)

                            res.status(201).send({message:"New rate  created"})
                        }else{
                            res.status(400).send({message:"Error while creating rate "})
                        }
             
                       
                  
                    
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating rate "})
            }
        }
    }else{
        res.status(400).send({
            message:"Incorrect entry format"
        });
    }
  
    
}
//get current rate
exports.getRate = async(req, res) =>{
  
           
            try{
                     
                        const getRate =await Payments.getRate()
                        console.log(getRate)
                        if (getRate.length>0){ 
                            
                            res.status(200).send(getRate)
                        }else{
                            res.status(400).send({message:"Error while getting rate "})
                        }
                       
                  
                    
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while getting rate "})
            }
        
    
  
    
}

// confirm payment
exports.confirmPayment = async(req, res) =>{

   try{
         
           
               // processEmail(emailFrom, emailTo, subject, link, link2);
                    
                   // if(sentemail === true){
                      const  paymentId = req.params.paymentId
                      const getpayment =await Payments.getPayment(paymentId)
                        const confirmpayment =await Payments.confirmPayment(paymentId)
                        if (confirmpayment.affectedRows>0){ 
                            let isRead = false;
                            let userFor = getpayment[0].userId;
                            let  userFrom = 1
                            let message = 'Payment received it will be sent shortly'
                            let title =  'Received'
                            
                            const createnotification = await Notifications.createNotifications( userFor, isRead, message, userFrom, title, paymentId)

                            res.status(201).send({message:"Payment created"})
                        }else{
                            res.status(400).send({message:"Error while creating member "})
                        }
                  ///}
           //       else{
                //     res.status(500).send({message:"Error while creating member "})
                //  console.log("Email not sent , network error");
            //      }
                       
                  
                    
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating pROFILE "})
            }
   
  
    
}



// complete payment
exports.completePayment = async(req, res) =>{

   try{
       console.log(req.file.url)
    //  const  random = Math.random().toString(36).slice(-8);
  
      //  console.log(req.files.files.data)
    //     if (!req.files){
    //      imgName = ""
    //      }
    //   else{
    //          const file = req.files.files;
    //          imgName = random+req.files.files.name;
    //          file.mv('public/images/'+imgName);
    //       }
           
               // processEmail(emailFrom, emailTo, subject, link, link2);
                    const imgName = req.file.url
                      const  paymentId = req.params.paymentId
                      const getpayment =await Payments.getPayment(paymentId)
                      const senderDetails =await Members.findById(getpayment[0].userId)
                        const completepayment =await Payments.completePayment(paymentId, imgName)
                        
                        if (completepayment.affectedRows>0){ 
                            let isRead = false;
                            let userFor = getpayment[0].userId;
                            let  userFrom = 1
                            let message = 'Payment has been sent succesfully to '+getpayment[0].fName+'  '+getpayment[0].lName+'' 
                            let title = 'Completed'
                            const createnotification = await Notifications.createNotificationsComplete( userFor, isRead, message, userFrom, title, paymentId, imgName)
                                  const emailFrom = 'Pay  Naija    <noreply@paynaija.com>';
                        const subject = 'Successful payment abroad';                      
                        const hostUrl = "zen-cori-144e1e.netlify.app/"
                         const hostUrl2 = "https://zen-cori-144e1e.netlify.app/" 
                        //   const hostUrl = "localhost:8080"
                       const   text = ' Your payment has been sent succesfully to '+getpayment[0].fName+'  '+getpayment[0].lName+' '
                       const emailTo = senderDetails[0].email;
                       const link = `${hostUrl}`;
                         const link2 = `${hostUrl2}`;
                                    processEmail(emailFrom, emailTo, subject, link, link2, text)
                            res.status(200).send({message:"Sent succesfully"})
                        }else{
                            res.status(400).send({message:"Error while completing payment "})
                        }
                    
                  ///}
           //       else{
                //     res.status(500).send({message:"Error while creating member "})
                //  console.log("Email not sent , network error");
            //      }
                       
                  
                    
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating pROFILE "})
            }
   
  
    
}
// edit payment

exports.updatePayment = async(req, res) =>{

    try{
     
         console.log(req.file.url)
  const imgName = req.file.url
       
                // processEmail(emailFrom, emailTo, subject, link, link2);
                       const  paymentId = req.params.paymentId
                       const getpayment =await Payments.getPayment(paymentId)
                       const senderDetails =await Members.findById(getpayment[0].userId)
                         const completepayment =await Payments.completePayment(paymentId, imgName)
                         
                         if (completepayment.affectedRows>0){ 
                             let isRead = false;
                             let userFor = getpayment[0].userId;
                             let  userFrom = 1
                             let message = 'Receipt of the payment you made to '+getpayment[0].fName+'  '+getpayment[0].lName+' has  been updated' 
                             let title = 'Receipt updated'
                             const createnotification = await Notifications.createNotificationsComplete( userFor, isRead, message, userFrom, title, paymentId, imgName)
                                   const emailFrom = 'Pay  Naija    <noreply@paynaija.com>';
                         const subject = 'Payment Receipt updated';                      
                         const hostUrl = "zen-cori-144e1e.netlify.app/"
                          const hostUrl2 = "https://zen-cori-144e1e.netlify.app/" 
                         //   const hostUrl = "localhost:8080"
                        const   text = ' Receipt of the payment you made to  '+getpayment[0].fName+'  '+getpayment[0].lName+' has  been updated , log in and check your notifications to view '
                        const emailTo = senderDetails[0].email;
                        const link = `${hostUrl}`;
                          const link2 = `${hostUrl2}`;
                                     processEmail(emailFrom, emailTo, subject, link, link2, text)
                             res.status(200).send({message:"Sent succesfully"})
                         }else{
                             res.status(400).send({message:"Error while completing payment "})
                         }
                     
                   ///}
            //       else{
                 //     res.status(500).send({message:"Error while creating member "})
                 //  console.log("Email not sent , network error");
             //      }
                        
                   
                     
                 
             }catch(err){
                 console.log(err)
                 res.status(500).send({message:"Error while creating pROFILE "})
             }
    
   
     
 }

//get payment by id
exports.allPayment = async(req, res) =>{
  
           
    try{
               const allPayment= {}
                const getpayment =await Payments.getPayment(req.params.paymentId)

                console.log(getpayment)
                if (getpayment.length>0){ 
                const getpaymet =await Payments.getPayment(req.params.paymentId)
                    const senderDetails =await Members.findById(getpayment[0].userId)
                        allPayment.receipientDetails = getpayment[0];
                         allPayment.senderDetails = senderDetails[0]
                    res.status(200).send(allPayment)
                }else{
                    res.status(400).send({message:"Error while getting rate "})
                }
               
          
            
        
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Error while getting rate "})
    }




}


async function processEmail(emailFrom, emailTo, subject, link, link2, text ){
    try{
        //create org details
        // await delay();
       const sendmail =  await sendemail.emailUtility(emailFrom, emailTo, subject, link, link2, text);
     // console.log(sendmail)
        return sendmail
    }catch(err){
        console.log(err)
        return err
    }

}