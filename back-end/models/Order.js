const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
   orderId: {
      type: String,
      required: false,
   },
   shippmentId: {
      type: String,
      required: false,
   },
   clientName: {
      type: String,
      required: true,
   },
   items: {
      type: Array,
      required: true,
   },
   date: {
      type: Date,
      required: false,
   },
   status: {
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
