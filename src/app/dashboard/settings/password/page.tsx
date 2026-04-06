"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { changePassword, ApiError } from "@/lib/api";
import { KeyRound, Eye, EyeOff, ShieldAlert } from "lucide-react";

const inputCls = "w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition pr-10";
const labelCls = "block text-xs font-medium text-slate-600 mb-1";

function PasswordInput({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required
        className={inputCls}
      />
      <button
        type="button"
        onClick={() => setShow(s => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
        tabIndex={-1}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

export default function ChangePasswordPage() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (newPassword.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setSaving(true);
    try {
      await changePassword({
        password_lama: oldPassword,
        password_baru: newPassword,
        password_baru_confirmation: confirmPassword,
      });
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/lab"), 1500);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Gagal mengubah password.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Warning banner for default password */}
      <div className="mb-6 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-4">
        <ShieldAlert size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-800">Password Perlu Diubah</p>
          <p className="text-xs text-amber-700 mt-0.5">
            Akun Anda masih menggunakan password default. Ganti password sebelum menggunakan aplikasi.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
          <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center">
            <KeyRound size={18} className="text-teal-600" />
          </div>
          <h1 className="text-lg font-bold font-heading text-slate-900">Ganti Password</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className={labelCls}>Password Lama *</label>
            <PasswordInput
              value={oldPassword}
              onChange={setOldPassword}
              placeholder="Masukkan password lama"
              disabled={saving || success}
            />
          </div>
          <div>
            <label className={labelCls}>Password Baru * <span className="text-slate-400">(min. 8 karakter)</span></label>
            <PasswordInput
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Masukkan password baru"
              disabled={saving || success}
            />
          </div>
          <div>
            <label className={labelCls}>Konfirmasi Password Baru *</label>
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Ulangi password baru"
              disabled={saving || success}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
          )}
          {success && (
            <p className="text-sm text-teal-700 bg-teal-50 border border-teal-100 rounded-xl px-3 py-2">
              Password berhasil diubah. Mengarahkan...
            </p>
          )}

          <button
            type="submit"
            disabled={saving || success}
            className="w-full py-2.5 text-sm font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-xl transition disabled:opacity-60"
          >
            {saving ? "Menyimpan..." : "Simpan Password Baru"}
          </button>
        </form>
      </div>
    </div>
  );
}
