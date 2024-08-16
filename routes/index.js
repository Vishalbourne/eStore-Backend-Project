const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/",function(req,res){
    let error = req.flash("error");
    let successfull = req.flash("successfull")
    res.render("index",{error,successfull,loggedin: false});

})

router.get("/addtocart/:id",isLoggedIn,async function(req,res){
    let user = await userModel.findOne({email : req.user.email});
    user.cart.push(req.params.id);
    await user.save();
    req.flash("successfull","Item has been added to cart");
    res.redirect("/shop")

})

router.get("/shop",isLoggedIn,async function(req,res){
    let products=await productModel.find();
    let successfull = req.flash("successfull");
    res.render("shop",{products,successfull});
})

router.get("/cart",isLoggedIn,async function(req,res){
    const user = await userModel.findOne({email : req.user.email}).populate("cart");
    const items = [];
    //console.log(items)
    for(let i=0;i<user.cart.length;i++){
        items[i]= user.cart[i].id;
   };
    const itemCounts = {};

items.forEach(item => {
  if (itemCounts[item]) {
    itemCounts[item]++;
  } else {
    itemCounts[item] = 1;
  }
});
    let bill = 0;
    for(let i=0;i<user.cart.length;i++){
         bill = Number((user.cart[i].price)) - Number(user.cart[i].discount)+bill;
    }

    bill= bill + 20;
    res.render("cart",{user,bill,itemCounts});
})

router.get("/add/cart/:id",isLoggedIn,async function(req,res){

    const user = await userModel.findOne({email : req.user.email})

    user.cart.push(req.params.id);
    await user.save();
    req.flash("successfull","Item has been added to cart");
    res.redirect("/cart")
})

module.exports = router;