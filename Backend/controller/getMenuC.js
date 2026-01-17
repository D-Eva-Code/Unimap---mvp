const {getMenu} = require('../model/getMenu');

async function getMenuController(req, res) {    
    try {
        const vendorId = req.params.id;
        const menu = await getMenu(vendorId);
        res.json(menu);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Error fetching menu" });
    }
}
module.exports = {getMenuController};