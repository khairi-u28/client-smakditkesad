import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Mail, BookCheck } from "lucide-react";

// DUMMY DATA: Daftar Staff & Guru
const stafGuru = [
  {
    name: "Kolonel Ckm (K) drg. Isna, M.Kes.",
    role: "Kepala Sekolah",
    subject: "Kedokteran Gigi",
    image: "/images/stafkepsek.jpg",
  },
  {
    name: "Letkol Ckm Drs. Supriyadi, Apt.",
    role: "Waka Kurikulum",
    subject: "Farmasi Klinis",
    image: "/images/stafkurikulum.jpg",
  },
  {
    name: "Mayor Ckm Sri Mulyani, S.Kep., Ners.",
    role: "Kajur Keperawatan",
    subject: "Keperawatan Medikal Bedah",
    image: "/images/stafkeperawatan.jpg",
  },
  {
    name: "PNS Drs. Budi Santoso, M.Pd.",
    role: "Waka Kesiswaan",
    subject: "Bahasa Indonesia",
    image: "/images/stafkesiswaan.jpg",
  },
  {
    name: "Ny. Dian Pertiwi, S.Si., Apt.",
    role: "Guru Farmasi",
    subject: "Farmakognosi",
    image: "/images/staffarmasi1.jpg",
  },
  {
    name: "Ny. Rina Wulandari, S.ST.",
    role: "Guru Analis",
    subject: "Kimia Klinik",
    image: "/images/stafanalis1.jpg",
  },
];

export default function StafPage() {
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-slate-950/70 z-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center gap-3">
          <Users className="h-12 w-12 text-teal-400 mb-2" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Staf & Guru Pengajar
          </h1>
          <div className="h-1 w-24 bg-amber-500 rounded-full mt-1" />
          <p className="text-xl text-slate-300 max-w-2xl mt-2">
            Mengenal para pendidik dan tenaga kependidikan berdedikasi tinggi di
            SMAK Ditkesad.
          </p>
        </div>
      </section>

      {/* 2. DAFTAR GURU */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {stafGuru.map((staf, index) => (
            <Card
              key={index}
              className="border border-slate-100 shadow-md hover:shadow-xl transition-all rounded-2xl overflow-hidden group"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={staf.image} // Alamat gambar dinamis
                  alt={staf.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-heading font-semibold text-white leading-tight">
                    {staf.name}
                  </h3>
                  <p className="text-teal-300 text-sm font-medium">
                    {staf.role}
                  </p>
                </div>
              </div>
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <BookCheck className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>
                    Bidang:{" "}
                    <span className="font-semibold text-slate-900">
                      {staf.subject}
                    </span>
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
