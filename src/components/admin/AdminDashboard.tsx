import React, { useEffect, useState } from 'react';
import { ArchiveService } from '../../services/archiveService';
import { Resident, Submission } from '../../types';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Baby,
  HeartCrack,
  ArrowRightLeft,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Building2
} from 'lucide-react';
import { DESA_INFO } from '../../data/mockData';

interface AdminDashboardProps {
  onNavigateToPengajuan: () => void;
  onNavigateToPenduduk: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigateToPengajuan,
  onNavigateToPenduduk
}) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubSub = ArchiveService.listenSubmissions(undefined, 'admin', (data) => {
      setSubmissions(data);
    });
    const unsubRes = ArchiveService.listenResidents((data) => {
      setResidents(data);
      setLoading(false);
    });

    return () => {
      unsubSub();
      unsubRes();
    };
  }, []);

  const totalPengajuan = submissions.length;
  const menungguCount = submissions.filter((s) => s.status === 'menunggu').length;
  const diprosesCount = submissions.filter((s) => s.status === 'diproses').length;
  const disetujuiCount = submissions.filter((s) => s.status === 'disetujui').length;
  const ditolakCount = submissions.filter((s) => s.status === 'ditolak').length;

  const kelahiranCount = submissions.filter((s) => s.type === 'kelahiran').length;
  const kematianCount = submissions.filter((s) => s.type === 'kematian').length;
  const pindahMasukCount = submissions.filter((s) => s.type === 'pindah_masuk').length;
  const pindahKeluarCount = submissions.filter((s) => s.type === 'pindah_keluar').length;

  const totalPenduduk = residents.length;
  const totalLaki = residents.filter((r) => r.gender === 'L').length;
  const totalPerempuan = residents.filter((r) => r.gender === 'P').length;
  const totalKK = new Set(residents.map((r) => r.noKk)).size;

  const pendingSubmissions = submissions.filter((s) => s.status === 'menunggu');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-stone-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
              Panel Administrator Desa Bojongloa
            </span>
            <span className="text-xs text-indigo-300">• {DESA_INFO.kecamatan}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Dashboard Pengarsipan & Mutasi Kependudukan
          </h1>
          <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-2xl">
            Pantau arus permohonan surat keterangan warga, lakukan tindak lanjut verifikasi berkas, dan
            kelola data kependudukan secara real-time.
          </p>
        </div>

        {menungguCount > 0 && (
          <button
            onClick={onNavigateToPengajuan}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs shadow-md shrink-0 transition-transform hover:scale-102"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>{menungguCount} Pengajuan Perlu Verifikasi Segera</span>
          </button>
        )}
      </div>

      {/* Main KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-medium">Total Pengajuan</span>
            <FileText className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-2xl font-bold text-stone-900">{totalPengajuan}</div>
          <div className="text-[11px] text-stone-400 mt-1">Seluruh jenis arsip</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20 shadow-xs">
          <div className="flex items-center justify-between text-amber-700 mb-2">
            <span className="text-xs font-semibold">Menunggu</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-700">{menungguCount}</div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">Perlu ditindaklanjuti</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20 shadow-xs">
          <div className="flex items-center justify-between text-blue-700 mb-2">
            <span className="text-xs font-semibold">Diproses</span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-blue-700">{diprosesCount}</div>
          <div className="text-[11px] text-blue-600 font-medium mt-1">Dalam pemeriksaan</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
          <div className="flex items-center justify-between text-emerald-700 mb-2">
            <span className="text-xs font-semibold">Disetujui</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">{disetujuiCount}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Surat diterbitkan</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-red-200 bg-red-50/20 shadow-xs">
          <div className="flex items-center justify-between text-red-700 mb-2">
            <span className="text-xs font-semibold">Ditolak</span>
            <XCircle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold text-red-700">{ditolakCount}</div>
          <div className="text-[11px] text-red-600 font-medium mt-1">Ada catatan revisi</div>
        </div>
      </div>

      {/* Demographic and Service Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Population Summary Card */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <h2 className="font-bold text-stone-900 text-sm">Master Penduduk Bojongloa</h2>
            </div>
            <button
              onClick={onNavigateToPenduduk}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Kelola</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Total Jiwa Tercatat</span>
              <span className="text-xl font-bold text-stone-900">{totalPenduduk} Jiwa</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-100">
              <span className="text-[11px] text-stone-500 block">Total Kepala Keluarga</span>
              <span className="text-xl font-bold text-stone-900">{totalKK} KK</span>
            </div>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex justify-between items-center text-stone-600">
              <span>Laki-laki</span>
              <span className="font-bold text-stone-800">{totalLaki} Jiwa ({totalPenduduk ? Math.round((totalLaki / totalPenduduk) * 100) : 0}%)</span>
            </div>
            <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden flex">
              <div
                className="bg-indigo-600 h-full"
                style={{ width: `${totalPenduduk ? (totalLaki / totalPenduduk) * 100 : 50}%` }}
              />
              <div
                className="bg-pink-500 h-full"
                style={{ width: `${totalPenduduk ? (totalPerempuan / totalPenduduk) * 100 : 50}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-stone-600">
              <span>Perempuan</span>
              <span className="font-bold text-stone-800">{totalPerempuan} Jiwa ({totalPenduduk ? Math.round((totalPerempuan / totalPenduduk) * 100) : 0}%)</span>
            </div>
          </div>
        </div>

        {/* Categories of Civil Registry */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-stone-900 text-sm">Rekapitulasi Layanan per Kategori</h2>
            </div>
            <span className="text-xs text-stone-400">Total 4 Jenis Surat Arsip</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
              <div className="flex items-center gap-2 mb-1 text-emerald-700">
                <Baby className="w-4 h-4" />
                <span className="text-xs font-semibold">Kelahiran</span>
              </div>
              <div className="text-xl font-bold text-stone-900">{kelahiranCount}</div>
              <div className="text-[10px] text-stone-500">Surat 474.1</div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-2 mb-1 text-stone-700">
                <HeartCrack className="w-4 h-4" />
                <span className="text-xs font-semibold">Kematian</span>
              </div>
              <div className="text-xl font-bold text-stone-900">{kematianCount}</div>
              <div className="text-[10px] text-stone-500">Surat 474.2</div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
              <div className="flex items-center gap-2 mb-1 text-blue-700">
                <ArrowRightLeft className="w-4 h-4" />
                <span className="text-xs font-semibold">Pindah Masuk</span>
              </div>
              <div className="text-xl font-bold text-stone-900">{pindahMasukCount}</div>
              <div className="text-[10px] text-stone-500">Surat 475.1</div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-100">
              <div className="flex items-center gap-2 mb-1 text-amber-700">
                <ArrowRightLeft className="w-4 h-4" />
                <span className="text-xs font-semibold">Pindah Keluar</span>
              </div>
              <div className="text-xl font-bold text-stone-900">{pindahKeluarCount}</div>
              <div className="text-[10px] text-stone-500">Surat 475.2</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center justify-between">
            <span>Standar Waktu Verifikasi Berkas: <strong>Maks. 24 Jam Kerja</strong></span>
            <span className="text-emerald-700 font-semibold">Semua sistem terhubung Firebase Firestore</span>
          </div>
        </div>
      </div>

      {/* Urgent Pending List Table */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-stone-900 text-base">
              Antrean Permohonan Masuk Menunggu Tindak Lanjut ({pendingSubmissions.length})
            </h2>
          </div>
          <button
            onClick={onNavigateToPengajuan}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>Buka Semua Pengajuan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {pendingSubmissions.length === 0 ? (
          <div className="p-8 text-center text-stone-500">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-stone-800">Semua Permohonan Telah Ditindaklanjuti!</p>
            <p className="text-xs text-stone-400 mt-0.5">Tidak ada antrean pengajuan berstatus 'Menunggu'.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 font-semibold border-b">
                <tr>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Nama Pemohon / Warga</th>
                  <th className="p-3">Jenis Permohonan</th>
                  <th className="p-3">Judul Berkas</th>
                  <th className="p-3 text-right">Aksi Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {pendingSubmissions.slice(0, 5).map((sub) => (
                  <tr key={sub.id} className="hover:bg-stone-50/80">
                    <td className="p-3 text-stone-500 whitespace-nowrap">
                      {new Date(sub.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short'
                      })}
                    </td>
                    <td className="p-3 font-semibold text-stone-900">
                      <div>{sub.userName}</div>
                      <div className="text-[10px] text-stone-400 font-mono">NIK: {sub.userNik}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium capitalize">
                        {sub.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3 text-stone-700 max-w-xs truncate">{sub.title}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={onNavigateToPengajuan}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs"
                      >
                        Verifikasi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
