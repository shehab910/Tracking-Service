const mongoose = require("mongoose");
const customerSchema = new mongoose.Schema({

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

const Customer= mongoose.model('orders', customerSchema);
module.exports = Customer;