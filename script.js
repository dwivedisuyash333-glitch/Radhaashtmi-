(() => {
 const canvas=document.getElementById('radhaCanvas'),ctx=canvas.getContext('2d');
 const d=window.RADHA_PIXELS;if(!d?.pixels?.length)return;
 // Two CSS/device pixels per logical source cell. Never stretch an image and never interpolate.
 const BLOCK=2; canvas.width=d.width*BLOCK;canvas.height=d.height*BLOCK;ctx.imageSmoothingEnabled=false;
 canvas.style.width=`${canvas.width}px`;canvas.style.height=`${canvas.height}px`;
 const pixels=d.pixels.slice();let seed=9182026;
 for(let i=pixels.length-1;i>0;i--){seed=(seed*1664525+1013904223)>>>0;const j=seed%(i+1);[pixels[i],pixels[j]]=[pixels[j],pixels[i]];}
 let i=0;const PER_FRAME=120;
 function reveal(){const end=Math.min(i+PER_FRAME,pixels.length);for(;i<end;i++){const [x,y,r,g,b]=pixels[i];ctx.fillStyle=`rgb(${r},${g},${b})`;ctx.fillRect(x*BLOCK,y*BLOCK,BLOCK,BLOCK);}if(i<pixels.length)requestAnimationFrame(reveal);else finish();}
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const messages=[
  'राधाष्टमी के पावन अवसर पर आपको हार्दिक शुभकामनाएँ।',
  'राधा रानी की कृपा सदैव आप दोनों पर बनी रहे, और आप दोनों को यूँ ही हमेशा साथ रखें।',
  'स्वयं राधारानी की ओर से आप दोनों को 5 महीने पूरे होने पर ढेरों शुभकामनाएँ।'
 ];
 const card=document.getElementById('messageCard'),text=document.getElementById('messageText');
 async function showMessage(m){card.classList.remove('show');await wait(450);text.textContent=m;card.classList.add('show');}
 async function finish(){await wait(500);document.getElementById('radheTitle').classList.add('visible');await wait(1200);for(let n=0;n<messages.length;n++){await showMessage(messages[n]);if(n<messages.length-1)await wait(5000);}await wait(500);petals();}
 function petals(){const box=document.getElementById('petals');for(let n=0;n<(innerWidth<600?18:30);n++){const p=document.createElement('span');p.className='petal';p.style.left=Math.random()*100+'%';p.style.setProperty('--drift',(-110+Math.random()*220)+'px');p.style.animationDuration=6+Math.random()*5+'s';p.style.animationDelay=Math.random()*2+'s';box.appendChild(p);}}
 setTimeout(reveal,300);
})();
