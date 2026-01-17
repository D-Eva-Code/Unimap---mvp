const newcp = require('../connection/db')
const SqlObject = require('./sql')
const crypto = require('crypto');   

async function CreateUserModel(username, password){
try{
    key = crypto.randomBytes(32).toString('hex');
   const [data]= await newcp.conpool.query(SqlObject.createUserSql, [username, password]);
//   return data;
   const [apikey] = await newcp.conpool.query(SqlObject.createKeySql,[username, key]);
   console.log(apikey);
   return {apikey:key, username:username};
  return{success:true, userid: data.insertId};
}
catch(error){
    console.log(error.message);
    return {success:false, message: "Error creating user"}
}
}

module.exports = {CreateUserModel}