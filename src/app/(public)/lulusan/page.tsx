import Image from "next/image";
import { Quote, GraduationCap, Users, TrendingUp } from "lucide-react";

const testimoni = [
  {
    name: "Danang Febrian Syaputra",
    role: "Prajurit Dua Inf",
    image: "/images/testimoni-a.jpeg",
    quote:
      "Alhamdulillah saya bangga pernah menjadi bagian di SMK Analis Kesehatan Ditkesad &lsquo;Puskesad&rsquo;. Ilmu dan disiplin yang saya dapat di sini sangat membantu saya dalam menjalani karir di TNI.",
  },
  {
    name: "Renata Syafira",
    role: "POLTEKES KEMENKES Yogyakarta — Jurusan Teknologi Laboratorium Medis",
    image: "/images/testimoni-b.jpeg",
    quote:
      "Mau bergabung menjadi ATLM handal di dunia perkuliahan? SMK Analis Kesehatan Puskesad tempatnya! Fondasi praktik laboratorium yang kuat di sini membuat saya siap masuk Poltekkes.",
  },
  {
    name: "Rakha Aljiva Prabaswara",
    role: "Universitas Diponegoro",
    image: "/images/testimoni-c.jpeg",
    quote:
      "Haii temen-temen semuaa! Aku alumni SMK Analis Kesehatan Ditkesad, dan sekarang aku kuliah di Universitas Diponegoro. Pengalaman di lab sekolah sangat membantuku beradaptasi di perkuliahan.",
  },
  {
    name: "Aileen Surya Putri",
    role: "Universitas Gadjah Mada — Jurusan Teknik Nuklir",
    image: "/images/testimoni-d.jpeg",
    quote:
      "Sebagai alumni SMK Analis Kesehatan Ditkesad, kami bangga membawa ilmu, disiplin, dan integritas yang diajarkan ke jenjang yang lebih tinggi, bahkan hingga ke Universitas Gadjah Mada.",
  },
];

const stats = [
  { icon: Users, label: "Total Lulusan", value: "3.644+" },
  { icon: TrendingUp, label: "Terserap Kerja / Kuliah", value: "95%" },
  { icon: GraduationCap, label: "Tahun Berdiri", value: "1964" },
];

export default function LulusanPage() {
  return (
    <div className="flex flex-col gap-0 pb-20">
      {/* PAGE HEADER */}
      <section className="relative bg-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 to-slate-900/90" />
        <div className="relative container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-300 mb-4 bg-teal-900/50 px-4 py-1.5 rounded-full">
            Alumni
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Profil Lulusan
          </h1>
          <p className="text-slate-300 text-lg">
            Dengarkan cerita nyata dari alumni SMK Analis Kesehatan Ditkesad
            yang kini berkarir dan melanjutkan pendidikan di berbagai institusi
            bergengsi.
          </p>
        </div>
      </section>

      {/* STATS BANNER */}
      <section className="bg-teal-700 text-white">
        <div className="container mx-auto px-4 md:px-6 py-10 max-w-4xl">
          <div className="grid grid-cols-3 divide-x divide-teal-600">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-1 px-4 text-center">
                <s.icon size={22} className="text-teal-200 mb-1" />
                <span className="text-3xl font-bold">{s.value}</span>
                <span className="text-teal-200 text-xs">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI GRID */}
      <section className="container mx-auto px-4 md:px-6 py-20 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">
            Apa Kata Alumni Kami?
          </h2>
          <p className="text-slate-400 text-sm">
            Kisah nyata dari mereka yang telah merasakan manfaat pendidikan di
            SMK Analis Kesehatan Puskesad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimoni.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
            >
              {/* Quote body */}
              <div className="p-7 flex-1">
                <Quote size={32} className="text-teal-100 mb-3" />
                <p
                  className="text-slate-600 leading-relaxed text-sm italic"
                  dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }}
                />
              </div>
              {/* Author */}
              <div className="flex items-center gap-4 px-7 py-5 border-t border-slate-100 bg-slate-50">
                <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-teal-200">
                  <Image
                    src={t.image}
                    alt={t.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-xs text-teal-600 leading-snug">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}



