import Image from "next/image";
import { Award, BookOpen, Briefcase, GraduationCap, Star } from "lucide-react";

const riwayatPendidikan = [
  { gelar: "S2 — Magister Sains (M.Si.)", institusi: "Program Pascasarjana Bidang Kesehatan" },
  { gelar: "S1 — Sarjana Sains (S.Si.)", institusi: "Bidang Ilmu Kesehatan / Analis Kesehatan" },
  { gelar: "Dokter (Dr.)", institusi: "Pendidikan Profesi Kedokteran" },
];

const riwayatJabatan = [
  { jabatan: "Kepala SMK Analis Kesehatan Ditkesad", periode: "Oktober 2025 — Sekarang" },
  { jabatan: "Perwira Kesehatan TNI AD (Letkol Ckm)", periode: "Sebelumnya" },
];

const prestasi = [
  "Dilantik sebagai Kepala Sekolah pada 10 Oktober 2025",
  "Perwira Kesehatan berpengalaman di lingkungan TNI AD",
  "Berkomitmen membangun ekosistem pendidikan kesehatan yang unggul",
  "Mendorong integrasi Teaching Factory dan praktik klinis intensif",
];

export default function KepsekPage() {
  return (
    <div className="flex flex-col gap-0 pb-20">
      {/* HERO */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 to-slate-900/95" />
        <div className="relative container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-300 mb-4 bg-teal-900/50 px-4 py-1.5 rounded-full">
            Tentang Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Profil Kepala Sekolah
          </h1>
          <p className="text-slate-300 text-lg">
            Mengenal sosok pemimpin di balik SMK Analis Kesehatan Ditkesad
            Puskesad Jakarta.
          </p>
        </div>
      </section>

      {/* PROFIL UTAMA */}
      <section className="container mx-auto px-4 md:px-6 py-20 max-w-5xl">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Foto */}
          <div className="md:col-span-4 flex flex-col items-center gap-5">
            <div className="relative w-full max-w-xs aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-slate-100">
              <Image
                src="/images/kepsek.jpg"
                alt="Letkol Ckm Dr. Evul Winoto Lukito"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="w-full max-w-xs bg-teal-700 text-white rounded-2xl p-5 text-center">
              <Star size={20} className="mx-auto mb-2 text-yellow-300" />
              <p className="font-bold text-lg leading-snug">
                Letkol Ckm Dr. Evul Winoto Lukito, S.Si., M.Si.
              </p>
              <p className="text-teal-200 text-sm mt-1">
                Kepala Sekolah SMK Analis Kesehatan Puskesad
              </p>
            </div>
          </div>

          {/* Konten */}
          <div className="md:col-span-8 flex flex-col gap-8">
            {/* Sambutan */}
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-snug">
                &ldquo;Lingkungan dan orang-orang di sekitarmu sangat
                memengaruhi perjalanan hidup — maka pilih{" "}
                <span className="text-teal-600">circle</span> yang mendukung
                kesuksesan masa depanmu.&rdquo;
              </h2>
              <div className="h-1 w-16 bg-teal-500 rounded-full" />
              <p className="text-slate-600 leading-relaxed">
                Pak Evul — panggilan akrab beliau di lingkungan SMK Analis
                Kesehatan Ditkesad — adalah sosok pemimpin yang mengedepankan
                kedisiplinan, profesionalisme, dan semangat pengabdian. Beliau
                secara resmi dilantik pada{" "}
                <strong className="text-slate-800">10 Oktober 2025</strong>{" "}
                sebagai Kepala SMK Analis Kesehatan Ditkesad, membawa visi baru
                untuk memperkuat kualitas pendidikan kesehatan berbasis militer
                yang inklusif dan berdaya saing tinggi.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Dengan latar belakang sebagai perwira kesehatan TNI AD berpangkat
                Letnan Kolonel Kesehatan Militer (Letkol Ckm), beliau membawa
                pengalaman operasional dan akademis yang kaya ke dalam kepemimpinan
                instituisi ini.
              </p>
            </div>

            {/* Riwayat Jabatan */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase size={18} className="text-teal-600" />
                <h3 className="font-bold text-slate-800">Riwayat Jabatan</h3>
              </div>
              <div className="flex flex-col gap-3">
                {riwayatJabatan.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal-500 mt-2 shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{r.jabatan}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{r.periode}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Riwayat Pendidikan */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={18} className="text-teal-600" />
                <h3 className="font-bold text-slate-800">Riwayat Pendidikan</h3>
              </div>
              <div className="flex flex-col gap-3">
                {riwayatPendidikan.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-white rounded-xl p-4 border border-slate-100 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center shrink-0">
                      <BookOpen size={14} className="text-teal-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{r.gelar}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{r.institusi}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESTASI & KOMITMEN */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex items-center gap-2 mb-8">
            <Award size={22} className="text-teal-400" />
            <h2 className="text-xl font-bold">Komitmen & Pencapaian</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {prestasi.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-slate-800 rounded-xl p-4"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-teal-400 text-xs font-bold">{i + 1}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
