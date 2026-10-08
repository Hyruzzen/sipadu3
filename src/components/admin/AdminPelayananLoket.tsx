import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ArchiveService } from '../../services/archiveService';
import { Resident, Submission, SubmissionType } from '../../types';
import { DESA_INFO } from '../../data/mockData';
import { OfficialLetterModal } from '../OfficialLetterModal';
import {
  FileText,
  Printer,
  CheckCircle2,
  Search,
  User,
  Plus,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building,
  RotateCcw
} from 'lucide-react';

export const AdminPelayananLoket: React.FC = () => {
  const { profile } = useAuth();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [searchNikOrName, setSearchNikOrName] = useState('');
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [letterType, setLetterType] = useState<SubmissionType>('kelahiran');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSubmission, setSuccessSubmission] = useState<Submission | null>(null);
  const [printModalOpen, setPrintModalOpen] = useState(false);

  // Form details specific to letter types
  const [detailsForm, setDetailsForm] = useState<any>({
    // General purpose / keperluan
    keperluan: 'Kelengkapan Administrasi Kependudukan',
    keteranganTambahan: '',
    
    // Kelahiran
    namaBayi: '',
    jenisKelaminBayi: 'L',
    tempatLahirBayi: 'Puskesmas Bojongloa',
    tanggalLahirBayi: new Date().toISOString().split('T')[0],
    jamLahirBayi: '08:00',
    namaAyah: '',
    nikAyah: '',
    namaIbu: '',
    nikIbu: '',
    anakKe: '1',
    beratBayiKg: '3.2',
    panjangBayiCm: '49',
    penolongKelahiran: 'Bidan Desa',

    // Kematian
    namaAlmarhum: '',
    nikAlmarhum: '',
    jenisKelaminAlmarhum: 'L',
    umurAlmarhum: '65',
    tanggalKematian: new Date().toISOString().split('T')[0],
    jamKematian: '06:00',
    tempatKematian: 'Rumah Duka Desa Bojongloa',
    sebabKematian: 'Sakit / Usia Lanjut',
    namaPelapor: '',
    hubunganPelapor: 'Anak Kandung',

    // Pindah Masuk
    namaKepalaKeluargaMasuk: '',
    nikKepalaKeluargaMasuk: '',
    alamatAsal: 'Jl. Raya Cileunyi No. 12',
    desaAsal: 'Cileunyi Kulon',
    kecamatanAsal: 'Cileunyi',
    kabupatenAsal: 'Kabupaten Bandung',
    alasanPindahMasuk: 'Pekerjaan / Tempat Tinggal Baru',
    dusunTujuan: DESA_INFO.daftarDusun[0],
    rtTujuan: '01',
    rwTujuan: '01',
    jumlahPengikutMasuk: '1',

    // Pindah Keluar
    namaKepalaKeluargaKeluar: '',
    nikKepalaKeluargaKeluar: '',
    alamatTujuan: 'Jl. Soekarno Hatta No. 45',
    desaTujuan: 'Batununggal',
    kecamatanTujuan: 'Bandung Kidul',
    kabupatenTujuan: 'Kota Bandung',
    alasanPindahKeluar: 'Pindah Domisili Keluarga',
    jumlahPengikutKeluar: '1',
    jenisKepindahan: 'Kepala Keluarga dan Seluruh Anggota'
  });

  useEffect(() => {
    ArchiveService.getResidents().then((data) => setResidents(data));
  }, []);

  const filteredResidents = residents.filter((r) => {
    if (!searchNikOrName.trim()) return false;
    const q = searchNikOrName.toLowerCase();
    return r.fullName.toLowerCase().includes(q) || r.nik.includes(q) || r.noKk.includes(q);
  }).slice(0, 5);

  const handleSelectResident = (r: Resident) => {
    setSelectedResident(r);
    setSearchNikOrName('');
    // Auto-fill available details based on resident
    setDetailsForm((prev: any) => ({
      ...prev,
      namaPelapor: r.fullName,
      namaAyah: r.gender === 'L' ? r.fullName : prev.namaAyah,
      nikAyah: r.gender === 'L' ? r.nik : prev.nikAyah,
      namaIbu: r.gender === 'P' ? r.fullName : prev.namaIbu,
      nikIbu: r.gender === 'P' ? r.nik : prev.nikIbu,
      namaKepalaKeluargaKeluar: r.fullName,
      nikKepalaKeluargaKeluar: r.nik,
      namaKepalaKeluargaMasuk: r.fullName,
      nikKepalaKeluargaMasuk: r.nik
    }));
  };

  const handleSubmitPelayanan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResident && letterType !== 'pindah_masuk') {
      alert('Silakan pilih data penduduk pemohon terlebih dahulu!');
      return;
    }

    setIsSubmitting(true);
    try {
      const applicantName = selectedResident ? selectedResident.fullName : detailsForm.namaKepalaKeluargaMasuk || 'Warga Pindah Datang';
      const applicantNik = selectedResident ? selectedResident.nik : detailsForm.nikKepalaKeluargaMasuk || '3204120000000000';
      const applicantEmail = `${applicantNik}@bojongloa.desa.id`;
      const applicantUserId = selectedResident?.id || `loket-${Date.now()}`;

      // Build structured details
      let finalDetails: any = {};
      let title = '';

      if (letterType === 'kelahiran') {
        title = `Surat Keterangan Kelahiran - ${detailsForm.namaBayi || 'Bayi Baru'}`;
        finalDetails = {
          namaBayi: detailsForm.namaBayi,
          jenisKelaminBayi: detailsForm.jenisKelaminBayi,
          tempatLahir: detailsForm.tempatLahirBayi,
          tanggalLahir: detailsForm.tanggalLahirBayi,
          jamLahir: detailsForm.jamLahirBayi,
          namaAyah: detailsForm.namaAyah || applicantName,
          nikAyah: detailsForm.nikAyah || applicantNik,
          namaIbu: detailsForm.namaIbu,
          nikIbu: detailsForm.nikIbu,
          anakKe: detailsForm.anakKe,
          beratBayiKg: detailsForm.beratBayiKg,
          panjangBayiCm: detailsForm.panjangBayiCm,
          penolongKelahiran: detailsForm.penolongKelahiran,
          diterbitkanDiLoket: true
        };
      } else if (letterType === 'kematian') {
        title = `Surat Keterangan Kematian - ${detailsForm.namaAlmarhum || selectedResident?.fullName}`;
        finalDetails = {
          namaAlmarhum: detailsForm.namaAlmarhum || selectedResident?.fullName,
          nikAlmarhum: detailsForm.nikAlmarhum || selectedResident?.nik,
          jenisKelamin: detailsForm.jenisKelaminAlmarhum,
          umur: detailsForm.umurAlmarhum,
          tanggalKematian: detailsForm.tanggalKematian,
          jamKematian: detailsForm.jamKematian,
          tempatKematian: detailsForm.tempatKematian,
          sebabKematian: detailsForm.sebabKematian,
          namaPelapor: detailsForm.namaPelapor || applicantName,
          hubunganPelapor: detailsForm.hubunganPelapor,
          diterbitkanDiLoket: true
        };
      } else if (letterType === 'pindah_masuk') {
        title = `Surat Keterangan Pindah Datang - ${detailsForm.namaKepalaKeluargaMasuk || applicantName}`;
        finalDetails = {
          namaKepalaKeluarga: detailsForm.namaKepalaKeluargaMasuk || applicantName,
          nikPemohon: detailsForm.nikKepalaKeluargaMasuk || applicantNik,
          alamatAsal: detailsForm.alamatAsal,
          desaAsal: detailsForm.desaAsal,
          kecamatanAsal: detailsForm.kecamatanAsal,
          kabupatenAsal: detailsForm.kabupatenAsal,
          alasanPindah: detailsForm.alasanPindahMasuk,
          alamatTujuanBojongloa: `Dusun ${detailsForm.dusunTujuan} RT ${detailsForm.rtTujuan}/RW ${detailsForm.rwTujuan}`,
          rtTujuan: detailsForm.rtTujuan,
          rwTujuan: detailsForm.rwTujuan,
          dusunTujuan: detailsForm.dusunTujuan,
          jumlahPengikut: detailsForm.jumlahPengikutMasuk,
          diterbitkanDiLoket: true
        };
      } else {
        // pindah_keluar
        title = `Surat Keterangan Pindah Keluar - ${applicantName}`;
        finalDetails = {
          namaKepalaKeluarga: detailsForm.namaKepalaKeluargaKeluar || applicantName,
          nikPemohon: detailsForm.nikKepalaKeluargaKeluar || applicantNik,
          alamatAsalBojongloa: selectedResident?.address || 'Desa Bojongloa',
          rtAsal: selectedResident?.rt || '01',
          rwAsal: selectedResident?.rw || '01',
          dusunAsal: selectedResident?.dusun || DESA_INFO.daftarDusun[0],
          alamatTujuan: detailsForm.alamatTujuan,
          desaTujuan: detailsForm.desaTujuan,
          kecamatanTujuan: detailsForm.kecamatanTujuan,
          kabupatenTujuan: detailsForm.kabupatenTujuan,
          alasanPindah: detailsForm.alasanPindahKeluar,
          jumlahPengikut: detailsForm.jumlahPengikutKeluar,
          jenisKepindahan: detailsForm.jenisKepindahan,
          diterbitkanDiLoket: true
        };
      }

      // Generate official nomor surat directly
      const randomSeq = Math.floor(10 + Math.random() * 90);
      const generatedSuratNumber = ArchiveService.generateSuratNumber(letterType, randomSeq);

      // Save directly to submissions as disetujui (Official Walk-in Service)
      const newSubmission: Submission = {
        id: `loket-${Date.now()}`,
        userId: applicantUserId,
        userEmail: applicantEmail,
        userName: applicantName,
        userNik: applicantNik,
        userPhone: selectedResident ? '081234567890' : '',
        type: letterType,
        status: 'disetujui',
        title,
        details: JSON.stringify(finalDetails),
        attachments: JSON.stringify([
          { name: 'Pelayanan_Loket_Desa.pdf', type: 'Surat Resmi Loket', url: '#' }
        ]),
        suratNumber: generatedSuratNumber,
        approvedBy: profile?.fullName || DESA_INFO.namaKasiPelayanan,
        approvedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await ArchiveService.createSubmission(newSubmission);

      // If Kelahiran or Kematian or Pindah, optionally update master residents
      if (letterType === 'kelahiran' && detailsForm.namaBayi) {
        const nowIso = new Date().toISOString();
        await ArchiveService.saveResident({
          id: 'res-' + Date.now(),
          nik: '320412' + Math.floor(1000000000 + Math.random() * 9000000000),
          noKk: selectedResident?.noKk || '3204120101000000',
          fullName: detailsForm.namaBayi,
          gender: detailsForm.jenisKelaminBayi,
          birthPlace: detailsForm.tempatLahirBayi,
          birthDate: detailsForm.tanggalLahirBayi,
          religion: 'Islam',
          maritalStatus: 'Belum Kawin',
          occupation: 'Belum/Tidak Bekerja',
          dusun: selectedResident?.dusun || DESA_INFO.daftarDusun[0],
          rt: selectedResident?.rt || '01',
          rw: selectedResident?.rw || '01',
          address: selectedResident?.address || 'Desa Bojongloa',
          status: 'warga_baru',
          createdAt: nowIso,
          updatedAt: nowIso
        });
      } else if (letterType === 'kematian' && selectedResident) {
        await ArchiveService.saveResident({
          ...selectedResident,
          status: 'meninggal'
        });
      } else if (letterType === 'pindah_keluar' && selectedResident) {
        await ArchiveService.saveResident({
          ...selectedResident,
          status: 'pindah_keluar'
        });
      }

      setSuccessSubmission(newSubmission);
      setPrintModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat membuat surat di loket pelayanan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSelectedResident(null);
    setSuccessSubmission(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-100 border border-emerald-400/30">
              Loket Pelayanan Desa Bojongloa
            </span>
            <span className="text-xs text-emerald-200">• Penerbitan Surat Cepat</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Pelayanan Surat Mandiri & Walk-in Warga
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
            Layanan cepat untuk warga yang datang langsung ke Kantor Desa. Pilih nama warga dari Master Kependudukan,
            sistem akan langsung menerbitkan nomor surat resmi dan mencetak dokumen seketika.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-emerald-900/60 border border-emerald-400/40 rounded-xl p-3 text-xs text-emerald-100 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-300 shrink-0" />
            <div>
              <div className="font-bold text-white">Standar Kemendagri</div>
              <div className="text-[11px] text-emerald-200">Format surat resmi baku</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Resident Picker & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Cari / Pilih Penduduk */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-stone-900 text-sm">Pilih Warga Pemohon</h2>
            </div>
            {selectedResident && (
              <button
                type="button"
                onClick={handleResetForm}
                className="text-[11px] font-semibold text-stone-500 hover:text-red-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Ganti Warga
              </button>
            )}
          </div>

          {!selectedResident ? (
            <div className="space-y-3">
              <p className="text-xs text-stone-500">
                Ketik NIK, Nomor KK, atau Nama Warga yang datang ke loket:
              </p>
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Cari NIK / Nama Warga..."
                  value={searchNikOrName}
                  onChange={(e) => setSearchNikOrName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-stone-300 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>

              {filteredResidents.length > 0 ? (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Hasil Pencarian ({filteredResidents.length}):
                  </span>
                  {filteredResidents.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleSelectResident(r)}
                      className="w-full text-left p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all text-xs group"
                    >
                      <div className="font-bold text-stone-800 group-hover:text-emerald-800">
                        {r.fullName}
                      </div>
                      <div className="text-[11px] text-stone-500 font-mono">
                        NIK: {r.nik}
                      </div>
                      <div className="text-[10px] text-stone-400 mt-1">
                        {r.dusun} • RT {r.rt}/RW {r.rw}
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchNikOrName.trim().length > 0 ? (
                <div className="p-4 text-center text-xs text-stone-500 bg-stone-50 rounded-xl">
                  Tidak ditemukan warga dengan kata kunci tersebut.
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-stone-400 bg-stone-50 rounded-xl">
                  Ketik minimal 2 karakter untuk mencari warga.
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white">
                  PEMOHON TERPILIH
                </span>
                <span className="text-[11px] font-mono text-emerald-800 font-bold">
                  RT {selectedResident.rt}/RW {selectedResident.rw}
                </span>
              </div>
              <div>
                <div className="font-extrabold text-stone-900 text-sm">
                  {selectedResident.fullName}
                </div>
                <div className="font-mono text-xs text-stone-600 mt-0.5">
                  NIK: {selectedResident.nik}
                </div>
                <div className="font-mono text-[11px] text-stone-500">
                  No KK: {selectedResident.noKk}
                </div>
              </div>
              <div className="pt-2 border-t border-emerald-200/60 text-stone-600 space-y-1">
                <div>TTL: {selectedResident.birthPlace}, {selectedResident.birthDate}</div>
                <div>Alamat: {selectedResident.address}</div>
                <div>Status: <span className="capitalize font-semibold text-emerald-800">{selectedResident.status}</span></div>
              </div>
            </div>
          )}

          {/* Shortcut to types */}
          <div className="pt-3 border-t border-stone-200">
            <span className="text-[11px] font-bold text-stone-600 block mb-2">
              Pilih Jenis Surat yang Diterbitkan:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'kelahiran', label: 'Kelahiran', code: '474.1' },
                { type: 'kematian', label: 'Kematian', code: '474.2' },
                { type: 'pindah_masuk', label: 'Pindah Masuk', code: '475.1' },
                { type: 'pindah_keluar', label: 'Pindah Keluar', code: '475.2' }
              ].map((item) => (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => setLetterType(item.type as SubmissionType)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    letterType === item.type
                      ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
                  }`}
                >
                  <div className="font-semibold">{item.label}</div>
                  <div className={`text-[10px] ${letterType === item.type ? 'text-emerald-100' : 'text-stone-400'}`}>
                    Surat {item.code}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Form Pelayanan Sesuai Jenis Surat */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              <h2 className="font-bold text-stone-900 text-sm">
                Formulir Penerbitan Surat: {letterType.replace('_', ' ').toUpperCase()}
              </h2>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Format Resmi 2026
            </span>
          </div>

          <form onSubmit={handleSubmitPelayanan} className="space-y-4 text-xs">
            {/* Form Fields: Kelahiran */}
            {letterType === 'kelahiran' && (
              <div className="space-y-3.5 animate-in fade-in">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium text-stone-700">
                  Data Bayi yang Dilahirkan
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nama Lengkap Bayi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Muhammad Rayhan"
                      value={detailsForm.namaBayi}
                      onChange={(e) => setDetailsForm({ ...detailsForm, namaBayi: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Jenis Kelamin Bayi <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={detailsForm.jenisKelaminBayi}
                      onChange={(e) => setDetailsForm({ ...detailsForm, jenisKelaminBayi: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                    >
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Tempat Lahir</label>
                    <input
                      type="text"
                      value={detailsForm.tempatLahirBayi}
                      onChange={(e) => setDetailsForm({ ...detailsForm, tempatLahirBayi: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Tanggal Lahir</label>
                    <input
                      type="date"
                      value={detailsForm.tanggalLahirBayi}
                      onChange={(e) => setDetailsForm({ ...detailsForm, tanggalLahirBayi: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Jam Lahir</label>
                    <input
                      type="time"
                      value={detailsForm.jamLahirBayi}
                      onChange={(e) => setDetailsForm({ ...detailsForm, jamLahirBayi: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nama Ibu Kandung</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Ibu"
                      value={detailsForm.namaIbu}
                      onChange={(e) => setDetailsForm({ ...detailsForm, namaIbu: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nama Ayah Kandung</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Ayah"
                      value={detailsForm.namaAyah}
                      onChange={(e) => setDetailsForm({ ...detailsForm, namaAyah: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields: Kematian */}
            {letterType === 'kematian' && (
              <div className="space-y-3.5 animate-in fade-in">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium text-stone-700">
                  Data Orang yang Meninggal Dunia
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nama Almarhum/Almarhumah <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Almarhum"
                      value={detailsForm.namaAlmarhum || selectedResident?.fullName || ''}
                      onChange={(e) => setDetailsForm({ ...detailsForm, namaAlmarhum: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Umur saat Wafat</label>
                    <input
                      type="text"
                      placeholder="Contoh: 68 Tahun"
                      value={detailsForm.umurAlmarhum}
                      onChange={(e) => setDetailsForm({ ...detailsForm, umurAlmarhum: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Tanggal Kematian</label>
                    <input
                      type="date"
                      value={detailsForm.tanggalKematian}
                      onChange={(e) => setDetailsForm({ ...detailsForm, tanggalKematian: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Jam Kematian</label>
                    <input
                      type="time"
                      value={detailsForm.jamKematian}
                      onChange={(e) => setDetailsForm({ ...detailsForm, jamKematian: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Penyebab Kematian</label>
                    <input
                      type="text"
                      value={detailsForm.sebabKematian}
                      onChange={(e) => setDetailsForm({ ...detailsForm, sebabKematian: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Nama Pelapor (Warga yang Datang)</label>
                    <input
                      type="text"
                      required
                      value={detailsForm.namaPelapor}
                      onChange={(e) => setDetailsForm({ ...detailsForm, namaPelapor: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Hubungan Pelapor</label>
                    <input
                      type="text"
                      value={detailsForm.hubunganPelapor}
                      onChange={(e) => setDetailsForm({ ...detailsForm, hubunganPelapor: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields: Pindah Masuk */}
            {letterType === 'pindah_masuk' && (
              <div className="space-y-3.5 animate-in fade-in">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium text-stone-700">
                  Data Warga Pindah Masuk ke Desa Bojongloa
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Nama Kepala Keluarga <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap"
                      value={detailsForm.namaKepalaKeluargaMasuk}
                      onChange={(e) => setDetailsForm({ ...detailsForm, namaKepalaKeluargaMasuk: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      NIK Pemohon / Kepala Keluarga <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="16 Digit NIK"
                      value={detailsForm.nikKepalaKeluargaMasuk}
                      onChange={(e) => setDetailsForm({ ...detailsForm, nikKepalaKeluargaMasuk: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Desa Asal</label>
                    <input
                      type="text"
                      value={detailsForm.desaAsal}
                      onChange={(e) => setDetailsForm({ ...detailsForm, desaAsal: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Kecamatan Asal</label>
                    <input
                      type="text"
                      value={detailsForm.kecamatanAsal}
                      onChange={(e) => setDetailsForm({ ...detailsForm, kecamatanAsal: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Kabupaten/Kota Asal</label>
                    <input
                      type="text"
                      value={detailsForm.kabupatenAsal}
                      onChange={(e) => setDetailsForm({ ...detailsForm, kabupatenAsal: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Dusun Tujuan di Bojongloa</label>
                    <select
                      value={detailsForm.dusunTujuan}
                      onChange={(e) => setDetailsForm({ ...detailsForm, dusunTujuan: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl bg-white"
                    >
                      {DESA_INFO.daftarDusun.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">RT Tujuan</label>
                    <input
                      type="text"
                      value={detailsForm.rtTujuan}
                      onChange={(e) => setDetailsForm({ ...detailsForm, rtTujuan: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">RW Tujuan</label>
                    <input
                      type="text"
                      value={detailsForm.rwTujuan}
                      onChange={(e) => setDetailsForm({ ...detailsForm, rwTujuan: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Form Fields: Pindah Keluar */}
            {letterType === 'pindah_keluar' && (
              <div className="space-y-3.5 animate-in fade-in">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 font-medium text-stone-700">
                  Data Warga Pindah Keluar dari Bojongloa
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Alamat Tujuan</label>
                    <input
                      type="text"
                      placeholder="Jalan / Kp. Tujuan"
                      value={detailsForm.alamatTujuan}
                      onChange={(e) => setDetailsForm({ ...detailsForm, alamatTujuan: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Kecamatan Tujuan</label>
                    <input
                      type="text"
                      value={detailsForm.kecamatanTujuan}
                      onChange={(e) => setDetailsForm({ ...detailsForm, kecamatanTujuan: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Kab/Kota Tujuan</label>
                    <input
                      type="text"
                      value={detailsForm.kabupatenTujuan}
                      onChange={(e) => setDetailsForm({ ...detailsForm, kabupatenTujuan: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Alasan Pindah</label>
                    <input
                      type="text"
                      value={detailsForm.alasanPindahKeluar}
                      onChange={(e) => setDetailsForm({ ...detailsForm, alasanPindahKeluar: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Jumlah Anggota Ikut</label>
                    <input
                      type="number"
                      min={0}
                      value={detailsForm.jumlahPengikutKeluar}
                      onChange={(e) => setDetailsForm({ ...detailsForm, jumlahPengikutKeluar: e.target.value })}
                      className="w-full px-3 py-2 border border-stone-300 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-stone-500">
                Dokumen akan langsung terbit dengan Nomor Surat otomatis dan tersimpan ke Arsip Desa.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Printer className="w-4 h-4" />
                  <span>{isSubmitting ? 'Menerbitkan...' : 'Terbitkan & Cetak Surat Sekarang'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Official Letter Modal Preview & Print */}
      {successSubmission && (
        <OfficialLetterModal
          isOpen={printModalOpen}
          submission={successSubmission}
          onClose={() => setPrintModalOpen(false)}
        />
      )}
    </div>
  );
};
