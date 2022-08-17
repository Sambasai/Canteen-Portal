const router = require('express').Router();
let Buyer = require('../models/buyer.model');

router.route('/').get((req, res) => {
  Buyer.find()
    .then(buyer_details => res.json(buyer_details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const contact_no = req.body.contact_no;
  const age = Number(req.body.age);
  const batch_name = req.body.batch_name;
  const wallet = Number(req.body.wallet);
  const favorites = req.body.favorites;

  const newBuyer = new Buyer({
    name,
    email,
    password,
    contact_no,
    age,
    batch_name,
    wallet,
    favorites
  });

  newBuyer.save()
    .then(() => res.json('Buyer added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Buyer.findById(req.params.id)
    .then(buyer_details => res.json(buyer_details))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Buyer.findById(req.params.id)
    .then(Buyer => {
      Buyer.name = req.body.name;
      Buyer.email = req.body.email;
      Buyer.password = req.body.password;
      Buyer.contact_no = req.body.contact_no;
      Buyer.age = req.body.age;
      Buyer.batch_name = req.body.batch_name;
      Buyer.wallet = req.body.wallet;
      Buyer.favorites=req.body.favorites;

      Buyer.save()
        .then(() => res.json('Buyer updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

