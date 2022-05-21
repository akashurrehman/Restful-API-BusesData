const mongoose = require('mongoose');


const RouteSchema = mongoose.Schema({
    Route1: String,
    Route2: String,
    AvgFair: String
});
/*
const busSchema = mongoose.Schema({
    Number: {
        type: String
    },
    Class: String,
    SpecialOffer: Boolean,
    wifi: Boolean,
    TotalSeats: Number,
    Routes: {
        Route1: String,
        Route2: String,
    }
});

*/
const productSchema = mongoose.Schema({
    BusCompany: {
        type: String
    },
    Bus1: {
        Number: {
            type: String
        },
        Class: String,
        SpecialOffer: Boolean,
        Wifi: Boolean,
        TotalSeats: Number,
        Routes: [{
            type: RouteSchema
        }]
    }
});

const Product = mongoose.model('Product',
    productSchema);

module.exports = Product;