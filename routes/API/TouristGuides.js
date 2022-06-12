var express = require('express');
var router = express.Router();
var guiders =require('../../Model/TouristGuides');

router.get('/', async function(req, res) {
    var getguiders = await guiders.find();
    return res.send(getguiders);
});

router.get('/:id', async function(req, res) {
    try {
        var getguiders = await guiders.findById(req.params.id);
        if(!(getguiders)){
            res.status(404).send("Id not found");
        }
        return res.send(getguiders);
    } catch (err) {
        res.status(400).send("Invalid ID");
    }
});

router.delete('/:id',async function(req,res){
    try{
        const guider= await guiders.findByIdAndDelete(req.params.id);
        return res.send(guider);
    }
    catch(err){
        res.status(400).send("Cannot Delete");
    }

});

router.put('/:id',async function(req,res){
    try{
        const guider= await guiders.findById(req.params.id);
        guider.name=req.body.name;
        guider.cnic=req.body.cnic;
        guider.Age=req.body.Age;
        guider.phoneno=req.body.phoneno;
        guider.AvailableAt=req.body.AvailableAt;
        guider.Experience=req.body.Experience;
        guider.Speciality=req.body.Speciality;
        await guider.save();
        res.send(guider);
    }
    catch(err){
        res.status(400).send("Cannot Update Data");
    }

});
router.post('/', async function(req,res){
    let guide = new guiders();
    try{
        guide.name=req.body.name;
        guide.cnic=req.body.cnic;
        guide.Age=req.body.Age;
        guide.phoneno=req.body.phoneno;
        guide.AvailableAt=req.body.AvailableAt;
        guide.Experience=req.body.Experience;
        guide.Speciality=req.body.Speciality;
        await guide.save();
        res.send(guide);
    }
    catch(err){
        res.status(404).send("Cannot post data");
    }
});

module.exports=router;