const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    totalAdded: {
      type: Number,
      default: 0,
    },

    // LAST UPDATED AMOUNT
    lastAddedAmount: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      default: "Other",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Product",
  productSchema
);