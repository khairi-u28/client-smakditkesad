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
