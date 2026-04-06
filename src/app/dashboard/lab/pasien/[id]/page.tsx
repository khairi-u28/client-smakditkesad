"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getPasienById, updatePasien, Pasien, ApiError } from "@/lib/api";
import { ArrowLeft, Pencil, X, Save } from "lucide-react";

const inputCls = "w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition";
const labelCls = "block text-xs font-medium text-slate-600 mb-1";

type FormData = {
  nama_pasien: string;
  kategori_pasien: string;
  jenis_kelamin: string;
  golongan_darah: string;
  status_pernikahan: string;
  no_telepon: string;
  pekerjaan: string;
  no_kk: string;
  nama_ayah: string;
  nama_ibu: string;
  alamat: string;
  dokter_pengirim: string;
  tanggal_registrasi: string;
};

function toForm(p: Pasien): FormData {
  return {
    nama_pasien: p.nama_pasien ?? "",
    kategori_pasien: p.kategori_pasien ?? "Umum",
    jenis_kelamin: p.jenis_kelamin ?? "Laki-laki",
    golongan_darah: p.golongan_darah ?? "",
    status_pernikahan: p.status_pernikahan ?? "",
    no_telepon: p.no_telepon ?? "",
    pekerjaan: p.pekerjaan ?? "",
    no_kk: p.no_kk ?? "",
    nama_ayah: p.nama_ayah ?? "",
    nama_ibu: p.nama_ibu ?? "",
    alamat: p.alamat ?? "",
    dokter_pengirim: p.dokter_pengirim ?? "",
    tanggal_registrasi: p.tanggal_registrasi ? p.tanggal_registrasi.split("T")[0] : "",
  };
}

function fmtDate(d?: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

const TABS = [
  { href: "/dashboard/lab",        label: "Dashboard" },
  { href: "/dashboard/lab/pasien", label: "Pasien", active: true },
  { href: "/dashboard/lab/struk",  label: "Struk" },
  { href: "/dashboard/lab/hasil",  label: "Hasil Lab" },
];

export default function PasienDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [pasien, setPasien] = useState<Pasien | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<FormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    getPasienById(Number(id))
      .then(data => { setPasien(data); setForm(toForm(data)); })
      .catch(err => setError(err instanceof ApiError ? err.message : "Gagal memuat data."))
      .finally(() => setLoading(false));
  }, [id]);

  function set(k: keyof FormData, v: string) {
    setForm(f => f ? { ...f, [k]: v } : f);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSaveError("");
    setSaving(true);
    try {
      const payload: Record<string, unknown> = { ...form };
      for (const k of Object.keys(payload)) {
        if (payload[k] === "") payload[k] = null;
      }
      const updated = await updatePasien(Number(id), payload);
      setPasien(updated);
      setForm(toForm(updated));
      setEditing(false);
    } catch (err) {
      setSaveError(err instanceof ApiError ? err.message : "Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (pasien) setForm(toForm(pasien));
    setSaveError("");
    setEditing(false);
  }

  const categoryColor =
    pasien?.kategori_pasien === "BPJS" ? "bg-blue-100 text-blue-700" :
    pasien?.kategori_pasien === "Asuransi Lain" ? "bg-purple-100 text-purple-700" :
    "bg-slate-100 text-slate-600";

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

      {/* Back + header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-1.5 hover:bg-slate-100 rounded-lg transition text-slate-400">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold font-heading text-slate-900">
            {loading ? "Memuat..." : pasien?.nama_pasien ?? "Detail Pasien"}
          </h1>
          {pasien && (
            <p className="text-xs font-mono text-slate-500">{pasien.kode_registrasi}</p>
          )}
        </div>
        {pasien && !editing && (
          <>
            <button onClick={() => setEditing(true)}
              className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-100 text-slate-700 text-sm font-medium px-4 py-2.5 rounded-xl transition">
              <Pencil size={15} /> Edit
            </button>
            <Link href={`/dashboard/lab/struk/baru?pasien=${pasien.id}`}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition">
              Buat Struk
            </Link>
          </>
        )}
        {editing && (
          <button onClick={handleCancel}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition">
            <X size={15} /> Batal
          </button>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-10 bg-slate-100 rounded-xl animate-pulse" />)}
        </div>
      )}

      {/* Content */}
      {!loading && pasien && form && (
        editing ? (
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6">
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

            {saveError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{saveError}</p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={handleCancel}
                className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-xl transition">Batal</button>
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition disabled:opacity-60">
                <Save size={15} /> {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50">
            <div className="px-6 py-5 flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-slate-900">{pasien.nama_pasien}</p>
                <p className="text-xs font-mono text-slate-500 mt-0.5">{pasien.kode_registrasi}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryColor}`}>
                {pasien.kategori_pasien}
              </span>
            </div>

            <div className="px-6 py-5">
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-4">Identitas Pasien</p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <DetailRow label="Jenis Kelamin" value={pasien.jenis_kelamin} />
                <DetailRow label="Golongan Darah" value={pasien.golongan_darah ?? "-"} />
                <DetailRow label="Status Pernikahan" value={pasien.status_pernikahan ?? "-"} />
                <DetailRow label="Tanggal Registrasi" value={fmtDate(pasien.tanggal_registrasi)} />
              </dl>
            </div>

            <div className="px-6 py-5">
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wide mb-4">Kontak & Informasi</p>
              <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <DetailRow label="No. Telepon" value={pasien.no_telepon ?? "-"} />
                <DetailRow label="Pekerjaan" value={pasien.pekerjaan ?? "-"} />
                <DetailRow label="No. KK" value={pasien.no_kk ?? "-"} />
                <DetailRow label="Dokter Pengirim" value={pasien.dokter_pengirim ?? "-"} />
                <DetailRow label="Nama Ayah" value={pasien.nama_ayah ?? "-"} />
                <DetailRow label="Nama Ibu" value={pasien.nama_ibu ?? "-"} />
                <div className="sm:col-span-2">
                  <DetailRow label="Alamat" value={pasien.alamat ?? "-"} />
                </div>
              </dl>
            </div>
          </div>
        )
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-slate-400 mb-0.5">{label}</dt>
      <dd className="text-slate-800 font-medium">{value}</dd>
    </div>
  );
}
