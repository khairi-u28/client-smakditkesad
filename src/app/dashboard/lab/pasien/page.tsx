"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getPasien, createPasien, Pasien, ApiError } from "@/lib/api";
import { UserPlus, Search, Users, X, ChevronRight } from "lucide-react";

function fmtDate(d?: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

const TABS = [
  { href: "/dashboard/lab",       label: "Dashboard" },
  { href: "/dashboard/lab/pasien", label: "Pasien", active: true },
  { href: "/dashboard/lab/struk",  label: "Struk" },
  { href: "/dashboard/lab/hasil",  label: "Hasil Lab" },
];

const inputCls = "w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition";
const labelCls = "block text-xs font-medium text-slate-600 mb-1";

const BLANK_FORM = {
  nama_pasien: "", kategori_pasien: "Umum", jenis_kelamin: "Laki-laki",
  golongan_darah: "", status_pernikahan: "", no_telepon: "",
  pekerjaan: "", no_kk: "", nama_ayah: "", nama_ibu: "",
  alamat: "", dokter_pengirim: "",
  tanggal_registrasi: new Date().toISOString().split("T")[0],
};

export default function PasienPage() {
  const [list, setList] = useState<Pasien[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...BLANK_FORM });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    getPasien().then(setList).finally(() => setLoading(false));
  }, []);

  const filtered = list.filter(p =>
    p.nama_pasien.toLowerCase().includes(query.toLowerCase()) ||
    p.kode_registrasi.toLowerCase().includes(query.toLowerCase())
  );

  function set(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { ...form };
      // strip empty strings → null
      for (const k of Object.keys(payload)) {
        if (payload[k] === "") payload[k] = null;
      }
      const created = await createPasien(payload);
      setList(prev => [created, ...prev]);
      setShowModal(false);
      setForm({ ...BLANK_FORM });
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Sub-nav */}
      <div className="flex gap-0.5 border-b border-slate-200 mb-6 overflow-x-auto">
        {TABS.map(t => (
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
          <h1 className="text-xl font-bold font-heading text-slate-900">Data Pasien</h1>
          <p className="text-slate-500 text-sm">{list.length} pasien terdaftar</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
        >
          <UserPlus size={16} /> Tambah Pasien
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama atau kode registrasi..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition" />
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-2">{[1,2,3,4,5].map(i => <div key={i} className="h-14 bg-slate-100 rounded-xl animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Users size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500 text-sm">{query ? "Tidak ditemukan." : "Belum ada data pasien."}</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-slate-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {["Kode Reg.", "Nama Pasien", "Kategori", "Gender", "Gol. Darah", "No. Telp", "Tgl. Registrasi", ""].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50 transition">
                    <td className="px-4 py-3 font-mono text-xs text-slate-600">{p.kode_registrasi}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{p.nama_pasien}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.kategori_pasien === "Umum" ? "bg-slate-100 text-slate-600" :
                        p.kategori_pasien === "BPJS" ? "bg-blue-100 text-blue-700" :
                        "bg-purple-100 text-purple-700"
                      }`}>{p.kategori_pasien}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{p.jenis_kelamin}</td>
                    <td className="px-4 py-3 text-slate-600">{p.golongan_darah || "-"}</td>
                    <td className="px-4 py-3 text-slate-600">{p.no_telepon || "-"}</td>
                    <td className="px-4 py-3 text-slate-600">{fmtDate(p.tanggal_registrasi)}</td>
                    <td className="px-4 py-3">
                      <Link href={`/dashboard/lab/struk/baru?pasien=${p.id}`}
                        className="text-xs text-teal-600 hover:underline whitespace-nowrap">Buat Struk</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-2">
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-xl border border-slate-100 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 truncate">{p.nama_pasien}</p>
                    <p className="text-xs font-mono text-slate-500">{p.kode_registrasi}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                    p.kategori_pasien === "Umum" ? "bg-slate-100 text-slate-600" :
                    p.kategori_pasien === "BPJS" ? "bg-blue-100 text-blue-700" :
                    "bg-purple-100 text-purple-700"
                  }`}>{p.kategori_pasien}</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>{p.jenis_kelamin}</span>
                  {p.golongan_darah && <span>Gol. {p.golongan_darah}</span>}
                  {p.no_telepon && <span>{p.no_telepon}</span>}
                  <span>{fmtDate(p.tanggal_registrasi)}</span>
                </div>
                <div className="mt-3 flex justify-end">
                  <Link href={`/dashboard/lab/struk/baru?pasien=${p.id}`}
                    className="inline-flex items-center gap-1 text-xs text-teal-600 hover:underline">
                    Buat Struk <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Add Pasien Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/40 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900 font-heading">Tambah Pasien Baru</h2>
              <button onClick={() => { setShowModal(false); setFormError(""); }}
                className="p-1.5 hover:bg-slate-100 rounded-lg transition text-slate-400">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Section 1 */}
              <div>
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-3">Identitas Pasien</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Nama Pasien *</label>
                    <input required value={form.nama_pasien} onChange={e => set("nama_pasien", e.target.value)}
                      placeholder="Nama lengkap" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Kategori *</label>
                    <select required value={form.kategori_pasien} onChange={e => set("kategori_pasien", e.target.value)} className={inputCls}>
                      {["Umum", "BPJS", "Asuransi Lain"].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Jenis Kelamin *</label>
                    <select required value={form.jenis_kelamin} onChange={e => set("jenis_kelamin", e.target.value)} className={inputCls}>
                      {["Laki-laki", "Perempuan"].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Golongan Darah</label>
                    <select value={form.golongan_darah} onChange={e => set("golongan_darah", e.target.value)} className={inputCls}>
                      <option value="">— Pilih —</option>
                      {["A", "B", "AB", "O", "-"].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Status Pernikahan</label>
                    <select value={form.status_pernikahan} onChange={e => set("status_pernikahan", e.target.value)} className={inputCls}>
                      <option value="">— Pilih —</option>
                      {["Belum Menikah", "Menikah", "Cerai"].map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              {/* Section 2 */}
              <div>
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-3">Kontak & Informasi</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>No. Telepon</label>
                    <input value={form.no_telepon} onChange={e => set("no_telepon", e.target.value)} placeholder="08xx..." className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Pekerjaan</label>
                    <input value={form.pekerjaan} onChange={e => set("pekerjaan", e.target.value)} placeholder="Pelajar, Wiraswasta..." className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Alamat</label>
                    <textarea value={form.alamat} onChange={e => set("alamat", e.target.value)} rows={2}
                      placeholder="Alamat lengkap" className={inputCls + " resize-none"} />
                  </div>
                  <div>
                    <label className={labelCls}>No. KK</label>
                    <input value={form.no_kk} onChange={e => set("no_kk", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Dokter Pengirim</label>
                    <input value={form.dokter_pengirim} onChange={e => set("dokter_pengirim", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nama Ayah</label>
                    <input value={form.nama_ayah} onChange={e => set("nama_ayah", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Nama Ibu</label>
                    <input value={form.nama_ibu} onChange={e => set("nama_ibu", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Tanggal Registrasi</label>
                    <input type="date" value={form.tanggal_registrasi} onChange={e => set("tanggal_registrasi", e.target.value)} className={inputCls} />
                  </div>
                </div>
              </div>

              {formError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{formError}</p>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); setFormError(""); }}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition">Batal</button>
                <button type="submit" disabled={saving}
                  className="px-5 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition disabled:opacity-60">
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
