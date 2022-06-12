var express = require('express');
var router = express.Router();
var products = require('../../Model/BusRecord')
var ValidateBusRecord=require('../../Middlewares/ValidateBusRecord')
var Auth=require('../../Middlewares/auth')
const Adminauth = require('../../Middlewares/admin');

    /* GET users listing. */

router.get('/',async function(req, res) {
    var getproduct = await products.find();
    return res.send(getproduct);
});

router.get('/:id',async function(req, res) {
    try {
        var getproduct = await products.findById(req.params.id);
        return res.send(getproduct);
    } catch (err) {
        res.status(400).send("Invalid ID");
    }
});

router.delete('/:id',Auth,Adminauth, async function(req, res) {
    var getproduct = await products.findByIdAndDelete(req.params.id);
    return res.send(getproduct);
});

router.post('/',Auth,Adminauth,async function(req, res) {
    try {
        console.log(req.user);
        let product = new products();

        product.BusCompany = req.body.BusCompany;
        product.BusNumber = req.body.BusNumber;
        product.Class = req.body.Class;
        product.SpecialOffer = req.body.SpecialOffer;
        product.Wifi = req.body.Wifi;
        product.TotalSeats = req.body.TotalSeats;
        product.Route1 = req.body.Route1;
        product.Route2 = req.body.Route2;
        product.AvgFair = req.body.AvgFair;
        await product.save();
        return res.send(product);
    } catch (err) {
        res.status(400).send("Cannot Send Data...");
    }
});

router.put('/:id',Auth,Adminauth, async function(req, res) {
    try {
        var product = await products.findById(req.params.id);
        product.BusCompany = req.body.BusCompany;
        product.BusNumber = req.body.BusNumber;
        product.Class = req.body.Class;
        product.SpecialOffer = req.body.SpecialOffer;
        product.Wifi = req.body.Wifi;
        product.TotalSeats = req.body.TotalSeats;
        product.Route1 = req.body.Route1;
        product.Route2 = req.body.Route2;
        product.AvgFair = req.body.AvgFair;
        product.BusCompany = req.body.BusCompany;
        product.item = req.body.item;
        await product.save();
        return res.send(product);
    } catch (err) {
        res.status(400).send("Cannot Update...");
    }
});
module.exports = router;



