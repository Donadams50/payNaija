const Members = require('../Members/members.model.js')
const Notifications = require('../Notifications/notifications.model.js')
const Payments = require('../Payments/payments.model.js')

exports.markRead = async(req, res) =>{

    try{
        userId= req.user.id 
      

         const markread = await Notifications.markRead(userId)
         if(markread.affectedRows > 0){
            res.status(200).send({message:"Succesfull"})
         }
         else{
            res.status(400).send({message:"Service not available"})
         }
         
          
        }
       
    catch(err){
      console.log(err)
        res.status(500).send({message:"issues while marking as read"})
        
    }
  
    
}

exports.getNotification = async(req, res) =>{

    try{

        userId= req.user.id 
      

         const getNotification = await Notifications.getNotifications(userId)
        console.log(getNotification)
            res.status(200).send(getNotification)
        
         
          
        }
       
    catch(err){
      console.log(err)
        res.status(500).send({message:"issues while marking as read"})
        
    }
  
    
}

exports.getNotificationDetails = async(req, res) =>{

    try{

        userId= req.user.id 
      notificationDetails = {}

         const getNotification = await Notifications.getNotificationsDetails(req.params.id)
         console.log(getNotification[0])
        //  if(getNotification[0].title === 'Completed'){
        //  const getpayment =await Payments.getPayment(getNotification[0].paymentId)
        //   notificationDetails.imageUrl = getpayment[0].imageUrl
        //  }else{
        //        notificationDetails.imageUrl = "   "
        //  }
         notificationDetails.notification = getNotification[0]
        
        console.log(notificationDetails)
            res.status(200).send(notificationDetails)
        
         
          
        }
       
    catch(err){
      console.log(err)
        res.status(500).send({message:"issues while marking as read"})
        
    }
  
    
}
