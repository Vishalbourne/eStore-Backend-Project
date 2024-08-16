const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req,res,next){
    if(!req.cookies.token){
        req.flash("err","you need to login first");
        return res.redirect("/");
    }
    else{
    jwt.verify(req.cookies.token,process.env.JWT_KEY, async function(err, data) {
        if(err) {
            req.flash("err","something went wrong");
            return res.redirect("/");
        }
       let user = await userModel.findOne({email : data.email}).select("-password");

       req.user = user;
       next();
      });
    }
}