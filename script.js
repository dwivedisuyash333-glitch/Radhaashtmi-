
(() => {
  const data = window.RADHA_PIXEL_DATA;
  const canvas = document.getElementById("radhaCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });
  ctx.imageSmoothingEnabled = false;

  const W = data.width, H = data.height;
  canvas.width = W;
  canvas.height = H;

  const decode = (b64) => {
    const bin = atob(b64);
    const out = new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++) out[i] = bin.charCodeAt(i);
    return out;
  };

  const rgba = decode(data.rgbaBase64);
  const visible = new Uint32Array(decode(data.visibleIndexBase64).buffer);

  const img = ctx.createImageData(W, H);
  const dst = img.data;

  // Start completely transparent.
  dst.fill(0);
  ctx.putImageData(img, 0, 0);

  // True individual-pixel reveal: pixels are written into ImageData,
  // then committed frame-by-frame with no image scaling or blur.
  let pos = 0;
  const pixelsPerFrame = 1500;

  function reveal() {
    const end = Math.min(pos + pixelsPerFrame, visible.length);
    for(let k=pos;k<end;k++){
      const p = visible[k] * 4;
      dst[p]   = rgba[p];
      dst[p+1] = rgba[p+1];
      dst[p+2] = rgba[p+2];
      dst[p+3] = rgba[p+3];
    }
    ctx.putImageData(img, 0, 0);
    pos = end;

    if(pos < visible.length){
      requestAnimationFrame(reveal);
    } else {
      setTimeout(() => {
        document.getElementById("radheTitle").classList.add("show");
        setTimeout(startMessages, 900);
      }, 450);
    }
  }

  function startMessages(){
    const messages = [...document.querySelectorAll(".message")];
    let i = 0;
    messages.forEach((m,n)=>m.classList.toggle("active",n===0));

    setInterval(() => {
      messages[i].classList.remove("active");
      i = (i + 1) % messages.length;
      setTimeout(() => messages[i].classList.add("active"), 220);
    }, 5000);
  }

  function petals(){
    const box = document.getElementById("petals");
    for(let i=0;i<22;i++){
      const p=document.createElement("span");
      p.className="petal";
      p.style.left=(8+Math.random()*84)+"%";
      p.style.top=(-5-Math.random()*15)+"%";
      p.style.setProperty("--drift",(Math.random()*140-70)+"px");
      p.style.animationDuration=(4+Math.random()*4)+"s";
      p.style.animationDelay=(Math.random()*7)+"s";
      box.appendChild(p);
    }
  }

  petals();
  reveal();
})();
