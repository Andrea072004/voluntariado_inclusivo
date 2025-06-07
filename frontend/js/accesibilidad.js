// accesibilidad.js

document.addEventListener("DOMContentLoaded", () => {
  const btnContraste = document.getElementById("btnContraste");

  // Recuperar preferencia del usuario
  const modoActivo = localStorage.getItem("modoContraste") === "true";
  if (modoActivo) {
    document.body.classList.add("modo-contraste");
  }

  // Evento de clic
  btnContraste?.addEventListener("click", () => {
    document.body.classList.toggle("modo-contraste");

    // Guardar preferencia
    const estaActivo = document.body.classList.contains("modo-contraste");
    localStorage.setItem("modoContraste", estaActivo);
  });
});
