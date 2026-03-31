import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DetailKegiatanPage({
  params,
}: {
  params: { id: string };
}) {
  // Simulasi fetch data berdasarkan ID
  const berita = {
    title: "Pelaksanaan Latihan Dasar Kepemimpinan Siswa (LDKS)",
    date: "15 Mei 2024",
    category: "Kegiatan Siswa",
    image: "/images/latsar.jpeg",
    content:
      "Latihan Dasar Kepemimpinan Siswa (LDKS) merupakan program tahunan wajib bagi siswa baru di SMK ANALIS KESEHATAN PUSKESAD. Kegiatan ini bertujuan untuk menanamkan kedisiplinan, kemandirian, dan semangat jiwa korsa ala prajurit kesehatan. Selama kegiatan, siswa dilatih langsung oleh para instruktur berpengalaman dari lingkungan militer.",
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
      <Link href="/kegiatan">
        <Button
          variant="ghost"
          className="mb-8 text-slate-500 hover:text-primary pl-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Kegiatan
        </Button>
      </Link>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mb-4">
        <div className="flex items-center gap-1.5">
          <CalendarDays size={16} />
          {berita.date}
        </div>
        <div className="flex items-center gap-1.5 bg-teal-50 text-teal-600 px-3 py-1 rounded-full">
          <Tag size={14} />
          {berita.category}
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-8 leading-tight">
        {berita.title}
      </h1>

      <div className="relative h-[300px] md:h-[500px] w-full rounded-3xl overflow-hidden shadow-lg mb-10">
        <Image
          src={berita.image}
          alt={berita.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="prose prose-lg prose-slate max-w-none">
        <p className="text-slate-700 leading-relaxed text-lg">
          {berita.content}
        </p>
        <p className="text-slate-700 leading-relaxed text-lg mt-4">
          Diharapkan melalui kegiatan ini, para siswa dapat menjadi calon tenaga
          kesehatan yang tidak hanya pandai secara akademis, namun juga tangguh
          dalam menghadapi tantangan di lapangan kerja kelak.
        </p>
      </div>
    </div>
  );
}
