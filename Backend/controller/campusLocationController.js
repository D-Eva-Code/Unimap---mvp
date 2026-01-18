const {
  getAllLocations,
  searchLocations,
  createLocation
} = require('../model/campusLocationModel');

async function fetchAllLocations(req, res) {
  try {
    const locations = await getAllLocations();
    res.json({ success: true, data: locations });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}

async function searchCampusLocations(req, res) {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query required"
      });
    }

    const results = await searchLocations(q);
    res.json({ success: true, data: results });

  } catch (err) {
    res.status(500).json({ success: false });
  }
}

async function addCampusLocation(req, res) {
  try {
    const { name, category, latitude, longitude } = req.body;

    if (!name || !category || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const id = await createLocation(req.body);

    res.status(201).json({
      success: true,
      message: "Location added",
      id
    });

  } catch (err) {
    res.status(500).json({ success: false });
  }
}

module.exports = {
  fetchAllLocations,
  searchCampusLocations,
  addCampusLocation
};
