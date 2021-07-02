const mongoose = require('mongoose');

const {DEFAULT_PIC} = require('../config/keys');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        default: "0000000000"
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic:{
        type: String,
        default: DEFAULT_PIC
    },
    picid:{
        type: String,
        default: "undefined"
    }
});

mongoose.model("User", userSchema);