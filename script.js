
(() => {
  const title = document.getElementById("radheTitle");
  const img = document.getElementById("radhaImage");
  const messageCard = document.getElementById("messageCard");
  const text = document.getElementById("messageText");
  const messages = [
    "राधाष्टमी के पावन अवसर पर आपको हार्दिक शुभकामनाएँ।",
    "राधा रानी की कृपा सदैव आप दोनों पर बनी रहे, और आप दोनों को यूँ ही हमेशा साथ रखें।",
    "स्वयं राधारानी की ओर से आप दोनों को 5 महीने पूरे होने पर ढेरों शुभकामनाएँ।"
  ];

  const showTitle = () => {
    setTimeout(() => {
      title.classList.add("show");
      setTimeout(startMessages, 900);
    }, 350);
  };

  if (img.complete) showTitle();
  else img.addEventListener("load", showTitle, {once:true});

  function startMessages(){
    if (!messageCard || !text) return;
    let i = 0;
    text.textContent = messages[i];
    messageCard.classList.add("show");

    setInterval(() => {
      messageCard.classList.remove("show");
      setTimeout(() => {
        i = (i + 1) % messages.length;
        text.textContent = messages[i];
        messageCard.classList.add("show");
      }, 450);
    }, 5000);
  }

  const petals = document.getElementById("petals");
  if (petals) {
    for(let i=0;i<22;i++){
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
})();
