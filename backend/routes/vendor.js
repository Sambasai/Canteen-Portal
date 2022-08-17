const router = require('express').Router();
let Vendor = require('../models/vendor.model');

router.route('/').get((req, res) => {
    Vendor.find()
        .then(vendor_details => res.json(vendor_details))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const manager_name = req.body.manager_name;
    const email = req.body.email;
    const password = req.body.password;
    const contact_no = req.body.contact_no;
    const shop_name = req.body.shop_name;
    const open_time = req.body.open_time;
    const close_time = req.body.close_time;

    const newVendor = new Vendor({
        manager_name,
        email,
        password,
        contact_no,
        shop_name,
        open_time,
        close_time
    });

    newVendor.save()
        .then(() => res.json('Vendor added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Vendor.findById(req.params.id)
        .then(vendor_details => res.json(vendor_details))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Vendor.findById(req.params.id)
        .then(Vendor => {
            Vendor.manager_name = req.body.manager_name;
            Vendor.email = req.body.email;
            Vendor.password = req.body.password;
            Vendor.contact_no = req.body.contact_no;
            Vendor.shop_name = req.body.shop_name;
            Vendor.open_time = req.body.open_time;
            Vendor.close_time = req.body.close_time;

            Vendor.save()
                .then(() => res.json('Vendor updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;