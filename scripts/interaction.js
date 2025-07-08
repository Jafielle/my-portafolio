// Inicializa el spotlight fuera de la pantalla
document.documentElement.style.setProperty("--x", "-999%");
document.documentElement.style.setProperty("--y", "-999%");

const glow = document.getElementById("cursor-glow");
const hero = document.getElementById("hero");

// Mousemove controls spotlight position
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  glow.style.transform = `translate(${x}px, ${y}px)`;

  hero.style.setProperty("--x", `${x}px`);
  hero.style.setProperty("--y", `${y}px`);
});

// Scroll controls fade and shrink of the spotlight
document.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const heroTop = hero.offsetTop;
  const heroHeight = hero.offsetHeight;

  const fadeStart = heroTop;
  const fadeEnd = heroTop + heroHeight * 0.5;

  let progress = 1;
  if (scrollTop > fadeStart) {
    progress = 1 - Math.min((scrollTop - fadeStart) / (fadeEnd - fadeStart), 1);
  }

  const radius = 80 * progress;
  const feather = 160 * progress;

  hero.style.setProperty(
    "--mask",
    `radial-gradient(circle at var(--x, -999%) var(--y, -999%), white ${radius}px, transparent ${feather}px)`
  );

  glow.style.opacity = progress;
  glow.style.width = `${100 * progress}px`;
  glow.style.height = `${100 * progress}px`;
});

// === Carruseles de proyectos ===
document.querySelectorAll(".carousel-images").forEach((carousel) => {
  let currentIndex = 0;
  const images = carousel.children;
  const total = images.length;

  const prev = carousel.parentElement.querySelector(".prev");
  const next = carousel.parentElement.querySelector(".next");

  const updateCarousel = () => {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  };

  prev?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + total) % total;
    updateCarousel();
  });

  next?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % total;
    updateCarousel();
  });
});

let currentSlide = 0;

function nextSlide(id) {
  const container = document.getElementById(id);
  const totalSlides = container.children.length;
  currentSlide = (currentSlide + 1) % totalSlides;
  container.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function prevSlide(id) {
  const container = document.getElementById(id);
  const totalSlides = container.children.length;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  container.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// === Carrusel específico de Servicios Vivir ===
function setSlide(index) {
  const carousel = document.getElementById("carousel-servivir");
  const totalSlides = carousel.children.length;
  const clampedIndex = index % totalSlides;
  carousel.style.transform = `translateX(-${clampedIndex * 100}%)`;
}
