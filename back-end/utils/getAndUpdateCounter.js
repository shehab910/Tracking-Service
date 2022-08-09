const Counters = require("../models/Counters");

/**
 *
 * @description: Gets a seq_value from the Counters document and either increment or decrement it.
 * @async
 * @param {("client_seq_value" | "order_seq_value" | "shippment_seq_value")} seqValueName
 * @param {boolean} decrement - if true, decrement the counter
 * @returns {Promise<Number>} currSeq - the current sequence value
 */

const getAndUpdateCounter = async (seqValueName, decrement = false) => {
   const counter = await Counters.find({});
   const currSeq = counter[0][seqValueName];
   if (decrement) {
      counter[0][seqValueName]--;
   } else {
      counter[0][seqValueName]++;
   }
   counter[0].save();
   return currSeq;
};

module.exports = getAndUpdateCounter;
