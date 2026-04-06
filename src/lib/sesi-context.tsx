"use client";

import { createContext, useContext } from "react";
import { SesiAktif } from "./api";

export interface SesiContextType {
  sesi: SesiAktif | null;
  sesiLoading: boolean;
}

export const SesiContext = createContext<SesiContextType>({
  sesi: null,
  sesiLoading: true,
});

export function useSesi() {
  return useContext(SesiContext);
}
