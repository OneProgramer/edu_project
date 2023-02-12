const express = require('express');
const router = express.Router();
const signAdmin = require('../../model/admin/login');
const secretKey  = "this is the secret key..123321!@#$%^&*()_+=}{][";
const jwt = require('jsonwebtoken');

router.post('/login',async(req,res)=>{
    const token = jwt.sign({email:req.body.email,password:req.body.password},secretKey);
    await signAdmin.login(req.body.email,req.body.password).then((value)=>{
        res.json({value:value,token:token});
    }).catch(()=>{
        res.json({value:false})
    });
})

module.exports = router;