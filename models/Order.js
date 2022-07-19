const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    orderId:{
        type:String,
        required:false
    },
   items:{
        type:Array,
        required:false
    }
    
  
   
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;