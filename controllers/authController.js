const userModel = require("../models/user-model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generateToken} = require("../utils/generateToken")

module.exports.registerUser = async function(req,res){
    try{
        const{fullname,email,password} = req.body;

        const user=await userModel.findOne({email:email});

        if(user) return res.status(401).send("you already have an account, please login")
    
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) return res.send(err.message);
                    else{

                        const createdUser=await userModel.create({
                            fullname,
                            email,
                            password:hash
                        });

                        let token = generateToken(createdUser);
                        res.cookie("token",token)

                        

                        req.flash("successfull","User has signedup successfully")

                        res.redirect("/")
                }
            });
        });

    }
    catch(err){
        res.send(err.massage)
    }
}

module.exports.loginUser = async function(req,res){
try{
    let{email,password}=req.body;

    const user = await userModel.findOne({email});
    if(!user) return res.send("There is no information like that");

    bcrypt.compare(password, user.password, function(err, result) {
        if(result) {
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop");
        }
        else{
            return res.send("There is no information like that");
        }

    });
}
catch(err){
    res.send(err.message)
}
}

module.exports.logoutUser = function(req,res){
    res.cookie("token","");
    res.redirect("/");
}