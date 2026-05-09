// const express = require("express");
// const Log = require("../models/Log");
// const Product = require("../models/Product");

// const router = express.Router();

// // TAKE product
// router.post("/take", async (req, res) => {
//   const { productId, quantityTaken, takenBy } = req.body;

//   if (!productId) return res.status(400).json({ error: "Select product" });
//   if (!takenBy) return res.status(400).json({ error: "Enter name" });

//   const product = await Product.findById(productId);
//   if (!product) return res.status(404).json({ error: "Not found" });

//   const logs = await Log.find({ productId });

//   const totalTaken = logs.reduce((sum, l) => sum + l.quantityTaken, 0);
//   const available = product.totalAdded - totalTaken;

//   if (quantityTaken > available) {
//     return res.status(400).json({ error: "Not enough stock" });
//   }

//   const log = new Log({
//     productId,
//     productName: product.name,
//     category: product.category, // ✅ IMPORTANT
//     quantityTaken,
//     takenBy,
//   });

//   await log.save();

//   res.json({ message: "Saved" });
// });

// // GET logs
// router.get("/", async (req, res) => {
//   const logs = await Log.find().sort({ date: -1 });
//   res.json(logs);
// });

// // UPDATE log
// router.put("/:id", async (req, res) => {
//   const { quantityTaken, takenBy } = req.body;

//   const updated = await Log.findByIdAndUpdate(
//     req.params.id,
//     { quantityTaken, takenBy },
//     { new: true }
//   );

//   res.json(updated);
// });

// // DELETE log
// router.delete("/:id", async (req, res) => {
//   await Log.findByIdAndDelete(req.params.id);
//   res.json({ message: "Log deleted" });
// });

// module.exports = router;


const express = require("express");
const Log = require("../models/Log");
const Product = require("../models/Product");

const router = express.Router();

// TAKE PRODUCT
router.post("/take", async (req, res) => {
  const { productId, quantityTaken, takenBy } = req.body;

  const product = await Product.findById(productId);

  const logs = await Log.find({ productId });
  const totalTaken = logs.reduce((sum, l) => sum + l.quantityTaken, 0);

  if (quantityTaken > product.totalAdded - totalTaken) {
    return res.status(400).json({ error: "Not enough stock" });
  }

  const log = new Log({
    productId,
    productName: product.name,
    category: product.category,
    quantityTaken,
    takenBy,
  });

  await log.save();

  res.json({ message: "Saved successfully", log });
});

// GET LOGS
router.get("/", async (req, res) => {
  const logs = await Log.find().sort({ date: -1 });
  res.json(logs);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Log.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;