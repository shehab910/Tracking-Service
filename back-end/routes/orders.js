const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Order = require("../models/Order");
const getAndUpdateCounter = require("../utils/getAndUpdateCounter");

router.get("/", (req, res) => {
   //get all clients from db
   Order.find({}, function (err, orders) {
      if (err) {
         res.json({ error: err });
         console.log(err);
      } else {
         res.json(orders).status(200);
      }
   });
});

router.post("/", async (req, res) => {
   const clientId = req.body.clientId;
   const { items } = req.body;
   const { shippment_id, delivery_status, shipping_fees, additonal_notes } =
      req.body.orderInfo;
   const orderId = await getAndUpdateCounter("order_seq_value");
   const order = new Order({
      shippmentId: shippment_id,
      clientId: clientId,
      items: items,
      // date:,
      delivery_status,
      total: items.reduce((acc, item) => acc + item.deal_price, 0),
      shippingFees: shipping_fees,
      notes: additonal_notes,
      cid: orderId,
   });
   order.save(function (err) {
      if (err) {
         getAndUpdateCounter("order_seq_value", true);
         res.json({ error: err });
         console.log(err);
      } else {
         res.json(order).status(200);
      }
   });
});

module.exports = router;
