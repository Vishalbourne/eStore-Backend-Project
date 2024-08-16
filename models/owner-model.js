const mongoose = require("mongoose");


const ownerSchema = mongoose.Schema({
    Fullname :String,
    email :String,
    password :String,
    cart :[],
    product :[],
    picture: String,
    gstin: String
})

module.exports=mongoose.model("owner",ownerSchema);