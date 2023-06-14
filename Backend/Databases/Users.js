const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    username : {
        type:String,
        unique:true,
    },
    password : String,
    fullname : String,
    email : String,
    avatar:String,
    played : Number,
    wins : Number,
    loses : Number,
    coins : Number,
    vouchers : Array,
})


module.exports = mongoose.model('users',Users);