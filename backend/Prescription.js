function createPrescription() {
  const patientName = document.getElementById("patient").value;
  const medicine = document.getElementById("medicine").value;
  const dose = document.getElementById("dose").value;

  if (patientName === "" || medicine === "" || dose === "") {
    alert("Please fill all fields");
    return;
  }

  // 🔗 Send data to backend
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
  .then(response => response.json())
  .then(data => {
    alert("Prescription sent to backend");

    // ✅ Generate QR Code
    document.getElementById("qrcode").innerHTML = "";

    const qrData = `
Patient: ${patientName}
Medicine: ${medicine}
Dose: ${dose}
    `;

    new QRCode(document.getElementById("qrcode"), {
      text: qrData,
      width: 150,
      height: 150
    });

    console.log("Backend response:", data);
  })
  .catch(error => {
    console.error("Error:", error);
    alert("Failed to connect to backend");
  });
}
