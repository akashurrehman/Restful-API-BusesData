const mongoose = require('mongoose');

const TouristSchema=mongoose.Schema({
    name:String,
    cnic:String,
    Age:Number,
    phoneno:String,
    AvailableAt:String,
    Experience:String,
    Speciality:String,
});

const tourist=mongoose.model('Tourist',TouristSchema);
module.exports=tourist;