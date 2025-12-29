function createPrescription() {
  console.log("STEP 1: Button clicked");

  const patientName = document.getElementById("patient").value;
  const medicine = document.getElementById("medicine").value;
  const dose = document.getElementById("dose").value;

  if (!patientName || !medicine || !dose) {
    alert("Please fill all fields");
    return;
  }

  console.log("STEP 2: About to send POST request");

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
  .then(res => {
    console.log("STEP 3: Response received");
    return res.json();
  })
  .then(data => {
    console.log("STEP 4: Backend data:", data);

    alert("Prescription sent to backend");

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
      text: `Patient: ${patientName}\nMedicine: ${medicine}\nDose: ${dose}`,
      width: 150,
      height: 150
    });
  })
  .catch(err => {
    console.error("STEP 5: Fetch failed", err);
    alert("Backend connection failed");
  });
}
