(() => {
  "use strict";

  const canvas = document.getElementById("radhaCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  // Low-resolution canvas = genuine pixel-art, not an image.
  const W = 160;
  const H = 220;
  canvas.width = W;
  canvas.height = H;
  ctx.imageSmoothingEnabled = false;

  const source = document.createElement("canvas");
  source.width = W;
  source.height = H;
  const s = source.getContext("2d", { alpha: true });
  s.imageSmoothingEnabled = false;

  const C = {
    skin: "#f1d8c2",
    skinShadow: "#d7aa98",
    hair: "#2a1720",
    hairHi: "#56313c",
    veil: "#c97891",
    veilLight: "#e5a5b5",
    dress: "#f1e0c9",
    dressShadow: "#b9a7a0",
    pink: "#cf7f96",
    pinkDeep: "#a9506d",
    gold: "#d7aa4f",
    goldBright: "#f3d88d",
    pearl: "#fff0d2",
    lotus: "#e5a0b0",
    lotusHi: "#f6c7d0",
    base: "#cbb9a9"
  };

  function poly(points, fill) {
    s.fillStyle = fill;
    s.beginPath();
    s.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) s.lineTo(points[i][0], points[i][1]);
    s.closePath();
    s.fill();
  }

  function ellipse(x, y, rx, ry, fill) {
    s.fillStyle = fill;
    s.beginPath();
    s.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    s.fill();
  }

  function rect(x, y, w, h, fill) {
    s.fillStyle = fill;
    s.fillRect(x, y, w, h);
  }

  function line(x1, y1, x2, y2, width, fill) {
    s.strokeStyle = fill;
    s.lineWidth = width;
    s.lineCap = "square";
    s.beginPath();
    s.moveTo(x1, y1);
    s.lineTo(x2, y2);
    s.stroke();
  }

  // ----- Lotus pedestal -----
  ellipse(80, 209, 49, 7, C.base);
  ellipse(80, 205, 44, 7, "#e2d2c1");

  for (let i = -4; i <= 4; i++) {
    ellipse(80 + i * 9, 198, 10, 7, i % 2 ? C.lotus : C.lotusHi);
  }
  ellipse(80, 197, 12, 7, C.lotusHi);

  // ----- Long skirt / sari silhouette -----
  poly([
    [62, 103], [48, 128], [39, 158], [27, 190], [23, 198],
    [137, 198], [133, 190], [121, 158], [112, 128], [98, 103]
  ], C.dress);

  // Sari shadow folds
  poly([[64,105],[55,139],[52,190],[65,198],[70,145]], C.dressShadow);
  poly([[97,105],[106,142],[112,191],[99,198],[91,145]], C.dressShadow);
  poly([[78,106],[72,148],[75,198],[84,198],[88,147]], "#d8c6b8");

  // Pink outer drape/dupatta
  poly([
    [53, 79], [42, 88], [31, 113], [22, 153], [18, 190],
    [28, 198], [39, 175], [45, 142], [56, 111]
  ], C.veil);

  poly([
    [107, 79], [118, 88], [129, 113], [138, 153], [142, 190],
    [132, 198], [121, 175], [115, 142], [104, 111]
  ], C.veil);

  // Veil gold edges
  line(53, 82, 24, 190, 2, C.gold);
  line(107, 82, 136, 190, 2, C.gold);

  // ----- Torso -----
  poly([[63,72],[97,72],[105,111],[80,128],[55,111]], C.dress);

  // Pink blouse / sleeves
  poly([[61,74],[52,79],[55,101],[65,98]], C.pink);
  poly([[99,74],[108,79],[105,101],[95,98]], C.pink);

  // ----- Arms -----
  // Raised left arm with hand near cheek
  poly([[59,77],[53,78],[48,65],[51,61],[57,70],[63,73]], C.skin);
  ellipse(49, 61, 4, 5, C.skin);
  // Fingers
  line(48, 59, 46, 56, 1.5, C.skinShadow);
  line(50, 59, 49, 55, 1.5, C.skinShadow);
  line(52, 60, 52, 56, 1.5, C.skinShadow);

  // Lower right arm
  poly([[101,78],[108,82],[115,111],[112,118],[106,112],[100,94]], C.skin);
  ellipse(113, 118, 4, 5, C.skin);

  // ----- Neck -----
  rect(72, 61, 16, 14, C.skin);
  rect(73, 69, 14, 7, C.skinShadow);

  // ----- Face -----
  ellipse(80, 47, 18, 22, C.skin);

  // Jaw/chin subtle shading
  poly([[64,51],[68,61],[75,68],[80,70],[85,68],[92,61],[96,51],[93,62],[86,70],[80,73],[73,70],[66,62]], C.skinShadow);

  // Face fill over shade for clean shape
  ellipse(80, 48, 17, 21, C.skin);

  // Hair mass
  ellipse(80, 37, 22, 13, C.hair);
  poly([[59,39],[66,29],[80,25],[94,29],[101,41],[96,58],[92,54],[92,37],[80,31],[68,37],[67,54],[61,58]], C.hair);

  // Hair highlights
  line(65, 39, 72, 31, 2, C.hairHi);
  line(93, 39, 88, 31, 2, C.hairHi);

  // ----- Eyes -----
  ellipse(72.5, 48, 5.2, 2.7, "#fff4df");
  ellipse(87.5, 48, 5.2, 2.7, "#fff4df");
  ellipse(73, 48, 1.7, 2.1, "#2a1820");
  ellipse(87, 48, 1.7, 2.1, "#2a1820");
  line(68, 45, 76, 44, 1, C.hair);
  line(84, 44, 92, 45, 1, C.hair);

  // Brows
  line(68.5, 43, 76, 42, 1.4, C.hair);
  line(84, 42, 91.5, 43, 1.4, C.hair);

  // Nose + lips
  line(80, 48, 78.8, 55, 1, C.skinShadow);
  line(78.8, 55, 81, 56, 1, C.skinShadow);
  line(76.5, 59, 80, 60.2, 1.2, "#9f5265");
  line(80, 60.2, 83.5, 59, 1.2, "#9f5265");

  // Tilak
  line(80, 40, 80, 44, 1.2, "#a85b70");
  rect(78.8, 43, 2.4, 2, "#b96a7c");

  // Earrings
  ellipse(63, 51, 2.5, 5, C.gold);
  ellipse(97, 51, 2.5, 5, C.gold);
  ellipse(63, 55, 1.5, 1.5, C.lotusHi);
  ellipse(97, 55, 1.5, 1.5, C.lotusHi);

  // ----- Crown -----
  poly([
    [59,35],[62,22],[69,14],[75,21],[80,9],[85,21],[92,14],[99,22],[102,35]
  ], C.gold);

  poly([
    [66,28],[72,18],[78,25],[80,13],[83,25],[89,18],[95,28],[95,34],[65,34]
  ], C.goldBright);

  // Crown center jewel
  ellipse(80, 21, 3, 4, C.lotus);
  ellipse(80, 21, 1.5, 2, "#fff1b8");

  // Flower crown accents
  for (const [x, y] of [[62,27],[68,18],[92,18],[98,27]]) {
    ellipse(x, y, 3.5, 2.2, C.lotusHi);
    ellipse(x, y, 1, 1, C.gold);
  }

  // ----- Necklace and jewellery -----
  line(67, 70, 80, 78, 2, C.gold);
  line(93, 70, 80, 78, 2, C.gold);
  ellipse(80, 78, 2.8, 3.2, C.lotus);

  // Multiple pearl necklaces
  for (let k = 0; k < 3; k++) {
    const yy = 76 + k * 4;
    for (let x = 69; x <= 91; x += 4) {
      ellipse(x, yy + Math.abs(x - 80) * 0.03, 1.2, 1.2, C.pearl);
    }
  }

  // ----- Long flower garlands -----
  const garlandX = [64, 96];
  garlandX.forEach((gx) => {
    for (let y = 78; y <= 145; y += 5) {
      ellipse(gx, y, 2.2, 2.8, C.pearl);
      if (y % 10 === 8) ellipse(gx + (gx < 80 ? 3 : -3), y, 2.1, 2.1, C.lotus);
    }
  });
  ellipse(80, 149, 4, 4, C.pearl);
  ellipse(80, 150, 2.5, 2.5, C.lotus);

  // Waist jewellery
  line(62, 108, 98, 108, 2, C.gold);
  ellipse(80, 109, 3, 3, C.lotus);

  // Bangles
  line(49, 66, 53, 64, 2, C.gold);
  line(109, 99, 114, 98, 2, C.gold);
  line(110, 102, 115, 101, 1.5, C.gold);

  // Dress embroidery: repeated gold and pink pixels
  for (let y = 120; y < 190; y += 10) {
    const spread = (y - 120) * 0.22 + 8;
    for (const side of [-1, 1]) {
      const x = Math.round(80 + side * spread);
      rect(x, y, 2, 2, C.gold);
      rect(x + (side < 0 ? -4 : 4), y + 4, 2, 2, C.lotus);
    }
  }

  // Central sari border
  line(80, 119, 80, 194, 2, C.gold);

  // Feet
  ellipse(73, 195, 6, 3, C.skin);
  ellipse(87, 195, 6, 3, C.skin);
  for (const x of [70, 73, 76, 84, 87, 90]) rect(x, 196, 2, 1, C.skinShadow);

  // Final small floral accents around silhouette
  for (const [x, y] of [[39,154],[45,137],[121,137],[126,154],[55,187],[105,187]]) {
    ellipse(x, y, 2.5, 2, C.lotusHi);
    ellipse(x, y, 1, 1, C.gold);
  }

  // ----- Convert visible source pixels into reveal particles -----
  const image = s.getImageData(0, 0, W, H).data;
  const particles = [];

  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4;
      if (image[i + 3] > 20) {
        particles.push({
          x, y,
          r: image[i],
          g: image[i + 1],
          b: image[i + 2],
          a: image[i + 3]
        });
      }
    }
  }

  // Deterministic shuffle so every opening feels intentional.
  let seed = 19092026;
  function random() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  for (let i = particles.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [particles[i], particles[j]] = [particles[j], particles[i]];
  }

  ctx.clearRect(0, 0, W, H);

  let revealed = 0;
  const batch = 75;

  function revealFrame() {
    for (let i = 0; i < batch && revealed < particles.length; i++, revealed++) {
      const p = particles[revealed];
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.a / 255})`;
      ctx.fillRect(p.x, p.y, 1, 1);
    }

    if (revealed < particles.length) {
      requestAnimationFrame(revealFrame);
    } else {
      finishSequence();
    }
  }

  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function finishSequence() {
    await wait(700);

    const radhe = document.getElementById("radhe");
    radhe.classList.add("visible");

    await wait(1800);
    document.getElementById("greeting").classList.add("show");

    await wait(2600);
    document.getElementById("blessing").classList.add("show");

    await wait(3000);
    document.getElementById("anniversary").classList.add("show");

    await wait(900);
    createPetals();
  }

  function createPetals() {
    const container = document.getElementById("petals");
    const count = window.innerWidth < 600 ? 28 : 42;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");
      petal.className = "petal";
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
      petal.style.animationDuration = `${5 + Math.random() * 5}s`;
      petal.style.animationDelay = `${Math.random() * 2.5}s`;
      petal.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.65 + Math.random() * 0.7})`;
      container.appendChild(petal);
    }
  }

  // Start the reveal after the page has painted.
  requestAnimationFrame(() => {
    setTimeout(revealFrame, 500);
  });
})();
