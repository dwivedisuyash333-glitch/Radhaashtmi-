(() => {
  const canvas = document.getElementById('radhaCanvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  const d = window.RADHA_PIXELS;
  if (!d || !d.pixels || !d.pixels.length) return;

  // Every source pixel becomes one sharp square block. No image scaling/filtering.
  const BLOCK = 4;
  canvas.width = d.width * BLOCK;
  canvas.height = d.height * BLOCK;
  canvas.style.width = `${canvas.width}px`;
  canvas.style.height = `${canvas.height}px`;
  ctx.imageSmoothingEnabled = false;

  const pixels = d.pixels.slice();
  // Deterministic shuffle: the figure grows naturally instead of appearing line-by-line.
  let seed = 20260918;
  for (let i = pixels.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [pixels[i], pixels[j]] = [pixels[j], pixels[i]];
  }

  let i = 0;
  const PIXELS_PER_FRAME = 18;

  function reveal() {
    const end = Math.min(i + PIXELS_PER_FRAME, pixels.length);
    for (; i < end; i++) {
      const [x, y, r, g, b] = pixels[i];
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x * BLOCK, y * BLOCK, BLOCK, BLOCK);
    }
    if (i < pixels.length) requestAnimationFrame(reveal);
    else finish();
  }

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const messages = [
    'राधाष्टमी के पावन अवसर पर आपको हार्दिक शुभकामनाएँ।',
    'राधा रानी की कृपा सदैव आप दोनों पर बनी रहे, और आप दोनों को यूँ ही हमेशा साथ रखें।',
    'स्वयं राधारानी की ओर से आप दोनों को 5 महीने पूरे होने पर ढेरों शुभकामनाएँ।'
  ];

  const card = document.getElementById('messageCard');
  const text = document.getElementById('messageText');

  async function showMessage(message) {
    card.classList.remove('show');
    await wait(700);
    text.textContent = message;
    card.classList.add('show');
  }

  async function finish() {
    await wait(700);
    document.getElementById('radheTitle').classList.add('visible');
    await wait(1200);
    for (let n = 0; n < messages.length; n++) {
      await showMessage(messages[n]);
      if (n < messages.length - 1) await wait(5000);
    }
    await wait(600);
    petals();
  }

  function petals() {
    const box = document.getElementById('petals');
    const count = innerWidth < 600 ? 20 : 32;
    for (let n = 0; n < count; n++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.style.left = Math.random() * 100 + '%';
      p.style.setProperty('--drift', (-110 + Math.random() * 220) + 'px');
      p.style.animationDuration = 6 + Math.random() * 5 + 's';
      p.style.animationDelay = Math.random() * 2 + 's';
      box.appendChild(p);
    }
  }

  setTimeout(reveal, 250);
})();
