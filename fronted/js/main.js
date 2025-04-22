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
});
