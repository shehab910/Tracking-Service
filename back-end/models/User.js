const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    number:{
        type:String,
        required:false
    },
  email:{
        type:String,
        required:false
    }

});

const User= mongoose.model('orders', userSchema);
module.exports = User;