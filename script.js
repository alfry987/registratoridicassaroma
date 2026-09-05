const menu=document.querySelector('#menu');const nav=document.querySelector('#nav');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}));window.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}});

// Foto prodotto: mostriamo solo fotografie ufficiali verificate del modello esatto.
const officialProductImages={
  'Epson FP-90III RT':'https://i8.amplience.net/i/epsonemear/fps90iii-large?%24product-xlarge%24=&fmt=auto',
  'Axon Micrelec Helios Touch RT':'https://www.axonmicrelec.com/sites/default/files/images/products/thumbnails/AxonMicrelec_HeliosTouch_01_1200x900.jpg',
  'Axon Micrelec Helios Plus RT':'https://www.axonmicrelec.com/sites/default/files/images/products/thumbnails/AxonMicrelec_HeliosPlus_01_1200x900.jpg',
  'ItalRetail RT Next':'https://italretail.it/gallery/product_rt-next310x3102.png',
  'ItalRetail Spice T Plus':'https://italretail.it/gallery/product_spice-tfronte-310x310.png'
};
const modelImages=document.querySelectorAll('#modelli article img');modelImages.forEach(img=>{const alt=img.alt;const official=officialProductImages[alt];if(official){img.loading='lazy';img.onerror=()=>{img.style.display='none';};img.src=official;}else{img.remove();}});

// Collegamenti alle schede ufficiali dei produttori.
const officialProductPages={
  'Epson FP-81II RT':'https://www.epson.it/it_IT/prodotti/stampanti/stampanti-pos/stampanti-pos/stampante-pos-(tm)/epson-fp-81ii-rt-(014je):-italy-fiscal,-ps,-lcd,-80mm,-k23,-e-rec,edg,ref/p/26827',
  'Epson FP-90III RT':'https://www.epson.it/it_IT/prodotti/stampanti/stampanti-pos/stampanti-pos/stampante-pos-(tm)/epson-fp-90iii-rt-(012je):-italy-fiscal,-ps,-lcd,-80mm,-k23,-e-rec,edg,ref/p/26830',
  'Custom Fusion-N 2.0 RT':'https://www.custom.biz/it_IT/prodotto/hardware/Soluzioni-DC-POS/registratori-di-cassa-touch-screen/fusion-n-2-0-rt',
  'Custom Windkey-N Lite RT':'https://www.custom.biz/it_IT/prodotto/hardware/Soluzioni-DC-POS/registratori-di-cassa/windkey-n-lite-rt',
  'ItalRetail RT Next':'https://italretail.it/it/prodotti/registratori-telematici/',
  'ItalRetail Spice T Plus':'https://italretail.it/it/prodotti/sistemi-evoluti-di-punto-cassa/spice-t-plus/',
  'Axon Micrelec Helios Touch RT':'https://www.axonmicrelec.com/misuratori-fiscali-registratori-di-cassa/serie-helios-touch-rt',
  'Axon Micrelec Helios Plus RT':'https://www.axonmicrelec.com/misuratori-fiscali-registratori-di-cassa/serie-helios-plus-rt'
};
Object.entries(officialProductPages).forEach(([alt,url])=>{let article=[...document.querySelectorAll('#modelli article')].find(a=>a.textContent.includes(alt.replace('Axon Micrelec ','').replace('ItalRetail ',''))||a.querySelector(`img[alt="${alt}"]`));if(article&&!article.querySelector('.official-source')){const link=document.createElement('a');link.className='official-source';link.href=url;link.target='_blank';link.rel='noopener';link.textContent='Scheda ufficiale del produttore →';link.style.cssText='display:inline-block;margin-top:12px;font-size:.78rem;font-weight:800;text-decoration:none';article.querySelector('div')?.appendChild(link);}});

// Marchi: asset ufficiali solo quando verificabili; nessuna ricostruzione viene presentata come ufficiale.
const officialBrandImages={
  'Custom':'https://www.custom.biz/uploads/media/icon/0001/07/custom-logo-pittogramma-customblack-rgb.webp',
  'Axon Micrelec':'https://www.axonmicrelec.com/sites/all/themes/axonmicrelec/css/img/LOGO.png',
  'Think To IT':'https://www.think.to.it/newThinksw/images/thinksw2023/THINKTOIT%20LOGO%20BIANCO.png'
};
Object.entries(officialBrandImages).forEach(([alt,src])=>{const img=document.querySelector(`#marchi img[alt="${alt}"]`);if(img){img.onerror=()=>{img.style.display='none';};img.src=src;if(alt==='Think To IT'){img.style.background='#111';img.style.padding='16px';img.style.boxSizing='border-box';}}});

// Per i marchi per cui non abbiamo ancora recuperato un file ufficiale diretto, rimuoviamo il vecchio logo ricostruito.
const pendingBrandLabels={
  'ItalRetail Zucchetti':'ITALRETAIL · ZUCCHETTI',
  'System Retail':'SYSTEM · EVOLUTION RETAIL'
};
Object.entries(pendingBrandLabels).forEach(([alt,label])=>{const img=document.querySelector(`#marchi img[alt="${alt}"]`);if(img){const article=img.closest('article');img.remove();if(article&&!article.querySelector('.pending-brand-label')){const text=document.createElement('div');text.className='pending-brand-label';text.textContent=label;text.style.cssText='min-height:92px;display:flex;align-items:center;justify-content:center;padding:18px;text-align:center;font-size:1rem;font-weight:900;letter-spacing:.04em';article.prepend(text);}}});

const officialBrandPages={
  'Epson':'https://www.epson.it/',
  'Custom':'https://www.custom.biz/it_IT/',
  'ItalRetail Zucchetti':'https://italretail.it/it/home/',
  'Think To IT':'https://www.think.to.it/',
  'System Retail':'https://www.systemretail.it/',
  'Axon Micrelec':'https://www.axonmicrelec.com/'
};
Object.entries(officialBrandPages).forEach(([alt,url])=>{let article=document.querySelector(`#marchi img[alt="${alt}"]`)?.closest('article');if(!article&&pendingBrandLabels[alt]){article=[...document.querySelectorAll('#marchi article')].find(a=>a.textContent.includes(pendingBrandLabels[alt]));}if(article&&!article.querySelector('.brand-official')){const link=document.createElement('a');link.className='brand-official';link.href=url;link.target='_blank';link.rel='noopener';link.textContent='Sito ufficiale →';link.style.cssText='display:inline-block;margin:0 18px 18px;font-size:.76rem;font-weight:800;text-decoration:none';article.appendChild(link);}});

const modelNote=document.querySelector('#modelli .note');if(modelNote)modelNote.textContent='Mostriamo esclusivamente fotografie ufficiali verificate dei modelli. Quando il produttore non rende disponibile un asset diretto verificabile, non utilizziamo disegni o immagini di rivenditori.';