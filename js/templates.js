(function (global) {
  'use strict';

  function esc(s) {
    return (s || '')
      .toString()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDuration(d) {
    const s = (d || '').toString().trim();
    if (!s) return '-';
    return /^\d+$/.test(s) ? s + ' hari' : s;
  }

  function formatAge(a) {
    const s = (a || '').toString().trim();
    if (!s) return '-';
    return /^\d+$/.test(s) ? s + ' Tahun' : s;
  }

  const TEMPLATES = {
    melati: {
      id: 'melati',
      name: 'Klinik Melati Medika (Landscape)',
      orientation: 'landscape',
      sheetClass: 'sheet-melati',
      pageSizeCss: '277mm 180mm landscape',
      defaultValues: {
        nomor: 'SKK/VII/2026/00003',
        nama: 'TEGAR PAMUNGKAS',
        umur: '33 th',
        jk: 'Laki-Laki',
        alamat: 'JL ANTENA II GG II NO 9A',
        pekerjaan: '',
        durasi: '1',
        tgl_mulai: '1 Juli 2026',
        tgl_selesai: '',
        keterangan: 'Diagnosis: Acute upper respiratory infection, unspecified.',
        kota: 'Depok',
        tgl_surat: '1 Juli 2026',
        dokter: ''
      },
      render: function (data) {
        const sd = data.tgl_selesai && data.tgl_selesai.trim()
          ? ' s/d tanggal ' + esc(data.tgl_selesai.trim())
          : '';
        const bio = [
          ['Nama', data.nama],
          ['Umur', data.umur],
          ['Jenis Kelamin', data.jk],
          ['Alamat', data.alamat],
          ['Pekerjaan', data.pekerjaan]
        ].map(function (x) {
          return '<div>' + esc(x[0]) + '</div><div>:</div><div>' + esc(x[1]) + '</div>';
        }).join('');

        return '' +
          '<div class="kop">' +
            '<img src="assets/logo.png" alt="Logo">' +
            '<div class="t">' +
              '<b>Klinik Melati Medika</b><br>' +
              '<small>No. Izin:12320001323930001<br>' +
              'Jalan Nusantara Blok J No.8, Ruko Lokasari A8, RW.2, RT/RW,/, Kel. Pasir Gunung Selatan, Kec. Cimanggis, Kota Depok, Prov. Jawa Barat<br>' +
              '082125114167 |</small>' +
            '</div>' +
          '</div>' +
          '<div class="garis"></div>' +
          '<h2>Surat Keterangan Sakit</h2>' +
          '<div class="nomor">Nomor: ' + esc(data.nomor) + '</div>' +
          '<div class="body">Yang bertanda tangan di bawah ini menerangkan bahwa:</div>' +
          '<div class="bio">' + bio + '</div>' +
          '<div class="body">Berdasarkan hasil pemeriksaan yang telah dilakukan, pasien tersebut memerlukan istirahat selama ' +
            esc(formatDuration(data.durasi)) + ' terhitung mulai tanggal ' + esc(data.tgl_mulai) + sd + ' karena sakit.<br><br>' +
            'Demikian surat keterangan ini dibuat untuk diketahui dan dipergunakan sebagaimana mestinya.</div>' +
          '<div class="ket">Keterangan:</div>' +
          '<div class="body">' + esc(data.keterangan) + '</div>' +
          '<div class="ttd-row">' +
            '<div class="st"><img src="assets/stempel.png" alt="stempel"></div>' +
            '<div class="qr">' +
              esc(data.kota) + ', ' + esc(data.tgl_surat) + '<br>Yang memeriksa,<br>' +
              '<img src="assets/qr_dokter.png" alt="qr dokter"><br>' +
              '( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )<br>' +
              '( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )' +
            '</div>' +
          '</div>' +
          '<div class="cetak">Tgl.Cetak. ' + esc(new Date().toLocaleString('id-ID')) + '</div>';
      }
    },

    mp: {
      id: 'mp',
      name: 'Medika Plaza (A4 Portrait)',
      orientation: 'portrait',
      sheetClass: 'sheet-mp',
      pageSizeCss: 'A4 portrait',
      defaultValues: {
        nama: 'TEGAR PAMUNGKAS',
        jk: 'Laki-Laki',
        umur: '34',
        pekerjaan: '-',
        perusahaan: '-',
        tgl_klinik: '02 November 2026',
        mp_reason: 'istirahat',
        durasi: '2',
        tgl_mulai: '02 November 2026',
        tgl_selesai: '03 November 2026',
        tgl_kembali: '-',
        keterangan: 'Acute gastritis',
        kota: 'Jakarta Selatan',
        tgl_surat: '02 November 2026',
        dokter: 'dr. Adinda Syifa Irianti',
        sip: '5/B.15a/31.74.02.1004.31.K-1.b/4/TM.09.74/e/2024'
      },
      render: function (data) {
        const reason = data.mp_reason || 'istirahat';

        const circleActive = '<span class="mp-radio mp-radio-active">&#9679;</span>';
        const circleInactive = '<span class="mp-radio">&#9675;</span>';

        const c1 = reason === 'kembali_bekerja' ? circleActive : circleInactive;
        const c2 = reason === 'istirahat' ? circleActive : circleInactive;
        const c3 = reason === 'datang_kembali' ? circleActive : circleInactive;
        const c4 = reason === 'rujuk_rs' ? circleActive : circleInactive;

        const durNum = (data.durasi || '').toString().trim() || '2';
        const tglMulai = esc(data.tgl_mulai || '02 November 2026');
        const tglSelesai = esc(data.tgl_selesai || '03 November 2026');
        const tglKembali = esc(data.tgl_kembali || '-');

        const doctorDisplay = data.dokter && data.dokter.trim()
          ? '(' + esc(data.dokter.trim()) + ')'
          : '(dr. Adinda Syifa Irianti)';

        const sipDisplay = data.sip && data.sip.trim()
          ? 'SIP. ' + esc(data.sip.trim())
          : 'SIP. 5/B.15a/31.74.02.1004.31.K-1.b/4/TM.09.74/e/2024';

        return '' +
          '<div class="mp-header">' +
            '<div class="mp-logo-box"><img src="assets/mp_logo.png" alt="Medika Plaza Logo"></div>' +
            '<div class="mp-badge-box"><img src="assets/mp_badge.png" alt="25 Years of Innovation"></div>' +
          '</div>' +

          '<div class="mp-title-box">' +
            '<div class="mp-title-id">SURAT KETERANGAN BEROBAT / SAKIT</div>' +
            '<div class="mp-title-en">ATTENDANCE/ ILLNESS CERTIFICATE</div>' +
          '</div>' +

          '<div class="mp-intro">' +
            '<div>Yang bertanda tangan dibawah ini menerangkan bahwa:</div>' +
            '<div class="mp-en">This is to certify that:</div>' +
          '</div>' +

          '<div class="mp-bio-table">' +
            '<div class="mp-bio-row">' +
              '<div class="mp-bio-lbl">Nama / <i>Name</i></div>' +
              '<div class="mp-bio-colon">:</div>' +
              '<div class="mp-bio-val">' + esc(data.nama) + '</div>' +
            '</div>' +
            '<div class="mp-bio-row">' +
              '<div class="mp-bio-lbl">Jenis Kelamin / <i>Sex</i></div>' +
              '<div class="mp-bio-colon">:</div>' +
              '<div class="mp-bio-val">' + esc(data.jk) + '</div>' +
            '</div>' +
            '<div class="mp-bio-row">' +
              '<div class="mp-bio-lbl">Umur / <i>Age</i></div>' +
              '<div class="mp-bio-colon">:</div>' +
              '<div class="mp-bio-val">' + esc(data.umur) + '</div>' +
            '</div>' +
            '<div class="mp-bio-row">' +
              '<div class="mp-bio-lbl">Pekerjaan / <i>Occupation</i></div>' +
              '<div class="mp-bio-colon">:</div>' +
              '<div class="mp-bio-val">' + esc(data.pekerjaan || '-') + '</div>' +
            '</div>' +
            '<div class="mp-bio-row">' +
              '<div class="mp-bio-lbl">Perusahaan / <i>Company</i></div>' +
              '<div class="mp-bio-colon">:</div>' +
              '<div class="mp-bio-val">' + esc(data.perusahaan || '-') + '</div>' +
            '</div>' +
          '</div>' +

          '<div class="mp-attend">' +
            '<div>Telah datang ke klinik pada Tanggal <b>' + esc(data.tgl_klinik || data.tgl_surat) + '</b> yang bersangkutan :</div>' +
            '<div class="mp-en">Has attended to the clinic on <b>' + esc(data.tgl_klinik || data.tgl_surat) + '</b> the patient :</div>' +
          '</div>' +

          '<div class="mp-reasons">' +
            '<div class="mp-reason-item">' +
              '<div class="mp-bullet">' + c1 + '</div>' +
              '<div class="mp-reason-text">' +
                '<div>Dapat kembali bekerja</div>' +
                '<div class="mp-en">May return to work</div>' +
              '</div>' +
            '</div>' +

            '<div class="mp-reason-item">' +
              '<div class="mp-bullet">' + c2 + '</div>' +
              '<div class="mp-reason-text">' +
                '<div>Disarankan untuk beristirahat selama : <b>' + durNum + '</b> hari, dari <b>' + tglMulai + '</b> s.d <b>' + tglSelesai + '</b></div>' +
                '<div class="mp-en">Should have a complete rest for : <b>' + durNum + '</b> day (s), from <b>' + tglMulai + '</b> to <b>' + tglSelesai + '</b></div>' +
              '</div>' +
            '</div>' +

            '<div class="mp-reason-item">' +
              '<div class="mp-bullet">' + c3 + '</div>' +
              '<div class="mp-reason-text">' +
                '<div>Perlu datang kembali ke klinik pada : <b>' + tglKembali + '</b></div>' +
                '<div class="mp-en">Need to be seen again at clinic on : <b>' + tglKembali + '</b></div>' +
              '</div>' +
            '</div>' +

            '<div class="mp-reason-item">' +
              '<div class="mp-bullet">' + c4 + '</div>' +
              '<div class="mp-reason-text">' +
                '<div>Perlu dirujuk ke Rumah Sakit untuk mendapatkan pemeriksaan lebih lanjut</div>' +
                '<div class="mp-en">Need to be referred to hospital for further treatment</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="mp-comments">' +
            '<div class="mp-comm-lbl">Keterangan / <i>Comments</i> :</div>' +
            '<div class="mp-comm-val">' + esc(data.keterangan || '-') + '</div>' +
          '</div>' +

          '<div class="mp-sign-section">' +
            '<div class="mp-sign-box">' +
              '<div class="mp-sign-date">' + esc(data.kota || 'Jakarta Selatan') + ', ' + esc(data.tgl_surat || '02 November 2026') + '</div>' +
              '<div class="mp-stamp-wrap">' +
                '<img src="assets/mp_stempel_sig.png" alt="Stempel & Tanda Tangan">' +
              '</div>' +
              '<div class="mp-sign-pt">PT. KARTIKA BINA MEDIKATAMA</div>' +
              '<div class="mp-sign-doc">' + doctorDisplay + '</div>' +
              '<div class="mp-sign-sip">' + sipDisplay + '</div>' +
            '</div>' +
          '</div>' +

          '<div class="mp-page-footer">' +
            '<img src="assets/footer.jpg" alt="Footer Medika Plaza">' +
          '</div>';
      }
    }
  };

  TEMPLATES.mitra_pratama = TEMPLATES.mp;

  const Surket = {
    TEMPLATES: TEMPLATES,
    esc: esc,
    formatDuration: formatDuration,
    formatAge: formatAge
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Surket;
  } else {
    global.Surket = Surket;
  }
})(typeof window !== 'undefined' ? window : global);
