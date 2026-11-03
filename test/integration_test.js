const assert = require('assert');
const fs = require('fs');
const path = require('path');
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

console.log('--- Integration Tests: End-to-End Consistency ---');

const rootDir = path.resolve(__dirname, '..');
const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

it('index.html contains all form input IDs managed by script', () => {
  const fieldIds = [
    'template_id', 'nomor', 'nama', 'umur', 'jk', 'pekerjaan', 'alamat',
    'durasi', 'tgl_mulai', 'tgl_selesai', 'keterangan', 'kota', 'tgl_surat', 'dokter'
  ];
  for (const id of fieldIds) {
    assert.ok(indexHtml.includes(`id="${id}"`), `Missing id="${id}" in index.html`);
  }
});

it('index.html references valid js/templates.js script tag', () => {
  assert.ok(indexHtml.includes('<script src="js/templates.js"></script>'));
});

it('all referenced clinic assets exist with non-zero size', () => {
  const assets = [
    'assets/logo.png',
    'assets/stempel.png',
    'assets/qr_dokter.png',
    'assets/logo_mp.png',
    'assets/stempel_sig_mp.png'
  ];
  for (const a of assets) {
    const full = path.join(rootDir, a);
    assert.ok(fs.existsSync(full), `Asset missing: ${a}`);
    assert.ok(fs.statSync(full).size > 1000, `Asset suspiciously small: ${a}`);
  }
});

it('renders Melati Medika with malicious payload cleanly without unescaped tags', () => {
  const payload = {
    templateId: 'melati',
    nomor: '<b>TEST/01</b>',
    nama: '<script>alert(1)</script>',
    umur: '25',
    jk: 'Laki-Laki',
    alamat: '<img src=x onerror=alert(1)>',
    pekerjaan: 'Tester',
    durasi: '2',
    tgl_mulai: '1 Jan 2026',
    tgl_selesai: '2 Jan 2026',
    keterangan: 'Diagnosis <evil>',
    kota: 'Depok',
    tgl_surat: '1 Jan 2026',
    dokter: ''
  };
  const html = Surket.TEMPLATES.melati.render(payload);
  assert.ok(!html.includes('<script>'), 'Unescaped script tag found');
  assert.ok(!html.includes('<img src=x'), 'Unescaped img tag found');
  assert.ok(html.includes('&lt;script&gt;alert(1)&lt;/script&gt;'), 'Script tag escaped');
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'), 'Img tag escaped');
});

it('renders Mitra Pratama with custom doctor name and optional end date', () => {
  const payload = {
    templateId: 'mitra_pratama',
    nomor: '445/099/SKS/KMP/XI/2026',
    nama: 'Dr. Hendra Wijaya',
    umur: '40',
    jk: 'Laki-Laki',
    alamat: 'Bogor',
    pekerjaan: 'PNS',
    durasi: '3',
    tgl_mulai: '5 Nov 2026',
    tgl_selesai: '7 Nov 2026',
    keterangan: 'Febris Akut',
    kota: 'Bogor',
    tgl_surat: '5 Nov 2026',
    dokter: 'Dewi Sartika'
  };
  const html = Surket.TEMPLATES.mitra_pratama.render(payload);
  assert.ok(html.includes('5 Nov 2026 s/d 7 Nov 2026'));
  assert.ok(html.includes('( dr. Dewi Sartika )'));
  assert.ok(html.includes('assets/logo_mp.png'));
  assert.ok(html.includes('assets/stempel_sig_mp.png'));
});

console.log(`\nIntegration Tests Finished: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
