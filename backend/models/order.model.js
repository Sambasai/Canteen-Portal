const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: { type: String, required: true },
    vendor_name: { type: String, required: false },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    quantity: { type: Number, required: true },
    cost: { type: Number, required: true },
    veg: { type: Boolean, required: true },
    add_on: { type: String, required: false },
    tags: { type: Array, required: false },
    vendor_id: { type: String, required: true },
    status: { type: String, required: true },
    buyer_id: { type: String, required: true },
    time: { type: String, required: true },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;