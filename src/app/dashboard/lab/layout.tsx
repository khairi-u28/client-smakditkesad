"use client";

import { useEffect, useState } from "react";
import { getSesiAktif, SesiAktif } from "@/lib/api";
import { SesiContext } from "@/lib/sesi-context";

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const [sesi, setSesi] = useState<SesiAktif | null>(null);
  const [sesiLoading, setSesiLoading] = useState(true);

  useEffect(() => {
    getSesiAktif()
      .then(setSesi)
      .catch(() => setSesi(null))
      .finally(() => setSesiLoading(false));
  }, []);

  return (
    <SesiContext.Provider value={{ sesi, sesiLoading }}>
      {children}
    </SesiContext.Provider>
  );
}
