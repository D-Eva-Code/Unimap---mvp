const newcp = require('../connection/db');
const SqlObject = require('./sql')

async function saveOrderItems(orderId, cartItems) {
    try {
  for (const item of cartItems) {
    await newcp.conpool.query(SqlObject.saveOrderItems, [orderId, item.item_name,item.quantity,item.price]);
  } }catch (error) {
    console.log(error.message);
    return {success:false, message: "Error saving order items"}
  }
}

module.exports = {
  saveOrderItems
};
