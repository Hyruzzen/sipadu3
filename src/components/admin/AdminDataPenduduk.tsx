import React, { useEffect, useState } from 'react';
import { ArchiveService } from '../../services/archiveService';
import { Resident } from '../../types';
import { DESA_INFO } from '../../data/mockData';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Download,
  Filter,
  CheckCircle,
  FileSpreadsheet,
  X
} from 'lucide-react';

export const AdminDataPenduduk: React.FC = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dusunFilter, setDusunFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<Resident, 'id' | 'createdAt' | 'updatedAt'>>({
    nik: '',
    noKk: '',
    fullName: '',
    gender: 'L',
    birthPlace: 'Bandung',
    birthDate: '1995-01-01',
    religion: 'Islam',
    maritalStatus: 'Kawin',
    occupation: 'Wiraswasta',
    dusun: DESA_INFO.daftarDusun[0],
    rt: '01',
    rw: '01',
    address: 'Desa Bojongloa',
    status: 'aktif'
  });

  useEffect(() => {
    const unsubscribe = ArchiveService.listenResidents((data) => {
      setResidents(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredResidents = residents.filter((r) => {
    const matchesDusun = dusunFilter === 'all' || r.dusun === dusunFilter;
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch =
      r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.nik.includes(searchQuery) ||
      r.noKk.includes(searchQuery) ||
      r.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDusun && matchesStatus && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingResident(null);
    setFormData({
      nik: '320412' + Math.floor(1000000000 + Math.random() * 9000000000),
      noKk: '32041201' + Math.floor(10000000 + Math.random() * 90000000),
      fullName: '',
      gender: 'L',
      birthPlace: 'Bandung',
      birthDate: '1995-05-10',
      religion: 'Islam',
      maritalStatus: 'Kawin',
      occupation: 'Wiraswasta',
      dusun: DESA_INFO.daftarDusun[0],
      rt: '01',
      rw: '01',
      address: 'Desa Bojongloa RT 01/RW 01',
      status: 'aktif'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (res: Resident) => {
    setEditingResident(res);
    setFormData({
      nik: res.nik,
      noKk: res.noKk,
      fullName: res.fullName,
      gender: res.gender,
      birthPlace: res.birthPlace,
      birthDate: res.birthDate,
      religion: res.religion,
      maritalStatus: res.maritalStatus,
      occupation: res.occupation,
      dusun: res.dusun,
      rt: res.rt,
      rw: res.rw,
      address: res.address,
      status: res.status
    });
    setModalOpen(true);
  };

  const handleSaveResident = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date().toISOString();

    if (editingResident) {
      await ArchiveService.saveResident({
        ...editingResident,
        ...formData,
        updatedAt: now
      });
    } else {
      const newRes: Resident = {
        ...formData,
        id: 'res-' + Date.now(),
        createdAt: now,
        updatedAt: now
      };
      await ArchiveService.saveResident(newRes);
    }
    setModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    await ArchiveService.deleteResident(id);
    setDeleteConfirmId(null);
  };

  const exportCSV = () => {
    const headers = ['NIK,No KK,Nama Lengkap,Jenis Kelamin,Tempat Lahir,Tanggal Lahir,Agama,Status Kawin,Pekerjaan,Dusun,RT,RW,Status'];
    const rows = filteredResidents.map((r) =>
      `"${r.nik}","${r.noKk}","${r.fullName}","${r.gender}","${r.birthPlace}","${r.birthDate}","${r.religion}","${r.maritalStatus}","${r.occupation}","${r.dusun}","${r.rt}","${r.rw}","${r.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Data_Penduduk_Desa_Bojongloa_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Master Data Kependudukan Desa Bojongloa
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Database arsip resmi kependudukan desa. Total {residents.length} jiwa penduduk tercatat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold border border-stone-200 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Penduduk</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Filter Dusun */}
          <select
            value={dusunFilter}
            onChange={(e) => setDusunFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 focus:outline-hidden"
          >
            <option value="all">Semua Dusun</option>
            {DESA_INFO.daftarDusun.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Filter Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-200 focus:outline-hidden"
          >
            <option value="all">Semua Status</option>
            <option value="aktif">Aktif</option>
            <option value="warga_baru">Warga Baru</option>
            <option value="pindah_keluar">Pindah Keluar</option>
            <option value="meninggal">Meninggal</option>
          </select>
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari NIK, KK, atau Nama..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Residents Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-stone-500">Memuat data master penduduk...</div>
        ) : filteredResidents.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <Users className="w-12 h-12 text-stone-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">Tidak ada data penduduk yang cocok</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-semibold border-b">
                <tr>
                  <th className="p-3">NIK & No KK</th>
                  <th className="p-3">Nama Lengkap & JK</th>
                  <th className="p-3">TTL & Usia</th>
                  <th className="p-3">Alamat / Dusun</th>
                  <th className="p-3">Pekerjaan</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredResidents.map((res) => {
                  const birthYear = parseInt(res.birthDate?.split('-')[0] || '1990');
                  const age = new Date().getFullYear() - birthYear;

                  const statusStyle =
                    res.status === 'aktif'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : res.status === 'meninggal'
                      ? 'bg-stone-100 text-stone-700 border-stone-300'
                      : res.status === 'pindah_keluar'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-blue-50 text-blue-800 border-blue-200';

                  return (
                    <tr key={res.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="p-3 font-mono">
                        <div className="font-bold text-stone-900">{res.nik}</div>
                        <div className="text-[11px] text-stone-400">KK: {res.noKk}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-stone-900 uppercase">{res.fullName}</div>
                        <span className="text-[11px] text-stone-500">
                          {res.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                        </span>
                      </td>
                      <td className="p-3 text-stone-600">
                        <div>{res.birthPlace}, {res.birthDate}</div>
                        <div className="text-[11px] text-stone-400 font-semibold">{age} Tahun</div>
                      </td>
                      <td className="p-3 text-stone-700">
                        <div className="font-medium">{res.dusun}</div>
                        <div className="text-[11px] text-stone-400">RT {res.rt} / RW {res.rw}</div>
                      </td>
                      <td className="p-3 text-stone-600">
                        <div>{res.occupation}</div>
                        <div className="text-[11px] text-stone-400">{res.maritalStatus}</div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border capitalize ${statusStyle}`}>
                          {res.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(res)}
                            title="Edit Data Penduduk"
                            className="p-1.5 rounded-lg text-stone-500 hover:text-indigo-600 hover:bg-indigo-50"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(res.id)}
                            title="Hapus Data Penduduk"
                            className="p-1.5 rounded-lg text-stone-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL: ADD / EDIT RESIDENT */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-stone-900 text-base">
                {editingResident ? 'Ubah Data Penduduk' : 'Tambah Data Penduduk Baru'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-700 text-xl font-bold">
                ×
              </button>
            </div>

            <form onSubmit={handleSaveResident} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Nomor Induk Kependudukan (NIK) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Nomor Kartu Keluarga (KK) *</label>
                  <input
                    type="text"
                    required
                    maxLength={16}
                    value={formData.noKk}
                    onChange={(e) => setFormData({ ...formData, noKk: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'L' | 'P' })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Agama</label>
                  <select
                    value={formData.religion}
                    onChange={(e) => setFormData({ ...formData, religion: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Islam">Islam</option>
                    <option value="Kristen">Kristen</option>
                    <option value="Katolik">Katolik</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Buddha">Buddha</option>
                    <option value="Konghucu">Konghucu</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status Perkawinan</label>
                  <select
                    value={formData.maritalStatus}
                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="Belum Kawin">Belum Kawin</option>
                    <option value="Kawin">Kawin</option>
                    <option value="Cerai Hidup">Cerai Hidup</option>
                    <option value="Cerai Mati">Cerai Mati</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Pekerjaan</label>
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Dusun</label>
                  <select
                    value={formData.dusun}
                    onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
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
                      value={formData.rt}
                      onChange={(e) => setFormData({ ...formData, rt: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">RW</label>
                    <input
                      type="text"
                      value={formData.rw}
                      onChange={(e) => setFormData({ ...formData, rw: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Status Kependudukan</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="aktif">Aktif</option>
                    <option value="warga_baru">Warga Baru</option>
                    <option value="pindah_keluar">Pindah Keluar</option>
                    <option value="meninggal">Meninggal</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-stone-700 mb-1">Alamat Tempat Tinggal</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-xs"
                >
                  Simpan Penduduk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-stone-200 space-y-3">
            <h3 className="font-bold text-stone-900 text-sm">Hapus Rekaman Penduduk?</h3>
            <p className="text-xs text-stone-600">
              Apakah Anda yakin ingin menghapus data penduduk ini dari arsip master kependudukan desa? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 bg-stone-100 text-stone-700 rounded-lg text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold"
              >
                Hapus Permanen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
