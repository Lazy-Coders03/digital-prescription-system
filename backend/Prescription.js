const mongoose = require("mongoose");

const PrescriptionSchema = new mongoose.Schema({
  patient: String,
  medicine: String,
  dose: String,
  date: {
    type: String,
    default: new Date().toLocaleDateString()
  }
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
