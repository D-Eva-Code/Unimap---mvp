const newcp = require('../connection/db');
const SqlObject = require('./sql')

async function createOrder({ orderId, studentId, vendorId, total }) {
 try{
  await newcp.conpool.query(SqlObject.createOrder, [
    orderId,
    studentId,
    vendorId,
    total
  ]);
  } catch(error){ 
    console.log(error.message);
    return {success:false, message: "Error creating order"}
  }
}

async function assignDriver(orderId, driverId) {
  try{
  await newcp.conpool.query(SqlObject.assignDriver,[driverId, 'assigned', orderId]);
}
  catch(error){ 
    console.log(error.message);
    return {success:false, message: "Error assigning driver"}
  }
}

module.exports = {
  createOrder,
  assignDriver
};
