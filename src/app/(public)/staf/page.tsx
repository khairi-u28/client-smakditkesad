import Image from "next/image";
import { Users, GraduationCap } from "lucide-react";

const stafGuru = [
  { name: "Dr. Arie Sugiyartati, M.Hum.", role: "Guru Bahasa Inggris", education: "S3: Linguistik — Universitas Hasanudin", image: "/images/Arie.jpeg" },
  { name: "Novita Sari, S.Pd", role: "Guru Bimbingan Konseling", education: "S1: Pendidikan — Universitas Indraprasta PGRI", image: "/images/Novita.jpg" },
  { name: "Siti Sumaliyah, M.Pd.", role: "Guru KTLM 4 Praktik", education: "S2: Pendidikan MIPA — Universitas Indraprasta PGRI", image: "/images/SITI SUMALIYAh.jpg" },
  { name: "Sertu Jumardi A.Md.A.K., S.Pd", role: "Guru Praktik KTLM 2", education: "S1: Biologi — Universitas Indraprasta PGRI", image: "/images/PAKJUMM.jpeg" },
  { name: "Devita Eka Rahmadani, S.Pd. Gr.", role: "Guru Bahasa Indonesia", education: "S1: PGSD — Universitas Negeri Jakarta", image: "/images/DEVITA.jpg" },
  { name: "Rieka Puspita Hartanty, S.Pd", role: "Guru PKK Teori", education: "S1: Pendidikan Ekonomi — STKIP Purnama", image: "/images/RIEKAAA.jpeg" },
  { name: "Melida Thayyibah, S.S", role: "Guru Bahasa Mandarin", education: "S1: Sastra Cina — Universitas Darma Persada", image: "/images/Melida.jpg" },
  { name: "Suparmo, S.Pd.", role: "Guru Pendidikan Pancasila", education: "S1: Pendidikan Kewarganegaraan — STKIP Kusuma Negara", image: "/images/Suparmo.jpg" },
  { name: "Irmayanti, M.Kes", role: "Guru Mikrobiologi Praktik", education: "S2: Kesehatan Masyarakat — Universitas Respati Indonesia", image: "/images/Irma.jpeg" },
  { name: "Anisa Dwi Kusherawati, S.Pd", role: "Guru DTLM 5", education: "S1: Pendidikan Biologi — Universitas Indraprasta PGRI", image: "/images/ANISA.jpg" },
  { name: "Maya Adriyanti, S.TP.", role: "Guru PKK Praktik", education: "S1: Ilmu dan Teknologi Pangan", image: "/images/MAYA.jpg" },
  { name: "Lutfiah Nurul Janah, S.Pd., Gr.", role: "Guru Sejarah", education: "S1: PGSD — Universitas Negeri Jakarta", image: "/images/LUTFIAH.jpg" },
  { name: "Letda Inf. Sutikno, S.Pd", role: "Guru PJOK", education: "S1: Pendidikan Umum — STKIP Purnama", image: "/images/TIKNO.jpg" },
  { name: "Irna Wandira, S.Pd", role: "Guru IPAS 2", education: "S1: Pendidikan Biologi — Universitas Indraprasta PGRI", image: "/images/Irna.jpg" },
  { name: "Marsudiyati, S.Pd", role: "Guru Bahasa Indonesia", education: "S1: Pendidikan Bahasa Indonesia — Universitas Negeri Jakarta", image: "/images/BELA.jpg" },
  { name: "Abdul Hakim Ma'ruf", role: "Guru Matematika", education: "S1: Pendidikan Matematika — UHAMKA", image: "/images/HAKIM.jpeg" },
  { name: "Agus Zehid, S.Hum", role: "Guru Agama", education: "S1: Ilmu Terjemah — UIN Syarif Hidayatullah Jakarta", image: "/images/Agus.jpg" },
  { name: "Dr. Enny Khotimah, AMAk.SE.MM", role: "Guru Imunoserologi", education: "S3: Ekonomi Manajemen", image: "/images/Enny.jpeg" },
  { name: "Drs. Budi Santosa, MM", role: "Guru Bahasa Indonesia", education: "S2: Ekonomi Manajemen — Universitas Gunadarma", image: "/images/BUDI.jpg" },
  { name: "Ambarsari Sulistyani, S.Km", role: "Guru DTLM 3", education: "S1: K3 — Universitas Respati Indonesia", image: "/images/ambar.jpg" },
  { name: "Muhamad Ade Rukhiat, S.S", role: "Guru Bahasa Inggris", education: "S1: Sastra Inggris — Universitas Gunadarma", image: "/images/ADER.jpg" },
  { name: "Kapten Ckm. drh. Dwi Puji Raharjo", role: "Guru KTLM 4", education: "S1: Dokter Hewan — Universitas Gajah Mada", image: "/images/DWI.jpg" },
  { name: "Edi Siswanto, S.Pd", role: "Guru Fisika", education: "S1: Pendidikan Matematika", image: "/images/EDI.jpg" },
  { name: "Serma Muhammad Utomo, Amd.AK.SE", role: "Guru Kimia Klinik Praktik", education: "S1: Manajemen", image: "/images/Tomo.jpg" },
  { name: "Caridi, S.Pd", role: "Guru Parasitologi Praktik", education: "S1: PDU — STKIP Purnama", image: "/images/Caridi.jpg" },
  { name: "Rika Safitri", role: "Guru Bahasa Jepang", education: "S1: Sastra Jepang — Universitas Padjajaran Bandung", image: "/images/Rika.jpg" },
  { name: "Nurhasanah, S.Ag", role: "Guru Pendidikan Agama Islam", education: "S1: Pendidikan Agama Islam — Universitas Islam Djakarta", image: "/images/nur.jpg" },
  { name: "Agung Prihatmoko, A.Md.A.K.", role: "Guru KTLM 1", education: "D3: TLM — Poltekkes 3 Jakarta", image: "/images/AGUNG.jpg" },
  { name: "Tiur Megawati Putri, A.Md.A.K.", role: "Asisten Laboratorium", education: "D3: TLM — Poltekkes 3 Jakarta", image: "/images/Tiur.jpg" },
  { name: "(Purn) Musa Korneles Rau", role: "Asisten Laboratorium", education: "SMK Analis Kesehatan Ditkesad", image: "/images/MUSA.jpg" },
];

export default function StafPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* PAGE HEADER */}
      <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="/images/sekolah-bg.jpg"
            alt="SMK Analis Kesehatan Ditkesad"
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-slate-950/70 z-10" />
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center gap-3">
          <Users className="h-12 w-12 text-teal-400 mb-2" />
          <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
            Tenaga Pendidik
          </h1>
          <div className="h-1 w-24 bg-amber-500 rounded-full mt-1" />
          <p className="text-xl text-slate-300 max-w-2xl mt-2">
            Profil tenaga pendidik SMK Analis Kesehatan Ditkesad — guru dan
            staf profesional berpengalaman di bidang kesehatan dan laboratorium.
          </p>
        </div>
      </section>

      {/* GRID TENAGA PENDIDIK */}
      <section className="container mx-auto px-4 md:px-6 pb-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {stafGuru.map((staf, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Photo */}
              <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
                <Image
                  src={staf.image}
                  alt={staf.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2 flex-grow">
                <h3 className="font-heading font-bold text-slate-900 text-sm leading-snug">
                  {staf.name}
                </h3>
                <p className="text-xs text-primary font-semibold">
                  {staf.role}
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-start gap-2">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {staf.education}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-sm mt-12">
          Menampilkan {stafGuru.length} tenaga pendidik &amp; staf
        </p>
      </section>
    </div>
  );
}
