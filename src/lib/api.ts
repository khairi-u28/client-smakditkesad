// ============================================================
// API client for core-smakditkesad Laravel backend
// Base: POST /api/v1/auth/login  →  Bearer token (Sanctum)
// ============================================================

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "/api/v1";

// ── Token helpers (client-side only) ──────────────────────

export const TOKEN_KEY = "smak_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// ── Fetch wrapper ──────────────────────────────────────────

interface FetchOptions extends RequestInit {
  auth?: boolean;
}

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { auth = true, ...rest } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(rest.headers ?? {}),
  };

  if (auth) {
    const token = getToken();
    if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { ...rest, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body?.message ?? res.statusText, body);
  }

  // 204 No Content
  if (res.status === 204) return {} as T;
  return res.json() as Promise<T>;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
  }
}

// ── Auth ──────────────────────────────────────────────────

export interface SiswaProfile {
  id: number;
  nipd: string;
  nama: string;
  jenis_kelamin: "L" | "P" | null;
  agama: string | null;
  alamat?: string | null;
  is_default_password: boolean;
}

export interface LoginResponse {
  token: string;
  siswa: SiswaProfile;
}

export async function login(nipd: string, password: string): Promise<LoginResponse> {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ nipd, password }),
  });
}

export async function logout(): Promise<void> {
  await apiFetch("/auth/logout", { method: "POST" });
  removeToken();
}

export async function getMe(): Promise<SiswaProfile> {
  const res = await apiFetch<{ success: boolean; data: SiswaProfile }>("/auth/me");
  return res.data;
}

export async function changePassword(data: {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}): Promise<void> {
  await apiFetch("/auth/change-password", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── E-Library ─────────────────────────────────────────────

export interface KategoriBuku {
  id: number;
  nama: string;
  slug: string;
}

export interface Buku {
  id: number;
  kategori_id: number | null;
  judul: string;
  pengarang: string | null;
  penerbit: string | null;
  tahun_terbit: number | null;
  isbn: string | null;
  deskripsi: string | null;
  file_pdf: string;
  cover: string | null;
  is_active: boolean;
  kategori?: KategoriBuku;
}

export async function getBuku(params?: {
  search?: string;
  kategori?: string;
}): Promise<Buku[]> {
  const qs = new URLSearchParams();
  if (params?.search) qs.set("q", params.search);
  if (params?.kategori) qs.set("kategori", params.kategori);
  const query = qs.toString() ? `?${qs}` : "";
  const res = await apiFetch<{ success: boolean; data: { data: Buku[] } }>(`/buku${query}`);
  return res.data.data;
}

export async function getBukuById(id: number): Promise<Buku> {
  const res = await apiFetch<{ success: boolean; data: Buku }>(`/buku/${id}`);
  return res.data;
}

/** Returns the URL to stream/download the PDF — authenticated via token in header */
export function getBukuFileUrl(id: number): string {
  return `${API_BASE}/buku/${id}/file`;
}

// ── Kasir / Lab Asnakes ───────────────────────────────────

export interface SesiAktif {
  id: number;
  nama_sesi?: string | null;
  has_time_limit: boolean;
  waktu_selesai: string | null;
}

export async function getSesiAktif(): Promise<SesiAktif | null> {
  try {
    const res = await apiFetch<{ success: boolean; data: SesiAktif }>("/kasir/sesi-aktif");
    return res.data;
  } catch (err) {
    if (err instanceof ApiError && (err.status === 403 || err.status === 404)) {
      return null;
    }
    throw err;
  }
}

export interface Pasien {
  id: number;
  kode_registrasi: string;
  nama_pasien: string;
  kategori_pasien: "Umum" | "BPJS" | "Asuransi Lain";
  jenis_kelamin: "Laki-laki" | "Perempuan";
  golongan_darah?: "A" | "B" | "AB" | "O" | "-" | null;
  status_pernikahan?: "Belum Menikah" | "Menikah" | "Cerai" | null;
  no_telepon?: string | null;
  pekerjaan?: string | null;
  no_kk?: string | null;
  nama_ayah?: string | null;
  nama_ibu?: string | null;
  alamat?: string | null;
  dokter_pengirim?: string | null;
  tanggal_registrasi?: string | null;
}

export interface JenisPemeriksaan {
  id: number;
  kode: string;
  bidang_periksa: string;
  tipe_periksa: string;
  sub_periksa: string;
  nilai_normal: string | null;
  satuan: string | null;
  tarif: number;
}

export interface PemeriksaanItem {
  idPemeriksaan: number;
  bidangPeriksa: string;
  tipePeriksa: string;
  subPeriksa: string;
  nilaiNormal: string | null;
  satuan: string | null;
  tarif: number;
  hasilPemeriksaan: string | null;
}

export type StrukStatus = "draft" | "menunggu_koreksi" | "approve" | "tolak";

export interface Struk {
  id: number;
  kode_struk: string;
  siswa_id: number;
  pasien_id: number;
  pemeriksaans: PemeriksaanItem[];
  total_tarif: string;
  status: StrukStatus;
  catatan_koreksi: string | null;
  tanggal_pemeriksaan: string | null;
  submitted_at: string | null;
  approved_at: string | null;
  pasien?: Pick<Pasien, "id" | "nama_pasien" | "kode_registrasi">;
}

export interface HasilLabDetail extends Omit<Struk, "pasien"> {
  pasien: Pasien;
  siswa: { id: number; nipd?: string; nama: string };
}

export async function getPaket(): Promise<Record<string, JenisPemeriksaan[]>> {
  const res = await apiFetch<{ success: boolean; data: Record<string, JenisPemeriksaan[]> }>("/kasir/paket");
  return res.data;
}

export async function getPasien(): Promise<Pasien[]> {
  const res = await apiFetch<{ success: boolean; data: Pasien[] }>("/kasir/pasien");
  return res.data;
}

export async function getPasienById(id: number): Promise<Pasien> {
  const res = await apiFetch<{ success: boolean; data: Pasien }>(`/kasir/pasien/${id}`);
  return res.data;
}

export async function updatePasien(id: number, data: Record<string, unknown>): Promise<Pasien> {
  const res = await apiFetch<{ success: boolean; data: Pasien }>(`/kasir/pasien/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function createPasien(data: Record<string, unknown>): Promise<Pasien> {
  const res = await apiFetch<{ success: boolean; data: Pasien }>("/kasir/pasien", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return res.data;
}

export async function getStruk(): Promise<Struk[]> {
  const res = await apiFetch<{ success: boolean; data: Struk[] }>("/kasir/struk");
  return res.data;
}

export async function createStruk(data: {
  pasien_id: number;
  pemeriksaans: { idPemeriksaan: number }[];
  tanggal_pemeriksaan?: string;
  sesi_id?: number;
}): Promise<Struk> {
  const res = await apiFetch<{ success: boolean; data: Struk }>("/kasir/struk", {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (typeof window !== "undefined" && res.data?.id) {
    sessionStorage.setItem(`lab_struk_${res.data.id}`, JSON.stringify(res.data));
  }
  return res.data;
}

export async function updateStruk(
  id: number,
  pemeriksaans: { idPemeriksaan: number; hasilPemeriksaan: string | null }[],
): Promise<Struk> {
  const res = await apiFetch<{ success: boolean; data: Struk }>(`/kasir/struk/${id}`, {
    method: "PUT",
    body: JSON.stringify({ pemeriksaans }),
  });
  if (typeof window !== "undefined" && res.data?.id) {
    sessionStorage.setItem(`lab_struk_${id}`, JSON.stringify(res.data));
  }
  return res.data;
}

export async function submitStruk(id: number): Promise<Struk> {
  const res = await apiFetch<{ success: boolean; data: Struk }>(`/kasir/struk/${id}/submit`, {
    method: "POST",
  });
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(`lab_struk_${id}`);
  }
  return res.data;
}

export function getCachedStruk(id: number): Struk | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(`lab_struk_${id}`);
  return raw ? (JSON.parse(raw) as Struk) : null;
}

export async function getHasil(): Promise<Struk[]> {
  const res = await apiFetch<{ success: boolean; data: Struk[] }>("/kasir/hasil");
  return res.data;
}

export async function getHasilById(id: number): Promise<HasilLabDetail> {
  const res = await apiFetch<{ success: boolean; data: HasilLabDetail }>(`/kasir/hasil/${id}`);
  return res.data;
}
