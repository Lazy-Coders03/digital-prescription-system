const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check route (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// test API route
app.post("/create", (req, res) => {
  console.log("Received data:", req.body);
  res.json({ success: true, message: "Prescription received" });
});

// 🔥 IMPORTANT: use process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
