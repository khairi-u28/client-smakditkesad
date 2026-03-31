"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBuku, Buku, KategoriBuku, ApiError } from "@/lib/api";
import { Search, BookOpen } from "lucide-react";

const STORAGE_URL =
  process.env.NEXT_PUBLIC_STORAGE_URL ?? "/storage";

function coverSrc(buku: Buku): string | null {
  return buku.cover ? `${STORAGE_URL}/${buku.cover}` : null;
}

function BookSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 overflow-hidden animate-pulse">
      <div className="bg-slate-200 aspect-[3/4]" />
      <div className="p-3 space-y-2">
        <div className="bg-slate-200 h-4 rounded w-3/4" />
        <div className="bg-slate-200 h-3 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function ELibraryPage() {
  const [buku, setBuku] = useState<Buku[]>([]);
  const [kategori, setKategori] = useState<KategoriBuku[]>([]);
  const [activeKategori, setActiveKategori] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Keep a ref so the debounce effect doesn't re-subscribe on every fetchBuku change
  const fetchRef = useRef<(s: string, k: string) => void>(undefined!);

  const fetchBuku = useCallback(async (searchVal: string, kategoriVal: string) => {
    setLoading(true);
    setError("");
    try {
      const params: { search?: string; kategori?: string } = {};
      if (searchVal) params.search = searchVal;
      if (kategoriVal !== "all") params.kategori = kategoriVal;

      const data = await getBuku(params);
      setBuku(data);

      // Extract unique categories from the fetched books
      setKategori((prev) => {
        const existing = new Map(prev.map((k) => [k.id, k]));
        data.forEach((b) => {
          if (b.kategori && !existing.has(b.kategori.id)) {
            existing.set(b.kategori.id, b.kategori);
          }
        });
        return Array.from(existing.values());
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setError("Gagal memuat data buku. Silakan coba lagi.");
      } else {
        setError("Tidak dapat terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  fetchRef.current = fetchBuku;

  // Debounced fetch on search/category change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRef.current?.(search, activeKategori);
    }, 350);
    return () => clearTimeout(timer);
  }, [search, activeKategori]);

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-heading text-slate-900">E-Library</h1>
        <p className="text-slate-500 text-sm mt-1">
          Cari dan baca koleksi buku digital sekolah
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari judul, pengarang..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
        />
      </div>

      {/* Category filter */}
      {kategori.length > 0 && (
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setActiveKategori("all")}
            className={`px-3 py-1 rounded-full text-sm font-medium transition ${
              activeKategori === "all"
                ? "bg-teal-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-teal-300"
            }`}
          >
            Semua
          </button>
          {kategori.map((k) => (
            <button
              key={k.id}
              onClick={() => setActiveKategori(k.slug)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                activeKategori === k.slug
                  ? "bg-teal-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-teal-300"
              }`}
            >
              {k.nama}
            </button>
          ))}
        </div>
      )}

      {/* Book grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <BookSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-600 mb-3">{error}</p>
          <button
            onClick={() => fetchRef.current?.(search, activeKategori)}
            className="text-teal-600 hover:underline text-sm"
          >
            Coba lagi
          </button>
        </div>
      ) : buku.length === 0 ? (
        <div className="text-center py-20">
          <BookOpen size={48} className="mx-auto text-slate-300 mb-3" />
          <p className="text-slate-500">Tidak ada buku ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {buku.map((b) => {
            const img = coverSrc(b);
            return (
              <Link
                key={b.id}
                href={`/dashboard/elibrary/${b.id}`}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all group"
              >
                <div className="bg-slate-100 aspect-[3/4] relative flex items-center justify-center overflow-hidden">
                  {img ? (
                    <Image
                      src={img}
                      alt={b.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  ) : (
                    <BookOpen size={40} className="text-slate-300" />
                  )}
                </div>
                <div className="p-3">
                  {b.kategori && (
                    <span className="inline-block text-xs text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full mb-1">
                      {b.kategori.nama}
                    </span>
                  )}
                  <p className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-teal-700 transition leading-snug">
                    {b.judul}
                  </p>
                  {b.pengarang && (
                    <p className="text-xs text-slate-500 mt-1 truncate">{b.pengarang}</p>
                  )}
                  {b.tahun_terbit && (
                    <p className="text-xs text-slate-400">{b.tahun_terbit}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
