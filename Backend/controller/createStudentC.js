const {CheckExistingUserS, CreateUserModelS} = require('../model/createStudent')
const bcrypt = require('bcrypt');

async function createUserAccountS(req,res) {   
    try{
        const {fullname,email,password} = req.body
        const h_password = await bcrypt.hash(password, 10)
   
    const checkUser = await CheckExistingUserS(email);
    if (checkUser.exists){
        return res.status(400).json({mess: "User already exists"});
    }
     const result = await CreateUserModelS(fullname, email, h_password);
    console.log(result);
        if (!result){
            return res.status(500).json({mess: result.message});
        }
        return res.status(201).json({mess: "New User added successfully", userid: result.userid, user:result.fullname, apikey: result.apikey});
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({success: false, mess: "Internal Server Error"});
    }
}

module.exports = {createUserAccountS};

