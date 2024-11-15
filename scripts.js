document.getElementById("emailForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

  // Obtén los valores de los campos
  const to = document.getElementById("to").value;
  const subject = document.getElementById("subject").value;
  const cc = document.getElementById("cc").value;
  const body = document.getElementById("body").value;
  const errorMessage = document.getElementById("errorMessage");

  // Validación básica
  if (!to || !subject || !body) {
    errorMessage.style.display = "block";
    errorMessage.textContent =
      "Por favor, completa todos los campos requeridos.";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  // Crea los datos del formulario
  const emailData = {
    destination: to,
    subject: subject,
    cc: cc,
    message: body,
  };

  // Realiza el POST al endpoint /email
  fetch("http://localhost:8080/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  })
    .then((response) => {
      if (response.ok) {
        alert("Email enviado con éxito!");
        document.getElementById("emailForm").reset(); // Reinicia el formulario
      } else {
        alert("Error al enviar el email.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Ocurrió un error al enviar el email.");
    });
});
