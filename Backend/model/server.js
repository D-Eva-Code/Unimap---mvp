const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path :  path.resolve( __dirname , '../../.env')})
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('../connection/db');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Test route
app.get('/', (req, res) => {
  res.send('UniMap+ backend running');
});

// Example: Get all drivers
app.get('/drivers', (req, res) => {
  db.query('SELECT * FROM drivers_tb', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Example: Add a driver
app.post('/drivers', (req, res) => {
  const { student_name } = req.body;
  db.query(
    'INSERT INTO drivers_tb (student_name) VALUES (?)',
    [student_name],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Driver added', id: result.insertId });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
