import React, { useState } from 'react';
import { VILLAGE_ARTICLES, DESA_APARATUR, DESA_PENGUMUMAN, VillageArticle } from '../../data/newsArticles';
import { DESA_INFO } from '../../data/mockData';
import {
  FileText,
  Baby,
  HeartCrack,
  ArrowRightLeft,
  Users,
  Building2,
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Bell,
  MapPin,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  X
} from 'lucide-react';

interface LandingPageProps {
  onGoToService: (type?: string) => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGoToService, onOpenAuth }) => {
  const [selectedArticle, setSelectedArticle] = useState<VillageArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Pemerintahan', 'Kependudukan', 'Pembangunan', 'Sosial & Budaya', 'Pemberdayaan'];

  const filteredArticles = activeCategory === 'all'
    ? VILLAGE_ARTICLES
    : VILLAGE_ARTICLES.filter((a) => a.category === activeCategory);

  const featuredArticle = VILLAGE_ARTICLES.find((a) => a.featured) || VILLAGE_ARTICLES[0];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* 1. HERO SECTION (Real Indonesian Village Government Aesthetic) */}
      <section className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-900 text-white">
        {/* Background photo of lush Indonesian rural scenery / village landscape */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80"
            alt="Pemandangan Desa Bojongloa Rancaekek"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-emerald-950/70" />
        </div>

        <div className="relative z-10 p-6 sm:p-12 lg:p-16 max-w-4xl">
          {/* Government Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Portal Resmi Pemerintah Desa Bojongloa • bojongloa.desa.id</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            Pelayanan Publik Prima & Pengarsipan Kependudukan Mandiri
          </h1>

          <p className="mt-4 text-stone-300 text-xs sm:text-base leading-relaxed max-w-2xl">
            Selamat datang di portal resmi Desa Bojongloa, Kecamatan Rancaekek, Kabupaten Bandung.
            Kini warga dapat mengajukan surat keterangan kependudukan (Kelahiran, Kematian, Pindah Datang,
            dan Pindah Keluar) secara mandiri dari mana saja dengan cepat dan transparan.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onGoToService()}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 transition-all hover:translate-y-[-1px]"
            >
              <FileText className="w-4 h-4" />
              <span>Ajukan Surat Kependudukan</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => onOpenAuth('register')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-xs transition-colors"
            >
              Daftar Akun Warga Baru
            </button>

            <a
              href="#berita-desa"
              className="px-4 py-3 rounded-xl text-stone-300 hover:text-white text-xs sm:text-sm font-medium hover:underline flex items-center gap-1.5"
            >
              <span>Kabar & Artikel Desa</span>
              <span>↓</span>
            </a>
          </div>

          {/* Sambutan Kepala Desa Quote Pill */}
          <div className="mt-8 pt-6 border-t border-stone-800 flex items-center gap-4 text-xs text-stone-400">
            <img
              src={DESA_APARATUR[0].foto}
              alt={DESA_APARATUR[0].nama}
              className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/50 shrink-0"
            />
            <div>
              <p className="italic text-stone-300 line-clamp-1">
                "Melayani dengan hati, mewujudkan Desa Bojongloa yang maju, sejahtera, dan melek teknologi."
              </p>
              <p className="font-semibold text-white mt-0.5">
                {DESA_INFO.namaKades} — <span className="text-emerald-400">Kepala Desa Bojongloa</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTIK DEMOGRAFI & WILAYAH LIVE */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">8.420 Jiwa</div>
            <div className="text-xs text-stone-500">Penduduk Terdata</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">2.415 KK</div>
            <div className="text-xs text-stone-500">Kepala Keluarga</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">4 Dusun</div>
            <div className="text-xs text-stone-500">24 RT / 6 RW</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-stone-900">24 Jam</div>
            <div className="text-xs text-stone-500">Layanan Daring Mandiri</div>
          </div>
        </div>
      </section>

      {/* 3. 4 PILAR LAYANAN ARSIP KEPENDUDUKAN */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-3">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Layanan Administrasi Kependudukan
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              Pengurusan Surat Keterangan Desa Daring
            </h2>
          </div>
          <p className="text-xs text-stone-500 sm:max-w-md text-left sm:text-right">
            Pilih surat keterangan yang ingin diajukan. Proses peninjauan berkas dilakukan oleh petugas dalam 1x24 jam kerja.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Kelahiran */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-emerald-500 transition-all group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Baby className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400">REGISTRASI NO. 474.1</span>
                <h3 className="font-bold text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                  Keterangan Kelahiran
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Penerbitan surat pengantar akta lahir bayi yang baru dilahirkan di Desa Bojongloa. Dilampiri surat bidan/RS dan KK orang tua.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100">
              <button
                onClick={() => onGoToService('kelahiran')}
                className="w-full py-2 rounded-xl bg-stone-50 hover:bg-emerald-600 hover:text-white text-stone-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>Ajukan Sekarang</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Kematian */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-emerald-500 transition-all group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
                <HeartCrack className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400">REGISTRASI NO. 474.2</span>
                <h3 className="font-bold text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                  Keterangan Kematian
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Penerbitan surat keterangan meninggal dunia untuk pencoretan data kependudukan, pengurusan akta kematian, atau waris.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100">
              <button
                onClick={() => onGoToService('kematian')}
                className="w-full py-2 rounded-xl bg-stone-50 hover:bg-emerald-600 hover:text-white text-stone-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>Ajukan Sekarang</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pindah Masuk */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-emerald-500 transition-all group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400">REGISTRASI NO. 475.1</span>
                <h3 className="font-bold text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                  Pindah Datang (Masuk)
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Pencatatan warga baru yang berpindah domisili masuk ke Desa Bojongloa dari kabupaten/kota lain membawa SKPWNI.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100">
              <button
                onClick={() => onGoToService('pindah_masuk')}
                className="w-full py-2 rounded-xl bg-stone-50 hover:bg-emerald-600 hover:text-white text-stone-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>Ajukan Sekarang</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pindah Keluar */}
          <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-emerald-500 transition-all group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400">REGISTRASI NO. 475.2</span>
                <h3 className="font-bold text-base text-stone-900 group-hover:text-emerald-700 transition-colors">
                  Pindah Keluar
                </h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Surat keterangan pengantar kepindahan warga dari Desa Bojongloa menuju kecamatan atau daerah luar kabupaten.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-stone-100">
              <button
                onClick={() => onGoToService('pindah_keluar')}
                className="w-full py-2 rounded-xl bg-stone-50 hover:bg-emerald-600 hover:text-white text-stone-800 text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <span>Ajukan Sekarang</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARTIKEL & KABAR BERITA DESA (bojongloa.desa.id) */}
      <section id="berita-desa" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <span>Warta Desa Bojongloa</span>
              <span>•</span>
              <span className="font-mono text-stone-500 lowercase">bojongloa.desa.id/berita</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight mt-0.5">
              Kabar Terkini, Kegiatan & Transparansi Desa
            </h2>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat === 'all' ? 'Semua Berita' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article Card */}
        {activeCategory === 'all' && (
          <div
            onClick={() => setSelectedArticle(featuredArticle)}
            className="cursor-pointer bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-lg transition-all grid grid-cols-1 md:grid-cols-2 group"
          >
            <div className="h-64 sm:h-80 md:h-auto overflow-hidden relative">
              <img
                src={featuredArticle.imageUrl}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                BERITA UTAMA
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold text-emerald-700">{featuredArticle.category}</span>
                  <span>•</span>
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  {featuredArticle.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                  {featuredArticle.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100 text-xs">
                <span className="text-stone-500">Oleh: <strong>{featuredArticle.author}</strong></span>
                <span className="font-bold text-emerald-700 group-hover:underline flex items-center gap-1">
                  Baca Selengkapnya →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="cursor-pointer bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                    {art.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-stone-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {art.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 mt-2">
                <span className="text-[11px] truncate max-w-[150px]">{art.author}</span>
                <span className="font-semibold text-emerald-700 group-hover:underline">
                  Baca Berita →
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. PENGUMUMAN & APARATUR DESA */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Left Column: Pengumuman Warga */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-stone-900 text-base">Pengumuman Resmi</h3>
            </div>
            <span className="text-xs text-stone-400">Terbaru</span>
          </div>

          <div className="space-y-4">
            {DESA_PENGUMUMAN.map((ann) => (
              <div key={ann.id} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {ann.badge}
                  </span>
                  <span className="text-[11px] text-stone-400 font-mono">{ann.date}</span>
                </div>
                <h4 className="font-bold text-stone-900 text-xs">{ann.title}</h4>
                <p className="text-xs text-stone-600 leading-relaxed">{ann.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Layanan Pengaduan & Informasi WhatsApp: <strong>{DESA_INFO.telepon}</strong></span>
          </div>
        </div>

        {/* Right Column: Perangkat & Aparatur Desa Bojongloa */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-stone-900 text-base">Aparatur Pemerintah Desa Bojongloa</h3>
            </div>
            <span className="text-xs text-stone-400">Periode 2021 - 2027</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {DESA_APARATUR.map((ap, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/50 text-center space-y-2">
                <img
                  src={ap.foto}
                  alt={ap.nama}
                  className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-white shadow-xs"
                />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs line-clamp-1">{ap.nama}</h4>
                  <p className="text-[11px] text-emerald-700 font-semibold line-clamp-1">{ap.jabatan}</p>
                  <p className="text-[9px] text-stone-400 font-mono mt-0.5">NIP: {ap.nip}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Visi Misi Desa Quote */}
          <div className="p-4 rounded-xl bg-stone-900 text-white text-xs space-y-1">
            <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">
              Visi Pemerintah Desa Bojongloa
            </div>
            <p className="italic text-stone-300">
              "Terwujudnya Desa Bojongloa yang Religius, Maju, Sejahtera, dan Berkeadaban Berbasis Pelayanan Prima serta Pemanfaatan Teknologi Tepat Guna."
            </p>
          </div>
        </div>
      </section>

      {/* 6. ARTICLE FULL READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full my-8 shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
            <div className="h-64 sm:h-72 overflow-hidden relative">
              <img
                src={selectedArticle.imageUrl}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-900/70 text-white hover:bg-stone-900 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-md shadow-xs">
                {selectedArticle.category}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto max-h-[60vh]">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>Oleh: <strong>{selectedArticle.author}</strong></span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {selectedArticle.title}
                </h2>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-6 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
                <span>Diterbitkan resmi oleh <strong>Pemerintah Desa Bojongloa</strong></span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl font-semibold text-xs"
                >
                  Tutup Artikel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
