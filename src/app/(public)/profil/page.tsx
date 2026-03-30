import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  Lightbulb,
  HeartHandshake,
  History,
  School,
  BookOpen,
  FlaskConical,
} from "lucide-react";

const misiList = [
  "Mendukung tugas pokok TNI dengan menyediakan tenaga analis kesehatan yang kompeten dan profesional.",
  "Melayani kesehatan keluarga TNI melalui tenaga kesehatan terampil yang dibentuk di institusi kami.",
  "Memberikan kontribusi nyata TNI kepada dunia pendidikan dan masyarakat umum.",
  "Menjalin kerjasama strategis dengan berbagai institusi kesehatan dan lembaga terkait.",
];

const kegiatanSiswa = [
  { title: "Workshop Laboratorium", image: "/images/workshop-1.jpeg" },
  { title: "Praktik Klinik", image: "/images/workshop-2.jpeg" },
  { title: "Kegiatan Lapangan", image: "/images/workshop-3.jpeg" },
  { title: "Upacara & Pembinaan", image: "/images/workshop-4.jpeg" },
];

export default function ProfilPage() {
  return (
    <div className="flex flex-col gap-0 pb-20">
      {/* PAGE HEADER */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 to-teal-900/80" />
        <div className="relative container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-300 mb-4 bg-teal-900/50 px-4 py-1.5 rounded-full">
            Tentang Kami
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Profil Sekolah
          </h1>
          <p className="text-slate-300 text-lg">
            Mengenal lebih dekat sejarah, visi, misi, dan nilai-nilai luhur
            SMK Analis Kesehatan Ditkesad Puskesad Jakarta.
          </p>
        </div>
      </section>

      {/* SEJARAH + YOUTUBE */}
      <section className="container mx-auto px-4 md:px-6 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-teal-600 tracking-widest uppercase">
              Pondasi Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3">
              <History className="h-8 w-8 text-teal-500 shrink-0" />
              Sejarah Singkat
            </h2>
            <div className="h-1 w-16 bg-teal-500 rounded-full" />
            <div className="text-slate-600 text-base leading-relaxed flex flex-col gap-4">
              <p>
                SMK Analis Kesehatan Ditkesad didirikan pada tahun{" "}
                <strong className="text-slate-800">1964</strong> untuk memenuhi
                kebutuhan tenaga analis kesehatan di lingkungan TNI Angkatan
                Darat.
              </p>
              <p>
                Pada tahun <strong className="text-slate-800">1973</strong>,
                sekolah mulai membuka penerimaan untuk masyarakat umum, tetap
                mempertahankan kedisiplinan dan etos kerja TNI AD sebagai ciri
                khas utama.
              </p>
              <p>
                Hingga tahun 2025, SMK Analis Kesehatan Ditkesad telah
                mencetak lebih dari{" "}
                <strong className="text-slate-800">3.644 lulusan</strong> yang
                berkiprah di berbagai instansi kesehatan militer maupun umum di
                seluruh Indonesia.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { value: "1964", label: "Tahun Berdiri" },
                { value: "1973", label: "Buka untuk Umum" },
                { value: "3.644+", label: "Total Lulusan" },
              ].map((s, i) => (
                <div key={i} className="bg-teal-50 rounded-xl p-4 text-center border border-teal-100">
                  <p className="text-2xl font-bold text-teal-700">{s.value}</p>
                  <p className="text-xs text-slate-500 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Embed */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-video">
            <iframe
              src="https://www.youtube.com/embed/5x-EIpQ4--I"
              title="Profil SMK Analis Kesehatan Puskesad"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </section>

      {/* VISI & MISI */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-teal-600">Arah & Tujuan</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">Visi & Misi</h2>
          </div>
          <div className="grid md:grid-cols-12 gap-8">
            {/* VISI */}
            <div className="md:col-span-5">
              <Card className="border-none shadow-lg rounded-2xl bg-white h-full group">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 bg-teal-100 rounded-xl text-teal-600 border border-teal-200">
                    <Lightbulb className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-slate-800">
                    Visi Kami
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-1 w-16 bg-teal-500 rounded-full mb-5" />
                  <blockquote className="text-slate-700 font-medium leading-relaxed italic p-5 bg-teal-50 rounded-xl border-l-4 border-teal-500 text-base">
                    &ldquo;SMK ANALIS KESEHATAN PUSKESAD bertekad untuk
                    menyediakan tenaga analis kesehatan yang tanggap, tangguh,
                    handal, profesional, disiplin, kreatif, informatif dan
                    inovatif.&rdquo;
                  </blockquote>
                </CardContent>
              </Card>
            </div>

            {/* MISI */}
            <div className="md:col-span-7">
              <Card className="border-none shadow-lg rounded-2xl bg-slate-900 text-slate-200 h-full">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 bg-slate-800 rounded-xl text-teal-400 border border-slate-700">
                    <Target className="h-7 w-7" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-white">
                    Misi Sekolah
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <div className="h-1 w-16 bg-teal-500 rounded-full mb-2" />
                  {misiList.map((misi, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start p-3 bg-slate-800 rounded-lg"
                    >
                      <HeartHandshake className="h-5 w-5 text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-slate-300 leading-relaxed">{misi}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* KURIKULUM */}
      <section className="container mx-auto px-4 md:px-6 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-video">
            <Image
              src="/images/kurikulum.jpeg"
              alt="Kurikulum SMK Analis Kesehatan Puskesad"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-teal-600 tracking-widest uppercase">
              Pembelajaran
            </span>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-teal-500 shrink-0" />
              Kurikulum
            </h2>
            <div className="h-1 w-16 bg-teal-500 rounded-full" />
            <p className="text-slate-600 leading-relaxed">
              Kurikulum kami dirancang untuk mengintegrasikan teori dan praktik
              laboratorium secara intensif. Program{" "}
              <strong className="text-slate-800">Teaching Factory</strong>{" "}
              memungkinkan siswa belajar langsung dalam simulasi dunia kerja
              nyata.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Integrasi praktik laboratorium klinik intensif",
                "Program Teaching Factory berbasis industri kesehatan",
                "Kerjasama dengan rumah sakit dan laboratorium medis",
                "Uji kompetensi keahlian bersertifikat nasional",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <FlaskConical size={16} className="text-teal-500 mt-0.5 shrink-0" />
                  <span className="text-slate-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SARANA & PRASARANA */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <span className="text-xs font-semibold text-teal-300 tracking-widest uppercase">
                Fasilitas
              </span>
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <School className="h-8 w-8 text-teal-400 shrink-0" />
                Sarana & Prasarana
              </h2>
              <div className="h-1 w-16 bg-teal-500 rounded-full" />
              <p className="text-slate-300 leading-relaxed">
                Sekolah kami dilengkapi dengan fasilitas modern yang mendukung
                proses pembelajaran berkualitas tinggi, mulai dari laboratorium
                khusus hingga ruang praktik yang memenuhi standar industri.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Laboratorium Kimia Klinik",
                  "Laboratorium Hematologi",
                  "Laboratorium Mikrobiologi",
                  "Laboratorium Urinalisa",
                  "Ruang Perpustakaan",
                  "Sarana Olahraga",
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 bg-slate-800 rounded-lg px-3 py-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0" />
                    <span className="text-xs text-slate-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl aspect-video">
              <Image
                src="/images/sarana-prasarana.jpeg"
                alt="Sarana dan Prasarana SMK Analis Kesehatan"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KEGIATAN SISWA */}
      <section className="container mx-auto px-4 md:px-6 py-20 max-w-6xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-teal-600">Dokumentasi</span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">Kegiatan Siswa</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Beragam kegiatan pembelajaran dan pembinaan yang membentuk karakter siswa menjadi tenaga kesehatan profesional.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kegiatanSiswa.map((k, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden shadow-md aspect-square"
            >
              <Image
                src={k.image}
                alt={k.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">{k.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

