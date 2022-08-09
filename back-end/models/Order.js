const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
   shippmentId: {
      type: String,
      required: false,
   },
   clientId: {
      type: String,
      required: true,
   },
   items: {
      type: Array,
      required: true,
   },
   // date: {
   //    type: Date,
   //    required: false,
   // },
   delivery_status: {
      type: String,
      required: false,
   },
   total: {
      type: Number,
      required: false,
   },
   shippingFees: {
      type: Number,
      required: false,
   },
   notes: {
      type: String,
      required: false,
   },
   cid: {
      type: Number,
      required: false,
      unique: true,
   },
});

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
