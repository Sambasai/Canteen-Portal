const router = require('express').Router();
let Order = require('../models/order.model');

router.route('/').get((req, res) => {
    Order.find()
        .then(order_details => res.json(order_details))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const vendor_name = req.body.vendor_name;
    const price = Number(req.body.price);
    const rating = Number(req.body.rating);
    const quantity = Number(req.body.quantity);
    const cost = Number(req.body.cost);
    const veg = Boolean(req.body.veg);
    const add_on = req.body.add_on;
    const tags = req.body.tags;
    const vendor_id = req.body.vendor_id;
    const status = req.body.status;
    const buyer_id = req.body.buyer_id;
    const time = req.body.time;

    const newOrder = new Order({
        name,
        vendor_name,
        price,
        rating,
        quantity,
        cost,
        veg,
        add_on,
        tags,
        vendor_id,
        status,
        buyer_id,
        time,
    });

    newOrder.save()
        .then(() => res.json('Order added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Order.findById(req.params.id)
    .then(order => res.json(order))
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').delete((req, res) => {
//   Exercise.findByIdAndDelete(req.params.id)
//     .then(() => res.json('Exercise deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/update/:id').post((req, res) => {
    Order.findById(req.params.id)
        .then(order => {
            order.name = req.body.name;
            order.vendor_name = req.body.vendor_name;
            order.price = Number(req.body.price);
            order.rating = Number(req.body.rating);
            order.quantity = Number(req.body.quantity);
            order.cost = Number(req.body.cost);
            order.veg = Boolean(req.body.veg);
            order.add_on = req.body.add_on;
            order.tags = req.body.tags;
            order.vendor_id = req.body.vendor_id;
            order.status = req.body.status;
            order.buyer_id = req.body.buyer_id;
            order.time = req.body.time;

            order.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;