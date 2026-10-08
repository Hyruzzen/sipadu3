import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArchiveService } from '../../services/archiveService';
import { KabupatenBandungLogo } from '../KabupatenBandungLogo';
import { DESA_INFO } from '../../data/mockData';
import {
  LayoutDashboard,
  FileCheck,
  Users,
  FileText,
  TrendingUp,
  ShieldCheck,
  LogOut,
  LogIn,
  UserPlus,
  Home,
  CheckCircle2,
  Crown,
  User,
  Shield,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  CreditCard,
  KeyRound,
  ExternalLink,
  Phone,
  HelpCircle,
  Building2
} from 'lucide-react';

interface AppSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  viewMode: 'landing' | 'portal' | 'auth';
  setViewMode: (mode: 'landing' | 'portal' | 'auth') => void;
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  isOpen,
  onToggle,
  currentTab,
  setCurrentTab,
  viewMode,
  setViewMode,
  onOpenAuth,
}) => {
  const { profile, role, logout, loginWithNik } = useAuth();
  const [pendingSubmissions, setPendingSubmissions] = useState(0);

  // Listen to pending submissions for admin badge
  useEffect(() => {
    if (role === 'admin') {
      const unsub = ArchiveService.listenSubmissions(undefined, 'admin', (data) => {
        const count = data.filter((s) => s.status === 'menunggu').length;
        setPendingSubmissions(count);
      });
      return () => unsub();
    }
  }, [role]);

  // Quick fill handler for demo logins
  const handleQuickLogin = async (nik: string) => {
    try {
      await loginWithNik(nik, 'password123');
      setViewMode('portal');
      if (nik === '3204121208840001') {
        setCurrentTab('dashboard');
      } else if (nik === '3204121405710001') {
        setCurrentTab('dashboard');
      } else {
        setCurrentTab('pengajuan');
      }
    } catch (e) {
      onOpenAuth('login');
    }
  };

  const getRoleName = () => {
    if (!profile) return 'Tamu';
    if (profile.role === 'admin') return 'Administrator Desa';
    if (profile.role === 'kades') return 'Kepala Desa';
    return 'Warga Bojongloa';
  };

  const getRoleBadgeColor = () => {
    if (role === 'admin') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (role === 'kades') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-blue-100 text-blue-800 border-blue-300';
  };

  return (
    <>
      {/* MOBILE BACKDROP OVERLAY (When sidebar is open on mobile) */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR MAIN CONTAINER */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-stone-200 shadow-xl flex flex-col transition-all duration-300 ease-in-out ${
          isOpen
            ? 'w-72 translate-x-0'
            : '-translate-x-full w-72'
        }`}
      >
        {/* BRAND HEADER & COLLAPSE TOGGLE */}
        <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div
            onClick={() => {
              setViewMode('landing');
              setCurrentTab('beranda');
            }}
            className="flex items-center gap-3 cursor-pointer group overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md p-1.5 shrink-0 group-hover:scale-105 transition-transform">
              <KabupatenBandungLogo className="w-full h-full" />
            </div>

            {isOpen && (
              <div className="overflow-hidden">
                <div className="font-extrabold text-stone-900 text-sm leading-tight tracking-tight truncate">
                  Desa Bojongloa
                </div>
                <div className="text-[10px] text-stone-500 font-medium truncate">
                  Kec. Rancaekek, Bandung
                </div>
              </div>
            )}
          </div>

          {/* Close/Toggle button */}
          <button
            onClick={onToggle}
            title={isOpen ? 'Tutup Sidebar' : 'Buka Sidebar'}
            className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200/80 rounded-xl transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* General Section */}
          <div className="space-y-1">
            {isOpen && (
              <div className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider px-2.5 mb-1.5">
                Portal Utama
              </div>
            )}

            {/* Beranda / Landing Page */}
            <button
              onClick={() => {
                setViewMode('landing');
                setCurrentTab('beranda');
              }}
              title="Portal Berita Desa Bojongloa"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                viewMode === 'landing'
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              } ${!isOpen && 'justify-center px-0'}`}
            >
              <Home
                className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                  viewMode === 'landing' ? 'text-white' : 'text-stone-400 group-hover:text-emerald-700'
                }`}
              />
              {isOpen && <span>Portal Berita & Beranda</span>}
            </button>
          </div>

          {/* ROLE-SPECIFIC MENUS */}
          {profile && (
            <div className="space-y-1">
              {isOpen && (
                <div className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider px-2.5 mb-1.5">
                  {role === 'admin'
                    ? 'Administrasi Desa'
                    : role === 'kades'
                    ? 'Eksekutif Desa'
                    : 'Layanan Warga'}
                </div>
              )}

              {/* WARGA ITEMS */}
              {role === 'warga' && (
                <>
                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('pengajuan');
                    }}
                    title="Pengajuan Surat Mandiri"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'pengajuan'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Pengajuan Surat Mandiri</span>}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('riwayat');
                    }}
                    title="Riwayat Pengajuan Surat"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'riwayat'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Riwayat & Arsip Berkas</span>}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('profil');
                    }}
                    title="Profil Kependudukan Saya"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'profil'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <User className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Profil Kependudukan</span>}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('pengaturan');
                    }}
                    title="Pengaturan Akun"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'pengaturan'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <Shield className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Pengaturan Akun</span>}
                  </button>
                </>
              )}

              {/* ADMIN ITEMS */}
              {role === 'admin' && (
                <>
                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('dashboard');
                    }}
                    title="Dashboard Kependudukan"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'dashboard'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <LayoutDashboard className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Dashboard Kependudukan</span>}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('pengajuan');
                    }}
                    title="Persetujuan Berkas"
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && (currentTab === 'pengajuan' || currentTab === 'persetujuan')
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <div className="flex items-center gap-3">
                      <FileCheck className="w-4 h-4 shrink-0" />
                      {isOpen && <span>Persetujuan Berkas</span>}
                    </div>
                    {isOpen && pendingSubmissions > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
                        {pendingSubmissions}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('penduduk');
                    }}
                    title="Data Master Penduduk"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'penduduk'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <Users className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Data Penduduk</span>}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('pelayanan');
                    }}
                    title="Pelayanan Loket Surat"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'pelayanan'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Pelayanan Surat Loket</span>}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('laporan');
                    }}
                    title="Laporan & Rekapitulasi Mutasi"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'laporan'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <TrendingUp className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Laporan & Mutasi</span>}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('akun');
                    }}
                    title="Manajemen Akun Staf"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'akun'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Manajemen Akun</span>}
                  </button>
                </>
              )}

              {/* KADES ITEMS */}
              {role === 'kades' && (
                <>
                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('dashboard');
                    }}
                    title="Dashboard Eksekutif Kades"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'dashboard'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <Crown className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Dashboard Eksekutif</span>}
                  </button>

                  <button
                    onClick={() => {
                      setViewMode('portal');
                      setCurrentTab('laporan');
                    }}
                    title="Laporan Kependudukan Kades"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      viewMode === 'portal' && currentTab === 'laporan'
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                    } ${!isOpen && 'justify-center px-0'}`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {isOpen && <span>Laporan Kependudukan</span>}
                  </button>
                </>
              )}
            </div>
          )}

          {/* QUICK DEMO ACCOUNTS HELPER (Always accessible when not logged in or switching role) */}
          {isOpen && (
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-500 uppercase tracking-wider px-2 mb-2">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>3 Akun Demo Resmi</span>
              </div>

              <div className="space-y-1.5 text-[11px]">
                {/* Demo Warga */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('3204121503920001')}
                  className="w-full p-2 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-colors flex items-center justify-between group"
                >
                  <div className="overflow-hidden">
                    <div className="font-semibold text-stone-800 text-xs truncate">
                      Asep Saepudin
                    </div>
                    <div className="text-[10px] text-stone-500 flex items-center gap-1">
                      <span className="font-bold text-emerald-700">Warga</span> • NIK 320412...
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold group-hover:translate-x-0.5 transition-transform">
                    Masuk &rarr;
                  </span>
                </button>

                {/* Demo Admin */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('3204121208840001')}
                  className="w-full p-2 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-colors flex items-center justify-between group"
                >
                  <div className="overflow-hidden">
                    <div className="font-semibold text-stone-800 text-xs truncate">
                      Kasi Pelayanan
                    </div>
                    <div className="text-[10px] text-stone-500 flex items-center gap-1">
                      <span className="font-bold text-indigo-700">Admin</span> • NIK 320412...
                    </div>
                  </div>
                  <span className="text-[10px] text-indigo-600 font-bold group-hover:translate-x-0.5 transition-transform">
                    Masuk &rarr;
                  </span>
                </button>

                {/* Demo Kades */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('3204121405710001')}
                  className="w-full p-2 text-left rounded-xl bg-stone-50 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 transition-colors flex items-center justify-between group"
                >
                  <div className="overflow-hidden">
                    <div className="font-semibold text-stone-800 text-xs truncate">
                      H. Maman S.
                    </div>
                    <div className="text-[10px] text-stone-500 flex items-center gap-1">
                      <span className="font-bold text-amber-700">Kades</span> • NIK 320412...
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-600 font-bold group-hover:translate-x-0.5 transition-transform">
                    Masuk &rarr;
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR PALING BAWAH: PROFIL PENGGUNA / STATUS LOGIN */}
        <div className="p-3 border-t border-stone-200 bg-stone-50/90 mt-auto">
          {profile ? (
            /* Profil Pengguna Aktif */
            <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-2xs">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-stone-100">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${getRoleBadgeColor()}`}
                >
                  {getRoleName().toUpperCase()}
                </span>
                <button
                  onClick={logout}
                  title="Keluar dari akun"
                  className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
                  {profile.fullName.charAt(0)}
                </div>
                <div className="overflow-hidden min-w-0 flex-1">
                  <div className="font-bold text-stone-900 text-xs truncate">
                    {profile.fullName}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono truncate">
                    NIK: {profile.nik}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Tamu / Belum Login: Tombol Masuk & Daftar */
            <div className="space-y-2">
              <div className="text-[11px] text-stone-500 font-medium px-1 flex items-center justify-between">
                <span>Akses Layanan Desa:</span>
                <span className="text-[10px] text-emerald-700 font-bold">Portal Warga</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Masuk</span>
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs border border-stone-200 transition-colors shadow-2xs cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Daftar</span>
                </button>
              </div>
            </div>
          )}

          {/* Info Kantor Desa */}
          <div className="mt-2.5 pt-2 border-t border-stone-200/70 flex items-center justify-between text-[10px] text-stone-400">
            <span className="flex items-center gap-1">
              <Building2 className="w-3 h-3 text-stone-400" />
              <span>Desa Bojongloa</span>
            </span>
            <span className="font-mono text-emerald-600 font-bold">Aktif</span>
          </div>
        </div>
      </aside>
    </>
  );
};
