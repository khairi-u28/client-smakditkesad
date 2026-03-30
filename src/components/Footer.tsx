import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Kolom 1: Logo & Deskripsi */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                <Image
                  src="/images/logoanalisfix.png"
                  alt="Logo SMAK Ditkesad"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg leading-tight text-white">
                  SMK ANALIS KESEHATAN
                </span>
                <span className="text-xs font-medium text-teal-400 tracking-wider">
                  PUSKESAD
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-base leading-relaxed max-w-md">
              Institusi Pendidikan Menengah Kejuruan Kesehatan di bawah naungan
              Direktorat Kesehatan Angkatan Darat, mencetak lulusan berkarakter,
              disiplin, dan profesional.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link href="#" className="hover:text-teal-400 transition-colors">
                <FaInstagram size={20} />
              </Link>
              <Link href="#" className="hover:text-teal-400 transition-colors">
                <FaFacebookF size={20} />
              </Link>
              <Link href="#" className="hover:text-teal-400 transition-colors">
                <FaYoutube size={20} />
              </Link>
            </div>
          </div>

          {/* Kolom 2: Navigasi */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h5 className="font-heading font-semibold text-white text-lg">
              Halaman Utama
            </h5>
            <nav className="flex flex-col gap-2.5 text-base">
              <Link href="/profil" className="hover:text-white transition-colors">
                Profil Sekolah
              </Link>
              <Link href="/kepsek" className="hover:text-white transition-colors">
                Profil Kepala Sekolah
              </Link>
              <Link href="/staf" className="hover:text-white transition-colors">
                Staf & Pengajar
              </Link>
              <Link href="/kegiatan" className="hover:text-white transition-colors">
                Kegiatan & Berita
              </Link>
              <Link href="/ppdb" className="hover:text-white transition-colors">
                Pendaftaran (PPDB)
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Portal Siswa
              </Link>
            </nav>
          </div>

          {/* Kolom 3: Kontak (Diambil dari bagian footer HTML lama) */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h5 className="font-heading font-semibold text-white text-lg">
              Kontak Sekolah
            </h5>
            <div className="flex flex-col gap-4 text-base">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-500 mt-1 flex-shrink-0" />
                <p>
                  Jl. Jankes AD, RT.10/RW.1, Munjul, Kec. Cipayung, Jakarta
                  Timur 13850.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <p>0813-1123-789</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-500 flex-shrink-0" />
                <p>info@smakditkesad.sch.id</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Bawah Footer */}
      <div className="bg-slate-950 border-t border-slate-800 py-6">
        <div className="container mx-auto px-4 md:px-6 text-center text-slate-500 text-sm">
          <p suppressHydrationWarning>
            &copy; {currentYear} SMK ANALIS KESEHATAN PUSKESAD Jakarta. All Rights Reserved.
          </p>
          {/* <p className="text-xs mt-1">
            Dikembangkan dengan Teknologi Next.js & Shadcn UI.
          </p> */}
        </div>
      </div>
    </footer>
  );
}
