export interface VillageArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Pemerintahan' | 'Kependudukan' | 'Pembangunan' | 'Sosial & Budaya' | 'Pemberdayaan';
  date: string;
  author: string;
  readTime: string;
  summary: string;
  content: string[];
  imageUrl: string;
  featured?: boolean;
}

export const VILLAGE_ARTICLES: VillageArticle[] = [
  {
    id: 'art-1',
    title: 'Sosialisasi & Fasilitasi Pendataan Wilayah Terdampak Jalur Tol Getaci di Desa Bojongloa Rancaekek',
    slug: 'sosialisasi-jalur-tol-getaci-desa-bojongloa-rancaekek',
    category: 'Pembangunan',
    date: '06 Oktober 2026',
    author: 'Pemerintah Desa Bojongloa',
    readTime: '4 menit baca',
    featured: true,
    summary: 'Pemerintah Desa Bojongloa memfasilitasi pendataan dan musyawarah bersama warga pemilik lahan terkait trase proyek strategis nasional Jalan Tol Gedebage - Tasikmalaya - Cilacap (Getaci) di wilayah Rancaekek.',
    content: [
      'Pemerintah Desa Bojongloa, Kecamatan Rancaekek, Kabupaten Bandung menggelar pertemuan sosialisasi dan pendataan warga yang memiliki bidang tanah di jalur trase proyek Jalan Tol Gedebage - Tasikmalaya - Cilacap (Getaci).',
      'Kepala Desa Bojongloa, H. Ayeng, didampingi Sekretaris Desa Endin Aminudin, S.Ag., menegaskan bahwa pihak desa berkomitmen mengawal hak-hak warga secara transparan, adil, dan tertib administrasi pertanahan.',
      '"Kami ingin memastikan seluruh warga yang terlewati jalur proyek strategis nasional ini memperoleh informasi yang jelas, pendampingan berkas kepemilikan tanah yang valid, dan tidak ada pihak-pihak yang dirugikan," ungkap H. Ayeng di hadapan warga di Aula Kantor Desa.',
      'Pihak desa juga membuka posko konsultasi dokumen kependudukan dan surat riwayat tanah (Letter C) guna mempermudah proses validasi tanpa dikenakan biaya.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=700&q=75'
  },
  {
    id: 'art-2',
    title: 'Penyaluran BLT Dana Desa dan Program Ketahanan Pangan Tahun 2026 Dipimpin Kades H. Ayeng',
    slug: 'penyaluran-blt-dana-desa-ketahanan-pangan-bojongloa',
    category: 'Pemerintahan',
    date: '02 Oktober 2026',
    author: 'Sekretariat Desa Bojongloa',
    readTime: '3 menit baca',
    summary: 'Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) Triwulan III berjalan tertib bagi 72 Keluarga Penerima Manfaat bersamaan dengan program bantuan bibit pertanian warga.',
    content: [
      'Bertempat di Aula Kantor Desa Bojongloa, Kepala Desa H. Ayeng bersama BPD menyalurkan BLT Dana Desa Triwulan III Tahun Anggaran 2026 kepada keluarga penerima manfaat prasejahtera dan lansia.',
      'Setiap penerima manfaat mendapatkan haknya penuh tanpa potongan. Selain bantuan tunai, Pemdes Bojongloa juga mendistribusikan bibit sayuran dan pakan ikan air tawar dalam rangka program Penguatan Ketahanan Pangan Desa.',
      'Sekretaris Desa Bojongloa, Endin Aminudin, S.Ag., menyatakan bahwa akuntabilitas pengelolaan Dana Desa dipublikasikan secara terbuka melalui papan infografis APBDes di kantor desa dan portal digital resmi.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=700&q=75'
  },
  {
    id: 'art-3',
    title: 'Gotong Royong Normalisasi Saluran Irigasi Cikeruh-Citarik di Dusun Citaman & Cilogang',
    slug: 'gotong-royong-normalisasi-irigasi-dusun-citaman-cilogang',
    category: 'Pembangunan',
    date: '28 September 2026',
    author: 'Ketua RW Dusun Citaman',
    readTime: '3 menit baca',
    summary: 'Ratusan warga Dusun Citaman dan Cilogang membersihkan sedimentasi saluran air guna mengantisipasi genangan air hujan dan menjaga pasokan irigasi sawah.',
    content: [
      'Memasuki musim penghujan, warga Desa Bojongloa bersama jajaran RT/RW di Dusun Citaman dan Dusun Cilogang serentak melaksanakan aksi bebersih lingkungan dan pengerukan sedimentasi saluran air.',
      'Kegiatan gotong royong ini difasilitasi oleh armada pengangkut sampah Pemdes Bojongloa dan didukung kelompok tani setempat.',
      'Melalui normalisasi ini, debit air buangan dapat mengalir lancar menuju sungai Cikeruh serta memperkecil risiko luapan air ke permukiman dan area persawahan produktif.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=700&q=75'
  },
  {
    id: 'art-4',
    title: 'Digitalisasi Pelayanan Kependudukan Mandiri Desa Bojongloa Permudah Warga Buat Dokumen',
    slug: 'digitalisasi-pelayanan-kependudukan-mandiri-bojongloa',
    category: 'Kependudukan',
    date: '22 September 2026',
    author: 'Kasi Pelayanan Desa Bojongloa',
    readTime: '4 menit baca',
    summary: 'Warga Desa Bojongloa kini dapat mengajukan Surat Keterangan Kelahiran, Kematian, dan Surat Pengantar Pindah secara daring dari gawai tanpa antre panjang di kantor desa.',
    content: [
      'Sebagai tindak lanjut inovasi pelayanan publik terpadu, Pemerintah Desa Bojongloa meresmikan portal layanan administrasi kependudukan digital berbasis NIK.',
      'Warga cukup mengisi identitas dan mengunggah dokumen syarat dari rumah. Berkas diverifikasi langsung oleh petugas loket desa dalam waktu 1x24 jam kerja.',
      '"Sistem ini memangkas waktu pengurusan dari berhari-hari menjadi hitungan jam. Surat yang terbit dilengkapi nomor registrasi resmi dan kode validasi," jelas Kasi Pelayanan Desa.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=75'
  },
  {
    id: 'art-5',
    title: 'Musyawarah Desa (Musdes) Pembahasan Penataan Wilayah RT/RW & Pemekaran Layanan',
    slug: 'musdes-penataan-wilayah-rt-rw-desa-bojongloa',
    category: 'Pemerintahan',
    date: '15 September 2026',
    author: 'Badan Permusyawaratan Desa (BPD)',
    readTime: '3 menit baca',
    summary: 'Pemerintah Desa Bojongloa bersama BPD dan tokoh masyarakat membahas penataan batas wilayah RT/RW demi pemerataan pelayanan bagi lebih dari 20.000 jiwa warga.',
    content: [
      'Pertumbuhan populasi penduduk Desa Bojongloa yang kini melampaui 20.000 jiwa mendorong perlunya penataan kembali struktur RT dan RW di wilayah Dusun Citaman, Cilogang, Babakan, dan Sukamaju.',
      'Musdes yang dipimpin Kades H. Ayeng bersama Ketua BPD menyepakati langkah penataan administratif guna memastikan bantuan sosial, pendataan SIAK, dan layanan administrasi terdistribusi merata.',
      'Hasil musyawarah dituangkan dalam Berita Acara yang akan dikoordinasikan dengan Camat Rancaekek dan Bagian Pemerintahan Pemkab Bandung.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=700&q=75'
  },
  {
    id: 'art-6',
    title: 'Layanan Posyandu Melati dan Penyuluhan Penurunan Stunting bagi Balita Bojongloa',
    slug: 'layanan-posyandu-dan-penyuluhan-stunting-bojongloa',
    category: 'Pemberdayaan',
    date: '10 September 2026',
    author: 'Kader TP-PKK Desa Bojongloa',
    readTime: '3 menit baca',
    summary: 'Kegiatan Posyandu terpadu digelar di 6 RW dengan layanan penimbangan, imunisasi rutin, dan pembagian paket Pemberian Makanan Tambahan (PMT) bergizi tinggi.',
    content: [
      'Pemberdayaan Kesejahteraan Keluarga (PKK) Desa Bojongloa bersama bidan desa secara rutin menggelar Posyandu balita dan lansia di seluruh dusun.',
      'Pemdes Bojongloa mengalokasikan anggaran khusus Dana Desa untuk PMT balita dan suplemen ibu hamil guna mencegah risiko stunting sejak dini.',
      'Tingkat kehadiran warga mencapai lebih dari 95 persen berkat peran aktif para kader Posyandu di tiap rukun warga.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=75'
  }
];

export const DESA_APARATUR = [
  {
    nama: 'H. AYENG',
    jabatan: 'Kepala Desa Bojongloa',
    nip: 'Kepala Desa Terpilih',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=75'
  },
  {
    nama: 'ENDIN AMINUDIN, S.Ag.',
    jabatan: 'Sekretaris Desa',
    nip: 'Sekdes Pemdes Bojongloa',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=75'
  },
  {
    nama: 'ASEP KURNIAWAN, S.A.P.',
    jabatan: 'Kasi Pelayanan (Admin SIAK)',
    nip: 'Kasi Pelayanan Masyarakat',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=75'
  },
  {
    nama: 'NENG SITI MARYAM, S.E.',
    jabatan: 'Kaur Keuangan',
    nip: 'Kaur Pengelolaan APBDes',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=75'
  },
  {
    nama: 'AGUS SUHENDAR',
    jabatan: 'Kasi Pemerintahan & Trantib',
    nip: 'Kasi Tata Pemerintahan',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=160&q=75'
  },
  {
    nama: 'DADANG HIDAYAT',
    jabatan: 'Ketua BPD Bojongloa',
    nip: 'Badan Permusyawaratan Desa',
    foto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=75'
  }
];

export const DESA_PENGUMUMAN = [
  {
    id: 'ann-1',
    badge: 'Penting',
    title: 'Pendataan Administrasi Pertanahan Warga Jalur Trase Tol Getaci',
    date: '05 - 20 Oktober 2026',
    desc: 'Warga yang bidang lahannya terlewati jalur Tol Getaci diimbau melengkapi fotokopi KTP, KK, dan bukti kepemilikan tanah di Posko Pelayanan Kantor Desa Bojongloa.'
  },
  {
    id: 'ann-2',
    badge: 'Jadwal',
    title: 'Pelayanan Rekam KTP Elektronik & Pemutakhiran Kartu Keluarga',
    date: '12 - 16 Oktober 2026',
    desc: 'Layanan jemput bola Disdukcapil Kab. Bandung di Aula Kantor Desa Bojongloa untuk perekaman KTP pemula dan revisi Kartu Keluarga.'
  },
  {
    id: 'ann-3',
    badge: 'Sosialisasi',
    title: 'Akses Pengajuan Surat Keterangan Kependudukan Online 24 Jam',
    date: 'Setiap Hari Kerja',
    desc: 'Surat Keterangan Kelahiran, Kematian, dan Surat Pengantar Pindah kini dapat diajukan mandiri lewat portal ini dan langsung diverifikasi petugas loket desa.'
  }
];
