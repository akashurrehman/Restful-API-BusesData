var express = require('express');
var router = express.Router();
var products = require('../../Model/BusRecord')
    /* GET users listing. */

router.get('/', async function(req, res) {
    var getproduct = await products.find();
    return res.send(getproduct);
});

router.get('/:id', async function(req, res) {
    try {
        var getproduct = await products.findById(req.params.id);
        return res.send(getproduct);
    } catch (err) {
        res.status(400).send("Invalid ID");
    }
});

router.delete('/:id', async function(req, res) {
    var getproduct = await products.findByIdAndDelete(req.params.id);
    return res.send(getproduct);
});

router.post('/', async function(req, res) {
    try {
        var Bus1 = [];
        var Routes = [];
        var ttls = [];
        ttls.push(req.body.TotalSeats);

        let product = new products();
        Routes.push({
            Route1: req.body.Route1,
            Route2: req.body.Route2,
            AvgFair: req.body.AvgFair
        })
        Bus1.push({
            Number: req.body.Number,
            Class: req.body.Class,
            SpecialOffer: req.body.SpecialOffer,
            Wifi: req.body.Wifi,
            TotalSeats: ttls,
            Routes: Routes
        });

        product.Bus1 = req.body.Bus1;
        product.BusCompany = req.body.BusCompany;
        product.Routes = req.body.Routes;
        await product.save();
        return res.send(product);
    } catch (err) {
        res.status(400).send("Cannot Send Data...");
    }
});

router.put('/:id', async function(req, res) {
    try {
        var product = await products.findById(req.params.id);
        var Bus1 = [];
        var Routes = [];
        var ttls = [];
        ttls.push(req.body.TotalSeats);
        Routes.push({
            Route1: req.body.Route1,
            Route2: req.body.Route2,
            AvgFair: req.body.AvgFair
        });
        Bus1.push({
            Number: req.body.Number,
            Class: req.body.Class,
            wifi: req.body.wifi,
            TotalSeats: ttls,
            Routes: Routes
        });
        product.BusCompany = req.body.BusCompany;
        product.Bus1 = req.body.Bus1;
        await product.save();
        return res.send(product);
    } catch (err) {
        res.status(400).send("Cannot Update...");
    }
});

module.exports = router;