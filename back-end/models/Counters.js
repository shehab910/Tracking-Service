const mongoose = require("mongoose");
const countersSchema = new mongoose.Schema({
   client_seq_value: {
      type: Number,
      required: true,
   },
   order_seq_value: {
      type: Number,
      required: true,
   },
   shippment_seq_value: {
      type: Number,
      required: true,
   },
});

const Counters = mongoose.model("Counters", countersSchema);
module.exports = Counters;
