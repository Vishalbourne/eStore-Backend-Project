const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model")
const isLoggedIn = require("../middlewares/isLoggedIn");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/admin",isLoggedIn,function(req,res){

    if(""===req.user.id){
    let success=req.flash("success");
    res.render("createproducts",{success});
    }
})




module.exports = router;