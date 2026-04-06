"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getStruk, getPasien, Struk,
} from "@/lib/api";
import { useSesi } from "@/lib/sesi-context";
import {
  FlaskConical, Users, FileText, CheckCircle, Clock, Plus, ArrowRight, Lock,
} from "lucide-react";

const STATUS_MAP = {
  draft:            { label: "Draft",     cls: "bg-slate-100 text-slate-600 border-slate-200" },
  menunggu_koreksi: { label: "Menunggu",  cls: "bg-amber-100 text-amber-700 border-amber-200" },
  approve:          { label: "Disetujui", cls: "bg-teal-100 text-teal-700 border-teal-200" },
  tolak:            { label: "Ditolak",   cls: "bg-red-100 text-red-600 border-red-200" },
} as const;

function fmtDate(d?: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function LabPage() {
  const { sesi, sesiLoading } = useSesi();
  const [struks, setStruks] = useState<Struk[]>([]);
  const [pasienCount, setPasienCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getStruk(), getPasien()])
      .then(([s, p]) => { setStruks(s); setPasienCount(p.length); })
      .finally(() => setLoading(false));
  }, []);

  const draft    = struks.filter(s => s.status === "draft").length;
  const menunggu = struks.filter(s => s.status === "menunggu_koreksi").length;
  const approve  = struks.filter(s => s.status === "approve").length;
  const recent   = struks.slice(0, 6);

  const stats = [
    { label: "Total Pasien",      value: pasienCount, icon: Users,        color: "text-blue-600",  bg: "bg-blue-50",   href: "/dashboard/lab/pasien" },
    { label: "Struk Draft",       value: draft,       icon: FileText,     color: "text-slate-600", bg: "bg-slate-100", href: "/dashboard/lab/struk" },
    { label: "Menunggu Koreksi",  value: menunggu,    icon: Clock,        color: "text-amber-600", bg: "bg-amber-50",  href: "/dashboard/lab/struk" },
    { label: "Struk Disetujui",   value: approve,     icon: CheckCircle,  color: "text-teal-600",  bg: "bg-teal-50",   href: "/dashboard/lab/hasil" },
  ];

  return (
    <div>
      {/* Session status banner */}
      {!sesiLoading && (
        sesi ? (
          <div className={`mb-5 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
            sesi.has_time_limit
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-teal-50 border-teal-200 text-teal-800"
          }`}>
            <FlaskConical size={16} className="flex-shrink-0" />
            <span>
              <span className="font-semibold">Sesi Praktik Aktif</span>
              {sesi.nama_sesi && ` — ${sesi.nama_sesi}`}
              {sesi.has_time_limit && sesi.waktu_selesai && (
                <span className="ml-1 text-amber-700">
                  · Berakhir pukul {new Date(sesi.waktu_selesai).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              {!sesi.has_time_limit && <span className="ml-1 font-normal text-teal-600">· Tanpa batas waktu</span>}
            </span>
          </div>
        ) : (
          <div className="mb-5 flex flex-col items-center justify-center py-14 bg-white rounded-2xl border border-slate-100 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
              <Lock size={30} className="text-slate-400" />
            </div>
            <p className="text-base font-semibold text-slate-700 mb-1">Sesi Praktik Ditutup</p>
            <p className="text-sm text-slate-400 max-w-xs">
              Simulasi Kasir Lab sedang ditutup. Menunggu Guru mengaktifkan sesi praktik.
            </p>
          </div>
        )
      )}

      {/* Only show dashboard content when session is active */}
      {(sesiLoading || sesi) && (
        <>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
            <FlaskConical size={22} className="text-teal-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-slate-900">Lab Asnakes</h1>
            <p className="text-slate-500 text-sm">Sistem Kasir Laboratorium Analis Kesehatan</p>
          </div>
        </div>
        <Link
          href="/dashboard/lab/struk/baru"
          className={`inline-flex items-center gap-2 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition ${
            sesi ? "bg-teal-600 hover:bg-teal-700" : "bg-slate-300 pointer-events-none"
          }`}
          aria-disabled={!sesi}
        >
          <Plus size={16} /> Buat Struk
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link key={label} href={href} className="bg-white rounded-xl border border-slate-100 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon size={20} className={color} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold text-slate-800">{loading ? "—" : value}</p>
                <p className="text-xs text-slate-500 truncate">{label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Aksi Cepat</h2>
          <div className="space-y-1.5">
            {[
              { href: "/dashboard/lab/struk/baru", icon: Plus,        bg: "bg-teal-50",    ic: "text-teal-600",  title: "Buat Struk Baru",          sub: "Pilih pasien & pemeriksaan" },
              { href: "/dashboard/lab/pasien",     icon: Users,       bg: "bg-blue-50",   ic: "text-blue-600",  title: "Kelola Data Pasien",        sub: "Tambah atau lihat data pasien" },
              { href: "/dashboard/lab/hasil",      icon: CheckCircle, bg: "bg-teal-50",   ic: "text-teal-600",  title: "Lihat & Cetak Hasil Lab",   sub: "Struk yang sudah disetujui" },
            ].map(({ href, icon: Icon, bg, ic, title, sub }) => (
              <Link key={href} href={href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition group">
                <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={16} className={ic} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 group-hover:text-teal-700 transition">{title}</p>
                  <p className="text-xs text-slate-500">{sub}</p>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-teal-400 transition" />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent struks */}
        <div className="bg-white rounded-xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-700">Struk Terbaru</h2>
            <Link href="/dashboard/lab/struk" className="text-xs text-teal-600 hover:underline">Lihat semua →</Link>
          </div>
          {loading ? (
            <div className="space-y-2">{[1,2,3,4].map(i => <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />)}</div>
          ) : recent.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">Belum ada struk</p>
          ) : (
            <div className="space-y-1">
              {recent.map(s => {
                const sm = STATUS_MAP[s.status] ?? STATUS_MAP.draft;
                return (
                  <Link key={s.id} href={`/dashboard/lab/struk/${s.id}`}
                    className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 transition">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono font-medium text-slate-700 truncate">{s.kode_struk}</p>
                      <p className="text-xs text-slate-500 truncate">{s.pasien?.nama_pasien ?? "—"} · {fmtDate(s.tanggal_pemeriksaan)}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${sm.cls}`}>{sm.label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      </>
      )}
    </div>
  );
}

