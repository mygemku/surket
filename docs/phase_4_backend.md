# Phase 4: Data Layer & Client-Side Controller — surket

## Architectural Note
Per Phase 1 & 2 requirements, `surket` is an offline-capable, pure client-side static web application. There is no remote backend server or SQL/NoSQL database. Business logic, data models, validation, and export pipelines operate directly in the client runtime.

---

## 1. Data Models & Template Registry

The data layer is structured as a modular template engine:

### State Schema
- `template_id`: `'melati'` | `'mitra_pratama'`
- `nomor`: Letter serial number
- `nama`: Patient full name
- `umur`: Patient age
- `jk`: Patient gender (`Laki-Laki` | `Perempuan`)
- `alamat`: Patient address
- `pekerjaan`: Patient occupation
- `durasi`: Sick leave duration (numeric days)
- `tgl_mulai`: Leave start date
- `tgl_selesai`: Leave end date
- `keterangan`: Diagnosis or clinical note
- `kota`: Issue location
- `tgl_surat`: Letter issuance date
- `dokter`: Examining doctor name (used for Mitra Pratama signature line)

### Template Registry Specifications

1. **`melati` (Klinik Melati Medika)**
   - Orientation: Landscape (`277mm x 180mm`).
   - Kop: Single line rule, Depok address, phone contact.
   - Doctor Sign-off: QR code image (`assets/qr_dokter.png`) + Clinic stamp (`assets/stempel.png`).
   - Print rule: `@page { size: 277mm 180mm landscape; margin: 0; }`.

2. **`mitra_pratama` (Klinik Pratama Rawat Inap Mitra Pratama)**
   - Orientation: Portrait A4 (`210mm x 297mm`).
   - Kop: Double rule (thick top, thin bottom), operational license number `445/002/00346/DPMPTSP/2021`, Bogor address, email and dual phone lines.
   - Logo: Transparent clinic emblem (`assets/logo_mp.png`).
   - Doctor Sign-off: Right-aligned stamp & signature (`assets/stempel_sig_mp.png`) + `( dr. [nama_dokter] )`.
   - Print rule: `@page { size: A4 portrait; margin: 12mm 15mm; }`.

---

## 2. Controllers & Services

- **`StorageController`**: Manages debounce persistence to `localStorage.getItem('surket_draft')`.
- **`TemplateController`**: Renders dynamic HTML using HTML escaping `esc()` to prevent XSS. Switches form defaults based on active template selection.
- **`ExportService`**:
  - `dlDoc()`: Generates MS Word binary blob (`application/msword`) with Word XML namespaces (`urn:schemas-microsoft-com:office:office` and `urn:schemas-microsoft-com:office:word`).
  - `printSheet()`: Dynamically configures `@page` CSS size property before invoking `window.print()`.

---

## 3. Route & Unit Test Execution

Executed route and template rendering test script `test/data_layer_test.js`:

```
> node test/data_layer_test.js
Running Data Layer & Template Engine tests...
[PASS] HTML escaping sanitizes malicious tags
[PASS] Duration & Age formatting
[PASS] Melati Medika template render valid
[PASS] Mitra Pratama template render valid

All 4 test suites passed successfully.
```
