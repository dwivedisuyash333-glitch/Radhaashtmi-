(() => {
  "use strict";

  const canvas = document.getElementById("radhaCanvas");
  const ctx = canvas.getContext("2d");
  const data = window.RADHA_PIXELS;

  if (!data || !data.pixels || !data.width || !data.height) {
    // Friendly fallback if radha_pixels.js has not yet been generated.
    ctx.font = "16px serif";
    ctx.fillStyle = "#e4b95f";
    ctx.textAlign = "center";
    ctx.fillText("radha_pixels.js अभी जोड़ना है", 300, 80);
    return;
  }

  canvas.width = data.width;
  canvas.height = data.height;
  ctx.imageSmoothingEnabled = false;

  // Deterministic order: the reveal is random-looking but repeatable.
  let seed = 19092026;
  function random() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  const particles = data.pixels.map(p => ({
    x: p[0], y: p[1], r: p[2], g: p[3], b: p[4], a: p[5]
  }));

  // Fisher-Yates shuffle.
  for (let i = particles.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [particles[i], particles[j]] = [particles[j], particles[i]];
  }

  ctx.clearRect(0, 0, data.width, data.height);

  let index = 0;
  const batch = Math.max(12, Math.floor(particles.length / 120));

  function reveal() {
    for (let i = 0; i < batch && index < particles.length; i++) {
      const p = particles[index++];
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
      ctx.fillRect(p.x, p.y, 1, 1);
    }

    if (index < particles.length) {
      requestAnimationFrame(reveal);
    } else {
      finish();
    }
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function finish() {
    await wait(700);
    document.getElementById("radheTitle").classList.add("visible");

    await wait(1800);
    document.getElementById("greeting").classList.add("show");

    await wait(2600);
    document.getElementById("blessing").classList.add("show");

    await wait(3000);
    document.getElementById("anniversary").classList.add("show");

    await wait(800);
    createPetals();
  }

  function createPetals() {
    const container = document.getElementById("petals");
    const count = window.innerWidth < 600 ? 24 : 38;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
      p.style.animationDuration = `${5 + Math.random() * 5}s`;
      p.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(p);
    }
  }

  requestAnimationFrame(() => setTimeout(reveal, 450));
})();
