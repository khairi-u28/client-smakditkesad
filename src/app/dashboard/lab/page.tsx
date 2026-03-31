import { FlaskConical } from "lucide-react";

export default function LabPage() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <FlaskConical size={56} className="text-slate-300 mb-4" />
      <h1 className="text-xl font-bold font-heading text-slate-700 mb-2">Lab Kasir</h1>
      <p className="text-slate-500 text-sm max-w-sm">
        Fitur ini sedang dalam tahap pengembangan dan akan segera tersedia.
      </p>
    </div>
  );
}
