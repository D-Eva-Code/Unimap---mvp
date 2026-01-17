const newcp = require('../connection/db')
const SqlObject = require('./sql')
  

async function getMenu(menuId, vendorId){
try{
   const [data]= await newcp.conpool.query(SqlObject.fetchVendorMenu, [menuId, vendorId]);
  
    return data[0]; 
    // console.log(data);
  }
catch(error){
    console.log(error.message);
    return {success:false, message: "Error listing Vendor Menu"}
}
}



module.exports = {getMenu};



  
