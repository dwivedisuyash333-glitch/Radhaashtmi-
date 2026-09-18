(()=>{
 const canvas=document.getElementById('radhaCanvas'),ctx=canvas.getContext('2d');
 const d=window.RADHA_PIXELS;if(!d||!d.pixels?.length)return;
 const BLOCK=5;
 canvas.width=d.width*BLOCK;canvas.height=d.height*BLOCK;ctx.imageSmoothingEnabled=false;
 // Build from pixels, not from an image element. The canvas is already at the final pixel-block resolution.
 const pixels=d.pixels.slice();
 // Deterministic center-outward order: every item is still a real individual pixel block.
 const cx=d.width/2,cy=d.height/2;
 pixels.sort((a,b)=>((a[0]-cx)**2+(a[1]-cy)**2)-((b[0]-cx)**2+(b[1]-cy)**2));
 let i=0;
 const START_DELAY=300,PIXELS_PER_TICK=12,TICK_MS=16;
 function reveal(){
   const end=Math.min(i+PIXELS_PER_TICK,pixels.length);
   for(;i<end;i++){
     const p=pixels[i];ctx.fillStyle=`rgb(${p[2]},${p[3]},${p[4]})`;
     ctx.fillRect(p[0]*BLOCK,p[1]*BLOCK,BLOCK,BLOCK);
   }
   if(i<pixels.length)requestAnimationFrame(reveal);else finish();
 }
 const wait=ms=>new Promise(r=>setTimeout(r,ms));
 const messages=[
  'राधाष्टमी के पावन अवसर पर आपको हार्दिक शुभकामनाएँ।',
  'राधा रानी की कृपा सदैव आप दोनों पर बनी रहे, और आप दोनों को यूँ ही हमेशा साथ रखें।',
  'स्वयं राधारानी की ओर से आप दोनों को 5 महीने पूरे होने पर ढेरों शुभकामनाएँ।'
 ];
 const card=document.getElementById('messageCard'),text=document.getElementById('messageText');
 async function showMessage(m){
   card.classList.remove('show');
   await wait(650);
   text.textContent=m;
   card.classList.add('show');
 }
 async function finish(){
   await wait(450);
   document.getElementById('radheTitle').classList.add('visible');
   await wait(900);
   for(let n=0;n<messages.length;n++){
     await showMessage(messages[n]);
     if(n<messages.length-1)await wait(5000);
   }
   await wait(600);petals();
 }
 function petals(){
   const box=document.getElementById('petals'),count=innerWidth<600?20:32;
   for(let n=0;n<count;n++){
     const p=document.createElement('span');p.className='petal';p.style.left=Math.random()*100+'%';
     p.style.setProperty('--drift',(-110+Math.random()*220)+'px');p.style.animationDuration=6+Math.random()*5+'s';p.style.animationDelay=Math.random()*2+'s';box.appendChild(p);
   }
 }
 setTimeout(reveal,START_DELAY);
})();
