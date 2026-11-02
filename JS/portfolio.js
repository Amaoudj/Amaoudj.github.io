/* Progressive enhancement: all portfolio content remains readable without JS. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let toastTimer;
  const toast = message => {
    const el = document.getElementById('toast');
    el.textContent = message;el.classList.add('show');clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2400);
  };
  document.querySelectorAll('.copy-citation').forEach(el => {
    el.addEventListener('click', async event => {
      event.preventDefault();
      const citation = el.dataset.citation || '';
      try {await navigator.clipboard.writeText(citation);toast('BibTeX citation copied');}
      catch {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(new Blob([citation], {type:'application/x-bibtex'}));
        link.download = 'citation.bib';link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);toast('BibTeX citation downloaded');
      }
    });
  });
  const list = document.getElementById('publicationList');
  if (list) {
    const items = [...list.querySelectorAll('.publication-item')];
    const initial = Number(list.dataset.init) || 10, step = Number(list.dataset.step) || 10;
    const more = document.getElementById('pub-load-more'), less = document.getElementById('pub-show-less');
    const count = document.getElementById('pub-count'), empty = document.getElementById('pub-no-results');
    const input = document.getElementById('pub-search-input'), buttons = [...document.querySelectorAll('.filter-btn')];
    let shown = initial, filter = 'all', query = '';
    items.forEach(item => {
      const label = item.querySelector('.pub-label')?.textContent.toLowerCase() || '';
      item.dataset.ptype = label.includes('journal') ? 'journal' : label.includes('conference') ? 'conference' : 'other';
      item.dataset.text = item.textContent.toLowerCase();
    });
    const render = () => {
      const filtered = items.filter(item => (filter === 'all' || item.dataset.ptype === filter) && (!query || item.dataset.text.includes(query)));
      items.forEach(item => item.hidden = true);filtered.slice(0,shown).forEach(item => item.hidden = false);
      more.hidden = shown >= filtered.length;less.hidden = shown <= initial || filtered.length <= initial;
      empty.style.display = filtered.length ? 'none' : 'block';
      count.textContent = filtered.length ? `Showing ${Math.min(shown,filtered.length)} of ${filtered.length}` : '0 publications';
    };
    more.addEventListener('click', () => {shown += step;render();});
    less.addEventListener('click', () => {shown = initial;render();document.getElementById('publications').scrollIntoView({behavior:reduced?'auto':'smooth'});});
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(b => {b.classList.remove('active');b.setAttribute('aria-pressed','false');});
      button.classList.add('active');button.setAttribute('aria-pressed','true');filter=button.dataset.filter;shown=initial;render();
    }));
    input.addEventListener('input', () => {query=input.value.trim().toLowerCase();shown=initial;render();});
    count.setAttribute('role','status');count.setAttribute('aria-live','polite');render();
  }
  const navLinks = [...document.querySelectorAll('.side-nav a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(!entry.isIntersecting)return;
        navLinks.forEach(link => {const active=link.hash===`#${entry.target.id}`;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});
      });
    }, {rootMargin:'-10% 0px -65% 0px'});
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
  }
  const videos=[...document.querySelectorAll('video')];
  videos.forEach(video => video.addEventListener('play', () => videos.forEach(other => {if(other!==video)other.pause();})));
  const figures=[...document.querySelectorAll('.proj-img,.sem-photo,.pub-thumb')];
  if(figures.length){
    const dialog=document.createElement('dialog');dialog.className='lightbox';dialog.setAttribute('aria-label','Enlarged research figure');
    const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Close enlarged figure');
    const full=document.createElement('img');dialog.append(close,full);document.body.append(dialog);
    close.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
    figures.forEach(img=>{const button=document.createElement('button');button.type='button';button.className='image-zoom';button.setAttribute('aria-label',`Enlarge: ${img.alt||'research figure'}`);img.replaceWith(button);button.append(img);button.addEventListener('click',()=>{full.src=img.currentSrc||img.src;full.alt=img.alt;dialog.showModal();});});
  }
})();
