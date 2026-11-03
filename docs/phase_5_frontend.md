# Phase 5: Frontend Implementation — surket

## Frontend Implementation Details

1. **User Interface Architecture:**
   - Responsive dual-column layout (sidebar form + live paper preview sheet).
   - Form controls with real-time `input` event listeners.
   - Template switcher dropdown supporting both clinics:
     - `melati`: Klinik Melati Medika (Landscape `277mm x 180mm`).
     - `mitra_pratama`: Klinik Pratama Rawat Inap Mitra Pratama (Portrait A4 `210mm x 297mm`).
   - Action controls: Print/PDF button (`window.print()`), Word DOC download button (`dlDoc()`), and Reset defaults button.

2. **Template Layout & Typography:**
   - **Melati Medika:** Times New Roman, landscape aspect ratio, single-line kop divider, QR doctor sign-off block.
   - **Mitra Pratama:** Crisp sans-serif heading and body matching `template/mp.jpg`, double-rule kop divider, operational license details, transparent clinic logo (`assets/logo_mp.png`), right-aligned doctor stamp/signature (`assets/stempel_sig_mp.png`), and doctor name `( dr. [nama_dokter] )`.

3. **Dynamic Print Styling:**
   - Managed via dynamic `<style id="page-print-style">`:
     - Melati: `@page { size: 277mm 180mm landscape; margin: 0; }`
     - Mitra Pratama: `@page { size: A4 portrait; margin: 0; }`
   - `@media print` rules hide all screen chrome, buttons, and form controls.

4. **Persistence & Export:**
   - Client draft persisted to `localStorage['surket_draft_v1']`.
   - Word DOC export with XML namespace wrapper and UTF-8 BOM.

---

## Page Verification Results

Verified live using browser automation on `file:///D:/Project/surket/index.html`:
- Initial load: Melati Medika template rendered successfully with default patient data.
- Template switch: Seamless transition to Mitra Pratama A4 Portrait sheet.
- Reactive input: Editing fields (`BAMBANG HERMANTO`, `3 hari`, `Gastritis Akut`) reflected immediately in preview sheet.
- Return switch: Preserved patient data when switching back to Melati Medika.
- Screenshots captured and verified.
