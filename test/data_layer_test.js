const assert = require('assert');
const Surket = require('../js/templates.js');

console.log('Running Data Layer & Template Engine tests...');

// 1. Escaping test
assert.strictEqual(Surket.esc('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
console.log('[PASS] HTML escaping sanitizes malicious tags');

// 2. Durations
assert.strictEqual(Surket.formatDuration('3'), '3 hari');
assert.strictEqual(Surket.formatDuration(''), '-');
console.log('[PASS] Duration formatting');

// 3. Melati template render
const melatiData = Surket.TEMPLATES.melati.defaultValues;
const melatiHtml = Surket.TEMPLATES.melati.render(melatiData);
assert.ok(melatiHtml.includes('Klinik Melati Medika'), 'Contains Melati Kop');
assert.ok(melatiHtml.includes('assets/logo.png'), 'Contains Melati logo');
assert.ok(melatiHtml.includes('assets/stempel.png'), 'Contains Melati stamp');
assert.ok(melatiHtml.includes('TEGAR PAMUNGKAS'), 'Contains patient name');
console.log('[PASS] Melati Medika template render valid');

// 4. Medika Plaza (MP) template render
const mpData = Surket.TEMPLATES.mp.defaultValues;
const mpHtml = Surket.TEMPLATES.mp.render(mpData);
assert.ok(mpHtml.includes('SURAT KETERANGAN BEROBAT / SAKIT'), 'Contains MP Title');
assert.ok(mpHtml.includes('assets/mp_logo.png'), 'Contains MP logo');
assert.ok(mpHtml.includes('assets/mp_badge.png'), 'Contains MP badge');
assert.ok(mpHtml.includes('assets/mp_stempel_sig.png'), 'Contains MP stamp/signature');
assert.ok(mpHtml.includes('TEGAR PAMUNGKAS'), 'Contains patient name');
assert.ok(mpHtml.includes('dr. Adinda Syifa Irianti'), 'Contains doctor name');
console.log('[PASS] Medika Plaza template render valid');

console.log('\nAll 4 test suites passed successfully.');
