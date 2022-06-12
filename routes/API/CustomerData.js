var express = require('express');
var router = express.Router();
var customers=require('../../Model/CustomerRecord');
var ValidateCustomer=require('../../Middlewares/ValidateCustomer')
var Auth=require("../../Middlewares/auth");
var Adminauth=require("../../Middlewares/admin")
router.get('/',Auth,Adminauth, async function(req, res) {
    var getcustomers = await customers.find();
    return res.send(getcustomers);
});

router.get('/:id',Auth,Adminauth, async function(req, res) {
    try {
        var getcustomer = await customers.findById(req.params.id);
        return res.send(getcustomer);
    } catch (err) {
        res.status(400).send("Invalid ID");
    }
});

router.delete('/:id',Auth, async function(req, res) {
    var getcustomer = await customers.findByIdAndDelete(req.params.id);
    return res.send(getcustomer);
});
router.post('/',Auth,ValidateCustomer, async function(req, res) {
    try{
        let customer=new customers();
        customer.name=req.body.name;
        customer.cnic=req.body.cnic;
        customer.Age=req.body.Age;
        customer.phoneno=req.body.phoneno;
        customer.SeatNo=req.body.SeatNo,
        customer.VacinationStatus=req.body.VacinationStatus,
        await customer.save();
        res.send(customer);
    }
    catch(err){
        res.status(400).send("Cannot Send Data...");
    }
});

router.put('/:id',Auth,ValidateCustomer, async function(req, res){
    try{
        var customer = await customers.findById(req.params.id);
        customer.name=req.body.name;
        customer.cnic=req.body.cnic;
        customer.Age=req.body.Age;
        customer.phoneno=req.body.phoneno;
        customer.VacinationStatus=req.body.VacinationStatus,
        await customer.save();
        res.send(customer);
    }
    catch(err)
    {
        res.status(400).send("Cannot Update...");
    }
});
module.exports = router;