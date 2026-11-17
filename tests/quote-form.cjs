const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync('script.js', 'utf8');
function run(channel, valid = true) {
  let submit, destination;
  const status = {};
  const form = { reportValidity: () => valid, addEventListener: (_, fn) => { submit = fn; } };
  const fields = { business: 'Bar', need: 'Stampante fiscale', town: 'Roma EUR', notes: 'Caffè & tavoli? <test>' };
  vm.runInNewContext(source, {
    document: { querySelector: selector => selector === '#quote-form' ? form : selector === '#quote-status' ? status : null, querySelectorAll: () => [] },
    window: { addEventListener() {}, location: { assign(url) { destination = url; } } },
    FormData: class { get(key) { return fields[key]; } },
    encodeURIComponent,
  });
  submit({ preventDefault() {}, submitter: { value: channel } });
  return { destination, status };
}
const whatsapp = run();
const url = new URL(whatsapp.destination);
assert.equal(url.origin, 'https://wa.me');
assert.equal(url.pathname, '/390621129078');
assert.match(url.searchParams.get('text'), /Caffè & tavoli\? <test>/);
assert.match(url.searchParams.get('text'), /Attività: Bar/);
assert.match(whatsapp.status.textContent, /non è ancora stata inviata/);
const email = run('email');
assert.ok(email.destination.startsWith('mailto:info@registratoridicassaroma.com?'));
assert.match(decodeURIComponent(email.destination), /Stampante fiscale/);
assert.equal(run('email', false).destination, undefined);
console.log('PASS: WhatsApp/email, encoded special characters, honest status and validation.');
