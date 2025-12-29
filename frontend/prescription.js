function createPrescription() {

  var patientName = document.getElementById("patient").value;
  var medicine = document.getElementById("medicine").value;
  var dose = document.getElementById("dose").value;

  if (patientName === "") {
    alert("Please enter patient name");
    return;
  }

  var prescription = {
    patient: patientName,
    medicine: medicine,
    dose: dose
  };

  // Save prescription for patient page
  localStorage.setItem("prescription", JSON.stringify(prescription));

  // Clear old QR
  document.getElementById("qrcode").innerHTML = "";

  // Generate QR code
  new QRCode(document.getElementById("qrcode"), {
    text: JSON.stringify(prescription),
    width: 150,
    height: 150
  });

  alert(
    "Prescription Created\n\n" +
    "Patient: " + patientName + "\n" +
    "Medicine: " + medicine + "\n" +
    "Dose: " + dose
  );
}
