"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBukuById, getBukuFileUrl, getToken, Buku, ApiError } from "@/lib/api";
import { ArrowLeft, BookOpen, Calendar, User, Building2, Hash, FileText } from "lucide-react";

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL ?? "/storage";

export default function BukuDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [buku, setBuku] = useState<Buku | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [loadingBook, setLoadingBook] = useState(true);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [bookError, setBookError] = useState("");
  const [pdfError, setPdfError] = useState("");

  useEffect(() => {
    if (!id) return;
    getBukuById(id)
      .then(setBuku)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.replace("/login");
        } else if (err instanceof ApiError && err.status === 404) {
          setBookError("Buku tidak ditemukan.");
        } else {
          setBookError("Gagal memuat data buku.");
        }
      })
      .finally(() => setLoadingBook(false));
  }, [id, router]);

  // Clean up blob URL when component unmounts
  useEffect(() => {
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [pdfBlobUrl]);

  async function handleReadPdf() {
    if (pdfBlobUrl) return; // already loaded
    setPdfError("");
    setLoadingPdf(true);
    try {
      const token = getToken();
      const res = await fetch(getBukuFileUrl(id), {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/pdf",
        },
      });
      if (!res.ok) {
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const blob = await res.blob();
      setPdfBlobUrl(URL.createObjectURL(blob));
    } catch {
      setPdfError("Gagal memuat file PDF. Silakan coba lagi.");
    } finally {
      setLoadingPdf(false);
    }
  }

  const imgSrc = buku?.cover ? `${STORAGE_URL}/${buku.cover}` : null;

  if (loadingBook) {
    return (
      <div className="flex items-center justify-center py-24 text-teal-600 text-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-teal-200 border-t-teal-600 rounded-full animate-spin" />
          <span>Memuat...</span>
        </div>
      </div>
    );
  }

  if (bookError) {
    return (
      <div className="text-center py-24">
        <BookOpen size={48} className="mx-auto text-slate-300 mb-3" />
        <p className="text-slate-600 mb-4">{bookError}</p>
        <Link
          href="/dashboard/elibrary"
          className="text-teal-600 hover:underline text-sm"
        >
          ← Kembali ke E-Library
        </Link>
      </div>
    );
  }

  if (!buku) return null;

  return (
    <div>
      {/* Back link */}
      <Link
        href="/dashboard/elibrary"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 transition mb-6"
      >
        <ArrowLeft size={16} />
        Kembali ke E-Library
      </Link>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        {/* Cover column */}
        <div className="flex flex-col items-stretch">
          <div className="bg-slate-100 rounded-2xl aspect-[3/4] relative overflow-hidden shadow-md flex items-center justify-center">
            {imgSrc ? (
              <Image src={imgSrc} alt={buku.judul} fill className="object-cover" />
            ) : (
              <BookOpen size={64} className="text-slate-300" />
            )}
          </div>

          {/* PDF action button */}
          {pdfBlobUrl ? (
            <a
              href={pdfBlobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium py-2.5 rounded-xl transition"
            >
              <FileText size={16} />
              Buka di Tab Baru
            </a>
          ) : (
            <button
              onClick={handleReadPdf}
              disabled={loadingPdf}
              className="mt-4 flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-sm font-medium py-2.5 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FileText size={16} />
              {loadingPdf ? "Memuat PDF..." : "Baca Buku"}
            </button>
          )}

          {pdfError && (
            <p className="text-xs text-red-600 text-center mt-2">{pdfError}</p>
          )}
        </div>

        {/* Detail column */}
        <div>
          {/* Category badge */}
          {buku.kategori && (
            <span className="inline-block text-xs text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full mb-3">
              {buku.kategori.nama}
            </span>
          )}

          <h1 className="text-2xl font-bold font-heading text-slate-900 mb-5 leading-tight">
            {buku.judul}
          </h1>

          {/* Metadata */}
          <dl className="space-y-3 mb-6">
            {buku.pengarang && (
              <div className="flex items-start gap-3">
                <User size={15} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-xs text-slate-400">Pengarang</dt>
                  <dd className="text-sm text-slate-800">{buku.pengarang}</dd>
                </div>
              </div>
            )}
            {buku.penerbit && (
              <div className="flex items-start gap-3">
                <Building2 size={15} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-xs text-slate-400">Penerbit</dt>
                  <dd className="text-sm text-slate-800">{buku.penerbit}</dd>
                </div>
              </div>
            )}
            {buku.tahun_terbit && (
              <div className="flex items-start gap-3">
                <Calendar size={15} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-xs text-slate-400">Tahun Terbit</dt>
                  <dd className="text-sm text-slate-800">{buku.tahun_terbit}</dd>
                </div>
              </div>
            )}
            {buku.isbn && (
              <div className="flex items-start gap-3">
                <Hash size={15} className="text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <dt className="text-xs text-slate-400">ISBN</dt>
                  <dd className="text-sm text-slate-800 font-mono">{buku.isbn}</dd>
                </div>
              </div>
            )}
          </dl>

          {/* Description */}
          {buku.deskripsi && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-700 mb-2">Deskripsi</h2>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {buku.deskripsi}
              </p>
            </div>
          )}

          {/* Inline PDF viewer (desktop) */}
          {pdfBlobUrl && (
            <div className="mt-2">
              <h2 className="text-sm font-semibold text-slate-700 mb-3">Pembaca PDF</h2>
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                <iframe
                  src={pdfBlobUrl}
                  title={buku.judul}
                  className="w-full h-[680px]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
