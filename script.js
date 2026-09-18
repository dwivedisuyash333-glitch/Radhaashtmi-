(() => {
  "use strict";

  const canvas = document.getElementById("radhaCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  const data = window.RADHA_PIXELS;
  if (!data || !data.pixels?.length) return;

  // Each source pixel becomes a clearly visible 3x3 pixel block.
  const PIXEL_DRAW_SIZE = 3;
  canvas.width = data.width * PIXEL_DRAW_SIZE;
  canvas.height = data.height * PIXEL_DRAW_SIZE;
  ctx.imageSmoothingEnabled = false;

  // Deterministic shuffle: every pixel is revealed individually, but in a
  // scattered order so the whole figure slowly forms instead of appearing at once.
  let seed = 18092026;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const pixels = data.pixels.map(p => ({
    x: p[0], y: p[1], r: p[2], g: p[3], b: p[4], a: p[5]
  }));

  for (let i = pixels.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pixels[i], pixels[j]] = [pixels[j], pixels[i]];
  }

  let index = 0;
  const PIXELS_PER_FRAME = 4;

  function reveal() {
    for (let i = 0; i < PIXELS_PER_FRAME && index < pixels.length; i++) {
      const p = pixels[index++];
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
      ctx.fillRect(
        p.x * PIXEL_DRAW_SIZE,
        p.y * PIXEL_DRAW_SIZE,
        PIXEL_DRAW_SIZE,
        PIXEL_DRAW_SIZE
      );
    }

    if (index < pixels.length) {
      requestAnimationFrame(reveal);
    } else {
      finishReveal();
    }
  }

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  const messages = [
    "राधाष्टमी के पावन अवसर पर आपको हार्दिक शुभकामनाएँ।",
    "राधा रानी की कृपा सदैव आप दोनों पर बनी रहे, और आप दोनों को यूँ ही हमेशा साथ रखें।",
    "स्वयं राधारानी की ओर से आप दोनों को 5 महीने पूरे होने पर ढेरों शुभकामनाएँ।"
  ];

  const card = document.getElementById("messageCard");
  const text = document.getElementById("messageText");

  async function showMessage(message) {
    // Same exact position: old paragraph disappears first, then the next one pops in.
    card.classList.remove("show");
    await wait(650);
    text.textContent = message;
    card.classList.add("show");
  }

  async function finishReveal() {
    canvas.classList.add("ready");
    await wait(900);
    document.getElementById("radheTitle").classList.add("visible");
    await wait(900);

    // One paragraph at a time. Each stays for 5 seconds.
    await showMessage(messages[0]);
    await wait(5000);
    await showMessage(messages[1]);
    await wait(5000);
    await showMessage(messages[2]);
    await wait(900);
    petals();
  }

  function petals() {
    const box = document.getElementById("petals");
    const count = innerWidth < 600 ? 22 : 34;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("span");
      p.className = "petal";
      p.style.left = (Math.random() * 100) + "%";
      p.style.setProperty("--drift", (-110 + Math.random() * 220) + "px");
      p.style.animationDuration = (6 + Math.random() * 5) + "s";
      p.style.animationDelay = (Math.random() * 2) + "s";
      box.appendChild(p);
    }
  }

  setTimeout(reveal, 700);
})();
