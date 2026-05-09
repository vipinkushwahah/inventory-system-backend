// const mongoose = require("mongoose");

// const logSchema = new mongoose.Schema({
//   productId: mongoose.Schema.Types.ObjectId,
//   productName: String,
//   category: String, // ✅ NEW
//   quantityTaken: Number,
//   takenBy: String,
//   date: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Log", logSchema);

const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  productName: String,
  category: String,
  quantityTaken: Number,
  takenBy: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Log", logSchema);