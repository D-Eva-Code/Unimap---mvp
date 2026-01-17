const newcp = require('../connection/db')
const SqlObject = require('./sql')
  

async function getVendors(){
try{
   const [data]= await newcp.conpool.query(SqlObject.vendorList);
  
    return data; 
    // console.log(data);
  }
catch(error){
    console.log(error.message);
    return {success:false, message: "Error listing vendors"}
}
}
// getVendors();
module.exports = {getVendors}