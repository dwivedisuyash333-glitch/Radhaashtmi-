(() => {
  const data = window.RADHA_PIXEL_GRID;
  const canvas = document.getElementById('radhaCanvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!data || !canvas) return;

  const W = data.width, H = data.height;
  canvas.width = W;
  canvas.height = H;
  ctx.imageSmoothingEnabled = false;

  const rgb = Uint8Array.from(atob(data.rgb), c => c.charCodeAt(0));
  const alpha = Uint8Array.from(atob(data.alpha), c => c.charCodeAt(0));

  const cells = [];
  for (let i = 0; i < W * H; i++) {
    if (alpha[i]) cells.push(i);
  }

  // Deterministic shuffle: every visible cell is revealed individually.
  let seed = 18092026;
  for (let i = cells.length - 1; i > 0; i--) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const j = seed % (i + 1);
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }

  const chunk = 520;
  let cursor = 0;
  const rgba = new Uint8ClampedArray(4);

  function revealFrame() {
    const end = Math.min(cursor + chunk, cells.length);
    for (; cursor < end; cursor++) {
      const i = cells[cursor];
      const p = i * 3;
      const x = i % W;
      const y = (i / W) | 0;
      rgba[0] = rgb[p];
      rgba[1] = rgb[p + 1];
      rgba[2] = rgb[p + 2];
      rgba[3] = 255;
      ctx.fillStyle = `rgb(${rgba[0]},${rgba[1]},${rgba[2]})`;
      ctx.fillRect(x, y, 1, 1);
    }
    if (cursor < cells.length) requestAnimationFrame(revealFrame);
    else finish();
  }

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const messages = [
    'राधाष्टमी के पावन अवसर पर आपको हार्दिक शुभकामनाएँ।',
    'राधा रानी की कृपा सदैव आप दोनों पर बनी रहे, और आप दोनों को यूँ ही हमेशा साथ रखें।',
    'स्वयं राधारानी की ओर से आप दोनों को 5 महीने पूरे होने पर ढेरों शुभकामनाएँ।'
  ];

  const title = document.getElementById('radheTitle');
  const card = document.getElementById('messageCard');
  const message = document.getElementById('messageText');

  async function showMessage(text) {
    card.classList.remove('show');
    await sleep(500);
    message.textContent = text;
    card.classList.add('show');
  }

  async function finish() {
    await sleep(450);
    title.classList.add('visible');
    await sleep(1800);
    for (let i = 0; i < messages.length; i++) {
      await showMessage(messages[i]);
      if (i < messages.length - 1) await sleep(5000);
    }
    await sleep(700);
    dropPetals();
  }

  function dropPetals() {
    const box = document.getElementById('petals');
    const count = innerWidth < 600 ? 18 : 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'petal';
      p.style.left = `${Math.random() * 100}%`;
      p.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
      p.style.animationDuration = `${6 + Math.random() * 4}s`;
      p.style.animationDelay = `${Math.random() * 1.5}s`;
      box.appendChild(p);
    }
  }

  setTimeout(revealFrame, 350);
})();
