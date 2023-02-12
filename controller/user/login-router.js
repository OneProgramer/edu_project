const express = require('express');
const router = express.Router();
const loginModel = require('../../model/user/login');
const jwt = require('jsonwebtoken');
const secretKey  = "this is the secret key..123321!@#$%^&*()_+=}{][";

router.post('/login',async(req,res)=>{
    let phone = req.body.phone;
    let password = req.body.password;
    const token = jwt.sign({phone:req.body.phone,password:req.body.password},secretKey);

    if(phone && password)
    {    
        await loginModel.login(phone.toString(),password).then((value)=>{
            if( value && value !== "phone or password is wrong.")
            {
            res.status(200).json({value:value,token:token,success:true});
            }else{
            res.status(200).json({value:value,success:false});
            }
        }).catch(()=>{
            res.status(404).json({value:false,success:false});
        });
    }else{
        res.json({value:'data is not complete',success:false});
    }
})


module.exports = router;
