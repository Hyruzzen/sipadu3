import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
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
import { Building2, Shield, Database, Lock, HeartHandshake } from 'lucide-react';

const MainContent: React.FC = () => {
  const { role } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('pengajuan');
  const [schemaModalOpen, setSchemaModalOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-stone-50/70 text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenSchemaModal={() => setSchemaModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Warga Role Views */}
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

        {/* Admin Role Views */}
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

        {/* Kades Role Views */}
        {role === 'kades' && (
          <div>
            {currentTab === 'dashboard' && (
              <KadesDashboard onNavigateToLaporan={() => setCurrentTab('laporan')} />
            )}
            {currentTab === 'laporan' && <KadesLaporan />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-12 py-8 text-xs text-stone-500 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
              BJL
            </div>
            <div>
              <div className="font-semibold text-stone-800">
                Pemerintah Desa Bojongloa • {DESA_INFO.kecamatan}
              </div>
              <div className="text-[11px] text-stone-400">
                Sistem Informasi Pengarsipan Kependudukan & Layanan Surat Mandiri
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <button
              onClick={() => setSchemaModalOpen(true)}
              className="text-emerald-700 hover:underline font-semibold flex items-center gap-1"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Skema Database Firestore</span>
            </button>
            <span>•</span>
            <span>Firebase Auth + Storage</span>
            <span>•</span>
            <span>Hak Cipta © {new Date().getFullYear()} Desa Bojongloa</span>
          </div>
        </div>
      </footer>

      {/* Database Schema Visualizer Modal */}
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
