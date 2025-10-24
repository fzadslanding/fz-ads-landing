// script.js - Vanilla JS for interactions: particles, carousel, form -> WhatsApp
document.addEventListener('DOMContentLoaded', function() {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ========================
     Simple particles (canvas)
     ======================== */
  (function initParticles(){
    const canvas = document.getElementById('particles');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = innerWidth;
    let h = canvas.height = innerHeight;
    const particles = [];
    const colors = ['#00F0FF', '#00D6D6', '#39F8FF'];

    function rand(min,max){ return Math.random()*(max-min)+min; }
    function create(){ particles.push({x:rand(0,w), y:rand(0,h), r:rand(0.7,2.4), vx:rand(-0.2,0.2), vy:rand(-0.15,0.15), c:colors[Math.floor(Math.random()*colors.length)], alpha:rand(0.04,0.12)}); }
    for(let i=0;i<60;i++) create();

    function resize(){ w=canvas.width=innerWidth; h=canvas.height=innerHeight; }
    addEventListener('resize', resize);

    function step(){
      ctx.clearRect(0,0,w,h);
      for(const p of particles){
        p.x += p.vx;
        p.y += p.vy;
        if(p.x<0) p.x = w;
        if(p.x> w) p.x = 0;
        if(p.y<0) p.y = h;
        if(p.y> h) p.y = 0;
        ctx.beginPath();
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(step);
    }
    step();
  })();

  /* ========================
     Carousel (auto + controls + swipe)
     ======================== */
  (function initCarousel(){
    const carousel = document.querySelector('.carousel');
    if(!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    const pager = carousel.querySelector('.pager');
    let index = 0;
    const total = slides.length;
    let auto = carousel.dataset.auto === 'true';
    let interval = null;

    function go(i){
      index = (i + total) % total;
      track.style.transform = `translateX(-${index*100}%)`;
      pager.textContent = `${index+1} / ${total}`;
    }
    function nextSlide(){ go(index+1); }
    function prevSlide(){ go(index-1); }

    next.addEventListener('click', ()=>{ nextSlide(); reset(); });
    prev.addEventListener('click', ()=>{ prevSlide(); reset(); });

    // swipe
    let startX=0, delta=0, dragging=false;
    track.addEventListener('pointerdown', (e)=>{ dragging=true; startX=e.clientX; track.style.transition='none'; });
    window.addEventListener('pointermove', (e)=>{ if(!dragging) return; delta = e.clientX - startX; track.style.transform = `translateX(calc(-${index*100}% + ${delta}px))`; });
    window.addEventListener('pointerup', ()=>{ if(!dragging) return; dragging=false; track.style.transition='transform 600ms cubic-bezier(.2,.9,.25,1)'; if(Math.abs(delta)>60){ if(delta>0) prevSlide(); else nextSlide(); } else { go(index); } delta=0; });

    function startAuto(){ if(auto){ interval = setInterval(nextSlide, 4500); } }
    function stopAuto(){ if(interval) clearInterval(interval); }
    function reset(){ stopAuto(); startAuto(); }

    startAuto();
    go(0);
  })();

  /* ========================
     Intersection Observer for subtle fade-in
     ======================== */
  (function initObserver(){
    const els = document.querySelectorAll('.section, .card, .result-card, .slide, .hero-inner');
    const io = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) entry.target.classList.add('inview');
      });
    }, {threshold:0.12});
    els.forEach(el=>io.observe(el));
  })();

  /* ========================
     Form -> WhatsApp
     ======================== */
  (function initForm(){
    const form = document.getElementById('leadForm');
    const WA = '543794332820'; // provided
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const business = document.getElementById('business').value.trim();
      const budget = document.getElementById('budget').value;

      if(!name || !phone || !business || !budget){
        alert('Por favor completá todos los campos.');
        return;
      }

      const message = `Hola FZ.ADS 👋, me gustaría empezar a hacer publicidad con ustedes.%0AMi nombre es ${encodeURIComponent(name)}%2C tengo un negocio de ${encodeURIComponent(business)} y mi presupuesto para invertir en Ads es ${encodeURIComponent(budget)}.`;
      const url = `https://wa.me/${WA}?text=${message}`;
      // open
      window.open(url, '_blank');
    });
  })();

});
