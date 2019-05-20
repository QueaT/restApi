const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
    name: String,
    price: Number,
    count: Number
})

module.exports = mongoose.model('Orders', ordersSchema);