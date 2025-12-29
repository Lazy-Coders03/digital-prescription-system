function createPrescription() {
  const patientName = document.getElementById("patient").value;
  const medicine = document.getElementById("medicine").value;
  const dose = document.getElementById("dose").value;

  if (!patientName || !medicine || !dose) {
    alert("Please fill all fields");
    return;
  }

  const prescription = {
    patient: patientName,
    medicine: medicine,
    dose: dose
  };

  // 🔗 SEND TO BACKEND
  fetch("https://digital-prescription-system.onrender.com/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(prescription)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Backend response:", data);

      // Save for patient page
      localStorage.setItem("prescription", JSON.stringify(prescription));

      // Generate QR
      document.getElementById("qrcode").innerHTML = "";
      new QRCode(document.getElementById("qrcode"), {
        text: JSON.stringify(prescription),
        width: 150,
        height: 150
      });

      alert("Prescription sent to backend successfully ✅");
    })
    .catch(err => {
      console.error("Backend error:", err);
      alert("Backend connection failed ❌");
    });
}
