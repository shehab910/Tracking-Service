const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true,
   },
   phone: {
      type: String,
      required: true,
      unique: true,
   },
   email: {
      type: String,
      required: false,
      unique: true,
   },
   address: {
      type: String,
      required: false,
   },
   facebook_link: {
      type: String,
      required: false,
   },
   instagram_link: {
      type: String,
      required: false,
   },
   cid: {
      type: Number,
      required: false,
      unique: true,
   },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
