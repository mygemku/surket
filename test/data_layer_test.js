const assert = require('assert');
const Surket = require('../js/templates.js');

console.log('Running Data Layer & Template Engine tests...');

// 1. Escaping test
assert.strictEqual(Surket.esc('<script>alert("xss")</script>'), '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
console.log('[PASS] HTML escaping sanitizes malicious tags');

// 2. Durations and Age
assert.strictEqual(Surket.formatDuration('3'), '3 hari');
assert.strictEqual(Surket.formatDuration(''), '-');
assert.strictEqual(Surket.formatAge('25'), '25 Tahun');
console.log('[PASS] Duration & Age formatting');

// 3. Melati template render
const melatiData = Surket.TEMPLATES.melati.defaultValues;
const melatiHtml = Surket.TEMPLATES.melati.render(melatiData);
assert.ok(melatiHtml.includes('Klinik Melati Medika'), 'Contains Melati Kop');
assert.ok(melatiHtml.includes('assets/logo.png'), 'Contains Melati logo');
assert.ok(melatiHtml.includes('assets/stempel.png'), 'Contains Melati stamp');
assert.ok(melatiHtml.includes('TEGAR PAMUNGKAS'), 'Contains patient name');
console.log('[PASS] Melati Medika template render valid');

// 4. Mitra Pratama template render
const mpData = Surket.TEMPLATES.mitra_pratama.defaultValues;
const mpHtml = Surket.TEMPLATES.mitra_pratama.render(mpData);
assert.ok(mpHtml.includes('MITRA PRATAMA'), 'Contains Mitra Pratama Kop');
assert.ok(mpHtml.includes('assets/logo_mp.png'), 'Contains Mitra Pratama logo');
assert.ok(mpHtml.includes('assets/stempel_sig_mp.png'), 'Contains Mitra Pratama stamp/signature');
assert.ok(mpHtml.includes('AURA KASIH'), 'Contains patient name');
assert.ok(mpHtml.includes('dr. Siti Sarah'), 'Contains doctor name');
console.log('[PASS] Mitra Pratama template render valid');

console.log('\nAll 4 test suites passed successfully.');
