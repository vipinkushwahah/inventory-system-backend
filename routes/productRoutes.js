const express = require("express");

const Product = require("../models/Product");
const Log = require("../models/Log");

const router = express.Router();


// GET PRODUCTS WITH STOCK
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();

    const result = await Promise.all(
      products.map(async (p) => {
        const logs = await Log.find({
          productId: p._id,
        });

        const totalTaken = logs.reduce(
          (sum, l) => sum + l.quantityTaken,
          0
        );

        return {
          ...p._doc,
          availableStock:
            p.totalAdded - totalTaken,
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
});


// ADD OR UPDATE PRODUCT
router.post("/", async (req, res) => {
  try {
    const {
      name,
      totalAdded,
      category,
    } = req.body;

    // CHECK EXISTING PRODUCT
    const existing =
      await Product.findOne({
        name: name.trim(),
      });

    // UPDATE EXISTING PRODUCT
    if (existing) {
      existing.totalAdded += Number(
        totalAdded
      );

      // STORE LAST ADDED AMOUNT
      existing.lastAddedAmount =
        Number(totalAdded);

      existing.category = category;

      existing.updatedAt = new Date();

      await existing.save();

      return res.json({
        message:
          "Product updated successfully",
        product: existing,
      });
    }

    // CREATE NEW PRODUCT
    const product = new Product({
      name: name.trim(),
      totalAdded: Number(totalAdded),

      // INITIAL LAST AMOUNT
      lastAddedAmount:
        Number(totalAdded),

      category,
    });

    await product.save();

    res.json({
      message:
        "Product added successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to add product",
    });
  }
});

// UPDATE PRODUCT
router.put("/:id", async (req, res) => {
  try {
    const updated =
      await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          updatedAt: new Date(),
        },
        { new: true }
      );

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: "Update failed",
    });
  }
});


// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    await Log.deleteMany({
      productId: req.params.id,
    });

    res.json({
      message: "Deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "Delete failed",
    });
  }
});

module.exports = router;