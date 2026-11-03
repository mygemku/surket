# Phase 1: Discovery & Scoping — surket

## Product Requirements Document (PRD)

### App Name & Description
**Name:** `surket` (Surat Keterangan Generator)
**Description:** Client-side web tool for generating, previewing, printing, and exporting clinic medical certificate letters (Surat Keterangan Sakit / Istirahat / Dokter). Supports multiple clinic templates with instant live preview, A4/landscape print formatting, and DOC export.

### Target Audience
- Clinic staff, administrative personnel, and doctors generating official sick leave certificates quickly with standardized layouts.

### Core Features (MVP Scope)
1. **Template Selection:**
   - Template 1: Klinik Melati Medika (existing default layout).
   - Template 2: Klinik Mitra Pratama (`template/mp.jpg` format).
2. **Form Inputs:**
   - Clinic & Letter Metadata: Letter number, issue city, issue date.
   - Patient Info: Full name, age, gender, address, occupation.
   - Medical Details: Rest duration (days), start date, end date, diagnosis / notes.
   - Doctor & Sign-off: Doctor name, stamp/QR/signature display toggle or custom image upload.
3. **Live Sheet Preview:**
   - Real-time rendering of selected template as user types.
   - Matches official typography, kop layout, divider lines, and signature placement.
4. **Export Capabilities:**
   - Browser print view (`window.print()`) formatted for paper/PDF with screen UI hidden.
   - Word DOC export (`dlDoc()`) matching sheet content.

---

## Tech Stack Proposal
- **Frontend:** Vanilla HTML5, modern CSS3 (CSS Grid/Flexbox, print media query), Vanilla JavaScript (ES6+). Zero external framework overhead, instantaneous load, runs completely offline in any browser.
- **Backend:** None (static client-side architecture).
- **Database / Storage:** None / Browser `localStorage` for form drafts if needed.
- **Deployment & Source Control:** GitHub (`mygemku/surket`) + Netlify static hosting with continuous deployment.

---

## Clarifying Questions
1. **Template switching UX:** Should both templates (Melati Medika and Mitra Pratama) be selectable from a dropdown on the same page, or should Mitra Pratama replace Melati Medika?
2. **Assets for Mitra Pratama:** Do you have digital PNG files for the Mitra Pratama logo, stamp, and doctor signature, or should the app use placeholders/text lines until uploaded?
3. **Paper format:** Existing template uses landscape sheet (`277mm x 180mm`). Should Mitra Pratama use the same landscape sheet or portrait A4?
4. **Git push:** Should the initial baseline commit be committed and pushed to `https://github.com/mygemku/surket` now?
