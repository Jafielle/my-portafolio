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
  const fadeEnd = heroTop + heroHeight * 0.5; // fades out by halfway through hero

  // Scroll progress from 0 (start) to 1 (fade end)
  let progress = 1;
  if (scrollTop > fadeStart) {
    progress = 1 - Math.min((scrollTop - fadeStart) / (fadeEnd - fadeStart), 1);
  }

  // Update radius of spotlight mask
  const radius = 80 * progress;
  const feather = 160 * progress;

  hero.style.setProperty(
    "--mask",
    `radial-gradient(circle at var(--x, -999%) var(--y, -999%), white ${radius}px, transparent ${feather}px)`
  );

  // Adjust glow opacity and size
  glow.style.opacity = progress;
  glow.style.width = `${100 * progress}px`;
  glow.style.height = `${100 * progress}px`;
});
