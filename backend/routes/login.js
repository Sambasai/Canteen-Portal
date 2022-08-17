const router = require('express').Router();
const { query } = require('express');
let Vendor = require('../models/vendor.model');
let Buyer = require('../models/buyer.model');
//let Login = require('../models/login.model');

// router.route('/').get((req, res) => {
//     Login.find()
//         .then(login => res.json(login))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const flag = req.body.flag;
    if (flag == 1) {
        Vendor.findOne(
            {
                $and: [
                    { 'email': email },
                    { 'password': password }
                ]
            },
            { password: 0 }
        )
            .then(vendor => res.json(vendor))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (flag == 2) {
        Buyer.findOne(
            {
                $and: [
                    { 'email': email },
                    { 'password': password }
                ]
            },
            { password: 0 }
        )
            .then(vendor => res.json(vendor))
            .catch(err => res.status(400).json('Error: ' + err));
    }
});

module.exports = router;