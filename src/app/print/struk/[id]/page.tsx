"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getHasilById, HasilLabDetail, getToken } from "@/lib/api";

function fmtDate(d?: string | null) {
  if (!d) return "-";
  return new Date(d).toLocaleString("id-ID", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
}
function fmtCurrency(v: string | number | null | undefined) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(v ?? 0));
}

const SCHOOL = {
  name: "SMK Analis Kesehatan Ditkesad",
  address: "Jl. Buntu Munjul, Cipayung, Jakarta Timur",
  phone: "0218450948",
  email: "smakmunjul@gmail.com",
};

export default function CetakStrukPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [data, setData] = useState<HasilLabDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!getToken()) { router.replace("/login"); return; }
    getHasilById(Number(id))
      .then(d => {
        setData(d);
        setTimeout(() => window.print(), 800);
      })
      .catch(() => setError("Gagal memuat data atau struk belum disetujui."));
  }, [id, router]);

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-8">
        <p className="text-red-600 mb-2">{error}</p>
        <button onClick={() => window.close()} className="text-sm text-slate-500 hover:underline">Tutup jendela</button>
      </div>
    </div>
  );

  if (!data) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Memuat data...</p>
      </div>
    </div>
  );

  const totalTarif = data.pemeriksaans.reduce((sum, p) => sum + (p.tarif ?? 0), 0);

  return (
    <>
      <style>{`
        @page { size: A4; margin: 18mm 20mm; }
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
        }
        body { font-family: Arial, sans-serif; color: #1e293b; margin: 0; background: white; }
      `}</style>

      {/* Screen-only print button */}
      <div className="no-print fixed top-4 right-4 flex gap-2 z-50">
        <button onClick={() => window.print()}
          className="bg-teal-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-teal-700 transition">
          Cetak
        </button>
        <button onClick={() => window.close()}
          className="bg-slate-100 text-slate-600 text-sm px-4 py-2 rounded-lg hover:bg-slate-200 transition">
          Tutup
        </button>
      </div>

      {/* A4 content */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 0" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", borderBottom: "2px solid #0f766e", paddingBottom: "16px", marginBottom: "16px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logoanalisfix.png" alt="Logo" style={{ width: "64px", height: "64px", objectFit: "contain" }} />
          <div>
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#0f766e", margin: 0 }}>{SCHOOL.name}</p>
            <p style={{ fontSize: "11px", color: "#475569", margin: "2px 0 0 0" }}>{SCHOOL.address}</p>
            <p style={{ fontSize: "11px", color: "#475569", margin: "1px 0 0 0" }}>Telp: {SCHOOL.phone} | Email: {SCHOOL.email}</p>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <p style={{ fontSize: "14px", fontWeight: "bold", letterSpacing: "1px", textTransform: "uppercase", margin: 0 }}>Struk Pembayaran Laboratorium</p>
          <p style={{ fontSize: "11px", color: "#64748b", margin: "4px 0 0 0" }}>No. Struk: {data.kode_struk}</p>
        </div>

        {/* Patient info table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", marginBottom: "16px", border: "1px solid #e2e8f0" }}>
          <tbody>
            {[
              ["No. Struk", data.kode_struk, "Tgl. Periksa", fmtDate(data.tanggal_pemeriksaan)],
              ["Kode Pasien", data.pasien.kode_registrasi, "Tgl. Registrasi", fmtDate(data.pasien.tanggal_registrasi)],
              ["Nama Pasien", data.pasien.nama_pasien, "Kategori", data.pasien.kategori_pasien],
              ["Jenis Kelamin", data.pasien.jenis_kelamin, "Gol. Darah", data.pasien.golongan_darah || "-"],
              ["Alamat", { colSpan: 3, value: data.pasien.alamat || "-" } as never, "", ""],
            ].map((row, i) => {
              if (typeof row[1] === "object" && row[1] !== null && "colSpan" in (row[1] as object)) {
                const cell = row[1] as { colSpan: number; value: string };
                return (
                  <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: "5px 8px", fontWeight: "600", background: "#f8fafc", width: "18%", borderRight: "1px solid #e2e8f0" }}>{row[0]}</td>
                    <td colSpan={cell.colSpan} style={{ padding: "5px 8px" }}>{cell.value}</td>
                  </tr>
                );
              }
              return (
                <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "5px 8px", fontWeight: "600", background: "#f8fafc", width: "18%", borderRight: "1px solid #e2e8f0" }}>{row[0]}</td>
                  <td style={{ padding: "5px 8px", width: "32%", borderRight: "1px solid #e2e8f0" }}>{row[1] as string}</td>
                  <td style={{ padding: "5px 8px", fontWeight: "600", background: "#f8fafc", width: "18%", borderRight: "1px solid #e2e8f0" }}>{row[2]}</td>
                  <td style={{ padding: "5px 8px" }}>{row[3] as string}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Detail pemeriksaan */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px", marginBottom: "4px", border: "1px solid #e2e8f0" }}>
          <thead>
            <tr style={{ background: "#0f766e", color: "white" }}>
              {["No", "Bidang Periksa", "Tipe", "Pemeriksaan", "Tarif"].map(h => (
                <th key={h} style={{ padding: "6px 8px", textAlign: "left", fontWeight: "600" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.pemeriksaans.map((p, i) => (
              <tr key={p.idPemeriksaan} style={{ borderBottom: "1px solid #e2e8f0", background: i % 2 === 0 ? "white" : "#f8fafc" }}>
                <td style={{ padding: "5px 8px", width: "30px" }}>{i + 1}</td>
                <td style={{ padding: "5px 8px" }}>{p.bidangPeriksa}</td>
                <td style={{ padding: "5px 8px" }}>{p.tipePeriksa}</td>
                <td style={{ padding: "5px 8px" }}>{p.subPeriksa}</td>
                <td style={{ padding: "5px 8px", textAlign: "right" }}>{fmtCurrency(p.tarif)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ background: "#f0fdfa", borderTop: "2px solid #0f766e" }}>
              <td colSpan={4} style={{ padding: "7px 8px", fontWeight: "700", fontSize: "12px" }}>Total Pembayaran</td>
              <td style={{ padding: "7px 8px", textAlign: "right", fontWeight: "700", fontSize: "12px", color: "#0f766e" }}>{fmtCurrency(totalTarif)}</td>
            </tr>
          </tfoot>
        </table>

        {/* Footer */}
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
          <p style={{ color: "#64748b" }}>Dicetak: {fmtDate(new Date().toISOString())}</p>
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: "48px" }}>Petugas,</p>
            <p style={{ borderTop: "1px solid #1e293b", paddingTop: "4px", fontWeight: "600" }}>{data.siswa?.nama ?? "-"}</p>
            <p style={{ color: "#64748b" }}>Analis Siswa</p>
          </div>
        </div>
      </div>
    </>
  );
}
