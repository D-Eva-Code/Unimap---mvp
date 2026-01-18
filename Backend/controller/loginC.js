const {CheckExistingUserS} = require('../model/createStudent');
const {CheckExistingUserV} = require('../model/createVendor')
const {CheckExistingUserD} = require('../model/createDriver')
const dotenv = require('dotenv');
const path = require('path')
dotenv.config({ path :  path.resolve( __dirname , '../../.env')})

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET

async function loginController(req,res) {
    try{
        const {email, password, role}= req.body
        let result;
        if (!role) {
            return res.status(400).json({ message: "Role is required" });
          }
        if (role === 'vendor') {

        result = await CheckExistingUserV(email);
        if (result.exists === false){
            return res.json({success:false, status:401, mess:"Invalid email"})
        }
    }
    else if (role === 'driver') {

        result = await CheckExistingUserD(email);
        if (result.exists === false){
            return res.json({success:false, status:401, mess:"Invalid email"})
        }
    }
    else if (role === 'student') {
        result = await CheckExistingUserS(email);
        if (result.exists === false){
            return res.json({success:false, status:401, mess:"Invalid email"})
        }
    }
    const user = result.user;

    const validate = await bcrypt.compare(password, user.passwd);
    if (!validate) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      id: user.userid || user.st_id || user.vendor_id,
      role
    };

    const token = jwt.sign(payload, secretKey, {
      expiresIn: '2h'
    });
        res.json({success:true, status:200, mess:"Login successful", token: token});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({success: false, mess: "Internal Server Error"});
    }
}

module.exports = {loginController};