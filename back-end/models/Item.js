const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    itemLink:{
        type:String,
        required:false
    },
   picture:{
        type:String,
        required:false
    },
    price:{
        type:Number,
        required:false
    }

});

const Item= mongoose.model('orders', itemSchema);
module.exports = Item;