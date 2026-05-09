// // const express = require("express");
// // const Product = require("../models/Product");
// // const Log = require("../models/Log");

// // const router = express.Router();

// // // GET products with calculated stock
// // router.get("/", async (req, res) => {
// //   const products = await Product.find();

// //   const result = await Promise.all(
// //     products.map(async (p) => {
// //       const logs = await Log.find({ productId: p._id });

// //       const totalTaken = logs.reduce((sum, l) => sum + l.quantityTaken, 0);

// //       return {
// //         _id: p._id,
// //         name: p.name,
// //         totalAdded: p.totalAdded,
// //         availableStock: p.totalAdded - totalTaken,
// //       };
// //     })
// //   );

// //   res.json(result);
// // });

// // // ADD product
// // router.post("/", async (req, res) => {
// //   const product = new Product(req.body);
// //   await product.save();
// //   res.json(product);
// // });

// // // UPDATE product
// // router.put("/:id", async (req, res) => {
// //   const { name, totalAdded, category } = req.body;

// //   const updated = await Product.findByIdAndUpdate(
// //     req.params.id,
// //     { name, totalAdded, category },
// //     { new: true }
// //   );

// //   res.json(updated);
// // });

// // // DELETE product
// // router.delete("/:id", async (req, res) => {
// //   await Product.findByIdAndDelete(req.params.id);

// //   // also delete logs of this product
// //   await Log.deleteMany({ productId: req.params.id });

// //   res.json({ message: "Deleted" });
// // });
// // module.exports = router;

// const express = require("express");
// const Product = require("../models/Product");
// const Log = require("../models/Log");

// const router = express.Router();

// // ✅ GET PRODUCTS (WITH CATEGORY + STOCK)
// router.get("/", async (req, res) => {
//   const products = await Product.find();

//   const result = await Promise.all(
//     products.map(async (p) => {
//       const logs = await Log.find({ productId: p._id });

//       const totalTaken = logs.reduce(
//         (sum, l) => sum + l.quantityTaken,
//         0
//       );

//       return {
//         _id: p._id,
//         name: p.name,
//         totalAdded: p.totalAdded,
//         category: p.category, // ✅ IMPORTANT
//         availableStock: p.totalAdded - totalTaken,
//       };
//     })
//   );

//   res.json(result);
// });

// // ✅ ADD PRODUCT (CATEGORY SAVED)
// router.post("/", async (req, res) => {
//   const { name, totalAdded, category } = req.body;

//   if (!name || !totalAdded || !category) {
//     return res.status(400).json({ error: "All fields required" });
//   }

//   const product = new Product({
//     name,
//     totalAdded,
//     category, // ✅ SAVE CATEGORY
//   });

//   await product.save();

//   res.json(product);
// });

// // UPDATE
// router.put("/:id", async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(updated);
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   await Log.deleteMany({ productId: req.params.id });
//   res.json({ message: "Deleted" });
// });

// module.exports = router;

const express = require("express");
const Product = require("../models/Product");
const Log = require("../models/Log");

const router = express.Router();

// GET PRODUCTS WITH STOCK
router.get("/", async (req, res) => {
  const products = await Product.find();

  const result = await Promise.all(
    products.map(async (p) => {
      const logs = await Log.find({ productId: p._id });

      const totalTaken = logs.reduce((sum, l) => sum + l.quantityTaken, 0);

      return {
        ...p._doc,
        availableStock: p.totalAdded - totalTaken,
      };
    })
  );

  res.json(result);
});

// ADD PRODUCT
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  await Log.deleteMany({ productId: req.params.id });
  res.json({ message: "Deleted" });
});

module.exports = router;