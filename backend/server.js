const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// 🔗 MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));

// Prescription schema
const PrescriptionSchema = new mongoose.Schema({
  patient: String,
  medicine: String,
  dose: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Prescription = mongoose.model("Prescription", PrescriptionSchema);

// health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// CREATE prescription (save to DB)
app.post("/create", async (req, res) => {
  try {
    const { patient, medicine, dose } = req.body;

    const newPrescription = new Prescription({
      patient,
      medicine,
      dose
    });

    await newPrescription.save();

    console.log("Saved:", newPrescription);

    res.json({
      success: true,
      message: "Prescription saved"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to save prescription" });
  }
});

// 🔥 FETCH prescriptions for patient
app.get("/patient/:name", async (req, res) => {
  try {
    const data = await Prescription.find({
      patient: req.params.name
    });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch prescriptions" });
  }
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
