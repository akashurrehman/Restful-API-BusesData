var express = require('express');
var router = express.Router();
var ValidateUser=require('../../Middlewares/ValidateUser')
var user=require('../../Model/UserData');
var bcrypt = require('bcryptjs');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var Auth=require('../../Middlewares/auth')
const Adminauth = require('../../Middlewares/admin');


router.get('/',Auth,Adminauth, async function(req, res) {
    var getuser = await user.find();
    return res.send(getuser);
});
router.delete('/:id',Auth, async function(req, res) {
    var UserRegistrationData = await user.findByIdAndDelete(req.params.id);
    return res.send(UserRegistrationData);
});
router.put('/:id',Auth, async function(req, res){
    try{
        var RegistrationData = await user.findById(req.params.id);
            RegistrationData.FirstName=req.body.FirstName;
            RegistrationData.LastName=req.body.LastName;
            RegistrationData.PhoneNumber=req.body.PhoneNumber;
            RegistrationData.Age=req.body.Age;
            RegistrationData.Email=req.body.Email;
            await RegistrationData.save();
            res.send(RegistrationData);
        }
    catch(err)
    {
        res.status(400).send("Cannot Update...");
    }
});

router.post('/register', async function(req,res){
    let User= await user.findOne({Email:req.body.Email});
    if(User) return res.status(400).send("User with Given Name is already exist");
    User= new user();

    User.FirstName=req.body.FirstName;
    User.LastName=req.body.LastName;
    User.PhoneNumber=req.body.PhoneNumber;
    User.Age=req.body.Age;
    User.Email=req.body.Email;
    User.password=req.body.password;
    var salt = await bcrypt.genSaltSync(10);
    User.password = await bcrypt.hash(User.password, salt);
    var postuser = await User.save();
    var token = jwt.sign({ _id: User._id,Email:User.Email,role:User.role }, "privateKey");
    let userdata={
        FirstName:User.FirstName,
        role:User.role,
        token:User.token,
    }
    return res.send(userdata);
});
router.post('/login', async function(req,res){
    let User= await user.findOne({Email:req.body.Email});
    if(!User) return res.status(400).send("User with Email Not Exists");
    let isValid = await bcrypt.compare(req.body.password,User.password);
    if(!isValid) return res.status(401).send("Wrong Password!");
    var token = jwt.sign({ _id: User._id,Email:User.Email,role:User.role }, "privateKey");
    res.send(token);
});




module.exports=router;