import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Target,
  Lightbulb,
  HeartHandshake,
  History,
  School,
} from "lucide-react";

// DUMMY DATA: Visi Misi yang dirapikan stylenya
const misiList = [
  "Menyelenggarakan pendidikan kesehatan tingkat menengah yang berkualitas, relevan dengan kebutuhan Duni Usaha/Dunia Industri (DUDI).",
  "Menanamkan nilai-nilai kedisiplinan, kejujuran, tanggung jawab, dan semangat pengabdian ala prajurit TNI AD.",
  "Menjalin kerjasama strategis dengan rumah sakit, apotek, dan lembaga kesehatan militer maupun umum.",
  "Meningkatkan kompetensi pendidik dan kependidikan secara berkelanjutan.",
  "Menyediakan sarana prasarana pembelajaran yang modern dan representatif sesuai standar kesehatan.",
];

export default function ProfilPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. PAGE HEADER (Banner Judul) */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opasity-20">
          <Image
            src="/images/sekolah-bg.jpg"
            alt="SMAK Ditkesad Sekolah"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-slate-950/80 z-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center gap-3">
          <School className="h-12 w-12 text-teal-400 mb-2" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Profil Sekolah
          </h1>
          <div className="h-1 w-24 bg-amber-500 rounded-full mt-1" />
          <p className="text-xl text-slate-300 max-w-2xl mt-2">
            Mengenal lebih dekat sejarah, visi, misi, dan nilai-nilai luhur SMAK
            Ditkesad Jakarta.
          </p>
        </div>
      </section>

      {/* 2. SEJARAH SINGKAT (Dari sejarah.html lama dengan dummy teks rapi) */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
              Pondasi Kami
            </h4>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight flex items-center gap-3">
              <History className="h-9 w-9 text-teal-500" />
              Sejarah Singkat
            </h2>
            <div className="h-1 w-20 bg-teal-500 rounded-full" />
            <div className="text-slate-700 text-base leading-relaxed flex flex-col gap-4">
              <p>
                SMAK Ditkesad didirikan pada tahun [Tahun Dummy: 1970] atas
                prakarsa pimpinan Kesehatan Angkatan Darat saat itu, dengan
                tujuan mulia untuk mencetak asisten analis kesehatan dan asisten
                perawat militer yang mumpuni.
              </p>
              <p>
                Seiring berjalannya waktu dan kebutuhan zaman, institusi kami
                bertransformasi menjadi Sekolah Menengah Kejuruan (SMK)
                Kesehatan yang juga membuka pintu bagi masyarakat umum, namun
                tetap mempertahankan warna kedisiplinan TNI AD sebagai ciri khas
                utama.
              </p>
              <p>
                Kini, kami berdiri tegak sebagai salah satu SMK Kesehatan
                terpopuler di Jakarta Tengah, konsisten melahirkan ribuan
                lulusan yang siap mengabdi di berbagai pelosok negeri.
              </p>
            </div>
          </div>
          <div className="relative h-96 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200">
            <Image
              src="/images/sejarah-sekolah.jpg" // Ganti dengan gambar sejarah di public/images/
              alt="Sejarah SMAK Ditkesad lama"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 3. VISI & MISI (Dari visimisi.html lama dengan dummy teks rapi) */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-12 gap-12">
            {/* VISI */}
            <Card className="md:col-span-5 border-none shadow-lg rounded-2xl bg-white p-8 group">
              <CardHeader className="p-0 flex flex-row items-center gap-4 mb-6">
                <div className="p-3 bg-teal-100 rounded-xl text-teal-600 border border-teal-200 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl font-heading font-bold text-slate-950">
                  Visi Kami
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-1 w-20 bg-teal-500 rounded-full mb-6" />
                <p className="text-2xl text-slate-900 font-medium leading-snug italic p-6 bg-teal-50 rounded-xl border-l-4 border-teal-500 shadow-inner">
                  &quot;Menjadi institusi pendidikan kesehatan menengah
                  terkemuka di tingkat nasional, unggul dalam kompetensi,
                  berkarakter disiplin militer, dan berlandaskan moralitas yang
                  luhur.&quot;
                </p>
              </CardContent>
            </Card>

            {/* MISI */}
            <Card className="md:col-span-7 border-none shadow-lg rounded-2xl bg-slate-950 text-slate-200 p-8">
              <CardHeader className="p-0 flex flex-row items-center gap-4 mb-6">
                <div className="p-3 bg-slate-800 rounded-xl text-teal-400 border border-slate-700">
                  <Target className="h-8 w-8" />
                </div>
                <CardTitle className="text-3xl font-heading font-bold text-white">
                  Misi Sekolah
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex flex-col gap-4 text-base leading-relaxed text-slate-300">
                <div className="h-1 w-20 bg-teal-500 rounded-full mb-2" />
                {misiList.map((misi, index) => (
                  <div
                    key={index}
                    className="flex gap-3 items-start p-3 bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <HeartHandshake className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                    <p>{misi}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
