"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getHasil, Struk } from "@/lib/api";
import { Printer, CheckCircle } from "lucide-react";

function fmtDate(d?: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}
function fmtCurrency(v: string | number | null | undefined) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(v ?? 0));
}

const NAV_TABS = [
  { href: "/dashboard/lab",        label: "Dashboard" },
  { href: "/dashboard/lab/pasien", label: "Pasien" },
  { href: "/dashboard/lab/struk",  label: "Struk" },
  { href: "/dashboard/lab/hasil",  label: "Hasil Lab", active: true },
];

export default function HasilPage() {
  const [list, setList] = useState<Struk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHasil().then(setList).finally(() => setLoading(false));
  }, []);

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
      <div className="mb-5">
        <h1 className="text-xl font-bold font-heading text-slate-900">Hasil Lab Disetujui</h1>
        <p className="text-slate-500 text-sm">{list.length} hasil tersedia untuk dicetak</p>
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3].map(i => <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />)}</div>
      ) : list.length === 0 ? (
        <div className="text-center py-16">
          <CheckCircle size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 text-sm">Belum ada hasil lab yang disetujui.</p>
          <Link href="/dashboard/lab/struk" className="inline-block mt-2 text-sm text-teal-600 hover:underline">Lihat daftar struk</Link>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Kode Struk", "Pasien", "Total Tarif", "Tgl. Disetujui", "Aksi"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {list.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{s.kode_struk}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{s.pasien?.nama_pasien ?? "-"}</td>
                    <td className="px-4 py-3 text-teal-700 font-medium">{fmtCurrency(s.total_tarif)}</td>
                    <td className="px-4 py-3 text-slate-600">{fmtDate(s.approved_at)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => window.open(`/print/struk/${s.id}`, "_blank")}
                          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition">
                          <Printer size={12} /> Cetak Struk
                        </button>
                        <button onClick={() => window.open(`/print/hasil/${s.id}`, "_blank")}
                          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition">
                          <Printer size={12} /> Hasil Lab
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {list.map(s => (
              <div key={s.id} className="bg-white rounded-xl border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <p className="font-mono text-xs text-slate-500">{s.kode_struk}</p>
                    <p className="font-semibold text-slate-800">{s.pasien?.nama_pasien ?? "-"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-teal-700">{fmtCurrency(s.total_tarif)}</p>
                    <p className="text-xs text-slate-400">{fmtDate(s.approved_at)}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => window.open(`/print/struk/${s.id}`, "_blank")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition">
                    <Printer size={12} /> Cetak Struk
                  </button>
                  <button onClick={() => window.open(`/print/hasil/${s.id}`, "_blank")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition">
                    <Printer size={12} /> Hasil Lab
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
