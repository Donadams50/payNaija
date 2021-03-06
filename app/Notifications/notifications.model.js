const sql=require("../Database/db");
const Notifications = function(){
    // this.escrowWalletUsd= members.escrowWalletUsd
    
}

Notifications.getNotifications= async function(userId){
    try{
  let isRead = false;
     
        const result = await sql.query('SELECT * from notifications where isRead =? AND userFor=? ', [isRead, userId])
                const data= result[0]
                return data
              
       
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

//set new password
Notifications.markRead= async function(userId){
    try{
         let isRead = true
        const result = await sql.query('update notifications set isRead=? where userFor=?',[isRead, userId])
        const data=result[0]
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

//create notifications

Notifications.createNotifications = async function(userFor, isRead, message, userId, title, paymentId){
    const connection = await sql.getConnection();
     await connection.beginTransaction();
    try
    {
        //console.log(newMember)
         const result = await connection.query('INSERT into notifications SET userFor=?, message=?, isRead=?, userFrom=? , title=? , paymentId=?', [userFor,message, isRead, userId, title, paymentId])
         console.log('---------------------------------referral created------------------------------------------------------------------------------------------------------')
             // create requests
           
             await connection.commit();
             return result[0]     
    }catch(err){
         await connection.rollback();
         console.log(err)
         return err
    }finally{
        connection.release();
    }
 }

 Notifications.createNotificationsComplete = async function(userFor, isRead, message, userId, title, paymentId, imgUrl){
    const connection = await sql.getConnection();
     await connection.beginTransaction();
    try
    {
        //console.log(newMember)
         const result = await connection.query('INSERT into notifications SET userFor=?, message=?, isRead=?, userFrom=? , title=? , paymentId=?, imageUrl=?', [userFor,message, isRead, userId, title, paymentId, imgUrl])
         console.log('---------------------------------referral created------------------------------------------------------------------------------------------------------')
             // create requests
           
             await connection.commit();
             return result[0]     
    }catch(err){
         await connection.rollback();
         console.log(err)
         return err
    }finally{
        connection.release();
    }
 }




Notifications.getNotifications= async function(userid){
    try{  
        let limit = 5
         let data = {}
     let isRead = false
      if(userid === 1){
          const result = await sql.query('SELECT * from notifications where userFor=? ORDER BY id DESC LIMIT '+limit+'', [userid])
     const result1 = await sql.query('SELECT * from notifications where userFor=? AND isRead=?', [userid, isRead])

      data.allNotifications = result[0];
      data.unReadLength = result1[0].length;
     return data;

     }else{
const result = await sql.query('SELECT * from notifications where userFor=? ORDER BY id DESC ', [userid])
     const result1 = await sql.query('SELECT * from notifications where userFor=? AND isRead=?', [userid, isRead])

      data.allNotifications = result[0];
      data.unReadLength = result1[0].length;
     return data;
     }
     
             
    }catch(err){
        console.log(err)
        return (err)
    }
}

Notifications.getNotificationsDetails= async function(id){
    try{  
      
 
     
     const result1 = await sql.query('SELECT * from notifications where id=?', [id])

 
     const data = result1[0];
     return data;
             
    }catch(err){
        console.log(err)
        return (err)
    }
}



module.exports = Notifications
