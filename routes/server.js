require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/uploads", express.static("uploads"));
app.post("/api/payment", (req, res) => {
const { amount } = req.body;
if (amount > 0) {
res.json({ status: "success" });
} else {
res.status(400).json({ status: "failed" });
}
});
app.get("/", (req, res) => {
res.send("API Running");
});
app.listen(process.env.PORT, () => console.log("Server started"));