import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import {
  FileText,
  User,
  Shield,
  Crown,
  LogOut,
  LogIn,
  Database,
  Menu,
  X,
  Building2,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { DESA_INFO } from '../data/mockData';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenSchemaModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenSchemaModal }) => {
  const { profile, role, switchDemoRole, loginWithGoogle, logout, firebaseUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  // Tabs by role
  const getNavTabs = () => {
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

  const tabs = getNavTabs();

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'admin':
        return { label: 'Administrator Desa', color: 'bg-indigo-600 text-white', icon: Shield };
      case 'kades':
        return { label: 'Kepala Desa (Kades)', color: 'bg-amber-600 text-white', icon: Crown };
      default:
        return { label: 'Warga Desa', color: 'bg-emerald-600 text-white', icon: User };
    }
  };

  const currentRoleBadge = getRoleBadge(role);
  const RoleIcon = currentRoleBadge.icon;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Village Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-sm ring-2 ring-emerald-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-900 tracking-tight text-base sm:text-lg">
                  Arsip Desa Bojongloa
                </span>
                <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {DESA_INFO.kecamatan}
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Sistem Informasi Pengarsipan & Layanan Administrasi Kependudukan
              </p>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar: Schema Button, Role Switcher & User Account */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Database Schema Button */}
            <button
              onClick={onOpenSchemaModal}
              title="Lihat Rancangan Skema Database Firestore"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden lg:inline">Rancangan Skema DB</span>
            </button>

            {/* Quick Demo Role Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${currentRoleBadge.color}`}
              >
                <RoleIcon className="w-3.5 h-3.5" />
                <span className="max-w-[110px] truncate">{currentRoleBadge.label}</span>
                <span className="text-[10px] opacity-80">▾</span>
              </button>

              {roleDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-stone-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setRoleDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Ganti Role Demo:
                  </div>
                  <button
                    onClick={() => {
                      switchDemoRole('warga');
                      setCurrentTab('pengajuan');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-emerald-50 ${
                      role === 'warga' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="font-medium">Warga</div>
                        <div className="text-[10px] text-stone-400">Pengajuan, Riwayat, Profil</div>
                      </div>
                    </div>
                    {role === 'warga' && <span className="text-emerald-600 text-xs">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      switchDemoRole('admin');
                      setCurrentTab('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-indigo-50 ${
                      role === 'admin' ? 'font-bold text-indigo-700 bg-indigo-50/50' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-indigo-600" />
                      <div>
                        <div className="font-medium">Admin Desa</div>
                        <div className="text-[10px] text-stone-400">Verifikasi, Master Data, Akun</div>
                      </div>
                    </div>
                    {role === 'admin' && <span className="text-indigo-600 text-xs">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      switchDemoRole('kades');
                      setCurrentTab('dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-amber-50 ${
                      role === 'kades' ? 'font-bold text-amber-700 bg-amber-50/50' : 'text-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-600" />
                      <div>
                        <div className="font-medium">Kepala Desa (Kades)</div>
                        <div className="text-[10px] text-stone-400">Dashboard & Laporan (Read-only)</div>
                      </div>
                    </div>
                    {role === 'kades' && <span className="text-amber-600 text-xs">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Google Login / Account Info */}
            {firebaseUser ? (
              <div className="flex items-center gap-2">
                <div
                  title={firebaseUser.email || profile?.fullName}
                  className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-bold text-xs"
                >
                  {profile?.fullName?.charAt(0) || 'U'}
                </div>
                <button
                  onClick={logout}
                  title="Logout akun"
                  className="p-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                title="Masuk dengan Google (Firebase Auth)"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors border border-stone-200"
              >
                <LogIn className="w-3.5 h-3.5 text-stone-600" />
                <span>Masuk Akun</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-stone-600 hover:text-stone-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-stone-200 space-y-1">
            <div className="px-3 py-1 text-xs font-semibold text-stone-500">
              Navigasi ({currentRoleBadge.label})
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setCurrentTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
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
    </header>
  );
};
