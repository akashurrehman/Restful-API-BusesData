const jwt= require("jsonwebtoken");
const user=require("./../Model/UserData");
async function auth(req,res,next){
    let token = req.header("x-auth-token");
    if(!token) return res.status(404).send("Token Not Provided!");

    try {
        let User=jwt.verify(token,"privateKey");
        req.User=await user.findById(User._id);
    }
    catch(err){
        return res.status(401).send("Invalid Token");
    }
    next();
}
module.exports=auth;