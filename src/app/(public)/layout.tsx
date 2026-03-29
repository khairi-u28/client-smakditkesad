import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer"; // Import Footer baru

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      {/* pt-20 agar konten tidak tertutup fixed navbar */}
      <main className="flex-grow pt-20">{children}</main>
      <Footer /> {/* Tambahkan Footer di sini */}
    </div>
  );
}
