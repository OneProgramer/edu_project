const express = require('express');
const router = express.Router();
const signModel = require('../../model/user/sign');


router.post('/sign', async (req, res) => {
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let email = req.body.email;
    let password = req.body.password;
    let phone = req.body.phone;

    console.log(first_name + "   " + last_name + "   " + email + "   " + password + "   " + phone + "   ")
    if (first_name && last_name && email && password && phone) {
        signModel.SignUp(first_name, last_name, email, password, phone.toString()).then((value) => {
            res.status(200).json({ value: value });
        }).catch(() => {
            res.json({ value: false });
        });
    } else {
        res.json({ value: 'data is not complete' });
    }
});

module.exports = router;