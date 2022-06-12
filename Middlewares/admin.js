
function Adminauth(req,res,next){

    if(req.User.role!="admin")
    {
        return res.status(403).send("You are not Authorized User")
    }
    next();

}
module.exports=Adminauth;