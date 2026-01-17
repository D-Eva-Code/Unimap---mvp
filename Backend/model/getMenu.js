const newcp = require('../connection/db')
const SqlObject = require('./sql')
  

async function getMenu(vendorId){
try{
   const [data]= await newcp.conpool.query(SqlObject.fetchVendorMenu, [vendorId]);
  
    return data; 
    // console.log(data);
  }
catch(error){
    console.log(error.message);
    return {success:false, message: "Error listing Vendor Menu"}
}
}
// getMenu();
module.exports = {getMenu}


  
