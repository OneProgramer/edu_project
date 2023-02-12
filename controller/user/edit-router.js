const express = require('express');
const router = express.Router();
const auth = require('../auth');
const signRouter = require('../../model/user/sign')


router.post('/edit',auth, async (req, res) => {
    let _id = req.body._id;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    if(_id && email && password && phone)
    {
        signRouter.edit(_id,email,password,phone).then((value)=>{
            res.json({value:value})
        });
    }
    else
    {
        res.json({value:"lack data"})
    }
});

module.exports = router;