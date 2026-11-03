const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const requiredFiles = [
  'index.html',
  'package.json',
  'netlify.toml',
  '.gitignore',
  'assets/logo.png',
  'assets/stempel.png',
  'assets/qr_dokter.png',
  'assets/mp_logo.png',
  'assets/mp_badge.png',
  'assets/mp_title.png',
  'assets/mp_stempel_sig.png',
  'assets/footer.jpg'
];

let errors = 0;
console.log('Running smoke tests for surket scaffolding...');

for (const rel of requiredFiles) {
  const full = path.join(rootDir, rel);
  if (fs.existsSync(full)) {
    const stat = fs.statSync(full);
    console.log(`[PASS] ${rel} (${stat.size} bytes)`);
  } else {
    console.error(`[FAIL] Missing required file: ${rel}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\nSmoke tests failed with ${errors} error(s).`);
  process.exit(1);
} else {
  console.log('\nAll scaffolding files verified successfully.');
}
