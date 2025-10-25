
// carousel with auto-scroll, pause on hover, swipe support
document.addEventListener('DOMContentLoaded', function(){
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  const track = document.getElementById('carousel-track');
  const slides = Array.from(track.children);
  const prevBtn = document.querySelector('.carousel .prev');
  const nextBtn = document.querySelector('.carousel .next');
  const dotsContainer = document.getElementById('carousel-dots');

  let index = 0;
  let auto = true;
  let interval = null;
  const slideCount = slides.length;

  // clone slides to create seamless loop
  slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
  });

  function update(){
    track.style.transform = `translateX(-${index * (slides[0].getBoundingClientRect().width + 16)}px)`;
    updateDots();
  }

  function next(){
    index++;
    if(index >= slideCount) index = 0;
    update();
  }
  function prev(){
    index--;
    if(index < 0) index = slideCount - 1;
    update();
  }

  // dots
  for(let i=0;i<slideCount;i++){
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.addEventListener('click', ()=>{ index = i; update(); resetAuto(); });
    dotsContainer.appendChild(dot);
  }
  function updateDots(){
    Array.from(dotsContainer.children).forEach((d, i)=> d.style.opacity = (i===index? '1':'0.35'));
  }

  // auto
  function startAuto(){ interval = setInterval(next, 4200); }
  function stopAuto(){ clearInterval(interval); interval = null; }
  function resetAuto(){ stopAuto(); startAuto(); }

  // swipe support
  let startX=0, delta=0, dragging=false;
  track.addEventListener('pointerdown', function(e){ dragging=true; startX=e.clientX; track.style.transition='none'; });
  window.addEventListener('pointermove', function(e){ if(!dragging) return; delta = e.clientX - startX; track.style.transform = `translateX(calc(-${index * (slides[0].getBoundingClientRect().width + 16)}px + ${delta}px))`; });
  window.addEventListener('pointerup', function(e){ if(!dragging) return; dragging=false; track.style.transition='transform 600ms cubic-bezier(.2,.9,.25,1)'; if(Math.abs(delta) > 60){ if(delta>0) prev(); else next(); } else update(); delta=0; resetAuto(); });

  prevBtn.addEventListener('click', ()=>{ prev(); resetAuto(); });
  nextBtn.addEventListener('click', ()=>{ next(); resetAuto(); });

  // pause on hover
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', ()=> stopAuto());
  carousel.addEventListener('mouseleave', ()=> startAuto());

  updateDots();
  startAuto();

  // form -> whatsapp
  document.getElementById('leadForm').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const business = document.getElementById('business').value.trim();
    const budget = document.getElementById('budget').value;
    const adsType = document.getElementById('adsType').value;
    if(!name || !phone || !business || !budget || !adsType){ alert('Por favor completá todos los campos.'); return; }
    const message = `Hola, soy ${name}, tengo un negocio de ${business}. Me interesa invertir ${budget} en ${adsType}.`;
    const wa = '543794332820';
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(message)}`, '_blank');
  });
});
