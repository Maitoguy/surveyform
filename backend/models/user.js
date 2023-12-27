
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type: String
    },

    gender:{
        type: String
    },

    nationality:{
        type: String
    },

    email:{
        type:String,
        unique: true
    },

    phoneNumber:{
        type: String,
        unique: true
    },

    address:{
        type: String
    },

    message:{
        type: String
    }

},{
    timestamps: true
});

const User = mongoose.model('User' , userSchema);

module.exports= User;