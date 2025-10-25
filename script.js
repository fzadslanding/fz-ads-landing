
document.addEventListener('DOMContentLoaded', function(){
  // carousel functionality (auto + manual + swipe)
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prev = document.querySelector('.ctrl.prev');
  const next = document.querySelector('.ctrl.next');
  let index = 0;
  const count = slides.length;
  // clone slides for seamless loop
  slides.forEach(s => track.appendChild(s.cloneNode(true)));
  function update(){ const w = slides[0].getBoundingClientRect().width + 16; track.style.transform = `translateX(-${index * w}px)`;}
  function nextSlide(){ index = (index + 1) % count; update(); }
  function prevSlide(){ index = (index - 1 + count) % count; update(); }
  let auto = setInterval(nextSlide, 4200);
  document.querySelector('.carousel').addEventListener('mouseenter', ()=> clearInterval(auto));
  document.querySelector('.carousel').addEventListener('mouseleave', ()=> auto = setInterval(nextSlide, 4200));
  if(prev) prev.addEventListener('click', ()=> { prevSlide(); clearInterval(auto); auto = setInterval(nextSlide,4200); });
  if(next) next.addEventListener('click', ()=> { nextSlide(); clearInterval(auto); auto = setInterval(nextSlide,4200); });
  // swipe support
  let startX=0, delta=0, dragging=false;
  track.addEventListener('pointerdown', e=>{ dragging=true; startX=e.clientX; track.style.transition='none'; });
  window.addEventListener('pointermove', e=>{ if(!dragging) return; delta = e.clientX - startX; track.style.transform = `translateX(calc(-${index * (slides[0].getBoundingClientRect().width + 16)}px + ${delta}px))`; });
  window.addEventListener('pointerup', e=>{ if(!dragging) return; dragging=false; track.style.transition='transform 600ms cubic-bezier(.2,.9,.25,1)'; if(Math.abs(delta) > 60){ if(delta > 0) prevSlide(); else nextSlide(); } else update(); delta = 0; });
  window.addEventListener('resize', update);
  update();

  // form -> whatsapp dynamic
  const form = document.getElementById('leadForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const business = document.getElementById('business').value.trim();
    const budgetEls = document.getElementsByName('budget');
    let budget = '';
    for(const b of budgetEls) if(b.checked) budget = b.value;
    const adsEls = document.getElementsByName('adsType');
    let adsType = '';
    for(const a of adsEls) if(a.checked) adsType = a.value;
    if(!name || !phone || !business || !budget || !adsType){ alert('Por favor completá todos los campos.'); return; }
    const intro = adsType === 'Google Ads' ? 'Quiero una campaña en Google Ads' : 'Quiero una campaña en Meta Ads';
    const message = `Hola 👋, soy ${name}, tengo un negocio de ${business}. ${intro} con un presupuesto de ${budget}. Mi teléfono es ${phone}.`;
    const wa = '543794332820';
    window.open(`https://wa.me/${wa}?text=${encodeURIComponent(message)}`, '_blank');
  });

  // accessibility: allow clicking option labels to select radio
  document.querySelectorAll('.option').forEach(opt => {
    opt.addEventListener('click', ()=> {
      const input = opt.querySelector('input');
      if(input) input.checked = true;
      // highlight
      document.querySelectorAll('.option').forEach(o=>o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){ e.preventDefault(); const id = this.getAttribute('href'); document.querySelector(id).scrollIntoView({behavior:'smooth'}); });
  });
});
