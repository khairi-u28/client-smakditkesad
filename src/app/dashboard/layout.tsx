"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getMe, logout, SiswaProfile, ApiError } from "@/lib/api";
import { BookOpen, FlaskConical, LogOut, Menu } from "lucide-react";

const NAV_LINKS = [
  { href: "/dashboard/elibrary", label: "E-Library", icon: BookOpen },
  { href: "/dashboard/lab", label: "Lab Kasir", icon: FlaskConical },
];

function SidebarContent({
  siswa,
  pathname,
  onLogout,
}: {
  siswa: SiswaProfile;
  pathname: string;
  onLogout: () => void;
}) {
  return (
    <div className="flex flex-col h-full py-6 px-4">
      {/* Logo */}
      <div className="flex items-center gap-3 px-2 mb-8">
        <Image src="/images/logoanalisfix.png" alt="Logo" width={40} height={40} />
        <div>
          <p className="text-xs font-semibold text-teal-700 leading-tight">SMK Analis</p>
          <p className="text-xs text-slate-500 leading-tight">Kesehatan Ditkesad</p>
        </div>
      </div>

      {/* User info */}
      <div className="mx-2 mb-6 p-3 bg-teal-50 rounded-xl border border-teal-100">
        <p className="text-sm font-semibold text-slate-800 truncate">{siswa.nama}</p>
        <p className="text-xs text-teal-700 truncate">
          {[siswa.jenis_kelamin === "L" ? "Laki-laki" : siswa.jenis_kelamin === "P" ? "Perempuan" : null, siswa.agama].filter(Boolean).join(" · ")}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">NIPD: {siswa.nipd}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {NAV_LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                active
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition mt-4"
      >
        <LogOut size={18} />
        Keluar
      </button>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [siswa, setSiswa] = useState<SiswaProfile | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getMe()
      .then(setSiswa)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
        } else {
          // Network error or unexpected — still redirect to login
          router.replace("/login");
        }
      })
      .finally(() => setAuthChecked(true));
  }, [router]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch {
      // If logout fails (e.g. network), we still clear client-side state
    }
    localStorage.removeItem("smak_siswa");
    router.push("/login");
  }, [router]);

  // Show loading spinner while checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-teal-600">
          <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <span className="text-sm">Memuat...</span>
        </div>
      </div>
    );
  }

  // Auth check done but no siswa → redirecting
  if (!siswa) return null;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed inset-y-0 left-0 z-30">
        <SidebarContent siswa={siswa} pathname={pathname} onLogout={handleLogout} />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="relative flex flex-col w-64 bg-white h-full shadow-xl">
            <SidebarContent
              siswa={siswa}
              pathname={pathname}
              onLogout={() => {
                setSidebarOpen(false);
                handleLogout();
              }}
            />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* Mobile topbar */}
        <header className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
            aria-label="Buka menu"
          >
            <Menu size={22} />
          </button>
          <span className="font-semibold text-teal-700 text-sm">SMK Analis Ditkesad</span>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
