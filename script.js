
document.addEventListener('DOMContentLoaded', function(){
  // carousel
  const track = document.getElementById('track');
  const slides = Array.from(track.children);
  const prev = document.querySelector('.ctrl.prev') || document.querySelector('.prev');
  const next = document.querySelector('.ctrl.next') || document.querySelector('.next');
  let index = 0;
  const count = slides.length;
  // clone for loop
  slides.forEach(s => track.appendChild(s.cloneNode(true)));
  function update(){ const w = slides[0].getBoundingClientRect().width + 16; track.style.transform = `translateX(-${index * w}px)`; }
  function nextSlide(){ index = (index + 1) % count; update(); }
  function prevSlide(){ index = (index - 1 + count) % count; update(); }
  let iv = setInterval(nextSlide, 4200);
  document.querySelector('.carousel').addEventListener('mouseenter', ()=> clearInterval(iv));
  document.querySelector('.carousel').addEventListener('mouseleave', ()=> iv = setInterval(nextSlide, 4200));
  if(prev) prev.addEventListener('click', ()=> { prevSlide(); clearInterval(iv); iv = setInterval(nextSlide,4200); });
  if(next) next.addEventListener('click', ()=> { nextSlide(); clearInterval(iv); iv = setInterval(nextSlide,4200); });
  window.addEventListener('resize', update);
  update();

  // form -> whatsapp dynamic
  const form = document.getElementById('leadForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const business = document.getElementById('business').value.trim();
      const budget = document.getElementById('budget').value;
      const adsType = document.getElementById('adsType').value;
      if(!name || !phone || !business || !budget || !adsType){ alert('Por favor completá todos los campos.'); return; }
      const intro = adsType === 'Google Ads' ? 'Quiero una campaña en Google Ads' : 'Quiero una campaña en Meta Ads';
      const message = `Hola 👋, soy ${name}, tengo un negocio de ${business}. ${intro} con un presupuesto de ${budget}. Mi teléfono es ${phone}.`;
      const wa = '543794332820';
      window.open(`https://wa.me/${wa}?text=${encodeURIComponent(message)}`, '_blank');
    });
  }
});
