"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPasien, getPaket, createStruk, Pasien, JenisPemeriksaan, ApiError } from "@/lib/api";
import { useSesi } from "@/lib/sesi-context";
import { ChevronLeft, ChevronRight, Check, Search, Users, FlaskConical, Timer, Lock } from "lucide-react";

function fmtCurrency(v: number | null | undefined) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(v ?? 0));
}

export default function BuatStrukPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPasienId = searchParams.get("pasien");
  const { sesi } = useSesi();

  // Countdown state (timed mode)
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  // Tick the countdown — first tick fires immediately (0ms), then every second
  useEffect(() => {
    if (!sesi?.waktu_selesai) return;

    const waktuSelesai = new Date(sesi.waktu_selesai).getTime();

    const tick = () => {
      const remaining = Math.max(0, Math.floor((waktuSelesai - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) setIsExpired(true);
    };

    const immediate = setTimeout(tick, 0);
    const interval = setInterval(tick, 1000);

    return () => {
      clearTimeout(immediate);
      clearInterval(interval);
    };
  }, [sesi]);

  function formatCountdown(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  const formDisabled = isExpired;

  const [step, setStep] = useState(1);
  const [pasienList, setPasienList] = useState<Pasien[]>([]);
  const [paket, setPaket] = useState<Record<string, JenisPemeriksaan[]>>({});
  const [loadingData, setLoadingData] = useState(true);

  // Step 1
  const [query, setQuery] = useState("");
  const [selectedPasien, setSelectedPasien] = useState<Pasien | null>(null);

  // Step 2
  const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Step 3
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getPasien(), getPaket()]).then(([p, pk]) => {
      setPasienList(p);
      setPaket(pk);
      if (preselectedPasienId) {
        const found = p.find(x => x.id === Number(preselectedPasienId));
        if (found) { setSelectedPasien(found); setStep(2); }
      }
    }).finally(() => setLoadingData(false));
  }, [preselectedPasienId]);

  const filteredPasien = pasienList.filter(p =>
    p.nama_pasien.toLowerCase().includes(query.toLowerCase()) ||
    p.kode_registrasi.toLowerCase().includes(query.toLowerCase())
  );

  const allItems: JenisPemeriksaan[] = Object.values(paket).flat();
  const selectedItems = allItems.filter(j => selectedIds.has(j.id));
  const totalTarif = selectedItems.reduce((sum, j) => sum + j.tarif, 0);

  function toggleItem(id: number) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const handleSubmit = useCallback(async () => {
    if (!selectedPasien || isExpired) return;
    setError("");
    setSubmitting(true);
    try {
      const struk = await createStruk({
        pasien_id: selectedPasien.id,
        pemeriksaans: [...selectedIds].map(idPemeriksaan => ({ idPemeriksaan })),
        tanggal_pemeriksaan: tanggal,
        ...(sesi ? { sesi_praktik_id: sesi.id } : {}),
      });
      router.push(`/dashboard/lab/struk/${struk.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Gagal membuat struk.");
      setSubmitting(false);
    }
  }, [selectedPasien, selectedIds, tanggal, router, sesi, isExpired]);

  const steps = [
    { n: 1, label: "Pilih Pasien" },
    { n: 2, label: "Pilih Pemeriksaan" },
    { n: 3, label: "Konfirmasi" },
  ];

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Timed countdown sticky banner */}
      {sesi?.waktu_selesai && secondsLeft !== null && (
        <div className={`sticky top-0 z-20 mb-5 -mx-1 flex items-center justify-between gap-3 px-5 py-3 rounded-2xl border shadow-sm ${
          isExpired
            ? "bg-red-600 border-red-700 text-white"
            : secondsLeft <= 300
            ? "bg-amber-500 border-amber-600 text-white"
            : "bg-teal-600 border-teal-700 text-white"
        }`}>
          <div className="flex items-center gap-2">
            {isExpired ? <Lock size={16} /> : <Timer size={16} />}
            <span className="text-sm font-medium">
              {isExpired ? "Waktu ujian telah habis." : "Sisa Waktu Ujian"}
            </span>
          </div>
          {!isExpired && (
            <span className="text-xl font-bold font-mono tracking-wider">
              {formatCountdown(secondsLeft)}
            </span>
          )}
        </div>
      )}

      {/* Expired overlay message (non-timed sessions: never shown) */}
      {isExpired && (
        <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-4">
          <Lock size={20} className="text-red-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-red-700">Waktu Ujian Telah Habis</p>
            <p className="text-xs text-red-600 mt-0.5">Formulir telah dikunci. Anda tidak dapat mengubah atau mengirim struk.</p>
          </div>
        </div>
      )}
      {/* Back link */}
      <button onClick={() => step > 1 ? setStep(s => s - 1) : router.push("/dashboard/lab/struk")}
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-6 transition">
        <ChevronLeft size={16} /> Kembali
      </button>

      <h1 className="text-xl font-bold font-heading text-slate-900 mb-6">Buat Struk Pemeriksaan</h1>

      {/* Step indicator */}
      <div className="flex items-center mb-8">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border-2 transition ${
              step > s.n ? "bg-teal-600 border-teal-600 text-white" :
              step === s.n ? "border-teal-600 text-teal-600 bg-white" :
              "border-slate-200 text-slate-300 bg-white"
            }`}>
              {step > s.n ? <Check size={14} /> : s.n}
            </div>
            <p className={`ml-2 text-xs font-medium hidden sm:block ${step >= s.n ? "text-slate-700" : "text-slate-300"}`}>{s.label}</p>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 ${step > s.n ? "bg-teal-600" : "bg-slate-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Pilih Pasien ── */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-teal-600" />
            <h2 className="font-semibold text-slate-800">Pilih Pasien</h2>
          </div>
          <div className="relative mb-4">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Cari nama atau kode registrasi..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              disabled={formDisabled} />
          </div>
          {filteredPasien.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">Tidak ada pasien. Tambahkan di halaman Pasien.</p>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {filteredPasien.map(p => (
                <button key={p.id} onClick={() => { setSelectedPasien(p); setStep(2); }}
                  className={`w-full text-left flex items-center gap-3 p-3 rounded-xl border transition ${
                    selectedPasien?.id === p.id ? "border-teal-500 bg-teal-50" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                  }`}>
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-teal-700">{p.nama_pasien[0]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{p.nama_pasien}</p>
                    <p className="text-xs text-slate-500">{p.kode_registrasi} · {p.kategori_pasien}</p>
                  </div>
                  <ChevronRight size={16} className="ml-auto text-slate-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Step 2: Pilih Pemeriksaan ── */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <div className="flex items-center gap-2">
            <FlaskConical size={18} className="text-teal-600" />
            <h2 className="font-semibold text-slate-800">Pilih Pemeriksaan</h2>
          </div>

          {/* Selected pasien summary */}
          {selectedPasien && (
            <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-teal-800">{selectedPasien.nama_pasien}</p>
                <p className="text-xs text-teal-600">{selectedPasien.kode_registrasi}</p>
              </div>
              <button onClick={() => { setSelectedPasien(null); setStep(1); }}
                className="text-xs text-teal-600 hover:underline">Ganti</button>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Tanggal Pemeriksaan</label>
            <input type="date" value={tanggal} onChange={e => setTanggal(e.target.value)}
              disabled={formDisabled}
              className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 transition" />
          </div>

          {/* Grouped pemeriksaan checkboxes */}
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {Object.entries(paket).map(([bidang, items]) => (
              <div key={bidang}>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">{bidang}</p>
                <div className="space-y-1">
                  {items.map(item => (
                    <label key={item.id} className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition ${
                      formDisabled ? "opacity-50 cursor-not-allowed" :
                      selectedIds.has(item.id) ? "border-teal-300 bg-teal-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                    }`}>
                      <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => !formDisabled && toggleItem(item.id)}
                        disabled={formDisabled}
                        className="accent-teal-600 w-4 h-4 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-800">{item.sub_periksa}</p>
                        <p className="text-xs text-slate-500">{item.tipe_periksa} · {item.kode}</p>
                      </div>
                      <p className="text-xs font-medium text-teal-700 flex-shrink-0">{fmtCurrency(item.tarif)}</p>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          {selectedIds.size > 0 && (
            <div className="bg-teal-50 border border-teal-100 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-sm text-teal-700">{selectedIds.size} item dipilih</span>
              <span className="text-sm font-bold text-teal-800">{fmtCurrency(totalTarif)}</span>
            </div>
          )}

          <button
            onClick={() => setStep(3)}
            disabled={selectedIds.size === 0 || formDisabled}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2.5 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed">
            Lanjut ke Konfirmasi <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* ── Step 3: Konfirmasi ── */}
      {step === 3 && selectedPasien && (
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <h2 className="font-semibold text-slate-800">Konfirmasi Struk</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Pasien</p>
              <p className="font-semibold text-slate-800">{selectedPasien.nama_pasien}</p>
              <p className="text-xs text-slate-500 mt-0.5">{selectedPasien.kode_registrasi} · {selectedPasien.kategori_pasien}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 mb-1">Tanggal Pemeriksaan</p>
              <p className="font-semibold text-slate-800">
                {new Date(tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">Daftar Pemeriksaan</p>
            <div className="border border-slate-100 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="text-left px-4 py-2 text-xs font-medium text-slate-500">Pemeriksaan</th>
                    <th className="text-left px-4 py-2 text-xs font-medium text-slate-500">Bidang</th>
                    <th className="text-right px-4 py-2 text-xs font-medium text-slate-500">Tarif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {selectedItems.map(item => (
                    <tr key={item.id}>
                      <td className="px-4 py-2 text-slate-700">{item.sub_periksa}</td>
                      <td className="px-4 py-2 text-slate-500 text-xs">{item.bidang_periksa}</td>
                      <td className="px-4 py-2 text-right text-slate-700">{fmtCurrency(item.tarif)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-teal-50">
                    <td colSpan={2} className="px-4 py-2.5 text-sm font-semibold text-teal-800">Total</td>
                    <td className="px-4 py-2.5 text-right font-bold text-teal-800">{fmtCurrency(totalTarif)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>}

          <button onClick={handleSubmit} disabled={submitting || formDisabled}
            className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-3 rounded-xl transition disabled:opacity-60">
            {submitting ? "Membuat Struk..." : "Buat Struk"}
            {!submitting && <Check size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
