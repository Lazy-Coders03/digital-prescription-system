const express = require("express");
const cors = require("cors");

require("./db");
const Prescription = require("./Prescription");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", function (req, res) {
  res.send("Backend is running");
});

// Create prescription API
app.post("/create", function (req, res) {
  const prescription = new Prescription({
    patient: req.body.patient,
    medicine: req.body.medicine,
    dose: req.body.dose
  });

  prescription.save(function () {
    res.send("Prescription saved successfully");
  });
});

app.listen(5000, function () {
  console.log("Server running on http://localhost:5000");
});
