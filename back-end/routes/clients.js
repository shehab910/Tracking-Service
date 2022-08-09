const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Client = require("../models/Client");
const Counters = require("../models/Counters");
const getAndUpdateCounter = require("../utils/getAndUpdateCounter");

/* GET clients listing. */
router.get("/", (req, res) => {
   //get all clients from db
   Client.find({}, function (err, clients) {
      if (err) {
         res.json({ error: err });
         console.log(err);
      } else {
         res.json(clients).status(200);
      }
   });
});
router.get("/:name", function (req, res) {
   //get one client from db
   Client.findOneAndUpdate({ name: req.params.name }, (err, client) => {
      if (err) {
         res.json({ error: err });
         console.log(err);
      } else {
         res.json(client).status(200);
      }
   });
});

router.post("/", async (req, res) => {
   const currSeq = await getAndUpdateCounter("client_seq_value");
   //create new client in db
   const client = new Client({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      facebook_link: req.body.facebook_link,
      instagram_link: req.body.instagram_link,
      cid: currSeq,
   });
   client.save(function (err) {
      if (err) {
         getAndUpdateCounter("client_seq_value", true);
         res.json({ error: err });
         console.log(err);
      } else {
         res.json(client).status(200);
      }
   });
});

router.put("/", async (req, res) => {
   Client.findById({ _id: req.body._id }, function (err, client) {
      if (err) {
         res.json({ error: err });
         console.log(err);
      } else {
         if (req.body.name) client.name = req.body.name;
         if (req.body.phone) client.phone = req.body.phone;
         if (req.body.email) client.email = req.body.email;
         if (req.body.address) client.address = req.body.address;
         if (req.body.facebook_link)
            client.facebook_link = req.body.facebook_link;
         if (req.body.instagram_link)
            client.instagram_link = req.body.instagram_link;

         client.save(function (err) {
            if (err) {
               res.json({ error: err });
               console.log(err);
            } else {
               res.json(client).status(200);
            }
         });
      }
   });
});
module.exports = router;
