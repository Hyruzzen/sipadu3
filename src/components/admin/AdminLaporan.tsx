import React, { useEffect, useState } from 'react';
import { ArchiveService } from '../../services/archiveService';
import { Resident, Submission } from '../../types';
import { DESA_INFO } from '../../data/mockData';
import {
  FileText,
  Printer,
  Calendar,
  Baby,
  HeartCrack,
  ArrowRightLeft,
  Users,
  Building2,
  TrendingUp,
  Download
} from 'lucide-react';

export const AdminLaporan: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [residents, setResidents] = useState<Resident[]>([]);
  const [reportType, setReportType] = useState<'bulanan' | 'tahunan'>('bulanan');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    ArchiveService.getSubmissions().then(setSubmissions);
    ArchiveService.getResidents().then(setResidents);
  }, []);

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Filter submissions by selected period
  const filteredSubmissions = submissions.filter((s) => {
    const d = new Date(s.createdAt);
    if (reportType === 'bulanan') {
      return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
    } else {
      return d.getFullYear() === selectedYear;
    }
  });

  // Approved civil mutations
  const approvedBirths = filteredSubmissions.filter((s) => s.type === 'kelahiran' && s.status === 'disetujui');
  const approvedDeaths = filteredSubmissions.filter((s) => s.type === 'kematian' && s.status === 'disetujui');
  const approvedInMoves = filteredSubmissions.filter((s) => s.type === 'pindah_masuk' && s.status === 'disetujui');
  const approvedOutMoves = filteredSubmissions.filter((s) => s.type === 'pindah_keluar' && s.status === 'disetujui');

  const netGrowth = approvedBirths.length + approvedInMoves.length - approvedDeaths.length - approvedOutMoves.length;

  // Breakdown per Dusun
  const dusunStats = DESA_INFO.daftarDusun.map((dusun) => {
    const totalDusunResidents = residents.filter((r) => r.dusun === dusun && r.status === 'aktif').length;
    return {
      name: dusun,
      total: totalDusunResidents,
      kk: new Set(residents.filter((r) => r.dusun === dusun).map((r) => r.noKk)).size
    };
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header and Controls (Hidden on print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            Laporan Kependudukan & Mutasi Warga
          </h1>
          <p className="text-xs sm:text-sm text-stone-500">
            Rekapitulasi berkas arsip kependudukan Desa Bojongloa (Kelahiran, Kematian, Pindah Masuk & Keluar).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
            <button
              onClick={() => setReportType('bulanan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                reportType === 'bulanan' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Laporan Bulanan
            </button>
            <button
              onClick={() => setReportType('tahunan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                reportType === 'tahunan' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Laporan Tahunan
            </button>
          </div>

          {/* Month selector */}
          {reportType === 'bulanan' && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-800 focus:outline-hidden"
            >
              {months.map((m, idx) => (
                <option key={idx} value={idx}>{m}</option>
              ))}
            </select>
          )}

          {/* Year selector */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-200 text-stone-800 focus:outline-hidden"
          >
            {[2024, 2025, 2026, 2027].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak / Cetak PDF</span>
          </button>
        </div>
      </div>

      {/* Official Report Document Frame (Styled for print & screen) */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-10 shadow-xs space-y-6 font-sans">
        {/* Kop Laporan Resmi */}
        <div className="text-center border-b-2 border-stone-800 pb-4 mb-4">
          <h3 className="font-bold uppercase text-xs tracking-wider text-stone-700">
            PEMERINTAH KABUPATEN BANDUNG • KECAMATAN RANCAEKEK
          </h3>
          <h2 className="font-extrabold uppercase text-lg sm:text-xl text-stone-900 mt-0.5">
            LAPORAN REKAPITULASI ARSIP & MUTASI KEPENDUDUKAN DESA BOJONGLOA
          </h2>
          <p className="text-xs font-semibold text-stone-600 mt-1">
            Periode:{' '}
            <span className="font-bold underline uppercase">
              {reportType === 'bulanan'
                ? `Bulan ${months[selectedMonth]} Tahun ${selectedYear}`
                : `Tahun Anggaran ${selectedYear}`}
            </span>
          </p>
        </div>

        {/* Mutation Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-800 text-xs font-semibold mb-1">
              <Baby className="w-4 h-4" />
              <span>Kelahiran</span>
            </div>
            <div className="text-2xl font-black text-emerald-900">{approvedBirths.length}</div>
            <div className="text-[10px] text-emerald-700">Jiwa Bertambah</div>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 text-center">
            <div className="flex items-center justify-center gap-1 text-stone-700 text-xs font-semibold mb-1">
              <HeartCrack className="w-4 h-4" />
              <span>Kematian</span>
            </div>
            <div className="text-2xl font-black text-stone-900">{approvedDeaths.length}</div>
            <div className="text-[10px] text-stone-500">Jiwa Berkurang</div>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 text-center">
            <div className="flex items-center justify-center gap-1 text-blue-800 text-xs font-semibold mb-1">
              <ArrowRightLeft className="w-4 h-4" />
              <span>Pindah Datang</span>
            </div>
            <div className="text-2xl font-black text-blue-900">{approvedInMoves.length}</div>
            <div className="text-[10px] text-blue-700">Warga Masuk</div>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-800 text-xs font-semibold mb-1">
              <ArrowRightLeft className="w-4 h-4" />
              <span>Pindah Keluar</span>
            </div>
            <div className="text-2xl font-black text-amber-900">{approvedOutMoves.length}</div>
            <div className="text-[10px] text-amber-700">Warga Keluar</div>
          </div>
        </div>

        {/* Growth Metric */}
        <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-semibold text-stone-700">Laju Pertumbuhan Penduduk Bersih Periode Ini:</span>
            <span className="font-bold ml-2 text-stone-900">
              {netGrowth >= 0 ? `+${netGrowth}` : netGrowth} Jiwa
            </span>
          </div>
          <div className="text-stone-500">
            Total Seluruh Penduduk Aktif Saat Ini: <strong>{residents.filter((r) => r.status === 'aktif').length} Jiwa</strong>
          </div>
        </div>

        {/* Table 1: Rekapitulasi per Dusun */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-stone-800">
            A. Rekapitulasi Kependudukan Berdasarkan Wilayah Dusun
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
              <thead className="bg-stone-100 text-stone-700 font-semibold border-b">
                <tr>
                  <th className="p-2.5">No</th>
                  <th className="p-2.5">Nama Dusun</th>
                  <th className="p-2.5 text-center">Jumlah Kepala Keluarga</th>
                  <th className="p-2.5 text-center">Jumlah Jiwa Penduduk</th>
                  <th className="p-2.5 text-center">Persentase</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {dusunStats.map((d, idx) => {
                  const totalAktif = residents.filter((r) => r.status === 'aktif').length || 1;
                  const pct = Math.round((d.total / totalAktif) * 100);
                  return (
                    <tr key={idx} className="hover:bg-stone-50">
                      <td className="p-2.5 text-stone-500">{idx + 1}</td>
                      <td className="p-2.5 font-bold text-stone-900">{d.name}</td>
                      <td className="p-2.5 text-center">{d.kk} KK</td>
                      <td className="p-2.5 text-center font-semibold">{d.total} Jiwa</td>
                      <td className="p-2.5 text-center">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table 2: Rincian Surat Keterangan Diterbitkan */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-stone-800">
            B. Daftar Surat Keterangan Kependudukan yang Disahkan pada Periode Ini
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
              <thead className="bg-stone-100 text-stone-700 font-semibold border-b">
                <tr>
                  <th className="p-2.5">Nomor Registrasi Surat</th>
                  <th className="p-2.5">Jenis Arsip</th>
                  <th className="p-2.5">Nama Warga Pemohon</th>
                  <th className="p-2.5">Tanggal Terbit</th>
                  <th className="p-2.5">Petugas Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredSubmissions.filter((s) => s.status === 'disetujui').length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-stone-400 italic">
                      Tidak ada penerbitan surat resmi pada periode terpilih.
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions
                    .filter((s) => s.status === 'disetujui')
                    .map((sub) => (
                      <tr key={sub.id} className="hover:bg-stone-50">
                        <td className="p-2.5 font-mono font-bold text-emerald-800">
                          {sub.suratNumber || sub.id}
                        </td>
                        <td className="p-2.5 capitalize">{sub.type.replace('_', ' ')}</td>
                        <td className="p-2.5 font-semibold text-stone-900">{sub.userName}</td>
                        <td className="p-2.5 text-stone-600">
                          {new Date(sub.updatedAt).toLocaleDateString('id-ID')}
                        </td>
                        <td className="p-2.5 text-stone-600">{sub.approvedBy || DESA_INFO.namaKasiPelayanan}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Signatures for Official Village Document */}
        <div className="grid grid-cols-2 gap-8 pt-8 text-xs text-center border-t border-stone-200">
          <div>
            <p>Mengetahui,</p>
            <p className="font-bold mt-1">KEPALA DESA BOJONGLOA</p>
            <div className="h-16 flex items-center justify-center italic text-stone-400">
              (Tanda Tangan & Cap Stempel)
            </div>
            <p className="font-bold underline uppercase">{DESA_INFO.namaKades}</p>
            <p className="text-stone-500">NIP. {DESA_INFO.nipKades}</p>
          </div>

          <div>
            <p>Bojongloa, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            <p className="font-bold mt-1">KASI PELAYANAN DESA BOJONGLOA</p>
            <div className="h-16 flex items-center justify-center italic text-stone-400">
              (Tanda Tangan Petugas)
            </div>
            <p className="font-bold underline uppercase">{DESA_INFO.namaKasiPelayanan}</p>
            <p className="text-stone-500">NIP. {DESA_INFO.nipKasi}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
