document.addEventListener("DOMContentLoaded", function () {
  const botonesUsuario = document.getElementById("botonesUsuario");
  const userId = localStorage.getItem("userId");

  // Insertar botones dependiendo de si hay sesión activa
  if (userId) {
    botonesUsuario.innerHTML = `
      <div class="iconos-derecha">
        <a href="perfil.html" title="Perfil"><i class="fas fa-user"></i></a>
      </div>
      <button onclick="cerrarSesion()" class="btn btn-primario">Cerrar sesión</button>
    `;
  } else {
    botonesUsuario.innerHTML = `
      <a href="register.html"><button class="btn btn-secundario">Registrarse</button></a>
      <a href="login.html"><button class="btn btn-primario">Iniciar sesión</button></a>
    `;
  }

  // Lógica de desplegar/ocultar notificaciones
  const iconoCampana = document.getElementById("iconoCampana");
  const dropdown = document.getElementById("dropdownNotificaciones");

  if (iconoCampana && dropdown) {
    iconoCampana.addEventListener("click", function (e) {
      e.preventDefault();
      dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    window.addEventListener("click", function (e) {
      if (!iconoCampana.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = "none";
      }
    });
  }

  // Función cerrar sesión
  window.cerrarSesion = function () {
    localStorage.removeItem("userId");
    localStorage.setItem("mensajePerfil", "Sesión cerrada correctamente.");
    window.location.href = "index.html";
  };

  // Accesibilidad: Alto contraste
  const btnContraste = document.getElementById("btnContraste");
  if (btnContraste) {
    btnContraste.addEventListener("click", () => {
      document.body.classList.toggle("modo-alto-contraste");
    });
  }

  // Accesibilidad: Tamaño de texto
  const btnAumentarTexto = document.getElementById("btnAumentarTexto");
  const btnDisminuirTexto = document.getElementById("btnDisminuirTexto");
  let tamanoTexto = 100;

  function ajustarTamanoTexto(delta) {
    tamanoTexto = Math.max(80, Math.min(150, tamanoTexto + delta));
    document.body.style.fontSize = tamanoTexto + "%";
  }

  if (btnAumentarTexto) {
    btnAumentarTexto.addEventListener("click", () => ajustarTamanoTexto(10));
  }

  if (btnDisminuirTexto) {
    btnDisminuirTexto.addEventListener("click", () => ajustarTamanoTexto(-10));
  }
});
