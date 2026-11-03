# surket — Generator Surat Keterangan Sakit & Dokter

A lightweight, offline-capable client-side web application for generating, previewing, printing, and exporting clinic medical certificate letters.

Live Demo: [https://surket.netlify.app/](https://surket.netlify.app/)  
GitHub Repo: [https://github.com/mygemku/surket](https://github.com/mygemku/surket)

---

## Supported Templates

1. **Klinik Melati Medika**
   - Format: Half-page landscape (`277mm x 180mm`).
   - Sign-off: Doctor QR verification code + Clinic stamp.
2. **Klinik Pratama Rawat Inap Mitra Pratama**
   - Format: Standard A4 portrait (`210mm x 297mm`).
   - Kop: Double-rule divider, operational license details (`445/002/00346/DPMPTSP/2021`), contact lines, transparent clinic logo.
   - Sign-off: Doctor stamp & signature (`assets/stempel_sig_mp.png`) + `( dr. [nama_dokter] )`.

---

## Features

- **Live Real-time Preview:** Preview sheet re-renders instantly as you type.
- **Dynamic Print/PDF Formatting:** `@page` CSS switches dynamically between landscape and portrait A4. Browser print dialog cleanly hides all sidebar forms and screen UI.
- **Word DOC Export:** Download `.doc` file with XML schemas (`application/msword`) for offline Word processing.
- **Draft Persistence:** Form state is automatically saved to browser `localStorage`.
- **Zero Runtime Dependencies:** Pure HTML5, CSS3 Grid/Flexbox, and ES6 JavaScript.

---

## Local Development & Testing

### Prerequisites
- Node.js (version 18+) installed.

### Run Locally
Simply open `index.html` in any modern web browser, or run a local static server:

```powershell
# Start local development server
npm start
```

### Run Tests
```powershell
# Run smoke, unit, and integration tests
npm test
```

---

## Deployment to Netlify

This project is configured with `netlify.toml` for zero-configuration deploys:
1. Push code to `https://github.com/mygemku/surket`.
2. Connect the repository in Netlify dashboard.
3. Publish directory is set to `.` (root).

---

## License
MIT
