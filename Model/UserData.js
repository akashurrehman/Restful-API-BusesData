const mongoose=require('mongoose');
const Joi=require("@hapi/joi");


const UserData=mongoose.Schema({
    FirstName:String,
    LastName:String,
    PhoneNumber:String,
    Age:Number,
    Email:String,
    password:String,
    role: {
    type: String,
    default: "user",
  },
});

const user=mongoose.model('UserData',UserData);

function ValidateUser(data){
    const schema=Joi.object({
        FirstName:Joi.string().min(4).max(14).required(),
        LastName:Joi.string().min(7).max(12).required(),
        PhoneNumber:Joi.string().min(12).max(16).required(),
        Age:Joi.number().required(),
        Email:Joi.string().email().min(8).max(13).required(),
        password:Joi.string().min(8).max(13).required(),
    });
    return schema.validate(data,{abortEarly:False});
}
module.exports.validate=ValidateUser; 
module.exports=user;
