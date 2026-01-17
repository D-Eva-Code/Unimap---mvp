const newcp = require('../connection/db')
const SqlObject = require('./sql')
const crypto = require('crypto');   

async function CreateUserModelD(fullname, email, password){
try{
    key = crypto.randomBytes(32).toString('hex');
   const [data]= await newcp.conpool.query(SqlObject.addDriver, [fullname, email, password]);
//   return data;
   const [apikey] = await newcp.conpool.query(SqlObject.createKeySql,[fullname, key]);
   console.log(apikey);
   return {apikey:key, fullname:fullname};
  return{success:true, userid: data.insertId};
}
catch(error){
    console.log(error.message);
    return {success:false, message: "Error creating user"}
}
}

async function CheckExistingUserD(email){
    try{
        const [data] = await newcp.conpool.query(SqlObject.loginSqlD, [email]);
        if (data.length > 0){
            return {exists: true, user: data[0]};
        }
        return {exists: false};
    }catch(error){
        console.log(error.message);
        return {success:false, message: "Error checking user"};
    }
}

module.exports = {CreateUserModelD, CheckExistingUserD}