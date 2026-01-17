const {CheckExistingUserV, CreateUserModelV} = require('../model/createVendor')
const {CheckExistingUserD, CreateUserModelD} = require('../model/createDriver')
const {CheckExistingUserS, CreateUserModelS} = require('../model/createStudent')
const bcrypt = require('bcrypt');

async function RegisterUsers(req,res) {   
    try{
        const {fullname,email,password,role} = req.body
        const h_password = await bcrypt.hash(password, 10)
        let result;
        
    
     if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }
    if (role === 'vendor') {
        const checkUser = await CheckExistingUserV(email);
        if (checkUser.exists){
            return res.status(400).json({mess: "Vendor already exists"});
    }
     result = await CreateUserModelV(fullname, email, h_password);
    console.log(result);
    }
    else if (role === 'driver') {
        const checkUser = await CheckExistingUserD(email);
        if (checkUser.exists){
            return res.status(400).json({mess: "Driver already exists"});
    }
     result = await CreateUserModelD(fullname, email, h_password);
    console.log(result);
    }
    else if (role === 'student') {
        const checkUser = await CheckExistingUserS(email);
        if (checkUser.exists){
            return res.status(400).json({mess: "Student already exists"});
    }
     result = await CreateUserModelS(fullname, email, h_password);
    console.log(result);
    }
        if (!result){
            return res.status(500).json({mess: result.message});
        }
        return res.status(201).json({mess: "New vendor added successfully", userid: result.userid, user:result.fullname, apikey: result.apikey});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success: false, mess: "Internal Server Error"});
    }
}

module.exports = {RegisterUsers};

