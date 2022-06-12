const mongoose=require('mongoose');

const CitiesSchema=mongoose.Schema({
    citiesName:Array,
});

const cities =mongoose.model('City',CitiesSchema);

module.exports=cities;