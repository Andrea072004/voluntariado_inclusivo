let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function mostrarSlide(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
}

function cambiarSlide(n) {
  mostrarSlide(currentSlide + n);
}

// Mostrar el primer slide al cargar
window.addEventListener("load", () => {
  mostrarSlide(currentSlide);

  // Lógica del formulario de perfil
  const perfilForm = document.getElementById('perfilForm');
  if (perfilForm) {
    const datosGuardados = JSON.parse(localStorage.getItem('perfil'));
    if (datosGuardados) {
      document.getElementById('nombre').value = datosGuardados.nombre || "";
      document.getElementById('intereses').value = datosGuardados.intereses || "";
    }

    perfilForm.addEventListener('submit', function (e) {
      e.preventDefault();
    
      const nombre = document.getElementById('nombre').value;
      const intereses = document.getElementById('intereses').value;
      const password = document.getElementById('password').value;
    
      localStorage.setItem('perfil', JSON.stringify({ nombre, intereses, password }));
    
      // Guardar un mensaje temporal
      localStorage.setItem('mensajePerfil', 'Datos actualizados correctamente');
    
      // Redirigir al inicio
      window.location.href = 'index.html';
    }); 
  }

  // Lógica de login con redirección a perfil.html
  const loginBtn = document.getElementById('btnLogin');
  if (loginBtn) {
    const loginForm = loginBtn.closest('form');
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simulación de login exitoso
      localStorage.setItem('logueado', 'true');
      window.location.href = 'perfil.html';
    });
  }
});
