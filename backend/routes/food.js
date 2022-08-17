const router = require('express').Router();
let Food = require('../models/food.model');

router.route('/').get((req, res) => {
    Food.find()
        .then(food_item => res.json(food_item))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const price = Number(req.body.price);
    const rating = Number(req.body.rating);
    const veg = Boolean(req.body.veg);
    const add_on = req.body.add_on;
    const tags = req.body.tags;
    const vendor_id = req.body.vendor_id;

    const newFood = new Food({
        name,
        price,
        rating,
        veg,
        add_on,
        tags,
        vendor_id,
    });

    newFood.save()
        .then(() => res.json('Food item added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/:id').get((req, res) => {
//   food.findById(req.params.id)
//     .then(food => res.json(food))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route('/:id').delete((req, res) => {
  Food.findByIdAndDelete(req.params.id)
    .then(() => res.json('food deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Food.findById(req.params.id)
        .then(food => {
            food.name = req.body.name;
            food.price = Number(req.body.price);
            food.rating = Number(req.body.rating);
            food.veg = Boolean(req.body.veg);
            food.tags = req.body.tags;
            food.vendor_id = req.body.vendor_id;

            food.save()
                .then(() => res.json('food updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;