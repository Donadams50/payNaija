const Members = require('../Members/members.model.js')
const Notifications = require('../Notifications/notifications.model.js')


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
         if(getNotification > 0){
            res.status(200).send(getNotification)
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


