const glow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
  const offsetX = e.clientX - (glow.offsetWidth / 2);
  const offsetY = e.clientY - (glow.offsetHeight / 2);
  glow.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});
