const {getVendors} = require('../model/getVendors');

async function getVendorsController(req, res) {
    try {
        const vendors = await getVendors();
        res.json(vendors);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Error fetching vendors" });
    }
}
module.exports = {getVendorsController};