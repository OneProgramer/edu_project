const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const secretKey  = "this is the secret key..123321!@#$%^&*()_+=}{][";

router.use('/',(req,res,next)=>{
    try{
        jwt.verify(req.headers.token,secretKey);
        next();
    }catch{
        res.status(401).json({value:"Unauthorized"});
    }
})

module.exports = router;