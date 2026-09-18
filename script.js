(() => {
  "use strict";
  const canvas=document.getElementById("radhaCanvas");
  const ctx=canvas.getContext("2d",{alpha:true});
  const data=window.RADHA_PIXELS;
  if(!data||!data.pixels?.length)return;
  canvas.width=data.width; canvas.height=data.height; ctx.imageSmoothingEnabled=false;

  // Deterministic shuffle for a natural pixel-by-pixel reveal.
  let seed=18092026;
  const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
  const pixels=data.pixels.map(p=>({x:p[0],y:p[1],r:p[2],g:p[3],b:p[4],a:p[5]}));
  for(let i=pixels.length-1;i>0;i--){const j=Math.floor(rand()*(i+1));[pixels[i],pixels[j]]=[pixels[j],pixels[i]]}
  const perFrame=Math.max(5,Math.floor(pixels.length/210));
  let index=0;
  function reveal(){
    for(let i=0;i<perFrame&&index<pixels.length;i++){const p=pixels[index++];ctx.fillStyle=`rgba(${p.r},${p.g},${p.b},${p.a/255})`;ctx.fillRect(p.x,p.y,1,1)}
    if(index<pixels.length)requestAnimationFrame(reveal); else finishReveal();
  }
  const wait=ms=>new Promise(r=>setTimeout(r,ms));

  const messages=[
    "राधाष्टमी के पावन अवसर पर आपको हार्दिक शुभकामनाएँ।",
    "राधा रानी की कृपा सदैव आप दोनों पर बनी रहे, और आप दोनों को यूँ ही हमेशा साथ रखें।",
    "स्वयं राधारानी की ओर से आप दोनों को 5 महीने पूरे होने पर ढेरों शुभकामनाएँ।"
  ];
  const card=document.getElementById("messageCard");
  const text=document.getElementById("messageText");

  async function showMessage(message,initial=false){
    if(initial){text.textContent=message;card.classList.add("show");return}
    card.classList.remove("show");
    await wait(800);
    text.textContent=message;
    card.classList.add("show");
  }

  async function finishReveal(){
    canvas.classList.add("ready");
    await wait(900);
    document.getElementById("radheTitle").classList.add("visible");
    await wait(900);

    // Only ONE paragraph exists on screen at a time. Every 5 seconds the same
    // card disappears and the next paragraph pops into exactly the same place.
    await showMessage(messages[0],true);
    await wait(5000);
    await showMessage(messages[1]);
    await wait(5000);
    await showMessage(messages[2]);
    await wait(900);
    petals();
  }

  function petals(){
    const box=document.getElementById("petals");
    const count=innerWidth<600?22:34;
    for(let i=0;i<count;i++){
      const p=document.createElement("span"); p.className="petal";
      p.style.left=(Math.random()*100)+"%"; p.style.setProperty("--drift",(-110+Math.random()*220)+"px");
      p.style.animationDuration=(6+Math.random()*5)+"s"; p.style.animationDelay=(Math.random()*2)+"s"; box.appendChild(p);
    }
  }
  setTimeout(reveal,500);
})();
