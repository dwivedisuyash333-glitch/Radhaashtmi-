(() => {
  const data = window.RADHA_PIXEL_DATA;
  const canvas = document.getElementById("radhaCanvas");
  const ctx = canvas.getContext("2d", {alpha:true});
  ctx.imageSmoothingEnabled = false;
  canvas.width = data.width;
  canvas.height = data.height;

  const decode = (s) => {
    const b = atob(s);
    const a = new Uint8Array(b.length);
    for (let i=0;i<b.length;i++) a[i] = b.charCodeAt(i);
    return a;
  };

  const rgba = decode(data.rgba);
  const order = new Uint32Array(decode(data.order).buffer);
  const frame = ctx.createImageData(data.width, data.height);
  const px = frame.data;
  px.fill(0);

  let pos = 0;
  const perFrame = 900;

  function reveal() {
    const end = Math.min(pos + perFrame, order.length);
    for (let i=pos;i<end;i++) {
      const n = order[i] * 4;
      px[n] = rgba[n];
      px[n+1] = rgba[n+1];
      px[n+2] = rgba[n+2];
      px[n+3] = rgba[n+3];
    }
    ctx.putImageData(frame, 0, 0);
    pos = end;

    if (pos < order.length) {
      requestAnimationFrame(reveal);
    } else {
      setTimeout(() => {
        document.getElementById("radheTitle").classList.add("show");
        setTimeout(showMessagesOnce, 900);
      }, 450);
    }
  }

  const messages = [
    "राधाष्टमी के पावन अवसर पर आपको हार्दिक शुभकामनाएँ।",
    "राधा रानी की कृपा सदैव आप दोनों पर बनी रहे, और आप दोनों को यूँ ही हमेशा साथ रखें।",
    "स्वयं राधारानी की ओर से आप दोनों को 5 महीने पूरे होने पर ढेरों शुभकामनाएँ।"
  ];

  function showMessagesOnce() {
    const card = document.getElementById("messageCard");
    const text = document.getElementById("messageText");
    if (!card || !text) return;

    let i = 0;
    text.textContent = messages[i];
    card.classList.add("show");

    const next = () => {
      card.classList.remove("show");
      if (i >= messages.length - 1) return;

      setTimeout(() => {
        i += 1;
        text.textContent = messages[i];
        card.classList.add("show");
        if (i < messages.length - 1) setTimeout(next, 5000);
      }, 500);
    };

    setTimeout(next, 5000);
  }

  const petals = document.getElementById("petals");
  if (petals) {
    for (let i=0;i<22;i++) {
      const p=document.createElement("span");
      p.className="petal";
      p.style.left=(8+Math.random()*84)+"%";
      p.style.top=(-5-Math.random()*15)+"%";
      p.style.setProperty("--drift",(Math.random()*140-70)+"px");
      p.style.animationDuration=(4+Math.random()*4)+"s";
      p.style.animationDelay=(Math.random()*7)+"s";
      petals.appendChild(p);
    }
  }

  reveal();
})();