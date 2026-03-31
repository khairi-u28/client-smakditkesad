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
  Eye,
  CheckCircle2,
  Wifi,
  Wrench,
  CalendarDays,
  GraduationCap,
  Building2,
} from "lucide-react";

const programKeahlian = [
  {
    title: "Asisten Keperawatan",
    description:
      "Mencetak asisten perawat yang terampil, berdedikasi tinggi, dan siap memberikan pelayanan dasar keperawatan di fasilitas kesehatan masyarakat maupun militer.",
    icon: Stethoscope,
    image: "/images/smk.jpg",
  },
  {
    title: "Teknologi Laboratorium Medik",
    description:
      "Mendidik tenaga analis kesehatan yang teliti dan kompeten dalam melakukan pemeriksaan darah, urine, dan sampel biologis lainnya untuk diagnosis penyakit.",
    icon: Microscope,
    image: "/images/mikroskop.jpg",
  },
  {
    title: "Farmasi Klinis & Komunitas",
    description:
      "Menyelenggarakan pendidikan kefarmasian yang komprehensif, berfokus pada keahlian pengelolaan obat, pelayanan resep, dan konseling di apotek atau rumah sakit.",
    icon: BookOpenText,
    image: "/images/sarana-prasarana.jpeg",
  },
];

const beritaTerbaru = [
  {
    id: "kegiatan-1",
    title: "Kunjungan Studi Banding SMK Analis Kesehatan Jayapura",
    date: "18 Des 2025",
    category: "Kegiatan Siswa",
    image: "/images/kegiatan-1.jpeg",
  },
  {
    id: "kegiatan-2",
    title: "Bakti Sosial Keluarga Besar SMK Analis Kesehatan Ditkesad",
    date: "18 Des 2025",
    category: "Sosial",
    image: "/images/kegiatan-2.jpeg",
  },
  {
    id: "kegiatan-3",
    title: "Class Meeting Semester Ganjil Tahun Ajaran 2025/2026",
    date: "15 Des 2025",
    category: "Kegiatan Siswa",
    image: "/images/kegiatan-3.jpeg",
  },
  {
    id: "kegiatan-4",
    title: "Assesment Akhir Semester Ganjil",
    date: "24 Nov 2025",
    category: "Akademik",
    image: "/images/kegiatan-4.jpeg",
  },
];

const tenagaPendidik = [
  {
    name: "Letkol. Ckm Dr. Evul Winoto Lukito, S.Si, M.Si",
    position: "Kepala Sekolah",
    badge: "S3 (Doktor) - Ilmu Kimia",
    bidang: "",
    image: "/images/kepsek.jpg",
  },
  {
    name: "Tia Humaira, S.Tr.Kes",
    position: "Wakil Kepala Sekolah",
    badge: "D4 - Teknik Laboratorium Medik",
    bidang: "Bidang Kurikulum",
    image: "/images/teacher-2.jpeg",
  },
  {
    name: "Romdoni A.Md",
    position: "Wakil Kepala Sekolah",
    badge: "D3 - Informatika",
    bidang: "Bidang Kesiswaan",
    image: "/images/teacher.jpg",
  },
  {
    name: "Deni Arisandi, S.Sos",
    position: "Wakil Kepala Sekolah",
    badge: "S1 - Pengembangan Masyarakat",
    bidang: "Bidang Sarana & Prasarana",
    image: "/images/teacher-4.jpeg",
  },
];

const fasilitas = [
  {
    icon: Microscope,
    title: "Laboratorium Modern",
    description:
      "Dilengkapi peralatan laboratorium modern dan terstandarisasi. 1 siswa, 1 alat dalam setiap kegiatan praktikum.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Wifi,
    title: "WiFi Corner",
    description:
      "Fasilitas internet cepat di seluruh area sekolah untuk mendukung pembelajaran digital dan e-learning.",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Wrench,
    title: "Peralatan Penunjang",
    description:
      "Sarana dan prasarana lengkap, mulai dari ruang kelas ber-AC hingga lapangan olahraga yang memadai.",
    color: "text-emerald-500",
    bg: "bg-emerald-50",
  },
];

const kalenderAkademik = [
  { label: "Assessment Akhir Semester", tanggal: "Nov – Des 2025" },
  { label: "Class Meeting", tanggal: "Des 2025" },
  { label: "Uji Kompetensi Keahlian (UKK)", tanggal: "Apr 2026" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. HERO SECTION (Banner Utama) - Responsif & Diubah Stylenya */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/bg.jpg"
            alt="Background SMK Ditkesad"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
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
              Selamat Datang di SMK Ditkesad Jakarta. Institusi pendidikan
              terdepan yang memadukan keunggulan akademis bidang kesehatan
              (Keperawatan, Analis Kesehatan, & Farmasi) dengan kedisiplinan dan
              karakter prajurit.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link href="/ppdb">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full px-8 font-semibold"
                >
                  Daftar PPDB Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROFIL SEKOLAH & VISI MISI */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-4 items-center text-center mb-12">
          <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
            Tentang Kami
          </h4>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight max-w-2xl">
            Profil Sekolah &amp;{" "}
            <span className="text-primary">Visi Misi</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Profil */}
          <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-950">
                Profil Singkat
              </h3>
            </div>
            <div className="flex flex-col gap-3 text-slate-600 leading-relaxed">
              <p>
                Berdiri sejak tahun{" "}
                <strong className="text-slate-900">1964</strong> sebagai
                sekolah yang mendidik calon analis kesehatan untuk lingkungan
                kesehatan Angkatan Darat.
              </p>
              <p>
                Sejak tahun{" "}
                <strong className="text-slate-900">1973</strong> membuka
                penerimaan dari masyarakat umum.
              </p>
              <p>
                Hingga 2025 telah meluluskan sebanyak{" "}
                <strong className="text-slate-900">
                  3.644 Asisten Tenaga Analis Kesehatan
                </strong>{" "}
                yang tersebar di instansi pemerintah (TNI, Polri, Kemenkes)
                dan RS Swasta.
              </p>
            </div>
            <ul className="flex flex-col gap-2 mt-1">
              {[
                "Terakreditasi A (Unggul)",
                "Fasilitas laboratorium modern – 1 siswa, 1 alat",
                "Di bawah naungan Puskesad (Pusat Kesehatan Angkatan Darat)",
                "Tingkat penyerapan kerja lulusan 95% dalam 6 bulan",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-teal-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Visi Misi */}
          <div className="bg-primary rounded-3xl p-8 text-white flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold">Visi</h3>
              </div>
              <p className="text-teal-100 leading-relaxed italic">
                &ldquo;SMK Analis Kesehatan Puskesad bertekad untuk menyediakan
                tenaga analis kesehatan yang tanggap, tangguh, handal,
                profesional, disiplin, kreatif, informatif dan inovatif.&rdquo;
              </p>
            </div>
            <div className="h-px bg-white/20" />
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold">Misi</h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {[
                  "Menyediakan tenaga analis kesehatan untuk menunjang peran TNI, pemerintah dan swasta.",
                  "Meningkatkan kesehatan keluarga besar TNI dan masyarakat umum.",
                  "Mewujudkan peran TNI dalam pembangunan bidang pendidikan dan tenaga kerja.",
                  "Meningkatkan kerjasama dengan institusi militer dan kesehatan.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-teal-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-300 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SAMBUTAN KEPALA SEKOLAH */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-12 gap-12 items-center bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100">
          <div className="md:col-span-4 flex justify-center">
            <div className="relative w-72 h-72 md:w-full md:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200">
              <Image
                src="/images/kepsek.jpg"
                alt="Kepala Sekolah SMK Ditkesad"
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
              “Lingkungan dan orang-orang di sekitarmu sangat memengaruhi
                perjalanan hidup maka pilih circle yang mendukung kesuksesan
                masa depanmu”
            </h2>
            <div className="h-1 w-20 bg-teal-500 rounded-full" />
            <div className="text-slate-700 text-lg leading-relaxed flex flex-col gap-4 font-normal">
              <p>
                Pak Evul, merupakan panggilan akrab rekan–rekan Guru, Siswa
                serta keluarga besar SMK Analis Kesehatan Ditkesad dalam menyapa
                Letkol Ckm Dr. Evul Winoto Lukito, S.Si,. M.Si. Dilantik pada
                tanggal 10 Oktober 2025, Beliau secara resmi menjabat sebagai
                kepala SMK Analis Kesehatan Ditkesad saat ini.
              </p>
              <div className="mt-2">
                <p className="font-semibold text-slate-900 text-xl">
                  Letkol Ckm Dr. Evul Winoto Lukito, S.Si,. M.Si.
                </p>
                <p className="text-slate-500 text-sm">
                  Kepala Sekolah SMK Analis Kesehatan Puskesad
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM KEAHLIAN (Modern Layout) */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6 flex flex-col gap-16">
          <div className="text-center flex flex-col items-center gap-3">
            <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
              Pilihan Masa Depan
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-950 tracking-tight max-w-2xl">
              Tiga Pilar Keunggulan{" "}
              <span className="text-primary">Program Keahlian</span>
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
                      src={prodi.image}
                      alt={prodi.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors duration-300" />
                    <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md p-3 rounded-full text-white border border-white/50 shadow-lg">
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <CardHeader className="pt-6 pb-2">
                    <CardTitle className="text-xl font-heading font-bold text-slate-950 leading-snug">
                      {prodi.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-slate-600 text-sm leading-relaxed">
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

      {/* 5. BERITA & KEGIATAN TERBARU */}
      <section className="container mx-auto px-4 md:px-6 pt-10">
        <div className="flex flex-col gap-12">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight">
              Berita &amp; Kegiatan Terbaru
            </h2>
            <Link href="/kegiatan">
              <Button variant="outline" className="rounded-full font-medium">
                Lihat Semua Kegiatan
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beritaTerbaru.map((berita) => (
              <Link
                key={berita.id}
                href={`/kegiatan/${berita.id}`}
                className="flex flex-col gap-3 group cursor-pointer"
              >
                <div className="relative h-48 w-full rounded-2xl overflow-hidden shadow-md">
                  <Image
                    src={berita.image}
                    alt={berita.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {berita.category}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 px-1">
                  <span className="text-xs text-slate-500 font-medium">
                    {berita.date}
                  </span>
                  <h3 className="text-sm font-heading font-bold text-slate-900 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {berita.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROFIL TENAGA PENDIDIK */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6 flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-3">
            <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
              Tim Pengajar
            </h4>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight">
              Profil <span className="text-primary">Tenaga Pendidik</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tenagaPendidik.map((guru, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={guru.image}
                    alt={guru.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-grow">
                  <h5 className="font-heading font-bold text-slate-900 text-sm leading-snug">
                    {guru.name}
                  </h5>
                  <p className="text-xs text-slate-500">{guru.position}</p>
                  <span className="inline-block self-start bg-primary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full mt-1">
                    {guru.badge}
                  </span>
                  {guru.bidang && (
                    <p className="text-xs text-slate-600 mt-auto pt-3 border-t border-slate-100">
                      {guru.bidang}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/staf">
              <Button variant="outline" className="rounded-full border-slate-300">
                Lihat Seluruh Staf Pengajar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. PROFIL LULUSAN & TESTIMONI */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 md:h-full min-h-[420px] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/Alumni.jpeg"
              alt="Alumni SMK Analis Kesehatan Ditkesad"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span className="text-sm font-bold text-white bg-teal-500 px-3 py-1.5 rounded-full shadow">
                Angkatan 54 &ndash; 2024
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
              Kisah Sukses
            </h4>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight">
              Profil &amp; Testimoni{" "}
              <span className="text-primary">Lulusan</span>
            </h2>
            <div className="h-1 w-16 bg-teal-500 rounded-full" />
            <blockquote className="border-l-4 border-primary pl-5 italic text-slate-700 text-lg leading-relaxed">
              &ldquo;Dengan hormat, kami mengajak putra-putri terbaik untuk
              bergabung di SMK Analis Kesehatan Ditkesad &mdash; lembaga
              pendidikan kesehatan berstandar unggul, berkarakter, dan siap
              mencetak tenaga kesehatan masa depan.&rdquo;
            </blockquote>
            <p className="text-slate-500 text-sm font-medium">
              &mdash; Javit, Lulusan Angkatan 54 (2024)
            </p>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { value: "1964", label: "Tahun Berdiri" },
                { value: "3.644", label: "Total Lulusan" },
                { value: "95%", label: "Terserap Kerja" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100"
                >
                  <p className="text-2xl font-heading font-bold text-slate-950">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link href="/lulusan">
              <Button variant="outline" className="rounded-full self-start mt-2">
                Lihat Lebih Banyak Testimoni
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FASILITAS UNGGULAN */}
      <section className="bg-slate-50 py-20 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6 flex flex-col gap-12">
          <div className="text-center flex flex-col items-center gap-3">
            <h4 className="text-sm font-semibold text-primary tracking-widest uppercase">
              Infrastruktur
            </h4>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight">
              Fasilitas <span className="text-primary">Unggulan</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {fasilitas.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-md border border-slate-100 flex flex-col gap-4 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center`}
                  >
                    <Icon className={`h-7 w-7 ${item.color}`} />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. KALENDER AKADEMIK */}
      <section className="bg-slate-50 py-20 -mx-0">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h4 className="text-sm font-semibold text-primary tracking-widest uppercase mb-2">
              Jadwal Penting
            </h4>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-950 tracking-tight">
              Kalender <span className="text-primary">Akademik</span>
            </h2>
            <p className="text-slate-500 mt-3 text-sm max-w-lg mx-auto">
              Jadwal penting akademik tahun ini yang perlu dicatat oleh siswa
              dan orang tua.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {kalenderAkademik.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 bg-white rounded-2xl px-6 py-5 shadow-sm border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="text-slate-800 font-semibold text-sm">
                    {item.label}
                  </span>
                </div>
                <span className="text-primary font-bold text-sm whitespace-nowrap bg-primary/5 px-3 py-1.5 rounded-lg">
                  {item.tanggal}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION (PPDB) */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="bg-primary rounded-3xl p-10 md:p-16 flex flex-col items-center text-center gap-6 shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-teal-500 rounded-full opacity-20 blur-2xl" />
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full opacity-10 blur-xl" />

          <Users className="h-14 w-14 text-teal-100 mb-2 relative z-10" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight relative z-10 max-w-3xl">
            Siap Bergabung Menjadi Tenaga Kesehatan Profesional?
          </h2>
          <p className="text-lg md:text-xl text-teal-50 max-w-2xl relative z-10 font-light">
            Pendaftaran Peserta Didik Baru (PPDB) SMK Ditkesad Jakarta telah
            dibuka. Ambil langkah pertamamu menuju karir gemilang di dunia
            kesehatan bersama kami.
          </p>
          <Link href="/ppdb" className="relative z-10 mt-6">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-full px-10 font-bold shadow-lg hover:shadow-amber-500/20 transition-all text-base h-14"
            >
              Daftar Sekarang Melalui Portal PPDB
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
