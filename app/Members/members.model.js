const sql=require("../Database/db");
// constructor for members
const Members = function(members){
    this.code=members.code
    this.email=members.email
    this.isVerified=members.isVerified
    this.password=members.password
    this.country= members.country,
    this.phoneNo= members.phoneNo,
    this.fullName = members.fullName
    // this.walletBalance= members.walletBalance   
}
// find memebers by username or email
Members.findByUsername= async function( email){
    try{
        const result = await sql.query('SELECT * from profile where email=?', [ email])
        const data=result[0]
        console.log(data)
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

Members.getNoOfUsers= async function( ){
     const connection = await sql.getConnection();
     await connection.beginTransaction();
    try{
        let data = {}
        let admin = 1;
        let status1 = "Pending"
        let status2 = "Completed"
        let status3 = "Received"
        limit = 5
        const result = await connection.query('SELECT * from profile where id !=?', [ admin])
         const result1 = await connection.query('SELECT * from payment where status =?', [status1])
         const result2 = await connection.query('SELECT * from payment where status =?', [status2])
         const result3 = await connection.query('SELECT * from payment where status=?  ORDER BY id DESC LIMIT '+limit+'', [status1])
         const result4 = await connection.query('SELECT * from payment where status =?', [status3])
     //   const result = await connection.query('SELECT * from payment ',)
         data.noOfUser =result[0].length
          data.allUser = result[0]
         data.pendingPaymentCount =result1[0].length
         data.pendingPayment =result1[0]
         data.completedPaymentCount =result2[0].length
         data.completedPayment =result2[0]
         data.recentPayment = result3[0]
         data.receivedPaymentCount =result4[0].length
         data.receivedPayment =result4[0]
        
     await connection.commit();
        return data
    }catch(err){
       await connection.rollback();
         console.log(err)
         return err
    }
}
Members.findAdminUser= async function(username){
    try{
        const result = await sql.query('SELECT * from member_authentication_table_admin where email=?', [ username])
        const data=result[0]
        console.log(data)
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

Members.create = async function(newMember){
    const connection = await sql.getConnection();
     await connection.beginTransaction();
    try
    {
        console.log(newMember)
         const result = await connection.query('INSERT into profile SET code=?, isVerified=?, email=?, country=?, phoneNo=? , fullName=? ', [newMember.code,  newMember.isVerified, newMember.email, newMember.country,newMember.phoneNo, newMember.fullName])
         if (result[0].insertId){
             await connection.query('INSERT INTO member_authentication_table SET email=?, password=?', [newMember.email, newMember.password])
             console.log('---------------------------------Credentials filled------------------------------------------------------------------------------------------------------')
             // create requests
           
             await connection.commit();
             return result[0]
         }      
    }catch(err){
         await connection.rollback();
         console.log(err)
         return err
    }finally{
        connection.release();
    }
 }

  // find credential by email
  Members.findById= async function(id){
    try{
        const result = await sql.query('SELECT * FROM profile WHERE id = ?', [id])
     //   console.log(result[0])
            const data=result[0]
            console.log('------------------------success---------------')
            return data
        
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

Members.createAdmin = async function(username, password){
    const connection = await sql.getConnection();
     await connection.beginTransaction();
    try
    {
     
        
         
       const result =    await connection.query('INSERT INTO member_authentication_table_admin SET email=?, password=?', [ username, password])
             console.log('---------------------------------Credentials filled------------------------------------------------------------------------------------------------------')
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

  // find credential by email
  Members.findById= async function(id){
    try{
        const result = await sql.query('SELECT * FROM profile WHERE id = ?', [id])
     //   console.log(result[0])
            const data=result[0]
            console.log('------------------------success---------------')
            return data
        
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}
  // find credential by email
  Members.findByEmail= async function(email){
    try{
        const result = await sql.query('SELECT * FROM member_authentication_table WHERE email = ?', [email])
     //   console.log(result[0])
            const data=result[0]
            console.log('-------------------------------------------------------CHECKING IF email EXISTS auth table---------------')
            return data
        
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

 Members.findByEmailAdmin= async function(email){
    try{
        const result = await sql.query('SELECT * FROM member_authentication_table_admin WHERE email = ?', [email])
     //   console.log(result[0])
            const data=result[0]
            console.log('-------------------------------------------------------CHECKING IF email EXISTS auth table---------------')
            return data
        
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}
 // find credential by email
 Members.findByRefarralCode= async function(refarralCode){
    try{
        const result = await sql.query('SELECT * FROM profile WHERE refarralCode = ?', [refarralCode])
     //   console.log(result[0])
            const data=result[0]
            console.log('-------------------------------------------------------CHECKING IF email EXISTS auth table---------------')
            return data
        
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}
// Get full members details by email
Members.findDetailsByEmail= async function(email){
    try{
        const result = await sql.query('SELECT * from profile where email =?', [email])
        const data=result[0]
      //  console.log(data)
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS details---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}


// Get full members details by email
Members.getCode= async function(email , code){
    try{
        const result = await sql.query('SELECT * from profile where email=? AND code =?', [email , code])
        const data=result[0]
      //  console.log(data)
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS details---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}
 //  Verify email
 Members.verifyEmail= async function(email, code, isVerified){
    try{
      
        const result = await sql.query('update profile set isVerified=? where code=? AND email=?',[isVerified ,code,email])
        const data=result[0]
       
        return data
    
      
        
    }catch(err){
        console.log(err)
        return (err)
    }
  }

// save forgot password code
  Members.saveForgetPasswordCode= async function(email, code){
    try{
        const result = await sql.query('update profile set forgotPasswordCode=? where email=?',[code,email])
        const data=result[0]
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}

  // get forgot password code
Members.findForgotPasswordCode= async function(code, email){
    try{
        const result = await sql.query('SELECT * from profile where forgotPasswordCode =? AND email=?', [code, email])
        const data=result[0]
      //  console.log(data)
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS details---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}
//set new password
Members.updatePassword= async function(email, password){
    try{
        const result = await sql.query('update member_authentication_table set password=? where email=?',[password,email])
        const data=result[0]
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}
 
 Members.updateAdminPassword= async function(username, password){
    try{
        const result = await sql.query('update member_authentication_table_admin set password=? where email=?',[password, username])
        const data=result[0]
        console.log('-------------------------------------------------------CHECKING IF USERNAME EXISTS---------------')
        return data
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}


module.exports = Members