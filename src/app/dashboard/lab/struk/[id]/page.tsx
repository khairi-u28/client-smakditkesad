"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  getStruk, updateStruk, submitStruk, getCachedStruk, getHasilById,
  Struk, PemeriksaanItem, HasilLabDetail, StrukStatus, ApiError,
} from "@/lib/api";
import { ChevronLeft, Printer, Save, Send, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";

function fmtDate(d?: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}
function fmtCurrency(v: string | number | null | undefined) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(v ?? 0));
}

const STATUS_MAP: Record<StrukStatus, { label: string; icon: React.ReactNode; cls: string }> = {
  draft:            { label: "Draft",            icon: <Save size={14} />,         cls: "bg-slate-100 text-slate-600 border-slate-200" },
  menunggu_koreksi: { label: "Menunggu Koreksi", icon: <Clock size={14} />,        cls: "bg-amber-100 text-amber-700 border-amber-200" },
  approve:          { label: "Disetujui",         icon: <CheckCircle size={14} />,  cls: "bg-teal-100 text-teal-700 border-teal-200" },
  tolak:            { label: "Ditolak",           icon: <XCircle size={14} />,      cls: "bg-red-100 text-red-600 border-red-200" },
};

export default function StrukDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [struk, setStruk] = useState<Struk | null>(null);
  const [hasil, setHasil] = useState<HasilLabDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Edit hasil state (keyed by idPemeriksaan)
  const [hasilMap, setHasilMap] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Pemeriksaans from cache or hasil
  const pemeriksaans: PemeriksaanItem[] = hasil?.pemeriksaans ?? struk?.pemeriksaans ?? [];

  useEffect(() => {
    const numId = Number(id);
    async function load() {
      try {
        // Try to get from struk list
        const struks = await getStruk();
        const found = struks.find(s => s.id === numId);
        if (!found) { setNotFound(true); return; }

        // Merge with sessionStorage cache for pemeriksaans
        const cached = getCachedStruk(numId);
        if (cached) {
          setStruk({ ...found, pemeriksaans: cached.pemeriksaans });
          // Pre-fill hasilMap from cache
          const map: Record<number, string> = {};
          cached.pemeriksaans.forEach(p => { map[p.idPemeriksaan] = p.hasilPemeriksaan ?? ""; });
          setHasilMap(map);
        } else {
          setStruk(found);
        }

        // If approved, also fetch full hasil detail
        if (found.status === "approve") {
          try {
            const h = await getHasilById(numId);
            setHasil(h);
            const map: Record<number, string> = {};
            h.pemeriksaans.forEach(p => { map[p.idPemeriksaan] = p.hasilPemeriksaan ?? ""; });
            setHasilMap(map);
          } catch {/* ignore */}
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleSave() {
    if (!struk) return;
    setActionError(""); setSaveSuccess(false); setSaving(true);
    try {
      const items = pemeriksaans.map(p => ({
        idPemeriksaan: p.idPemeriksaan,
        hasilPemeriksaan: hasilMap[p.idPemeriksaan]?.trim() || null,
      }));
      const updated = await updateStruk(struk.id, items);
      setStruk(updated);
      setHasilMap(prev => {
        const next = { ...prev };
        updated.pemeriksaans.forEach(p => { next[p.idPemeriksaan] = p.hasilPemeriksaan ?? ""; });
        return next;
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Gagal menyimpan.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSubmit() {
    if (!struk) return;
    if (!confirm("Setelah disubmit, struk tidak dapat diubah. Lanjutkan?")) return;
    setActionError(""); setSubmitting(true);
    try {
      await submitStruk(struk.id);
      router.push("/dashboard/lab/struk");
    } catch (err) {
      setActionError(err instanceof ApiError ? err.message : "Gagal submit.");
      setSubmitting(false);
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (notFound || !struk) return (
    <div className="text-center py-24">
      <p className="text-slate-500">Struk tidak ditemukan.</p>
      <Link href="/dashboard/lab/struk" className="text-sm text-teal-600 hover:underline mt-2 inline-block">Kembali ke daftar</Link>
    </div>
  );

  const sm = STATUS_MAP[struk.status];
  const canEdit = struk.status === "draft" && pemeriksaans.length > 0;
  const canSubmit = struk.status === "draft";
  const isApproved = struk.status === "approve";
  const isTolak = struk.status === "tolak";

  const pasienData = hasil?.pasien ?? struk.pasien;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back */}
      <Link href="/dashboard/lab/struk"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-5 transition">
        <ChevronLeft size={16} /> Kembali ke Daftar Struk
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${sm.cls}`}>
                {sm.icon}{sm.label}
              </span>
            </div>
            <h1 className="text-xl font-bold font-heading text-slate-900">{struk.kode_struk}</h1>
            <p className="text-sm text-slate-500">Tgl. Periksa: {fmtDate(struk.tanggal_pemeriksaan)}</p>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-500">Total Tarif</p>
            <p className="text-2xl font-bold text-teal-700">{fmtCurrency(struk.total_tarif)}</p>
          </div>
        </div>

        {/* Pasien info */}
        {pasienData && (
          <div className="mt-4 pt-4 border-t border-slate-100 grid sm:grid-cols-2 gap-2 text-sm">
            <div><span className="text-xs text-slate-500">Pasien:</span> <span className="font-medium text-slate-800">{pasienData.nama_pasien}</span></div>
            <div><span className="text-xs text-slate-500">Kode:</span> <span className="text-slate-700">{pasienData.kode_registrasi}</span></div>
            {hasil?.pasien && (
              <>
                <div><span className="text-xs text-slate-500">Kategori:</span> <span className="text-slate-700">{hasil.pasien.kategori_pasien}</span></div>
                <div><span className="text-xs text-slate-500">Gender:</span> <span className="text-slate-700">{hasil.pasien.jenis_kelamin}</span></div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Tolak notice */}
      {isTolak && struk.catatan_koreksi && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 mb-5">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-700 mb-1">Struk Ditolak</p>
            <p className="text-sm text-red-600">{struk.catatan_koreksi}</p>
            <Link href="/dashboard/lab/struk/baru" className="inline-flex items-center gap-1 mt-2 text-xs text-red-600 hover:underline font-medium">
              Buat struk baru →
            </Link>
          </div>
        </div>
      )}

      {/* Menunggu notice */}
      {struk.status === "menunggu_koreksi" && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 mb-5">
          <Clock size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-700">Menunggu Persetujuan</p>
            <p className="text-sm text-amber-600">Struk telah disubmit pada {fmtDate(struk.submitted_at)}. Menunggu review asesor.</p>
          </div>
        </div>
      )}

      {/* Approved: print buttons */}
      {isApproved && (
        <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
          <div className="flex-1">
            <p className="text-sm font-semibold text-teal-700">Struk Disetujui</p>
            <p className="text-sm text-teal-600">Disetujui pada {fmtDate(struk.approved_at)}. Anda dapat mencetak struk dan hasil lab.</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.open(`/print/struk/${struk.id}`, "_blank")}
              className="inline-flex items-center gap-2 bg-white border border-teal-300 text-teal-700 text-sm font-medium px-3 py-2 rounded-xl hover:bg-teal-50 transition">
              <Printer size={14} /> Cetak Struk
            </button>
            <button onClick={() => window.open(`/print/hasil/${struk.id}`, "_blank")}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-2 rounded-xl transition">
              <Printer size={14} /> Hasil Lab
            </button>
          </div>
        </div>
      )}

      {/* Pemeriksaan table */}
      {pemeriksaans.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mb-5">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-slate-800">Daftar Pemeriksaan</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Bidang</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Pemeriksaan</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">Nilai Normal</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500">
                    {canEdit ? "Hasil (isi di sini)" : "Hasil"}
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500">Tarif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {pemeriksaans.map(p => (
                  <tr key={p.idPemeriksaan} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-xs text-slate-500">{p.bidangPeriksa}</td>
                    <td className="px-4 py-3 text-slate-700">{p.subPeriksa}</td>
                    <td className="px-4 py-3 text-xs text-slate-500">{p.nilaiNormal ?? "-"} {p.satuan ?? ""}</td>
                    <td className="px-4 py-3">
                      {canEdit ? (
                        <input
                          type="text"
                          value={hasilMap[p.idPemeriksaan] ?? ""}
                          onChange={e => setHasilMap(prev => ({ ...prev, [p.idPemeriksaan]: e.target.value }))}
                          placeholder="Isi hasil..."
                          className="w-full min-w-24 px-2 py-1 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        />
                      ) : (
                        <span className={p.hasilPemeriksaan ? "text-slate-800" : "text-slate-300"}>
                          {p.hasilPemeriksaan ?? "—"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-700">{fmtCurrency(p.tarif)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-50">
                  <td colSpan={4} className="px-4 py-3 text-sm font-semibold text-slate-700">Total</td>
                  <td className="px-4 py-3 text-right font-bold text-teal-700">{fmtCurrency(struk.total_tarif)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : canSubmit ? (
        <div className="bg-slate-50 border border-dashed border-slate-200 rounded-2xl p-6 text-center mb-5">
          <p className="text-sm text-slate-500">Data pemeriksaan belum tersedia untuk ditampilkan.</p>
          <p className="text-xs text-slate-400 mt-1">Data pemeriksaan dapat diedit segera setelah membuat struk baru.</p>
        </div>
      ) : null}

      {/* Action errors/success */}
      {actionError && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-4">{actionError}</p>}
      {saveSuccess && <p className="text-sm text-teal-700 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2 mb-4">Hasil berhasil disimpan.</p>}

      {/* Draft action buttons */}
      {canSubmit && (
        <div className="flex flex-col sm:flex-row gap-3">
          {canEdit && (
            <button onClick={handleSave} disabled={saving}
              className="inline-flex items-center justify-center gap-2 border border-teal-300 bg-white text-teal-700 hover:bg-teal-50 text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-60">
              <Save size={15} /> {saving ? "Menyimpan..." : "Simpan Hasil"}
            </button>
          )}
          <button onClick={handleSubmit} disabled={submitting}
            className="inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition disabled:opacity-60">
            <Send size={15} /> {submitting ? "Mengirim..." : "Submit untuk Persetujuan"}
          </button>
        </div>
      )}
    </div>
  );
}
