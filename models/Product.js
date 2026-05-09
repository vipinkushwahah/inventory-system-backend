// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//   name: String,
//   totalAdded: Number,
//   category: String, // ✅ NEW
// });

// module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  totalAdded: Number,
  category: String,
});

module.exports = mongoose.model("Product", productSchema);