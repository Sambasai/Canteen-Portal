const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const foodRouter = require('./routes/food');
const buyerRouter = require('./routes/buyer');
const vendorRouter = require('./routes/vendor');
const loginRouter = require('./routes/login');
const orderRouter = require('./routes/order');

app.use('/food_item', foodRouter);
app.use('/buyer_details', buyerRouter);
app.use('/vendor_details', vendorRouter);
app.use('/login',loginRouter);
app.use('/order_details', orderRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});