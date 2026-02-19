import { ChevronRight, Pill } from "lucide-react";

export default function MedicamentoCard({ medicamento, onClick }) {
  return (
    <div
      className="card-premium p-6 cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(medicamento)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
          <Pill size={24} />
        </div>
        <div className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-md">
          ID: {medicamento.idMedicamento}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-brand-primary leading-tight">
          {medicamento.nombreComercial}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 mb-4 italic">
          {medicamento.nombreGenerico}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          <span className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-full border border-slate-100 dark:border-slate-700">
            {medicamento.categoria?.nombre || "General"}
          </span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-brand-primary font-semibold text-sm">
        <span className="flex items-center gap-1.5 font-bold">
          Ver detalles
        </span>
        <ChevronRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
