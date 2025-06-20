fetch("components/navbar.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbar-container").innerHTML = html;

    const botonesUsuario = document.getElementById("botonesUsuario");
    const userId = localStorage.getItem("userId");
    if (botonesUsuario) {
      botonesUsuario.innerHTML = userId
        ? `<div class="iconos-derecha">
             <a href="perfil.html" title="Perfil"><i class="fas fa-user"></i></a>
           </div>
           <button onclick="cerrarSesion()" class="btn btn-primario">Cerrar sesión</button>`
        : `<a href="register.html"><button class="btn btn-secundario">Registrarse</button></a>
           <a href="login.html"><button class="btn btn-primario">Iniciar sesión</button></a>`;
    }

    const iconoCampana = document.getElementById("iconoCampana");
    const dropdown = document.getElementById("dropdownNotificaciones");
    if (iconoCampana && dropdown) {
      iconoCampana.addEventListener("click", e => {
        e.preventDefault();
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
      });
      window.addEventListener("click", e => {
        if (!iconoCampana.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });
    }

    window.cerrarSesion = () => {
      localStorage.removeItem("userId");
      localStorage.setItem("mensajePerfil", "Sesión cerrada correctamente.");
      window.location.href = "index.html";
    };

    if (localStorage.getItem("modoAltoContraste") === "true") {
      document.body.classList.add("modo-alto-contraste");
    }
    const btnContraste = document.getElementById("btnContraste");
    btnContraste?.addEventListener("click", () => {
      const activo = document.body.classList.toggle("modo-alto-contraste");
      localStorage.setItem("modoAltoContraste", activo);
    });

    let zoomLevel = parseFloat(localStorage.getItem("zoomLevel")) || 1;
    document.body.style.zoom = zoomLevel;
    const btnAum = document.getElementById("btnAumentarTexto");
    const btnDis = document.getElementById("btnDisminuirTexto");

    btnAum?.addEventListener("click", () => {
      zoomLevel = Math.min(2, zoomLevel + 0.1);
      document.body.style.zoom = zoomLevel;
      localStorage.setItem("zoomLevel", zoomLevel);
    });

    btnDis?.addEventListener("click", () => {
      zoomLevel = Math.max(0.5, zoomLevel - 0.1);
      document.body.style.zoom = zoomLevel;
      localStorage.setItem("zoomLevel", zoomLevel);
    });

    const msg = localStorage.getItem("mensajePerfil");
    if (msg) {
      alert(msg);
      localStorage.removeItem("mensajePerfil");
    }
  })
  .catch(err => console.error("Error cargando navbar:", err));
