const mongoose = require("mongoose");
const validator = require("validator")

const user = new mongoose.Schema({
    name : { 
        type : String,
        required : true,
    }, 
    last_name : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required: true,
        unique: [true, "Email id is already present."],
        validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Invalid Email");
            }
        }
    },
    phone : {
        type : Number,
        required : true,
        unique : true
    },
    password : {
        type : String,
        minlength : 8,
        required : true


    }
})

module.exports = mongoose.model('data', user)