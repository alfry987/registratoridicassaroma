const menu=document.querySelector('#menu');const nav=document.querySelector('#nav');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}));window.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}});

// Foto prodotto ufficiali pubblicate dai produttori.
const officialProductImages={
  'Axon Micrelec Helios Touch RT':'https://www.axonmicrelec.com/sites/default/files/images/products/thumbnails/AxonMicrelec_HeliosTouch_01_1200x900.jpg',
  'Axon Micrelec Helios Plus RT':'https://www.axonmicrelec.com/sites/default/files/images/products/thumbnails/AxonMicrelec_HeliosPlus_01_1200x900.jpg',
  'ItalRetail RT Next':'https://italretail.it/gallery/product_rt-next310x3102.png',
  'ItalRetail Spice T Plus':'https://italretail.it/gallery/product_spice-tfronte-310x310.png'
};
Object.entries(officialProductImages).forEach(([alt,src])=>{const img=document.querySelector(`img[alt="${alt}"]`);if(img){img.src=src;img.loading='lazy';img.referrerPolicy='no-referrer';}});
const modelNote=document.querySelector('#modelli .note');if(modelNote)modelNote.textContent='Dove disponibili utilizziamo fotografie ufficiali pubblicate dai produttori. Caratteristiche, disponibilità e omologazioni possono variare in base alla versione.';