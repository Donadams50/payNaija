module.exports = app =>{
    const notifications = require("../Notifications/notifications.controller");
    
     const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
     const { verifyToken } = jwtTokenUtils;
      
     
    
  
    
       // to get all notification for user
     app.get("/notification", verifyToken, notifications.getNotification)

     app.get("/notification/:id", verifyToken, notifications.getNotificationDetails)

     app.post("/markread", verifyToken, notifications.markRead)
       
  }