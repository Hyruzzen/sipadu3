import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { DESA_INFO } from '../../data/mockData';
import {
  X,
  LogIn,
  UserPlus,
  Shield,
  User,
  Crown,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Building2,
  Lock,
  Mail
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultMode = 'login',
  onSuccess
}) => {
  const { loginWithGoogle, switchDemoRole, updateProfile } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [regData, setRegData] = useState({
    fullName: '',
    nik: '',
    noKk: '',
    email: '',
    password: '',
    phone: '',
    dusun: DESA_INFO.daftarDusun[0],
    rt: '01',
    rw: '01',
    address: 'Desa Bojongloa'
  });

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // Simulate/Authenticate user check
      if (loginEmail.toLowerCase().includes('kades')) {
        switchDemoRole('kades');
      } else if (loginEmail.toLowerCase().includes('admin') || loginEmail === 'ajamjamaludin45@gmail.com') {
        switchDemoRole('admin');
      } else {
        switchDemoRole('warga');
      }

      setSuccessMessage('Berhasil masuk ke portal!');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
        if (onSuccess) onSuccess();
      }, 800);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal masuk. Periksa kembali email dan kata sandi.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    if (regData.nik.length !== 16) {
      setErrorMessage('Nomor NIK harus tepat 16 digit angka sesuai KTP!');
      setLoading(false);
      return;
    }

    try {
      // Register new citizen
      switchDemoRole('warga');
      await updateProfile({
        fullName: regData.fullName,
        nik: regData.nik,
        noKk: regData.noKk,
        email: regData.email,
        phone: regData.phone,
        dusun: regData.dusun,
        rt: regData.rt,
        rw: regData.rw,
        address: `${regData.address}, Dusun ${regData.dusun} RT ${regData.rt}/RW ${regData.rw}`
      });

      setSuccessMessage('Pendaftaran akun warga berhasil! Selamat datang di Portal Desa Bojongloa.');
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
        if (onSuccess) onSuccess();
      }, 1000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal mendaftar. Silakan coba kembali.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      setSuccessMessage('Berhasil masuk dengan akun Google!');
      setTimeout(() => {
        onClose();
        if (onSuccess) onSuccess();
      }, 800);
    } catch (err: any) {
      setErrorMessage(err.message || 'Gagal login dengan Google.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    switchDemoRole(role);
    setSuccessMessage(`Beralih sebagai ${role.toUpperCase()}!`);
    setTimeout(() => {
      onClose();
      if (onSuccess) onSuccess();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              BJL
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-base">
                {mode === 'login' ? 'Masuk ke Portal Desa' : 'Pendaftaran Akun Warga Baru'}
              </h3>
              <p className="text-xs text-stone-500">
                Layanan Arsip Kependudukan Desa Bojongloa, Rancaekek
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-stone-200 bg-white">
          <button
            onClick={() => {
              setMode('login');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              mode === 'login'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/20'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Masuk (Login)
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${
              mode === 'register'
                ? 'border-emerald-600 text-emerald-800 bg-emerald-50/20'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Daftar Warga Baru (Register)
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Alamat Email Terdaftar
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    placeholder="nama@email.com atau NIK"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Masukkan kata sandi..."
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-[11px] text-stone-500">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                  <span>Ingat saya di perangkat ini</span>
                </label>
                <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Silakan hubungi Kasi Pelayanan di Kantor Desa Bojongloa untuk reset kata sandi.'); }} className="text-emerald-700 hover:underline">
                  Lupa kata sandi?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                <span>Masuk ke Layanan</span>
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-200" />
                </div>
                <span className="relative px-3 bg-white text-[11px] text-stone-400">
                  atau masuk menggunakan
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Masuk Akun Google (Firebase Auth)</span>
              </button>

              {/* Demo Mode Shortcuts */}
              <div className="pt-3 border-t border-stone-100">
                <span className="text-[11px] font-semibold text-stone-500 block mb-2">
                  Uji Coba Cepat (Akun Demo Sistem):
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('warga')}
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-center"
                  >
                    <User className="w-3.5 h-3.5 mx-auto mb-1 text-emerald-600" />
                    <div className="font-bold text-[10px]">Warga</div>
                    <div className="text-[9px] text-stone-500">Asep S.</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('admin')}
                    className="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-center"
                  >
                    <Shield className="w-3.5 h-3.5 mx-auto mb-1 text-indigo-600" />
                    <div className="font-bold text-[10px]">Admin Desa</div>
                    <div className="text-[9px] text-stone-500">Kasi Pelayanan</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('kades')}
                    className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-center"
                  >
                    <Crown className="w-3.5 h-3.5 mx-auto mb-1 text-amber-600" />
                    <div className="font-bold text-[10px]">Kades</div>
                    <div className="text-[9px] text-stone-500">H. Maman S.</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Nama Lengkap (Sesuai KTP) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Asep Saepudin"
                  value={regData.fullName}
                  onChange={(e) => setRegData({ ...regData, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    NIK (16 Digit) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="320412..."
                    value={regData.nik}
                    onChange={(e) => setRegData({ ...regData, nik: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    No. KK (16 Digit) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="320412..."
                    value={regData.noKk}
                    onChange={(e) => setRegData({ ...regData, noKk: e.target.value.replace(/\D/g, '') })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl font-mono text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Email Aktif <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="warga@email.com"
                    value={regData.email}
                    onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    No. WhatsApp/HP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="0812..."
                    value={regData.phone}
                    onChange={(e) => setRegData({ ...regData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Kata Sandi Akun <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  value={regData.password}
                  onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Wilayah Dusun di Bojongloa <span className="text-red-500">*</span>
                </label>
                <select
                  value={regData.dusun}
                  onChange={(e) => setRegData({ ...regData, dusun: e.target.value })}
                  className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                >
                  {DESA_INFO.daftarDusun.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">RT</label>
                  <input
                    type="text"
                    placeholder="01"
                    value={regData.rt}
                    onChange={(e) => setRegData({ ...regData, rt: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">RW</label>
                  <input
                    type="text"
                    placeholder="01"
                    value={regData.rw}
                    onChange={(e) => setRegData({ ...regData, rw: e.target.value })}
                    className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Daftar Akun Warga</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
