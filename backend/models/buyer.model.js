const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact_no: { type: Number, required: true },
    age: { type: Number, required: true },
    batch_name: { type: String, required: true },
    wallet: { type: Number, required: true },
    favorites: { type: Array, required: true }
});

const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;