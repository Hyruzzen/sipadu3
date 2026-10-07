import React from 'react';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { Submission } from '../types';
import { DESA_INFO } from '../data/mockData';

interface OfficialLetterModalProps {
  submission: Submission | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OfficialLetterModal: React.FC<OfficialLetterModalProps> = ({
  submission,
  isOpen,
  onClose
}) => {
  if (!isOpen || !submission) return null;

  let parsedDetails: any = {};
  try {
    parsedDetails = JSON.parse(submission.details || '{}');
  } catch {
    parsedDetails = {};
  }

  const getSuratTitle = () => {
    switch (submission.type) {
      case 'kelahiran':
        return 'SURAT KETERANGAN KELAHIRAN';
      case 'kematian':
        return 'SURAT KETERANGAN KEMATIAN';
      case 'pindah_masuk':
        return 'SURAT KETERANGAN PINDAH DATANG';
      case 'pindah_keluar':
        return 'SURAT KETERANGAN PINDAH KELUAR';
      default:
        return 'SURAT KETERANGAN KEPENDUDUKAN';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const todayStr = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8 shadow-2xl border border-stone-300 flex flex-col overflow-hidden">
        {/* Top Control Bar (Hidden during print) */}
        <div className="p-4 border-b border-stone-200 bg-stone-100 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-stone-800 text-sm">
              Pratinjau Surat Keterangan Resmi Desa Bojongloa
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Unduh PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Paper Body (Styled like real Indonesian Government Document) */}
        <div className="p-8 sm:p-12 text-stone-900 bg-white font-serif select-text">
          {/* Official Letterhead (KOP SURAT) */}
          <div className="text-center border-b-4 border-double border-stone-900 pb-4 mb-6 relative">
            {/* Garuda / Village Emblem representation */}
            <div className="w-16 h-16 mx-auto mb-2 rounded-full border-2 border-stone-800 flex items-center justify-center bg-stone-50">
              <span className="font-sans font-black text-xl text-stone-800">BJL</span>
            </div>
            <h3 className="font-bold uppercase tracking-wide text-xs sm:text-sm font-sans">
              PEMERINTAH KABUPATEN BANDUNG
            </h3>
            <h4 className="font-bold uppercase tracking-wide text-xs sm:text-sm font-sans">
              KECAMATAN RANCAEKEK
            </h4>
            <h2 className="font-extrabold uppercase tracking-wider text-lg sm:text-2xl font-sans mt-0.5">
              KEPALA DESA BOJONGLOA
            </h2>
            <p className="text-[11px] font-sans text-stone-600 mt-1">
              {DESA_INFO.kantorDesa} | Telp: {DESA_INFO.telepon} | Email: {DESA_INFO.email}
            </p>
          </div>

          {/* Letter Title & Number */}
          <div className="text-center mb-6">
            <h1 className="text-base sm:text-lg font-bold uppercase underline tracking-wide">
              {getSuratTitle()}
            </h1>
            <p className="text-xs sm:text-sm font-sans mt-0.5 font-semibold">
              Nomor: {submission.suratNumber || '474.1/---/Desa-BJL/2026'}
            </p>
          </div>

          {/* Intro Paragraph */}
          <p className="text-xs sm:text-sm leading-relaxed mb-4 text-justify font-sans">
            Yang bertanda tangan di bawah ini Kepala Desa Bojongloa, Kecamatan Rancaekek,
            Kabupaten Bandung, menerangkan dengan sebenarnya bahwa:
          </p>

          {/* Content Specific to Type */}
          <div className="space-y-3 font-sans text-xs sm:text-sm pl-4 mb-6">
            {submission.type === 'kelahiran' && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Nama Anak / Bayi</span>
                  <span className="col-span-2 font-bold uppercase">{parsedDetails.namaBayi || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Jenis Kelamin</span>
                  <span className="col-span-2">
                    {parsedDetails.jenisKelaminBayi === 'L' ? 'Laki-laki' : 'Perempuan'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Tempat, Tanggal Lahir</span>
                  <span className="col-span-2">
                    {parsedDetails.tempatLahir || '-'}, {parsedDetails.tanggalLahir || '-'} (Pukul {parsedDetails.jamLahir || '-'} WIB)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Kelahiran Anak Ke</span>
                  <span className="col-span-2">{parsedDetails.anakKe || '1'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Nama Ayah Kandung</span>
                  <span className="col-span-2 font-semibold">
                    {parsedDetails.namaAyah || '-'} (NIK: {parsedDetails.nikAyah || '-'})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Nama Ibu Kandung</span>
                  <span className="col-span-2 font-semibold">
                    {parsedDetails.namaIbu || '-'} (NIK: {parsedDetails.nikIbu || '-'})
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Alamat Orang Tua</span>
                  <span className="col-span-2">Desa Bojongloa, Kecamatan Rancaekek, Kabupaten Bandung</span>
                </div>
              </>
            )}

            {submission.type === 'kematian' && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Nama Lengkap Almarhum</span>
                  <span className="col-span-2 font-bold uppercase">{parsedDetails.namaAlmarhum || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">NIK Almarhum</span>
                  <span className="col-span-2">{parsedDetails.nikAlmarhum || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Jenis Kelamin / Umur</span>
                  <span className="col-span-2">
                    {parsedDetails.jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'} / {parsedDetails.umur || '-'} Tahun
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Waktu Kematian</span>
                  <span className="col-span-2">
                    {parsedDetails.tanggalKematian || '-'}, Pukul {parsedDetails.jamKematian || '-'} WIB
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Tempat Kematian</span>
                  <span className="col-span-2">{parsedDetails.tempatKematian || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Penyebab Kematian</span>
                  <span className="col-span-2">{parsedDetails.sebabKematian || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Nama Pelapor / Hubungan</span>
                  <span className="col-span-2">
                    {parsedDetails.namaPelapor || submission.userName} ({parsedDetails.hubunganPelapor || 'Keluarga'})
                  </span>
                </div>
              </>
            )}

            {(submission.type === 'pindah_masuk' || submission.type === 'pindah_keluar') && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Nama Pemohon / Kepala KK</span>
                  <span className="col-span-2 font-bold uppercase">
                    {parsedDetails.namaKepalaKeluarga || submission.userName}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">NIK Pemohon</span>
                  <span className="col-span-2">{parsedDetails.nikPemohon || submission.userNik}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">
                    {submission.type === 'pindah_masuk' ? 'Alamat Asal' : 'Alamat Asal di Bojongloa'}
                  </span>
                  <span className="col-span-2">
                    {submission.type === 'pindah_masuk'
                      ? `${parsedDetails.alamatAsal || ''}, Desa ${parsedDetails.desaAsal || ''}, Kec. ${parsedDetails.kecamatanAsal || ''}, Kab/Kota ${parsedDetails.kabupatenAsal || ''}`
                      : `${parsedDetails.alamatAsalBojongloa || ''}, RT ${parsedDetails.rtAsal || ''}/RW ${parsedDetails.rwAsal || ''}, ${parsedDetails.dusunAsal || ''}`}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">
                    {submission.type === 'pindah_masuk' ? 'Alamat Tujuan di Bojongloa' : 'Alamat Tujuan Pindah'}
                  </span>
                  <span className="col-span-2">
                    {submission.type === 'pindah_masuk'
                      ? `${parsedDetails.alamatTujuanBojongloa || ''}, RT ${parsedDetails.rtTujuan || ''}/RW ${parsedDetails.rwTujuan || ''}, ${parsedDetails.dusunTujuan || ''}`
                      : `${parsedDetails.alamatTujuan || ''}, Desa ${parsedDetails.desaTujuan || ''}, Kec. ${parsedDetails.kecamatanTujuan || ''}, Kab/Kota ${parsedDetails.kabupatenTujuan || ''}`}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Alasan Pindah</span>
                  <span className="col-span-2">{parsedDetails.alasanPindah || '-'}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="font-semibold text-stone-700">Jumlah Anggota Keluarga Ikut</span>
                  <span className="col-span-2">{parsedDetails.jumlahPengikut || '0'} Orang</span>
                </div>
              </>
            )}
          </div>

          {/* Outro Paragraph */}
          <p className="text-xs sm:text-sm leading-relaxed mb-8 text-justify font-sans">
            Demikian surat keterangan ini kami buat dengan sebenarnya berdasarkan data pengarsipan kependudukan
            resmi Pemerintah Desa Bojongloa dan permohonan yang bersangkutan, agar dapat dipergunakan sebagaimana
            mestinya.
          </p>

          {/* Signatures & Stamp section */}
          <div className="grid grid-cols-2 gap-4 font-sans text-xs sm:text-sm pt-4">
            {/* Left QR Code / Verification */}
            <div className="flex flex-col items-center justify-center p-3 border border-stone-200 rounded-xl bg-stone-50">
              <ShieldCheck className="w-10 h-10 text-emerald-700 mb-1" />
              <div className="font-bold text-[11px] text-stone-800 uppercase tracking-tight text-center">
                TERVERIFIKASI SISTEM ARSIP DESA
              </div>
              <div className="font-mono text-[9px] text-stone-500 mt-0.5 text-center">
                Ref: {submission.id}
              </div>
              <div className="text-[9px] text-stone-400 text-center mt-1">
                Dicetak pada {todayStr}
              </div>
            </div>

            {/* Right Official Signature */}
            <div className="text-center relative">
              <p>Bojongloa, {todayStr}</p>
              <p className="font-bold mt-1">KEPALA DESA BOJONGLOA</p>

              {/* Village Stamp Illustration */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-red-700/60 text-red-700/70 flex flex-col items-center justify-center rotate-[-12deg] select-none pointer-events-none">
                  <span className="text-[8px] font-bold tracking-tighter">PEMERINTAH DESA</span>
                  <span className="text-[10px] font-black">BOJONGLOA</span>
                  <span className="text-[8px] font-bold">KAB. BANDUNG</span>
                </div>
                <div className="absolute font-serif italic text-stone-500 text-xs">
                  (Telah Ditandatangani Secara Elektronik)
                </div>
              </div>

              <p className="font-bold uppercase underline">{DESA_INFO.namaKades}</p>
              <p className="text-xs text-stone-600">NIP. {DESA_INFO.nipKades}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
