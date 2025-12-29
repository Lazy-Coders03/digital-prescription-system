fetch("https://digital-prescription-system.onrender.com/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    patient: patientName,
    medicine: medicine,
    dose: dose
  })
})
.then(res => res.json())
.then(data => {
  alert("Prescription saved successfully");
})
.catch(err => {
  alert("Backend error");
});
