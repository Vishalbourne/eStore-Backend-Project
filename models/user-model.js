const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullname: { type: String, required: true, minlength: 3, maxlength: 30 },
    email: { type: String, required: true, unique: true },
    password :String,
    cart :[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    orders :{
        type: Array,
        default: []
    },
    contact :Number,
    picture: String
})

module.exports=mongoose.model("user",userSchema);