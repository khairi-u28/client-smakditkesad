"use client";

import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Phone,
  FileText,
  Award,
  ArrowRight,
  Clock,
  ChevronRight,
} from "lucide-react";

const jadwal = [
  { label: "Pembukaan Pendaftaran", date: "Desember 2025", icon: CalendarDays },
  { label: "Batas Akhir Pendaftaran", date: "Juli 2026", icon: Clock },
  { label: "Pengumuman Diterima", date: "Menyusul", icon: CheckCircle2 },
];

const syarat = [
  "Pas foto ukuran 3×4 sebanyak 2 lembar",
  "Pas foto ukuran 4×6 sebanyak 4 lembar",
  "Fotokopi Rapor semester 1–5",
  "Fotokopi Kartu Keluarga (KK)",
  "Fotokopi Akta Kelahiran",
  "NISN (Nomor Induk Siswa Nasional)",
];

const biaya = [
  { komponen: "Uang Pangkal", nominal: "Rp 3.800.000", keterangan: "Sekali bayar saat daftar ulang", sekali: true },
  { komponen: "Uang Seragam", nominal: "Rp 1.700.000", keterangan: "Sekali bayar saat daftar ulang", sekali: true },
  { komponen: "SPP Bulanan", nominal: "Rp 500.000", keterangan: "Dibayarkan setiap bulan", sekali: false },
  { komponen: "Biaya Praktikum", nominal: "Rp 3.500.000", keterangan: "Per tahun, dapat dicicil s/d Oktober 2026", sekali: false },
  { komponen: "MPLS", nominal: "Rp 1.000.000", keterangan: "Masa Pengenalan Lingkungan Sekolah", sekali: true },
];

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfIreNvUHahdEVu3f-DrLnPoUVP2vKi9lOxiAfi2gEkGgIHvA/viewform";

export default function PPDB() {
  const [activeTab, setActiveTab] = useState("mandiri");

  return (
    <div className="flex flex-col gap-0 bg-slate-50 pb-20">
      {/* HERO */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-slate-900/90" />
        <div className="relative container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-emerald-300 mb-4 bg-emerald-900/50 px-4 py-1.5 rounded-full">
            Tahun Ajaran 2026/2027
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Penerimaan Peserta Didik Baru
          </h1>
          <p className="text-lg text-slate-300 mb-8">
            Bergabunglah dengan SMK Analis Kesehatan Puskesad — tempat di mana
            keterampilan teknis laboratorium bertemu dengan kedisiplinan
            profesional.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-8 rounded-full transition-all shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5"
          >
            Daftar Sekarang <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* JADWAL */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Jadwal Pendaftaran</h2>
            <p className="text-slate-500 mb-6 text-sm">Pastikan kamu mendaftar sebelum batas waktu yang ditentukan.</p>
            <div className="flex flex-col gap-4">
              {jadwal.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <item.icon size={20} className="text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-slate-800 font-semibold">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BUTUH BANTUAN */}
          <div className="md:w-72 bg-emerald-800 text-white rounded-2xl p-6 flex flex-col gap-4 shadow-lg self-start sticky top-24">
            <h3 className="text-lg font-bold">Butuh Bantuan?</h3>
            <p className="text-emerald-100 text-sm leading-relaxed">
              Hubungi kami melalui WhatsApp jika ada pertanyaan seputar proses pendaftaran.
            </p>
            <div className="flex items-center gap-3 bg-emerald-700/50 p-3 rounded-xl">
              <Phone size={18} className="shrink-0" />
              <span className="font-semibold tracking-wide">0813-1123-789</span>
            </div>
            <p className="text-emerald-300 text-xs">Jam kerja: 08.00 – 16.00 WIB</p>
            <a
              href={`https://wa.me/6281311237890`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 bg-white text-emerald-800 font-bold text-sm py-2.5 px-4 rounded-xl text-center hover:bg-emerald-50 transition-colors"
            >
              Chat WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* SYARAT */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              <span className="text-xs font-semibold tracking-widest uppercase text-emerald-600">Dokumen</span>
              <h2 className="text-2xl font-bold text-slate-800 mt-1 mb-6">Syarat Pendaftaran</h2>
              <ul className="space-y-3">
                {syarat.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-96 bg-slate-900 rounded-2xl p-6 text-white">
              <FileText size={28} className="text-emerald-400 mb-3" />
              <h3 className="font-bold text-lg mb-2">Tips Persiapan Dokumen</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Siapkan semua dokumen dalam format digital (JPG/PDF) dengan resolusi jelas sebelum mengisi formulir online. Pastikan nama file mudah diidentifikasi.
              </p>
              <p className="text-xs text-slate-400">Dokumen fisik dikumpulkan saat daftar ulang jika dinyatakan diterima.</p>
            </div>
          </div>
        </div>
      </section>

      {/* JALUR PENDAFTARAN */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-widest uppercase text-emerald-600">Metode</span>
          <h2 className="text-2xl font-bold text-slate-800 mt-1">Jalur Pendaftaran</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100">
          {/* Tabs */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab("mandiri")}
              className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${activeTab === "mandiri" ? "bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600" : "text-slate-500 hover:bg-slate-50"}`}
            >
              Jalur Mandiri
            </button>
            <button
              onClick={() => setActiveTab("prestasi")}
              className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${activeTab === "prestasi" ? "bg-emerald-50 text-emerald-700 border-b-2 border-emerald-600" : "text-slate-500 hover:bg-slate-50"}`}
            >
              Jalur Prestasi
            </button>
          </div>

          <div className="p-8">
            {activeTab === "mandiri" && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Pendaftaran Jalur Mandiri</h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Terbuka untuk seluruh lulusan SMP/sederajat. Masukkan data dengan benar dan lengkapi semua berkas yang diminta.
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      { step: "01", title: "Isi Formulir Online", desc: "Lengkapi data diri melalui Google Form yang tersedia." },
                      { step: "02", title: "Unggah Dokumen", desc: "Upload semua berkas persyaratan dalam format digital." },
                      { step: "03", title: "Pengumuman", desc: "Hasil seleksi diinformasikan melalui kontak yang didaftarkan." },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm flex items-center justify-center shrink-0">
                          {s.step}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                          <p className="text-slate-500 text-xs">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-64 bg-slate-50 rounded-xl p-5 border border-slate-100 self-start">
                  <p className="font-semibold text-slate-700 mb-3 text-sm">Persyaratan Umum</p>
                  <ul className="space-y-2">
                    {syarat.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                        <ChevronRight size={14} className="mt-0.5 text-emerald-500 shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "prestasi" && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-3">Pendaftaran Jalur Prestasi</h3>
                  <p className="text-slate-500 text-sm mb-6">
                    Bagi calon siswa berprestasi di bidang akademik maupun non-akademik minimal tingkat kota/kabupaten.
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      { step: "01", title: "Penuhi Semua Syarat Umum", desc: "Dokumen dasar sama dengan jalur mandiri." },
                      { step: "02", title: "Sertifikat/Piagam Prestasi", desc: "Minimal tingkat kota/kabupaten, provinsi, atau nasional." },
                      { step: "03", title: "Nilai Rapor Rata-rata ≥ 80", desc: "Nilai rapor semester 1–5 harus memenuhi syarat minimum." },
                    ].map((s) => (
                      <div key={s.step} className="flex gap-4 items-start">
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 font-bold text-sm flex items-center justify-center shrink-0">
                          {s.step}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                          <p className="text-slate-500 text-xs">{s.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:w-64 bg-amber-50 rounded-xl p-5 border border-amber-100 self-start">
                  <Award size={24} className="text-amber-500 mb-2" />
                  <p className="font-semibold text-slate-700 mb-1 text-sm">Keunggulan Jalur Prestasi</p>
                  <p className="text-xs text-slate-500">Calon siswa dengan jalur prestasi mendapatkan pertimbangan khusus dalam proses seleksi berkas.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BIAYA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-emerald-600">Transparansi</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-1">Estimasi Biaya Pendidikan</h2>
            <p className="text-slate-400 text-sm mt-2">Semua biaya tertera sudah final untuk tahun ajaran 2026/2027</p>
          </div>

          <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-6 py-4 text-slate-300 font-semibold text-sm">Komponen Biaya</th>
                    <th className="px-6 py-4 text-slate-300 font-semibold text-sm text-right">Nominal</th>
                    <th className="px-6 py-4 text-slate-300 font-semibold text-sm">Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  {biaya.map((b, i) => (
                    <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${b.sekali ? "bg-emerald-400" : "bg-blue-400"}`} />
                          <span className="text-white font-medium text-sm">{b.komponen}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-emerald-300 font-bold font-mono">{b.nominal}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{b.keterangan}</td>
                    </tr>
                  ))}
                  <tr className="bg-emerald-900/40">
                    <td className="px-6 py-4">
                      <span className="text-white font-bold">Total Pembayaran Awal</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-emerald-300 font-bold font-mono text-lg">Rp 10.500.000</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">Pangkal + Seragam + MPLS</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-700 flex gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                Biaya sekali bayar
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
                Biaya berkala
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 md:px-6 py-16 max-w-2xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">Siap Bergabung?</h2>
        <p className="text-slate-500 mb-8 text-sm">
          Isi formulir pendaftaran online sekarang dan mulai perjalananmu menjadi analis kesehatan profesional.
        </p>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 text-sm"
        >
          Isi Formulir Pendaftaran <ArrowRight size={18} />
        </a>
        <p className="mt-4 text-xs text-slate-400">
          Ada pertanyaan? Hubungi kami di{" "}
          <a href="https://wa.me/6281311237890" className="text-emerald-600 hover:underline font-medium">
            0813-1123-789
          </a>
        </p>
      </section>
    </div>
  );
}
