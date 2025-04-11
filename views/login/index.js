const emailInput = document.querySelector("#email-input");
const passwordInput = document.querySelector("#password-input");
const form = document.querySelector("#form");
const errorText = document.querySelector("#error-text");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const user = {
      email: emailInput.value,
      password: passwordInput.value,
    };
    const res = await axios.post("/api/login", user);

    // Se extrae el userId de la respuesta
    const userId = res.data.userId;
    console.log("User logged in. User ID:", userId);

    // Guardar el userId en localStorage
    localStorage.setItem("userId", userId);

    // Redireccionar a la ruta deseada
    window.location.pathname = `/games/`;
  } catch (error) {
    console.log(error);
    errorText.innerHTML = error.response.data.error;
  }
});