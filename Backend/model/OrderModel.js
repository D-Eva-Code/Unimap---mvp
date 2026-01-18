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


async function getOrderById(orderId) {
  try{
  const [rows] = await newcp.conpool.query(SqlObject.orderDetails,[orderId]);
  return rows[0];
} catch(error){ 
    console.log(error.message);
    return {success:false, message: "Error fetching order"}
  }
}

async function markOrderPaid(orderId) {
  try{
  await newcp.conpool.query(SqlObject.marksOrderPaid,[orderId]);
} catch(error){ 
    console.log(error.message);
    return {success:false, message: "Error marking order as paid"}
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
  getOrderById,
  markOrderPaid,
  assignDriver
};
