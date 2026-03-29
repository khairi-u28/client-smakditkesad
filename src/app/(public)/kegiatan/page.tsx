import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BookOpenText, CalendarDays, Tag } from "lucide-react";

// DUMMY DATA: Artikel Kegiatan Lengkap
const semuaKegiatan = [
  {
    title:
      "Praktek Kerja Lapangan (PKL) Siswa Tingkat XI di RSPAD Gatot Soebroto",
    date: "15 Mei 2024",
    category: "Kegiatan Siswa",
    desc: "Siswa jurusan Asisten Keperawatan memulai praktek klinis intensif selama satu bulan di berbagai bangsal perawatan RSPAD Gatot Soebroto.",
    image: "/images/kegiatan1.jpg",
  },
  {
    title:
      "SMAK Ditkesad Raih Juara Umum Lomba Kompetensi Siswa (LKS) Bidang Keperawatan",
    date: "10 Mei 2024",
    category: "Prestasi",
    desc: "Tim perawat SMAK Ditkesad berhasil membawa pulang Juara 1, 2, dan Juara Harapan 1 dalam ajang LKS tingkat DKI Jakarta.",
    image: "/images/prestasi1.jpg",
  },
  {
    title:
      "Upacara Bendera Peringatan Hari Bakti TNI AD dan Pelantikan Pengurus OSIS",
    date: "02 Mei 2024",
    category: "Upacara",
    desc: "Upacara bendera berjalan khidmat diikuti oleh seluruh siswa, staf, dan guru. Dilanjutkan dengan serah terima jabatan pengurus OSIS.",
    image: "/images/upacara1.jpg",
  },
  {
    title:
      "Kunjungan Studi Banding SMK Kesehatan Jombang ke Fasilitas Lab SMAK Ditkesad",
    date: "25 Apr 2024",
    category: "Kerjasama",
    desc: "Kami menerima kunjungan dari rekan sejawat SMK Kesehatan Jombang untuk berbagi pengalaman pengelolaan laboratorium farmasi dan analis.",
    image: "/images/kegiatan2.jpg",
  },
];

export default function KegiatanPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* 1. PAGE HEADER */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opasity-10">
          <Image
            src="/images/sekolah-bg.jpg"
            alt="SMAK Ditkesad Sekolah"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/60 z-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center gap-3">
          <BookOpenText className="h-12 w-12 text-teal-400 mb-2" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Kegiatan & Berita Terbaru
          </h1>
          <div className="h-1 w-24 bg-amber-500 rounded-full mt-1" />
          <p className="text-xl text-slate-300 max-w-2xl mt-2">
            Ikuti kabar terkini, prestasi siswa, dan berbagai acara menarik di
            lingkungan SMAK Ditkesad Jakarta.
          </p>
        </div>
      </section>

      {/* 2. DAFTAR ARTIKEL (List Layout) */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {semuaKegiatan.map((berita, index) => (
            <div
              key={index}
              className="grid sm:grid-cols-12 gap-6 items-center group"
            >
              <div className="sm:col-span-5 relative h-56 w-full rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={berita.image} // Alamat gambar dinamis
                  alt={berita.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="sm:col-span-7 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CalendarDays size={16} />
                    {berita.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag size={16} />
                    {berita.category}
                  </div>
                </div>
                <h3 className="text-2xl font-heading font-semibold text-slate-950 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {berita.title}
                </h3>
                <p className="text-slate-600 text-base leading-relaxed line-clamp-2">
                  {berita.desc}
                </p>
                <Button
                  variant="link"
                  className="p-0 text-primary font-semibold hover:no-underline group w-fit mt-1"
                >
                  Baca Selengkapnya
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
