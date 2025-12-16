/* ===============================
   NETWORK BACKGROUND (HERO)
================================ */

const canvas = document.createElement("canvas");
canvas.id = "network-bg";
document.querySelector(".hero").prepend(canvas);

const ctx = canvas.getContext("2d");

let width, height;
const points = [];
const POINT_COUNT = 80;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

for (let i = 0; i < POINT_COUNT; i++) {
  points.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (let p of points) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.fillStyle = "rgba(77,163,255,0.8)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < POINT_COUNT; i++) {
    for (let j = i + 1; j < POINT_COUNT; j++) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        ctx.strokeStyle = `rgba(77,163,255,${1 - dist / 120})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();

/* ===============================
   SCROLL REVEAL
================================ */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".section").forEach(section => {
  observer.observe(section);
});

/* ===============================
   SMOOTH SCROLL
================================ */

document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

/* ===============================
   NAVBAR SHADOW ON SCROLL
================================ */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    navbar.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
  } else {
    navbar.style.boxShadow = "none";
  }
});
