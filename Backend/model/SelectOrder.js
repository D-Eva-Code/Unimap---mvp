const newcp = require('../connection/db')
const SqlObject = require('./sql')
const crypto = require('crypto');   

async function CreateUserModelS(fullname, email, password){
try{
   
  const student_id = req.user.id; // From login/session/auth middleware
  const { vendor_id, items } = req.body;

  // Calculate total amount
  let total_amount = 0;
  items.forEach(item => total_amount += item.price * item.quantity);

  // 2️⃣ Insert into orders table
  const sqlOrder = `
    INSERT INTO orders (student_id, vendor_id, total_amount)
    VALUES (?, ?, ?)
  `;
  db.query(sqlOrder, [student_id, vendor_id, total_amount], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    const orderId = result.insertId; // or UUID
    // 3️⃣ Insert order items
    const sqlItems = `
      INSERT INTO order_items (order_id, item_name, quantity, price)
      VALUES ?
    `;
    const values = items.map(i => [orderId, i.name, i.quantity, i.price]);
    db.query(sqlItems, [values], (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Order placed', orderId });
    });
  });
});
