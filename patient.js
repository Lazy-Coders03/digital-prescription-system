function loadPrescriptions() {
  const name = document.getElementById("patientName").value;

  if (!name) {
    alert("Please enter patient name");
    return;
  }

  fetch(`https://digital-prescription-system.onrender.com/patient/${name}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("prescriptionList");
      list.innerHTML = "";

      if (data.length === 0) {
        list.innerHTML = "<p>No prescriptions found.</p>";
        return;
      }

      data.forEach(p => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
          <p><strong>Medicine:</strong> ${p.medicine}</p>
          <p><strong>Dose:</strong> ${p.dose}</p>
          <p><small>${new Date(p.createdAt).toLocaleString()}</small></p>
        `;

        list.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load prescriptions");
    });
}
