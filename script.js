const menu=document.querySelector('#menu');const nav=document.querySelector('#nav');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}));window.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}});

// Allineamento alla griglia approvata: 6 modelli (2 Epson, 2 Custom, 2 ItalRetail).
[...document.querySelectorAll('#modelli article')].forEach(article=>{if(article.textContent.includes('Helios TOUCH RT')||article.textContent.includes('Helios PLUS RT'))article.remove();});

// Foto prodotto: mostriamo solo fotografie ufficiali verificate del modello esatto.
const officialProductImages={
  'Epson FP-90III RT':'https://i8.amplience.net/i/epsonemear/fps90iii-large?%24product-xlarge%24=&fmt=auto',
  'ItalRetail RT Next':'https://italretail.it/gallery/product_rt-next310x3102.png',
  'ItalRetail Spice T Plus':'https://italretail.it/gallery/product_spice-tfronte-310x310.png'
};
const pendingProductImages={
  'Epson FP-81II RT':'Foto ufficiale in acquisizione',
  'Custom Fusion-N 2.0 RT':'Foto ufficiale Custom in acquisizione',
  'Custom Windkey-N Lite RT':'Foto ufficiale Custom in acquisizione'
};
const modelImages=document.querySelectorAll('#modelli article img');modelImages.forEach(img=>{const alt=img.alt;const official=officialProductImages[alt];if(official){img.loading='lazy';img.onerror=()=>{img.style.display='none';};img.src=official;}else{const article=img.closest('article');img.remove();if(article&&pendingProductImages[alt]&&!article.querySelector('.pending-product-photo')){const box=document.createElement('div');box.className='pending-product-photo';box.innerHTML=`<span>${pendingProductImages[alt]}</span><small>Nessuna immagine generica o da rivenditori</small>`;box.style.cssText='height:205px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;padding:22px;text-align:center;background:#f5f6f7;border-bottom:1px solid #e5e7ea;color:#313942;font-weight:850';box.querySelector('small').style.cssText='font-size:.72rem;font-weight:650;color:#77818b';article.prepend(box);}}});

// Collegamenti alle schede ufficiali dei produttori.
const officialProductPages={
  'Epson FP-81II RT':'https://www.epson.it/it_IT/prodotti/stampanti/stampanti-pos/stampanti-pos/stampante-pos-(tm)/epson-fp-81ii-rt-(014je):-italy-fiscal,-ps,-lcd,-80mm,-k23,-e-rec,edg,ref/p/26827',
  'Epson FP-90III RT':'https://www.epson.it/it_IT/prodotti/stampanti/stampanti-pos/stampanti-pos/stampante-pos-(tm)/epson-fp-90iii-rt-(012je):-italy-fiscal,-ps,-lcd,-80mm,-k23,-e-rec,edg,ref/p/26830',
  'Custom Fusion-N 2.0 RT':'https://www.custom.biz/it_IT/prodotto/hardware/Soluzioni-DC-POS/registratori-di-cassa-touch-screen/fusion-n-2-0-rt',
  'Custom Windkey-N Lite RT':'https://www.custom.biz/it_IT/prodotto/hardware/Soluzioni-DC-POS/registratori-di-cassa/windkey-n-lite-rt',
  'ItalRetail RT Next':'https://italretail.it/it/prodotti/registratori-telematici/',
  'ItalRetail Spice T Plus':'https://italretail.it/it/prodotti/sistemi-evoluti-di-punto-cassa/spice-t-plus/'
};
Object.entries(officialProductPages).forEach(([alt,url])=>{let article=[...document.querySelectorAll('#modelli article')].find(a=>a.textContent.includes(alt.replace('ItalRetail ',''))||a.querySelector(`img[alt="${alt}"]`));if(article&&!article.querySelector('.official-source')){const link=document.createElement('a');link.className='official-source';link.href=url;link.target='_blank';link.rel='noopener';link.textContent='Scheda ufficiale del produttore →';link.style.cssText='display:inline-block;margin-top:12px;font-size:.78rem;font-weight:800;text-decoration:none';article.querySelector('div:last-child')?.appendChild(link);}});

// Manteniamo soltanto i due marchi approvati: Epson dal file presente nel sito e Custom da asset ufficiale del produttore.
const officialBrandImages={
  'Custom':'https://www.custom.biz/uploads/media/icon/0001/07/custom-logo-pittogramma-customblack-rgb.webp'
};
Object.entries(officialBrandImages).forEach(([alt,src])=>{const img=document.querySelector(`#marchi img[alt="${alt}"]`);if(img){img.onerror=()=>{img.style.display='none';};img.src=src;}});

// Gli altri quattro loghi vengono rimossi finché non recuperiamo esattamente le versioni approvate.
const pendingBrandLabels={
  'ItalRetail Zucchetti':'ITALRETAIL · ZUCCHETTI',
  'Axon Micrelec':'AXON MICRELEC',
  'Think To IT':'THINK TO IT',
  'System Retail':'SYSTEM RETAIL'
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

const modelNote=document.querySelector('#modelli .note');if(modelNote)modelNote.textContent='Griglia approvata a sei modelli. Le schede Epson, Custom e ItalRetail rimandano ai produttori; mostriamo una fotografia solo quando l’asset del modello esatto è verificato, senza immagini di rivenditori o ricostruzioni.';