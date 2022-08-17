const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VendorSchema = new Schema({
    manager_name: { type: String, required: true },
    shop_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    contact_no: { type: Number, required: true },
    open_time: { type: String, required: true },
    close_time: { type: String, required: true }

});

const Vendor = mongoose.model('Vendor', VendorSchema);
module.exports = Vendor;