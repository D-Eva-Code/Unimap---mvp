const crypto = require('crypto');
const {getMenu} = require('../model/getMenu');
const {createOrder} = require('../model/orderModel');

async function checkout(req, res) {
  const { vendorId, cart } = req.body;

  // comes from auth middleware
  const studentId = req.user.st_id;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  try {
    let total = 0;

    for (const item of cart) {
      const menu = await getMenu(item.menuId, vendorId);

      if (!menu) {
        return res.status(400).json({ message: 'Invalid menu item' });
      }

      total += menu.price * item.quantity;
    }

    const orderId = crypto.randomUUID();

    await createOrder({
      orderId,
      studentId,
      vendorId,
      total
    });

    res.json({
      orderId,
      total
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Checkout failed' });
  }
}

module.exports = {
  checkout
};
