import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Briefcase, GraduationCap } from "lucide-react";

// DUMMY DATA: Profil Alumni Sukses
const profilLulusan = [
  {
    name: "Sertu Ckm (K) Dian Lestari, A.Md.Kep.",
    jurusan: "Keperawatan (Angk. 2018)",
    role: "Perawat Bedah RSPAD Gatot Soebroto",
    image: "/images/lulusan1.jpg",
  },
  {
    name: "Dr. apt. Fitri Wulandari, M.Si.",
    jurusan: "Farmasi (Angk. 2015)",
    role: "Dosen Fakultas Farmasi UI",
    image: "/images/lulusan2.jpg",
  },
  {
    name: "Lettu Ckm Irwan Santoso, S.ST.",
    jurusan: "Analis Kesehatan (Angk. 2017)",
    role: "Kepala Lab Laboratorium Medik Kesdam Jaya",
    image: "/images/lulusan3.jpg",
  },
  {
    name: "Ny. Maya Sari, S.Kep.",
    jurusan: "Keperawatan (Angk. 2019)",
    role: "Perawat Senior Siloam Hospitals Semanggi",
    image: "/images/lulusan4.jpg",
  },
];

export default function LulusanPage() {
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
          <Award className="h-12 w-12 text-teal-400 mb-2" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Profil Alumni Sukses
          </h1>
          <div className="h-1 w-24 bg-amber-500 rounded-full mt-1" />
          <p className="text-xl text-slate-300 max-w-2xl mt-2">
            Inspirasi dari para lulusan SMAK Ditkesad yang telah berkarir
            cemerlang di berbagai instansi kesehatan militer maupun umum.
          </p>
        </div>
      </section>

      {/* 2. DAFTAR ALUMNI */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {profilLulusan.map((alumni, index) => (
            <Card
              key={index}
              className="border border-slate-100 shadow-md hover:shadow-xl transition-all rounded-2xl overflow-hidden group"
            >
              <div className="relative h-72 w-full overflow-hidden p-6 bg-slate-100 flex items-center justify-center">
                <div className="relative h-48 w-48 rounded-full overflow-hidden border-4 border-white shadow-lg ring-1 ring-slate-200">
                  <Image
                    src={alumni.image} // Alamat gambar dinamis
                    alt={alumni.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                  />
                </div>
              </div>
              <CardContent className="p-5 flex flex-col gap-4 text-sm">
                <h3 className="text-lg font-heading font-semibold text-slate-950 leading-tight">
                  {alumni.name}
                </h3>

                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-3 text-slate-700">
                    <GraduationCap className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>
                      Lulusan:{" "}
                      <span className="font-medium text-slate-900">
                        {alumni.jurusan}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start gap-3 text-slate-700 p-3 bg-teal-50 rounded-lg border border-teal-100 shadow-inner">
                    <Briefcase className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                    <span>
                      Posisi saat ini:{" "}
                      <span className="font-semibold text-slate-950">
                        {alumni.role}
                      </span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
