const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
   product_link: {
      type: String,
      required: true,
   },
   product_name: {
      type: String,
      required: true,
   },
   original_price: {
      type: String,
      required: true,
   },
   deal_price: {
      type: String,
      required: true,
   },
   count: {
      type: String,
      required: true,
   },
   additonal_notes: {
      type: String,
      required: false,
   },
   imgSrc: {
      type: String,
      required: false,
   },
});

const Item = mongoose.model("orders", itemSchema);
module.exports = Item;
