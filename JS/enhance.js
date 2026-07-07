// Redesign 2026 — scroll-reveal only (custom cursor removed; it caused a horizontal scrollbar)
(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section'));
  var hidden = [];
  sections.forEach(function(s, i){
    if (i === 0) return;
    if (s.getBoundingClientRect().top < innerHeight * 0.9) return;
    s.classList.add('reveal-init'); hidden.push(s);
  });
  function show(s){ s.classList.add('reveal-in'); }
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if (en.isIntersecting){ show(en.target); io.unobserve(en.target); } });
  }, {rootMargin:'0px 0px -8% 0px'}) : null;
  hidden.forEach(function(s){ if (io) io.observe(s); });
  function failSafe(){
    for (var i=hidden.length-1;i>=0;i--){
      if (hidden[i].getBoundingClientRect().top < innerHeight*0.9){ show(hidden[i]); hidden.splice(i,1); }
    }
    if(!hidden.length){ removeEventListener('scroll',failSafe); clearInterval(t); }
  }
  addEventListener('scroll',failSafe,{passive:true});
  var t=setInterval(failSafe,400);
})();
