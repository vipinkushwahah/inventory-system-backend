require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("Starting server...");

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log("MongoDB Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));

// Render Port
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});