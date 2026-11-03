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
    'assets/mp_logo.png',
    'assets/mp_badge.png',
    'assets/mp_title.png',
    'assets/mp_stempel_sig.png',
    'assets/header.jpg',
    'assets/footer.jpg'
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

it('renders Medika Plaza (MP) with reason, company, and doctor sign-off', () => {
  const payload = {
    templateId: 'mp',
    nama: 'TEGAR PAMUNGKAS',
    jk: 'Laki-Laki',
    umur: '34',
    pekerjaan: 'Software Engineer',
    perusahaan: 'Tech Corp',
    tgl_klinik: '02 November 2026',
    mp_reason: 'istirahat',
    durasi: '2',
    tgl_mulai: '02 November 2026',
    tgl_selesai: '03 November 2026',
    keterangan: 'Acute gastritis',
    kota: 'Jakarta Selatan',
    tgl_surat: '02 November 2026',
    dokter: 'dr. Adinda Syifa Irianti',
    sip: '5/B.15a/31.74.02.1004.31.K-1.b/4/TM.09.74/e/2024'
  };
  const html = Surket.TEMPLATES.mp.render(payload);
  assert.ok(html.includes('SURAT KETERANGAN BEROBAT / SAKIT'));
  assert.ok(html.includes('ATTENDANCE/ ILLNESS CERTIFICATE'));
  assert.ok(html.includes('assets/header.jpg'));
  assert.ok(html.includes('assets/mp_stempel_sig.png'));
  assert.ok(html.includes('assets/footer.jpg'));
  assert.ok(html.includes('TEGAR PAMUNGKAS'));
  assert.ok(html.includes('Tech Corp'));
  assert.ok(html.includes('dari <b>02 November 2026</b> s.d <b>03 November 2026</b>'));
  assert.ok(html.includes('(dr. Adinda Syifa Irianti)'));
  assert.ok(html.includes('Acute gastritis'));
});

console.log(`\nIntegration Tests Finished: ${passed} passed, ${failed} failed.\n`);
if (failed > 0) process.exit(1);
