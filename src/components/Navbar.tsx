import React, { useState } from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { UserRole } from '../../src/types';
import { DESA_INFO } from '../../src/data/mockData';
import {
  Building2,
  FileText,
  User,
  Shield,
  Crown,
  LogOut,
  LogIn,
  UserPlus,
  Database,
  Menu,
  X,
  CheckCircle2,
  Phone,
  Clock,
  Compass,
  Home,
  BookOpen,
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  viewMode: 'landing' | 'portal';
  setViewMode: (mode: 'landing' | 'portal') => void;
  onOpenSchemaModal: () => void;
  onOpenAuthModal: (mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  viewMode,
  setViewMode,
  onOpenSchemaModal,
  onOpenAuthModal
}) => {
  const { profile, role, switchDemoRole, logout, firebaseUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Tabs for portal views by role
  const getPortalTabs = () => {
    if (role === 'warga') {
      return [
        { id: 'pengajuan', label: 'Pengajuan Surat', icon: FileText },
        { id: 'riwayat', label: 'Riwayat Pengajuan', icon: CheckCircle2 },
        { id: 'profil', label: 'Profil Saya', icon: User },
        { id: 'pengaturan', label: 'Pengaturan', icon: Shield },
      ];
    } else if (role === 'admin') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: Building2 },
        { id: 'pengajuan', label: 'Kelola Pengajuan', icon: FileText },
        { id: 'penduduk', label: 'Data Penduduk', icon: User },
        { id: 'laporan', label: 'Laporan Mutasi', icon: CheckCircle2 },
        { id: 'akun', label: 'Manajemen Akun', icon: Shield },
      ];
    } else {
      // kades
      return [
        { id: 'dashboard', label: 'Dashboard Eksekutif', icon: Building2 },
        { id: 'laporan', label: 'Laporan Kependudukan', icon: CheckCircle2 },
      ];
    }
  };

  const portalTabs = getPortalTabs();

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'admin':
        return { label: 'Admin Desa', color: 'bg-indigo-700 text-white', icon: Shield };
      case 'kades':
        return { label: 'Kades', color: 'bg-amber-700 text-white', icon: Crown };
      default:
        return { label: 'Warga', color: 'bg-emerald-700 text-white', icon: User };
    }
  };

  const currentRoleBadge = getRoleBadge(role);
  const RoleIcon = currentRoleBadge.icon;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-stone-200">
      {/* 1. TOP OFFICIAL GOVERNMENT UTILITY BAR (Very Authentic Indonesian Civic Portal) */}
      <div className="bg-stone-900 text-stone-300 text-[11px] py-1.5 px-4 sm:px-8 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 truncate">
            <span className="font-semibold text-emerald-400">Pemerintah Kabupaten Bandung</span>
            <span className="hidden md:inline text-stone-600">•</span>
            <span className="hidden md:inline text-stone-300">Kecamatan Rancaekek</span>
            <span className="hidden sm:inline text-stone-600">•</span>
            <span className="hidden sm:inline font-mono text-stone-400">Portal Resmi: bojongloa.desa.id</span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-stone-400">
            <div className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>Senin - Jumat 08:00 - 15:30 WIB</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>{DESA_INFO.telepon}</span>
            </div>
            <button
              onClick={onOpenSchemaModal}
              title="Lihat Rancangan Skema Database Firestore"
              className="hover:text-emerald-300 flex items-center gap-1 text-[11px] font-medium"
            >
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Skema DB</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & IDENTITY BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Identity */}
          <div
            onClick={() => setViewMode('landing')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            {/* Authentic Village / Regency Seal representation */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 flex items-center justify-center text-white shadow-md ring-2 ring-emerald-600/30 group-hover:scale-102 transition-transform">
              <div className="text-center leading-none">
                <span className="block font-black text-sm tracking-wider">DESA</span>
                <span className="block font-extrabold text-[9px] tracking-tight text-emerald-200">BJL</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-stone-900 tracking-tight text-lg sm:text-xl">
                  DESA BOJONGLOA
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hidden sm:inline-block">
                  {DESA_INFO.kodePos}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">
                Kecamatan Rancaekek, Kabupaten Bandung, Jawa Barat
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Beranda Website Desa */}
            <button
              onClick={() => setViewMode('landing')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'landing'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Portal Berita Desa</span>
            </button>

            {/* Portal Arsip Layanan Mandiri */}
            <button
              onClick={() => setViewMode('portal')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                viewMode === 'portal'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Sistem Arsip Kependudukan</span>
            </button>

            {/* If in portal mode, show portal subtabs */}
            {viewMode === 'portal' && (
              <div className="flex items-center pl-2 ml-2 border-l border-stone-200 gap-1">
                {portalTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                        isActive
                          ? 'bg-stone-900 text-white'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </nav>

          {/* Right Action Controls: Role Switcher & Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                title="Ganti Role Pengguna (Warga / Admin / Kades)"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition-all ${currentRoleBadge.color}`}
              >
                <RoleIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{currentRoleBadge.label}</span>
                <span className="text-[10px] opacity-80">▾</span>
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-stone-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Ganti Peran Pengguna (Demo):
                  </div>
                  <button
                    onClick={() => {
                      switchDemoRole('warga');
                      setViewMode('portal');
                      setCurrentTab('pengajuan');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                      role === 'warga' ? 'font-bold text-emerald-800 bg-emerald-50/60' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="font-semibold">Warga Desa</div>
                        <div className="text-[10px] text-stone-400">Pengajuan, Riwayat, Profil</div>
                      </div>
                    </div>
                    {role === 'warga' && <span className="text-emerald-600 font-bold">✓</span>}
                  </button>

                  <button
                    onClick={() => {
                      switchDemoRole('admin');
                      setViewMode('portal');
                      setCurrentTab('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50 ${
                      role === 'admin' ? 'font-bold text-indigo-800 bg-indigo-50/60' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-semibold">Admin Desa</div>
                        <div className="text-[10px] text-stone-400">Verifikasi, Master Data, Akun</div>
                      </div>
                    </div>
                    {role === 'admin' && <span className="text-indigo-600 font-bold">✓</span>}
                  </button>

                  <button
                    onClick={() => {
                      switchDemoRole('kades');
                      setViewMode('portal');
                      setCurrentTab('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50 ${
                      role === 'kades' ? 'font-bold text-amber-800 bg-amber-50/60' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-semibold">Kepala Desa (Kades)</div>
                        <div className="text-[10px] text-stone-400">Dashboard & Laporan Saja</div>
                      </div>
                    </div>
                    {role === 'kades' && <span className="text-amber-600 font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Login / Register Buttons */}
            {profile ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setViewMode('portal');
                    setCurrentTab('profil');
                  }}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {profile.fullName.charAt(0)}
                  </div>
                  <span className="hidden md:inline max-w-[120px] truncate">{profile.fullName}</span>
                </button>

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuthModal('login')}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-100 border border-stone-300 transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-stone-600" />
                  <span>Masuk</span>
                </button>

                <button
                  onClick={() => onOpenAuthModal('register')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Daftar Warga</span>
                  <span className="sm:hidden">Daftar</span>
                </button>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200 space-y-3">
            <div className="flex gap-2 p-1 bg-stone-100 rounded-xl">
              <button
                onClick={() => {
                  setViewMode('landing');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg ${
                  viewMode === 'landing' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-600'
                }`}
              >
                Portal Berita Desa
              </button>
              <button
                onClick={() => {
                  setViewMode('portal');
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg ${
                  viewMode === 'portal' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-600'
                }`}
              >
                Layanan Arsip
              </button>
            </div>

            {viewMode === 'portal' && (
              <div className="space-y-1 pt-2">
                <div className="text-[11px] font-bold text-stone-400 px-3 uppercase">
                  Menu Panel {currentRoleBadge.label}
                </div>
                {portalTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setCurrentTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-emerald-600 text-white' : 'text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
