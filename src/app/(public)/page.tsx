import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  BookOpenText,
  Microscope,
  Stethoscope,
  Award,
  Users,
} from "lucide-react";

// DUMMY DATA: Program Keahlian
const programKeahlian = [
  {
    title: "Asisten Keperawatan",
    description:
      "Mencetak tenaga asisten perawat yang terampil, berdedikasi tinggi, dan siap kerja di fasilitas kesehatan militer maupun umum.",
    icon: Stethoscope,
    image: "/images/perawat.jpg", // Ganti dengan nama file gambar aslimu di folder public/images/
  },
  {
    title: "Farmasi Klinis & Komunitas",
    description:
      "Pendidikan kefarmasian komprehensif, fokus pada pengelolaan obat, pelayanan resep, dan konseling pasien yang akurat.",
    icon: BookOpenText,
    image: "/images/farmasi.jpg", // Ganti dengan nama file gambar aslimu
  },
  {
    title: "Teknologi Laboratorium Medik",
    description:
      "Mendidik analis kesehatan yang teliti dalam pengujian sampel laboratorium untuk diagnosis penyakit yang akurat.",
    icon: Microscope,
    image: "/images/analis.jpg", // Ganti dengan nama file gambar aslimu
  },
];

// DUMMY DATA: Berita Terbaru
const beritaTerbaru = [
  {
    title:
      "Praktek Kerja Lapangan (PKL) Siswa Tingkat XI di RSPAD Gatot Soebroto",
    date: "15 Mei 2024",
    category: "Kegiatan Siswa",
    image: "/images/kegiatan1.jpg", // Ganti dengan nama file gambar aslimu
  },
  {
    title:
      "SMAK Ditkesad Raih Juara Umum Lomba Kompetensi Siswa (LKS) Bidang Keperawatan Tingkat DKI",
    date: "10 Mei 2024",
    category: "Prestasi",
    image: "/images/prestasi1.jpg", // Ganti dengan nama file gambar aslimu
  },
  {
    title:
      "Upacara Bendera Peringatan Hari Bakti TNI AD dan Pelantikan Pengurus OSIS Baru",
    date: "02 Mei 2024",
    category: "Upacara",
    image: "/images/upacara1.jpg", // Ganti dengan nama file gambar aslimu
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. HERO SECTION (Banner Utama) - Responsif & Diubah Stylenya */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Image dengan Overlay */}
        <div className="absolute inset-0 z-0 opasity-20">
          <Image
            src="/images/hero-bg.jpg" // Ganti dengan gambar background di folder public/images/
            alt="Background SMAK Ditkesad"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        {/* Overlay Gradient (Navy Blue ke Transparent) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/50 z-10" />

        <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-20">
          <div className="max-w-3xl flex flex-col items-start gap-6">
            <div className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-950/50 px-4 py-1.5 text-xs font-semibold text-teal-300 shadow-inner">
              <Award className="mr-2 h-3.5 w-3.5" />
              Terakreditasi A (Unggul)
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight tracking-tight">
              Membangun Generasi Kesehatan{" "}
              <span className="text-teal-400">Berkarakter Militer</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl">
              Selamat Datang di SMAK DITKESAD Jakarta. Institusi pendidikan
              terdepan yang memadukan keunggulan akademis bidang kesehatan
              dengan kedisiplinan dan nilai-nilai luhur prajurit.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/ppdb">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full px-8 font-semibold shadow-lg hover:shadow-amber-500/20 transition-all text-base"
                >
                  Daftar PPDB Sekarang
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/profil">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-white/10 rounded-full px-8 text-base"
                >
                  Pelajari Profil Sekolah
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SAMBUTAN KEPALA SEKOLAH (Diambil dari profilsekolah.html lama) */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-72 h-72 md:w-full md:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200">
              <Image
                src="/images/profilkepsek.jpg" // Ganti dengan nama file gambar kepala sekolah aslimu
                alt="Kepala Sekolah SMAK Ditkesad"
                fill
                className="object-cover object-top"
              />
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col gap-5">
            <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
              Sambutan Kepala Sekolah
            </h4>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight">
              Visi Kami untuk Masa Depan Kesehatan Bangsa
            </h2>
            <div className="h-1 w-20 bg-teal-500 rounded-full" />

            {/* DUMMY DATA: Teks Sambutan yang dirapikan */}
            <div className="text-slate-700 text-lg leading-relaxed flex flex-col gap-4 font-normal">
              <p>
                Assalamu’alaikum Wr. Wb. Salam sejahtera bagi kita semua. Puji
                syukur kehadirat Tuhan Yang Maha Esa atas rahmat dan
                hidayah-Nya.
              </p>
              <p>
                SMAK DITKESAD bukan sekadar tempat menuntut ilmu, melainkan
                kawah candradimuka tempat ditempanya calon-calon tenaga
                kesehatan yang tidak hanya cerdas secara intelektual, namun juga
                memiliki mental baja, disiplin tinggi, dan semangat pengabdian
                tanpa pamrih layaknya seorang prajurit.
              </p>
              <p className="font-semibold text-slate-900">
                Kolonel Ckm (K) drg. Isna, M.Kes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM KEAHLIAN (Modern Layout dengan Shadcn Card) */}
      <section className="bg-slate-100 py-20">
        <div className="container mx-auto px-4 md:px-6 flex flex-col gap-16">
          <div className="text-center flex flex-col items-center gap-3">
            <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
              Pilihan Masa Depan
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-950 tracking-tight max-w-2xl">
              Tiga Pilar Keunggulan{" "}
              <span className="text-primary">Pendidikan Kesehatan</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programKeahlian.map((prodi, index) => {
              const Icon = prodi.icon;
              return (
                <Card
                  key={index}
                  className="border-none shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 rounded-2xl bg-white flex flex-col"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={prodi.image} // Alamat gambar dinamis
                      alt={prodi.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/40" />
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-3 rounded-full text-white border border-white/30 shadow-inner">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <CardHeader className="pt-6 pb-2">
                    <CardTitle className="text-2xl font-heading font-bold text-slate-950">
                      {prodi.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-slate-600 text-base leading-relaxed">
                      {prodi.description}
                    </CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Button
                      variant="link"
                      className="p-0 text-primary font-semibold hover:no-underline group"
                    >
                      Selengkapnya
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. BERITA & KEGIATAN TERBARU (Data Dynamic Simulation) */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-12">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
                Kabar SMAK Ditkesad
              </h4>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight">
                Berita & Kegiatan Terbaru
              </h2>
            </div>
            <Link href="/kegiatan">
              <Button
                variant="outline"
                className="rounded-full border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Lihat Semua Kegiatan
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {beritaTerbaru.map((berita, index) => (
              <div key={index} className="flex flex-col gap-4 group">
                <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={berita.image} // Alamat gambar dinamis
                    alt={berita.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {berita.category}
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-1">
                  <span className="text-sm text-slate-500 font-medium">
                    {berita.date}
                  </span>
                  <h3 className="text-xl font-heading font-semibold text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {berita.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION (PPDB) - Diubah Stylenya */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-primary rounded-3xl p-12 md:p-16 flex flex-col items-center text-center gap-6 shadow-xl shadow-primary/20 relative overflow-hidden">
          {/* Hiasan Background (Opsional) */}
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-teal-500 rounded-full opacity-20" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-navy-500 rounded-full opacity-30" />

          <Users className="h-16 w-16 text-teal-200 mb-2 relative z-10" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight relative z-10">
            Siap Bergabung Menjadi Tenaga Kesehatan Profesional?
          </h2>
          <p className="text-xl text-teal-100 max-w-2xl relative z-10">
            Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2024/2025 telah
            dibuka. Ambil langkah pertamamu menuju karir gemilang di dunia
            kesehatan bersama kami.
          </p>
          <Link href="/ppdb" className="relative z-10 mt-4">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full px-10 font-bold shadow-lg hover:shadow-amber-500/20 transition-all text-lg h-14"
            >
              Daftar Sekarang Melalui Portal PPDB
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
