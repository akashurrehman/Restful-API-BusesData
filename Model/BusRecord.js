const mongoose = require('mongoose');

/*
const RouteSchema = mongoose.Schema({
    Route1: String,
    Route2: String,
    AvgFair: String
}); 
*/
const productSchema = mongoose.Schema({
    BusCompany: String,
    BusNumber: String,
    Class: String,
    SpecialOffer: Boolean,
    Wifi: Boolean,
    TotalSeats: Number,
    Route1: String,
    Route2: String,
    AvgFair: String

}); {
    versionKey: false // set to false then it wont create in mongodb
};


const Product = mongoose.model('Data',
    productSchema);

module.exports = Product;