const mongoose = require('mongoose');
const Joi = require("@hapi/joi");
const customerSchema=mongoose.Schema({
    name:String,
    cnic:String,
    Age:Number,
    phoneno:String,
    SeatNo:String,
    VacinationStatus:String,
})

const customer=mongoose.model('Customer',customerSchema);
function ValidateCustomer(data){
    const schema=Joi.object({
    
        name:Joi.string().min(4).max(14).required(),
        cnic:Joi.string().min(17).max(19).required(),
        Age:Joi.number().required(),
        phoneno:Joi.string().min(12).max(16).required(),
        SeatNo:Joi.string().required(),
        VacinationStatus:Joi.string().min(2).max(3).required(),
    });
    return schema.validate(data,{abortEarly:False});
}
module.exports.validate=ValidateCustomer;
module.exports=customer;