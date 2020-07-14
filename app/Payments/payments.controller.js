const Members = require('../Members/members.model.js')
const Payments = require('../Payments/payments.model.js')
const Notifications = require('../Notifications/notifications.model.js')


exports.create = async(req, res) =>{
    if (!req.body){
        res.status(400).send({message:"Content cannot be empty"});
    }
    console.log(req.body)
    console.log(req.user)
    const {   fName, lName , mName, country, state, stateZipCode, phoneNo, address, email, accountNumber, accountName, bankName } = req.body;
    const   userId = req.user.id
    if ( fName && lName && mName && country && state && stateZipCode && phoneNo && address && email && accountNumber && accountName && bankName){
        if ( fName==="" || lName==="" || mName==="" || country==="" ||  state==="" || stateZipCode==="" || phoneNo==="" || address==="" ||  email==="" || accountNumber==="" || accountName==="" || bankName==="" ){
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
                            const createnotification = await Notifications.createNotifications( userFor, isRead, message, userId)

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


exports.getAllPayment = async(req, res) =>{
   
    
  userId = req.user  
           
            try{
                     
                        const savedpayment =await Payments.create(payment, userId)
                        if (savedpayment.insertId>0){ 
                            let isRead = false;
                            let userFor = 1;
                            let message = 'New payment request from  '+req.user.fullName+'' 
                            const createnotification = await Notifications.createNotifications( userFor, isRead, message, userId)

                            res.status(201).send({message:"Payment created"})
                        }else{
                            res.status(400).send({message:"Error while creating member "})
                        }
                       
                  
                    
                
            }catch(err){
                console.log(err)
                res.status(500).send({message:"Error while creating pROFILE "})
            }
        
    
  
    
}