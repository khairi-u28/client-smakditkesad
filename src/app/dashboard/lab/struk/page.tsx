"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStruk, Struk, StrukStatus } from "@/lib/api";
import { Plus, FileText } from "lucide-react";

function fmtDate(d?: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtCurrency(v: string | number | null | undefined) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(v ?? 0));
}

const STATUS_MAP: Record<StrukStatus, { label: string; cls: string }> = {
  draft:            { label: "Draft",     cls: "bg-slate-100 text-slate-600 border-slate-200" },
  menunggu_koreksi: { label: "Menunggu",  cls: "bg-amber-100 text-amber-700 border-amber-200" },
  approve:          { label: "Disetujui", cls: "bg-teal-100 text-teal-700 border-teal-200" },
  tolak:            { label: "Ditolak",   cls: "bg-red-100 text-red-600 border-red-200" },
};

const TABS_FILTER = [
  { key: "semua",           label: "Semua" },
  { key: "draft",           label: "Draft" },
  { key: "menunggu_koreksi",label: "Menunggu" },
  { key: "approve",         label: "Disetujui" },
  { key: "tolak",           label: "Ditolak" },
];

const NAV_TABS = [
  { href: "/dashboard/lab",        label: "Dashboard" },
  { href: "/dashboard/lab/pasien", label: "Pasien" },
  { href: "/dashboard/lab/struk",  label: "Struk", active: true },
  { href: "/dashboard/lab/hasil",  label: "Hasil Lab" },
];

export default function StrukPage() {
  const [list, setList] = useState<Struk[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    getStruk().then(setList).finally(() => setLoading(false));
  }, []);

  const filtered = filter === "semua" ? list : list.filter(s => s.status === filter);

  return (
    <div>
      {/* Sub-nav */}
      <div className="flex gap-0.5 border-b border-slate-200 mb-6 overflow-x-auto">
        {NAV_TABS.map(t => (
          <Link key={t.href} href={t.href}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition ${
              t.active ? "border-teal-600 text-teal-700" : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >{t.label}</Link>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
        <div className="flex-1">
          <h1 className="text-xl font-bold font-heading text-slate-900">Struk Pemeriksaan</h1>
          <p className="text-slate-500 text-sm">{list.length} struk total</p>
        </div>
        <Link href="/dashboard/lab/struk/baru"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition">
          <Plus size={16} /> Buat Struk
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 mb-4">
        {TABS_FILTER.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition ${
              filter === t.key ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >{t.label} {t.key !== "semua" && !loading && `(${list.filter(s => s.status === t.key).length})`}</button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <FileText size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 text-sm">Tidak ada struk {filter !== "semua" ? `dengan status "${TABS_FILTER.find(t => t.key === filter)?.label}"` : ""}.</p>
          <Link href="/dashboard/lab/struk/baru" className="inline-flex items-center gap-1 mt-3 text-sm text-teal-600 hover:underline">
            <Plus size={14} /> Buat struk baru
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Kode Struk", "Pasien", "Total Tarif", "Status", "Tgl. Periksa", "Aksi"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(s => {
                  const sm = STATUS_MAP[s.status];
                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition">
                      <td className="px-4 py-3 font-mono text-xs text-slate-700">{s.kode_struk}</td>
                      <td className="px-4 py-3 text-slate-800">{s.pasien?.nama_pasien ?? <span className="text-slate-400">-</span>}</td>
                      <td className="px-4 py-3 text-slate-700 font-medium">{fmtCurrency(s.total_tarif)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${sm.cls}`}>{sm.label}</span>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{fmtDate(s.tanggal_pemeriksaan)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Link href={`/dashboard/lab/struk/${s.id}`}
                            className="text-xs text-teal-600 hover:underline">Detail</Link>
                          {s.status === "approve" && (
                            <>
                              <span className="text-slate-200">|</span>
                              <button onClick={() => window.open(`/print/struk/${s.id}`, "_blank")}
                                className="text-xs text-slate-500 hover:text-slate-700 hover:underline">Cetak Struk</button>
                              <span className="text-slate-200">|</span>
                              <button onClick={() => window.open(`/print/hasil/${s.id}`, "_blank")}
                                className="text-xs text-slate-500 hover:text-slate-700 hover:underline">Hasil Lab</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {filtered.map(s => {
              const sm = STATUS_MAP[s.status];
              return (
                <Link key={s.id} href={`/dashboard/lab/struk/${s.id}`}
                  className="block bg-white rounded-xl border border-slate-100 p-4 hover:shadow-sm transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="font-mono text-xs text-slate-600">{s.kode_struk}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${sm.cls}`}>{sm.label}</span>
                  </div>
                  <p className="font-semibold text-slate-800 text-sm">{s.pasien?.nama_pasien ?? "-"}</p>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-sm font-medium text-teal-700">{fmtCurrency(s.total_tarif)}</p>
                    <p className="text-xs text-slate-400">{fmtDate(s.tanggal_pemeriksaan)}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
