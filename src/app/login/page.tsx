"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { login, setToken, ApiError } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [nis, setNis] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(nis.trim(), password);
      setToken(data.token);
      localStorage.setItem("smak_siswa", JSON.stringify(data.siswa));
      router.push("/dashboard/elibrary");
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.status === 401 || err.status === 422 || err.status === 403) {
          setError("NIS atau password salah, atau akun tidak aktif.");
        } else {
          setError("Terjadi kesalahan server. Silakan coba beberapa saat lagi.");
        }
      } else {
        setError("Tidak dapat terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-700 via-teal-800 to-slate-900 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logoanalisfix.png"
            alt="Logo SMK Analis Kesehatan Ditkesad"
            width={80}
            height={80}
            className="mb-3 drop-shadow-lg"
          />
          <h1 className="font-heading text-white text-xl font-semibold text-center leading-snug">
            SMK Analis Kesehatan Ditkesad
          </h1>
          <p className="text-teal-200 text-sm mt-1">Portal E-Library Siswa</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-slate-900 text-2xl font-bold font-heading mb-1">Masuk</h2>
          <p className="text-slate-500 text-sm mb-6">
            Gunakan NIS dan password Anda untuk masuk.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nis" className="block text-sm font-medium text-slate-700 mb-1">
                NIS
              </label>
              <input
                id="nis"
                type="text"
                value={nis}
                onChange={(e) => setNis(e.target.value)}
                placeholder="Masukkan NIS Anda"
                required
                autoFocus
                autoComplete="username"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-medium py-2.5 rounded-xl transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Memverifikasi..." : "Masuk"}
            </button>
          </form>
        </div>

        <p className="text-center text-teal-300 text-xs mt-6">
          © {new Date().getFullYear()} SMK Analis Kesehatan Ditkesad
        </p>
      </div>
    </main>
  );
}
