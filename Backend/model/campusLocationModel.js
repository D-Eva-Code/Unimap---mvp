const newcp = require('../connection/db');

async function getAllLocations() {
  const [rows] = await newcp.conpool.query(
    "SELECT * FROM campus_locations WHERE is_active = 1"
  );
  return rows;
}

async function searchLocations(query) {
  const [rows] = await newcp.conpool.query(
    `SELECT * FROM campus_locations
     WHERE is_active = 1
     AND (name LIKE ? OR category LIKE ?)`,
    [`%${query}%`, `%${query}%`]
  );
  return rows;
}

async function createLocation(data) {
  const { name, description, category, latitude, longitude } = data;

  const [result] = await newcp.conpool.query(
    `INSERT INTO campus_locations
     (name, description, category, latitude, longitude)
     VALUES (?, ?, ?, ?, ?)`,
    [name, description, category, latitude, longitude]
  );

  return result.insertId;
}

module.exports = {
  getAllLocations,
  searchLocations,
  createLocation
};
