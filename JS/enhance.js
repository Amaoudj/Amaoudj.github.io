// Redesign 2026 — cursor + scroll-reveal enhancements
(function(){
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---- Custom cursor (teal dot + trailing ring) ----
  if (fine && !reduced) {
    var ring = document.createElement('div'); ring.id = 'cur-ring';
    var dot  = document.createElement('div'); dot.id  = 'cur-dot';
    document.body.appendChild(ring); document.body.appendChild(dot);
    var mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my, shown = false;
    document.addEventListener('mousemove', function(e){
      mx = e.clientX; my = e.clientY;
      if (!shown) { shown = true; dot.style.opacity = '1'; ring.style.opacity = '1'; }
      var t = e.target && e.target.closest ? e.target.closest('a,button,input,summary') : null;
      ring.classList.toggle('big', !!t);
    }, {passive:true});
    document.documentElement.addEventListener('mouseleave', function(){
      shown = false; dot.style.opacity = '0'; ring.style.opacity = '0';
    });
    (function loop(){
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      dot.style.transform  = 'translate(' + mx + 'px,' + my + 'px)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(loop);
    })();
  }

  // ---- Scroll reveal with fail-safe ----
  if (!reduced) {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section'));
    var hidden = [];
    sections.forEach(function(s, i){
      if (i === 0) return;
      if (s.getBoundingClientRect().top < innerHeight * 0.9) return;
      s.classList.add('reveal-init');
      hidden.push(s);
    });
    function show(s){ s.classList.add('reveal-in'); }
    var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, {rootMargin:'0px 0px -8% 0px'}) : null;
    hidden.forEach(function(s){ if (io) io.observe(s); });
    function failSafe(){
      for (var i = hidden.length - 1; i >= 0; i--) {
        if (hidden[i].getBoundingClientRect().top < innerHeight * 0.9) {
          show(hidden[i]); hidden.splice(i, 1);
        }
      }
      if (!hidden.length) { removeEventListener('scroll', failSafe); clearInterval(t); }
    }
    addEventListener('scroll', failSafe, {passive:true});
    var t = setInterval(failSafe, 400);
  }
})();
