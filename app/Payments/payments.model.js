const sql=require("../Database/db");

const Payments = function(payments){
                this.email= payments.email, 
                this.fName= payments.fName,
                this.lName= payments.lName,
                this.mName= payments.mName,
                this.phoneNo= payments.phoneNo,
                this.country= payments.country,
                this.stateZipCode= payments.stateZipCode,
                this.state= payments.state,
                this.address= payments.address,
                this.accountNumber= payments.accountNumber,
                this.accountName= payments.accountName,
                this.status= payments.status    
}

Payments.create= async function(newPayment, userId){
    try{
  
     console.log(newPayment)
  const result = await sql.query('INSERT into payment SET  email=?, fName=?, lName=?, mName=? , phoneNo=? , country=?, stateZipCode=?, state=?, address=?, accountNumber=?, accountName=?, status=?, userId=?', [newPayment.email,  newPayment.fName, newPayment.lName, newPayment.mName, newPayment.phoneNo, newPayment.country, newPayment.stateZipCode, newPayment.state, newPayment.address, newPayment.accountNumber, newPayment.accountName, newPayment.status, userId])
                const data= result[0]
                return data
              
       
    }catch(err){
        console.log(err)
        console.log('--------------------------------------------err--------------------------------------------------------')
        return (err)
    }
}






module.exports = Payments