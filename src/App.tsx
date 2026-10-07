import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { DatabaseSchemaModal } from './components/DatabaseSchemaModal';
import { PengajuanForm } from './components/warga/PengajuanForm';
import { RiwayatPengajuan } from './components/warga/RiwayatPengajuan';
import { ProfilWarga } from './components/warga/ProfilWarga';
import { PengaturanWarga } from './components/warga/PengaturanWarga';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminPengajuan } from './components/admin/AdminPengajuan';
import { AdminDataPenduduk } from './components/admin/AdminDataPenduduk';
import { AdminLaporan } from './components/admin/AdminLaporan';
import { AdminManajemenAkun } from './components/admin/AdminManajemenAkun';
import { KadesDashboard } from './components/kades/KadesDashboard';
import { KadesLaporan } from './components/kades/KadesLaporan';
import { DESA_INFO } from './data/mockData';
import {
  Building2,
  Database,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  ArrowRight,
  Home,
  FileText
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { role, profile } = useAuth();
  const [viewMode, setViewMode] = useState<'landing' | 'portal'>('landing');
  const [currentTab, setCurrentTab] = useState<string>('pengajuan');
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Sync tab when role changes
  useEffect(() => {
    if (role === 'warga') {
      setCurrentTab('pengajuan');
    } else if (role === 'admin') {
      setCurrentTab('dashboard');
    } else if (role === 'kades') {
      setCurrentTab('dashboard');
    }
  }, [role]);

  const handleOpenAuth = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleGoToService = (type?: string) => {
    setViewMode('portal');
    setCurrentTab('pengajuan');
  };

  return (
    <div className="min-h-screen bg-stone-50/70 text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Authentic Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenSchemaModal={() => setSchemaModalOpen(true)}
        onOpenAuthModal={handleOpenAuth}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* LANDING PAGE (Portal Berita Desa bojongloa.desa.id) */}
        {viewMode === 'landing' ? (
          <LandingPage
            onGoToService={handleGoToService}
            onOpenAuth={handleOpenAuth}
          />
        ) : (
          /* PORTAL ARSIP KEPENDUDUKAN */
          <div>
            {/* Top Portal Breadcrumb & Back to Landing */}
            <div className="mb-6 flex items-center justify-between bg-white p-3.5 rounded-2xl border border-stone-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => setViewMode('landing')}
                  className="text-stone-500 hover:text-emerald-700 flex items-center gap-1 font-medium"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Portal Berita Desa</span>
                </button>
                <span className="text-stone-300">/</span>
                <span className="font-bold text-stone-900 capitalize">
                  Panel {role === 'warga' ? 'Layanan Warga' : role === 'admin' ? 'Administrator Desa' : 'Kepala Desa'}
                </span>
                <span className="text-stone-300">/</span>
                <span className="text-emerald-700 font-semibold capitalize">{currentTab.replace('_', ' ')}</span>
              </div>

              <button
                onClick={() => setViewMode('landing')}
                className="text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 px-3 py-1 rounded-lg transition-colors"
              >
                ← Kembali ke Beranda
              </button>
            </div>

            {/* Role Views */}
            {role === 'warga' && (
              <div>
                {currentTab === 'pengajuan' && (
                  <PengajuanForm onSuccess={() => setCurrentTab('riwayat')} />
                )}
                {currentTab === 'riwayat' && <RiwayatPengajuan />}
                {currentTab === 'profil' && <ProfilWarga />}
                {currentTab === 'pengaturan' && <PengaturanWarga />}
              </div>
            )}

            {role === 'admin' && (
              <div>
                {currentTab === 'dashboard' && (
                  <AdminDashboard
                    onNavigateToPengajuan={() => setCurrentTab('pengajuan')}
                    onNavigateToPenduduk={() => setCurrentTab('penduduk')}
                  />
                )}
                {currentTab === 'pengajuan' && <AdminPengajuan />}
                {currentTab === 'penduduk' && <AdminDataPenduduk />}
                {currentTab === 'laporan' && <AdminLaporan />}
                {currentTab === 'akun' && <AdminManajemenAkun />}
              </div>
            )}

            {role === 'kades' && (
              <div>
                {currentTab === 'dashboard' && (
                  <KadesDashboard onNavigateToLaporan={() => setCurrentTab('laporan')} />
                )}
                {currentTab === 'laporan' && <KadesLaporan />}
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER (Authentic Indonesian Village Civic Portal Footer) */}
      <footer className="bg-stone-900 text-stone-300 mt-16 pt-12 pb-8 border-t border-stone-800 print:hidden text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Identity */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm">
                  BJL
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-base">
                    PEMERINTAH DESA BOJONGLOA
                  </h3>
                  <p className="text-[11px] text-stone-400">
                    Kecamatan Rancaekek, Kabupaten Bandung, Provinsi Jawa Barat
                  </p>
                </div>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed max-w-md">
                Sistem Informasi Pengarsipan Kependudukan Resmi dan Layanan Dokumen Mandiri Warga Desa Bojongloa.
                Mewujudkan pelayanan desa yang transparan, akuntabel, dan bebas pungli.
              </p>
              <div className="flex items-center gap-4 text-emerald-400 font-medium pt-1">
                <span className="font-mono">bojongloa.desa.id</span>
                <span>•</span>
                <span>Kode Desa: 32.04.12.2005</span>
              </div>
            </div>

            {/* Kontak Resmi */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-emerald-400">
                Kontak & Pelayanan
              </h4>
              <div className="space-y-2 text-stone-400 text-xs">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{DESA_INFO.kantorDesa}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{DESA_INFO.telepon}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{DESA_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Tautan Cepat */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider text-emerald-400">
                Akses Mandiri
              </h4>
              <ul className="space-y-1.5 text-stone-400">
                <li>
                  <button
                    onClick={() => {
                      setViewMode('landing');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors"
                  >
                    Portal Berita Desa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleGoToService()}
                    className="hover:text-white transition-colors"
                  >
                    Pengajuan Surat Arsip
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="hover:text-white transition-colors"
                  >
                    Masuk Akun Warga / Staf
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setSchemaModalOpen(true)}
                    className="hover:text-emerald-400 transition-colors font-medium text-emerald-400/90"
                  >
                    Rancangan Skema Database
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
            <div>
              Hak Cipta © {new Date().getFullYear()} Pemerintah Desa Bojongloa. Dilindungi Undang-Undang.
            </div>
            <div className="flex items-center gap-3">
              <span>Sistem Kependudukan Terintegrasi Firebase</span>
              <span>•</span>
              <span>Kec. Rancaekek, Kab. Bandung</span>
            </div>
          </div>
        </div>
      </footer>

      {/* AUTH MODAL (Login / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
        onSuccess={() => setViewMode('portal')}
      />

      {/* DATABASE SCHEMA MODAL */}
      <DatabaseSchemaModal
        isOpen={schemaModalOpen}
        onClose={() => setSchemaModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}
