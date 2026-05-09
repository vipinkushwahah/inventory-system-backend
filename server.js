const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

console.log("Starting server...");

mongoose.connect("mongodb+srv://vipinkuswahah:vipin123@chatapp.o2z9nli.mongodb.net/inventory")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));

app.listen(5001, () => {
  console.log("Server running on http://localhost:5001");
});