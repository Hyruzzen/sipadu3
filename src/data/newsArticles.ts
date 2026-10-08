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
    title: 'Peluncuran Sistem Digitalisasi Pengarsipan Kependudukan Desa Bojongloa',
    slug: 'digitalisasi-arsip-kependudukan-desa-bojongloa',
    category: 'Kependudukan',
    date: '05 Oktober 2026',
    author: 'Redaksi Warta Desa Bojongloa',
    readTime: '3 menit baca',
    featured: true,
    summary: 'Pemerintah Desa Bojongloa resmi mengoperasikan layanan mandiri pengarsipan surat kependudukan secara daring untuk memudahkan warga tanpa perlu antre di kantor desa.',
    content: [
      'Pemerintah Desa Bojongloa, Kecamatan Rancaekek, Kabupaten Bandung secara resmi meluncurkan portal layanan kependudukan digital berbasis web. Inovasi ini digagas guna mempercepat proses pengajuan surat keterangan kelahiran, keterangan kematian, serta mutasi pindah masuk dan keluar wilayah.',
      'Kepala Desa Bojongloa, H. Maman Suryaman, S.Sos., dalam sambutannya di Balai Pertemuan Desa menyampaikan bahwa transformasi pelayanan publik ini bertujuan memangkas birokrasi dan meningkatkan akurasi data kependudukan (SIAK). "Warga kini dapat mengajukan dokumen dari rumah melalui ponsel masing-masing. Berkas langsung diverifikasi oleh Kasi Pelayanan dan terintegrasi dengan database kependudukan desa," tutur beliau.',
      'Selain memudahkan warga, sistem ini juga menyediakan dashboard analitik real-time bagi perangkat desa dan Kepala Desa untuk memantau laju mutasi penduduk, pertumbuhan penduduk alami, dan menerbitkan laporan bulanan serta tahunan kependudukan secara otomatis.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'art-2',
    title: 'Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) Triwulan III Berjalan Tertib',
    slug: 'penyaluran-blt-dana-desa-triwulan-iii',
    category: 'Pemerintahan',
    date: '02 Oktober 2026',
    author: 'Kaur Keuangan Desa Bojongloa',
    readTime: '4 menit baca',
    summary: 'Sebanyak 65 Keluarga Penerima Manfaat (KPM) di Desa Bojongloa telah menerima bantuan tunai untuk mendukung ketahanan pangan dan kesejahteraan keluarga prasejahtera.',
    content: [
      'Bertempat di Aula Kantor Desa Bojongloa, Pemerintah Desa bersama Badan Permusyawaratan Desa (BPD) dan Bhabinkamtibmas menyalurkan Bantuan Langsung Tunai Dana Desa (BLT-DD) untuk periode Triwulan III Tahun 2026.',
      'Penyaluran ini diprioritaskan bagi keluarga rentan, lansia tunggal, dan warga dengan penyakit menahun yang telah diverifikasi melalui Musyawarah Desa Khusus (Musdessus). Setiap penerima manfaat menerima bantuan senilai Rp 300.000 per bulan yang disalurkan secara transparan dan tanpa potongan apa pun.',
      'Kaur Keuangan Desa Bojongloa memastikan seluruh proses administrasi penyerahan bantuan didokumentasikan dan diarsipkan secara akuntabel sebagai bagian dari transparansi pengelolaan APBDes 2026.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'art-3',
    title: 'Gotong Royong Normalisasi Saluran Irigasi Pertanian di Dusun Sukamaju',
    slug: 'gotong-royong-saluran-irigasi-dusun-sukamaju',
    category: 'Pembangunan',
    date: '28 September 2026',
    author: 'Kepala Dusun Sukamaju',
    readTime: '3 menit baca',
    summary: 'Warga bersama Gabungan Kelompok Tani (Gapoktan) membersihkan saluran irigasi tersier sepanjang 1,2 kilometer demi memastikan pasokan air lancar menjelang musim tanam rendeng.',
    content: [
      'Menyambut musim tanam rendeng tahun 2026, ratusan warga Dusun Sukamaju bergotong royong membersihkan endapan lumpur dan gulma pada saluran irigasi tersier yang mengairi lebih dari 45 hektare sawah produktif di Desa Bojongloa.',
      'Kegiatan yang dipimpin langsung oleh Kepala Dusun Sukamaju bersama Ketua RT 01 dan RT 02 ini mencerminkan kearifan lokal gotong royong yang masih terjaga erat di tengah masyarakat pedesaan.',
      '"Irigasi yang lancar adalah urat nadi petani Bojongloa. Dengan kerja bakti ini, kami mengantisipasi genangan air saat hujan lebat sekaligus menjamin pasokan air sampai ke petak sawah paling ujung," ungkap Ketua Gapoktan Bojongloa.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'art-4',
    title: 'Pelaksanaan Posyandu Terintegrasi dan Rembuk Penurunan Stunting di 4 Dusun',
    slug: 'posyandu-dan-rembuk-stunting-desa-bojongloa',
    category: 'Sosial & Budaya',
    date: '24 September 2026',
    author: 'Kader PKK Desa Bojongloa',
    readTime: '4 menit baca',
    summary: 'Pemeriksaan tumbuh kembang balita, imunisasi dasar, serta penyuluhan gizi seimbang digelar rutin oleh Tim Penggerak PKK dan Bidan Desa Bojongloa.',
    content: [
      'Tim Penggerak Pemberdayaan dan Kesejahteraan Keluarga (TP-PKK) Desa Bojongloa bersama Bidan Desa menggelar rangkaian Posyandu Terintegrasi di Balai Dusun Babakan, Dusun Sukamaju, Dusun Cikadu, dan Dusun Bojongloa Pusat.',
      'Kegiatan mencakup penimbangan balita, pengukuran tinggi badan, pemberian vitamin A, imunisasi rutin, serta distribusi Makanan Pendamping ASI (MP-ASI) padat gizi bagi keluarga yang membutuhkan intervensi gizi.',
      'Ketua TP-PKK Desa Bojongloa menyampaikan bahwa kolaborasi antara kader kesehatan, RT/RW, dan Puskesmas Rancaekek berhasil mempertahankan tren penurunan risiko stunting di Desa Bojongloa hingga di bawah 4% pada tahun 2026.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'art-5',
    title: 'Pelatihan Kewirausahaan dan Pemasaran Digital bagi Pelaku UMKM Desa',
    slug: 'pelatihan-umkm-digital-desa-bojongloa',
    category: 'Pemberdayaan',
    date: '18 September 2026',
    author: 'BUMDes Bojongloa Mandiri',
    readTime: '3 menit baca',
    summary: 'Pengrajin anyaman bambu, pembuat makanan olahan keripik, dan pedagang lokal dibekali keterampilan foto produk dan promosi pasar daring.',
    content: [
      'Badan Usaha Milik Desa (BUMDes) Bojongloa Mandiri menyelenggarakan lokakarya pelatihan digital marketing bagi 30 pelaku usaha mikro, kecil, dan menengah (UMKM) se-Desa Bojongloa.',
      'Materi pelatihan difokuskan pada pengemasan produk yang higienis, pendaftaran sertifikasi P-IRT dan Halal, serta pembuatan katalog digital di marketplace dan media sosial.',
      'Melalui program ini, produk unggulan lokal Desa Bojongloa diharapkan dapat menjangkau konsumen yang lebih luas di wilayah Bandung Raya dan sekitarnya.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0a67e5574f73?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'art-6',
    title: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) RKPDes 2027',
    slug: 'musrenbangdes-rkpdes-2027-desa-bojongloa',
    category: 'Pemerintahan',
    date: '12 September 2026',
    author: 'Sekretariat BPD & Tim Penyusun RKPDes',
    readTime: '4 menit baca',
    summary: 'Pemerintah Desa bersama BPD dan perwakilan 4 dusun menetapkan prioritas infrastruktur jalan lingkungan, penguatan Posyandu, dan ketahanan pangan nabati.',
    content: [
      'Pemerintah Desa Bojongloa menyelenggarakan Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) dalam rangka pembahasan dan penetapan Rencana Kerja Pemerintah Desa (RKPDes) Tahun Anggaran 2027.',
      'Acara dihadiri oleh unsur Forkopimcam Rancaekek, Badan Permusyawaratan Desa (BPD), Ketua RT/RW se-Desa Bojongloa, tokoh agama, tokoh pemuda Karang Taruna, dan perwakilan perempuan TP-PKK.',
      'Kepala Desa Bojongloa menegaskan bahwa aspirasi dari masing-masing dusun telah disaring secara transparan. "Fokus alokasi Dana Desa tahun depan adalah penyelesaian drainase pemukiman rawan genangan, rabat beton jalan tani, dan operasional layanan digital kependudukan," pungkas beliau.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'art-7',
    title: 'Penyaluran Cadangan Beras Pemerintah (CBP) Tahap Ketiga bagi 520 KPM',
    slug: 'penyaluran-cadangan-beras-pemerintah-desa-bojongloa',
    category: 'Sosial & Budaya',
    date: '08 September 2026',
    author: 'Puskesos Desa Bojongloa',
    readTime: '3 menit baca',
    summary: 'Sebanyak 5,2 ton beras medium berkualitas disalurkan dengan tertib melalui koordinasi Puskesos dan perangkat kewilayahan di Aula Kantor Desa.',
    content: [
      'Pemerintah Desa Bojongloa melalui Pusat Kesejahteraan Sosial (Puskesos) memfasilitasi pendistribusian Cadangan Beras Pemerintah (CBP) dari Badan Pangan Nasional melalui Perum Bulog.',
      'Setiap Keluarga Penerima Manfaat (KPM) menerima alokasi 10 kilogram beras secara gratis dengan menunjukkan KTP-el dan Kartu Keluarga asli saat pengambilan di kantor desa.',
      'Petugas juga memberikan layanan antar langsung ke rumah (door-to-door) bagi warga lansia terlantar dan penyandang disabilitas berat yang tidak dapat hadir langsung ke lokasi pembagian.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80'
  }
];

export const DESA_APARATUR = [
  {
    nama: 'H. MAMAN SURYAMAN, S.Sos.',
    jabatan: 'Kepala Desa Bojongloa',
    nip: '19710514 199803 1 004',
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
  },
  {
    nama: 'DEDI KURNIADI, S.Pd.',
    jabatan: 'Sekretaris Desa',
    nip: '19790310 200501 1 007',
    foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
  },
  {
    nama: 'ASEP KURNIAWAN, S.A.P.',
    jabatan: 'Kasi Pelayanan (Admin Kependudukan)',
    nip: '19840812 201001 1 008',
    foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
  },
  {
    nama: 'NENG SITI MARYAM, S.E.',
    jabatan: 'Kaur Keuangan',
    nip: '19890215 201402 2 003',
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    nama: 'AGUS SUHENDAR',
    jabatan: 'Kasi Pemerintahan',
    nip: '19860620 201201 1 005',
    foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80'
  }
];

export const DESA_PENGUMUMAN = [
  {
    id: 'ann-1',
    badge: 'Penting',
    title: 'Pelayanan Rekam KTP Elektronik & Pemutakhiran Kartu Keluarga',
    date: '10 - 15 Oktober 2026',
    desc: 'Layanan jemput bola Dinas Kependudukan dan Pencatatan Sipil di Kantor Desa Bojongloa bagi warga berusia 17 tahun ke atas.'
  },
  {
    id: 'ann-2',
    badge: 'Jadwal',
    title: 'Pemberian Makanan Tambahan (PMT) Balita & Lansia Dusun Babakan',
    date: '12 Oktober 2026',
    desc: 'Pukul 08.30 WIB di Posyandu Melati 01 Dusun Babakan RT 02/RW 03.'
  },
  {
    id: 'ann-3',
    badge: 'Sosialisasi',
    title: 'Sosialisasi Aplikasi Pengarsipan Kependudukan Daring Mandiri',
    date: 'Setiap Hari Kerja',
    desc: 'Petugas loket siap mendampingi warga yang ingin mendaftar dan mengajukan surat keterangan kependudukan lewat portal layanan mandiri desa.'
  }
];
