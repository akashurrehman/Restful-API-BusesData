const mongoose = require('mongoose');
const Joi = require("@hapi/joi");
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
const Product = mongoose.model('Data',productSchema);
function ValidateBusRecord(data){
    const schema=Joi.object({
    
        BusCompany:Joi.string().min(4).max(14).required(),
        BusNumber:Joi.string().min(17).max(19).required(),
        Class:Joi.string().min(5).max(12).required(),
        SpecialOffer:Joi.boolean().required(),
        Wifi:Joi.boolean().required(),
        TotalSeats:Joi.number().required(),
        Route1:Joi.string().min(8).max(19).required(),
        Route2:Joi.string().min(8).max(19).required(),
        AvgFair:Joi.string().min(5).max(15).required(),
    });
    return schema.validate(data,{abortEarly:True});
}
module.exports.validate=ValidateBusRecord;
module.exports = Product;