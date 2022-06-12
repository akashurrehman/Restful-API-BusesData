var express = require('express');
var router = express.Router();
var citiesName=require('../../Model/PakistaniCities');

router.get('/',async function(req,res){
    var getCities=await citiesName.find();
    return res.send(getCities);
})
module.exports=router;