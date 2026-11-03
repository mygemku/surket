const assert = require('assert');
const Surket = require('../js/templates.js');

let passed = 0;
let failed = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  [PASS] ${desc}`);
    passed++;
  } catch (err) {
    console.error(`  [FAIL] ${desc}: ${err.message}`);
    failed++;
  }
}

console.log('--- Unit Tests: Template Engine & Utilities ---');

// 1. Escaping
it('esc() handles null, undefined, and empty string', () => {
  assert.strictEqual(Surket.esc(null), '');
  assert.strictEqual(Surket.esc(undefined), '');
  assert.strictEqual(Surket.esc(''), '');
});

it('esc() escapes HTML special characters', () => {
  assert.strictEqual(Surket.esc('<script>'), '&lt;script&gt;');
  assert.strictEqual(Surket.esc('"hello" & \'world\''), '&quot;hello&quot; &amp; &#39;world&#39;');
});

it('esc() stringifies numeric values', () => {
  assert.strictEqual(Surket.esc(12345), '12345');
});

// 2. formatDuration
it('formatDuration() formats numeric days correctly', () => {
  assert.strictEqual(Surket.formatDuration('3'), '3 hari');
  assert.strictEqual(Surket.formatDuration(5), '5 hari');
});

it('formatDuration() passes through non-numeric or empty string', () => {
  assert.strictEqual(Surket.formatDuration(''), '-');
  assert.strictEqual(Surket.formatDuration(null), '-');
  assert.strictEqual(Surket.formatDuration('3 hari kerja'), '3 hari kerja');
});

// 3. formatAge
it('formatAge() formats numeric age correctly', () => {
  assert.strictEqual(Surket.formatAge('30'), '30 Tahun');
  assert.strictEqual(Surket.formatAge(45), '45 Tahun');
});

it('formatAge() preserves existing custom age strings', () => {
  assert.strictEqual(Surket.formatAge('33 th'), '33 th');
  assert.strictEqual(Surket.formatAge(''), '-');
});

// 4. Templates metadata
it('TEMPLATES registry contains melati and mitra_pratama', () => {
  assert.ok(Surket.TEMPLATES.melati);
  assert.ok(Surket.TEMPLATES.mitra_pratama);
  assert.strictEqual(Surket.TEMPLATES.melati.orientation, 'landscape');
  assert.strictEqual(Surket.TEMPLATES.mitra_pratama.orientation, 'portrait');
});

console.log(`\nUnit Tests Finished: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
