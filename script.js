const menu=document.querySelector('#menu');const nav=document.querySelector('#nav');menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}));window.addEventListener('keydown',e=>{if(e.key==='Escape'){nav?.classList.remove('open');menu?.setAttribute('aria-expanded','false');if(menu)menu.textContent='☰'}});
// No invio al server o salvataggio: apertura esplicita dell'app scelta dall'utente.
const quoteForm=document.querySelector('#quote-form');
quoteForm?.addEventListener('submit',event=>{
  event.preventDefault();
  if(!quoteForm.reportValidity())return;
  const fields=new FormData(quoteForm);
  const message=['Buongiorno Longo, vorrei informazioni per il mio punto cassa.',`Attività: ${fields.get('business')}`,`Esigenza: ${fields.get('need')}`,fields.get('town')?.trim()?`Zona: ${fields.get('town').trim()}`:'',fields.get('notes')?.trim()?`Dettagli: ${fields.get('notes').trim()}`:'','Potete indicarmi soluzione, disponibilità e preventivo?'].filter(Boolean).join('\n');
  const email=event.submitter?.value==='email';
  document.querySelector('#quote-status').textContent=`Apro ${email?'il programma email':'WhatsApp'}: controlla il messaggio e premi Invia nell’app. La richiesta non è ancora stata inviata.`;
  const destination=email?`mailto:info@registratoridicassaroma.com?subject=${encodeURIComponent('Richiesta preventivo punto cassa Roma')}&body=${encodeURIComponent(message)}`:`https://wa.me/390621129078?text=${encodeURIComponent(message)}`;
  window.location.assign(destination);
});
