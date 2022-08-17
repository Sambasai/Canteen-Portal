const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    veg: { type: Boolean, required: true },
    add_on: { type: Map, required: false },
    tags: { type: Array, required: false },
    vendor_id: { type: String, required: true },
});

const food_item = mongoose.model('Food', foodSchema);
module.exports = food_item;