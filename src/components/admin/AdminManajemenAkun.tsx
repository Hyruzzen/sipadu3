import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArchiveService } from '../../services/archiveService';
import { UserProfile, UserRole } from '../../types';
import {
  Shield,
  User,
  Crown,
  Search,
  Plus,
  Edit2,
  CheckCircle,
  AlertCircle,
  Building2
} from 'lucide-react';
import { DESA_INFO } from '../../data/mockData';

export const AdminManajemenAkun: React.FC = () => {
  const { profile: currentAdmin } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Form state for creating staff
  const [newStaff, setNewStaff] = useState({
    fullName: '',
    email: '',
    role: 'admin' as UserRole,
    nik: '320412' + Math.floor(1000000000 + Math.random() * 9000000000),
    phone: '',
    address: 'Kantor Desa Bojongloa'
  });

  const loadUsers = async () => {
    const list = await ArchiveService.getAllUsers();
    if (list.length > 0) {
      setUsers(list);
    } else {
      // Default sample accounts
      setUsers([
        {
          id: 'demo-warga-1',
          email: 'warga.asep@bojongloa.desa.id',
          fullName: 'Asep Saepudin',
          role: 'warga',
          nik: '3204121503920001',
          noKk: '3204120101180001',
          phone: '081234567890',
          dusun: 'Dusun Babakan',
          createdAt: '2025-01-10T08:00:00Z',
          updatedAt: '2025-01-10T08:00:00Z'
        },
        {
          id: 'demo-admin-1',
          email: 'ajamjamaludin45@gmail.com',
          fullName: DESA_INFO.namaKasiPelayanan,
          role: 'admin',
          nik: '3204121208840001',
          phone: '081122334455',
          dusun: 'Dusun Bojongloa Pusat',
          createdAt: '2025-01-01T08:00:00Z',
          updatedAt: '2025-01-01T08:00:00Z'
        },
        {
          id: 'demo-kades-1',
          email: 'kades.bojongloa@desa.id',
          fullName: DESA_INFO.namaKades,
          role: 'kades',
          nik: '3204121405710001',
          phone: '081298765432',
          dusun: 'Dusun Bojongloa Pusat',
          createdAt: '2025-01-01T08:00:00Z',
          updatedAt: '2025-01-01T08:00:00Z'
        }
      ]);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChangeRole = async (userId: string, newRole: UserRole) => {
    const updatedUsers = users.map((u) => (u.id === userId ? { ...u, role: newRole } : u));
    setUsers(updatedUsers);

    const targetUser = updatedUsers.find((u) => u.id === userId);
    if (targetUser) {
      await ArchiveService.saveUserProfile(targetUser);
    }

    setNotification(`Role pengguna berhasil diubah menjadi ${newRole.toUpperCase()}!`);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();
    const newUser: UserProfile = {
      id: 'staff-' + Date.now(),
      email: newStaff.email,
      fullName: newStaff.fullName,
      role: newStaff.role,
      nik: newStaff.nik,
      phone: newStaff.phone,
      address: newStaff.address,
      createdAt: now,
      updatedAt: now
    };

    await ArchiveService.saveUserProfile(newUser);
    setUsers([...users, newUser]);
    setAddModalOpen(false);
    setNotification(`Akun ${newUser.fullName} berhasil ditambahkan!`);
    setTimeout(() => setNotification(null), 2500);
  };

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.nik && u.nik.includes(searchQuery));
    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Manajemen Akun & Hak Akses Pengguna
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Kelola wewenang role sistem (Warga Desa, Administrator Desa, Kepala Desa) untuk otorisasi akses.
          </p>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Akun Staf / Pengguna</span>
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2 text-xs font-semibold animate-in fade-in">
          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: 'all', label: 'Semua Akun' },
            { id: 'warga', label: 'Warga' },
            { id: 'admin', label: 'Admin Desa' },
            { id: 'kades', label: 'Kepala Desa (Kades)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setRoleFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                roleFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari nama, email, NIK..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 text-stone-600 font-semibold border-b">
              <tr>
                <th className="p-3.5">Nama Pengguna</th>
                <th className="p-3.5">Email & Kontak</th>
                <th className="p-3.5">NIK Kependudukan</th>
                <th className="p-3.5">Role Sistem Saat Ini</th>
                <th className="p-3.5 text-right">Ubah Hak Akses Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map((u) => {
                const isCurrentUser = currentAdmin?.id === u.id;
                return (
                  <tr key={u.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-stone-900">{u.fullName}</div>
                      <div className="text-[10px] text-stone-400 font-mono">UID: {u.id}</div>
                    </td>
                    <td className="p-3.5 text-stone-600">
                      <div>{u.email}</div>
                      <div className="text-[11px] text-stone-400">{u.phone || '-'}</div>
                    </td>
                    <td className="p-3.5 font-mono text-stone-700">{u.nik || '-'}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                          u.role === 'admin'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : u.role === 'kades'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        }`}
                      >
                        {u.role === 'admin' && <Shield className="w-3 h-3" />}
                        {u.role === 'kades' && <Crown className="w-3 h-3" />}
                        {u.role === 'warga' && <User className="w-3 h-3" />}
                        <span className="capitalize">{u.role}</span>
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      {isCurrentUser ? (
                        <span className="text-[11px] text-stone-400 italic">Akun Anda Sendiri</span>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleChangeRole(u.id, 'warga')}
                            className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                              u.role === 'warga'
                                ? 'bg-emerald-600 text-white border-emerald-600'
                                : 'bg-white hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            Warga
                          </button>
                          <button
                            onClick={() => handleChangeRole(u.id, 'admin')}
                            className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                              u.role === 'admin'
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            Admin
                          </button>
                          <button
                            onClick={() => handleChangeRole(u.id, 'kades')}
                            className={`px-2 py-1 rounded text-[11px] font-semibold border ${
                              u.role === 'kades'
                                ? 'bg-amber-600 text-white border-amber-600'
                                : 'bg-white hover:bg-stone-100 text-stone-700'
                            }`}
                          >
                            Kades
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD STAFF MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-stone-200 space-y-4">
            <h3 className="font-bold text-stone-900 text-base border-b pb-2">
              Tambah Akun Pengguna / Staf Desa
            </h3>

            <form onSubmit={handleCreateStaff} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Staf / Warga"
                  value={newStaff.fullName}
                  onChange={(e) => setNewStaff({ ...newStaff, fullName: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="nama@bojongloa.desa.id"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Peran Akses (Role)</label>
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as UserRole })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="warga">Warga (Pengajuan & Profil)</option>
                  <option value="admin">Admin Desa (Pengelolaan Arsip Penuh)</option>
                  <option value="kades">Kepala Desa (Dashboard & Laporan Eksekutif)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nomor WhatsApp / HP</label>
                <input
                  type="text"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold"
                >
                  Simpan Akun
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
