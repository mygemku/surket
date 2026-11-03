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

    mitra_pratama: {
      id: 'mitra_pratama',
      name: 'Klinik Mitra Pratama (A4 Portrait)',
      orientation: 'portrait',
      sheetClass: 'sheet-mp',
      pageSizeCss: 'A4 portrait',
      defaultValues: {
        nomor: '445/082/SKS/KMP/XI/2026',
        nama: 'AURA KASIH',
        umur: '26',
        jk: 'Perempuan',
        alamat: 'Kp. Pasir Angin RT 02/01 Cileungsi, Bogor',
        pekerjaan: 'Karyawan Swasta',
        durasi: '2',
        tgl_mulai: '3 November 2026',
        tgl_selesai: '4 November 2026',
        keterangan: 'Dyspepsia Syndrome + Cephalgia',
        kota: 'Bogor',
        tgl_surat: '3 November 2026',
        dokter: 'Siti Sarah'
      },
      render: function (data) {
        const sd = data.tgl_selesai && data.tgl_selesai.trim()
          ? ' s/d ' + esc(data.tgl_selesai.trim())
          : '';

        const bioRows = [
          ['Nama', data.nama],
          ['Umur', formatAge(data.umur)],
          ['Jenis Kelamin', data.jk],
          ['Pekerjaan', data.pekerjaan || '-'],
          ['Alamat', data.alamat]
        ].map(function (x) {
          return '<div class="row-label">' + esc(x[0]) + '</div><div class="row-colon">:</div><div class="row-val">' + esc(x[1]) + '</div>';
        }).join('');

        const doctorDisplay = data.dokter && data.dokter.trim()
          ? '( dr. ' + esc(data.dokter.trim()) + ' )'
          : '( dr. .................................................... )';

        return '' +
          '<div class="kop-mp">' +
            '<div class="kop-mp-logo"><img src="assets/logo_mp.png" alt="Logo Mitra Pratama"></div>' +
            '<div class="kop-mp-text">' +
              '<div class="kop-title-small">KLINIK PRATAMA RAWAT INAP</div>' +
              '<div class="kop-title-main">MITRA PRATAMA</div>' +
              '<div class="kop-sub-bold">IZIN OPERASIONAL : 445/002/00346/DPMPTSP/2021</div>' +
              '<div class="kop-sub">Jl. Raya Cileungsi - Setu Km. 3 Kp. Cipicung Rt. 011 Rw. 004 Ds. Mekarsari</div>' +
              '<div class="kop-sub">Kec. Cileungsi Kab. Bogor 16820 Telp. 0812-9000-8515 / 0813-8888-2936</div>' +
              '<div class="kop-sub">Email : klinikmitrapratama.bogor@gmail.com</div>' +
            '</div>' +
          '</div>' +
          '<div class="garis-ganda"></div>' +
          '<div class="judul-mp">' +
            '<h2>SURAT KETERANGAN SAKIT</h2>' +
            '<div class="nomor-mp">Nomor : ' + esc(data.nomor) + '</div>' +
          '</div>' +
          '<div class="paragraf-mp">' +
            'Yang bertanda tangan di bawah ini, Dokter Klinik Pratama Rawat Inap Mitra Pratama menerangkan bahwa :' +
          '</div>' +
          '<div class="bio-mp">' + bioRows + '</div>' +
          '<div class="detail-sakit-mp">' +
            '<div class="detail-row"><span class="d-label">Perlu beristirahat karena sakit selama</span><span class="d-colon">:</span><span class="d-val">' + esc(formatDuration(data.durasi)) + '</span></div>' +
            '<div class="detail-row"><span class="d-label">Terhitung mulai tanggal</span><span class="d-colon">:</span><span class="d-val">' + esc(data.tgl_mulai) + sd + '</span></div>' +
            '<div class="detail-row"><span class="d-label">Diagnosa</span><span class="d-colon">:</span><span class="d-val">' + esc(data.keterangan) + '</span></div>' +
          '</div>' +
          '<div class="paragraf-mp">' +
            'Demikian surat keterangan ini diberikan untuk dapat dipergunakan sebagaimana mestinya.' +
          '</div>' +
          '<div class="ttd-mp-container">' +
            '<div class="ttd-mp-box">' +
              '<div class="ttd-mp-kota">' + esc(data.kota) + ', ' + esc(data.tgl_surat) + '</div>' +
              '<div class="ttd-mp-jabatan">Dokter Pemeriksa,</div>' +
              '<div class="ttd-mp-stamp-wrap">' +
                '<img src="assets/stempel_sig_mp.png" alt="Stempel & Tanda Tangan Dokter">' +
              '</div>' +
              '<div class="ttd-mp-nama">' + doctorDisplay + '</div>' +
            '</div>' +
          '</div>';
      }
    }
  };

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
