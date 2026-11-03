# surket — brief

Web application for generating medical certificate letters (Surat Keterangan Sakit & Surat Keterangan Dokter) with live preview, print-to-PDF formatting, and Word DOC export. Offline-capable static client-side single page app.

## Key decisions
- Multi-template support: Template 1 (Klinik Melati Medika - existing), Template 2 (Klinik Mitra Pratama / mp.jpg - new).
- Template switcher in sidebar form allows instant live preview switching.
- Retain print styling (`@media print`) and DOC export (`dlDoc`) across templates.
- Pure client-side static web app hosted on Netlify, versioned on GitHub (`https://github.com/mygemku/surket`).

## Status
Phase 7: Deployment Preparation complete. Project complete.
See `CHANGELOG.md` for history.
