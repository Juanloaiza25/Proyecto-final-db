import { X, Calendar, Package, Layers, Droplets, Info } from "lucide-react";

export default function MedicamentoDetail({ medicamento, onClose }) {
  if (!medicamento) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Side Panel */}
      <div className="relative w-full max-w-lg h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg">
              <Info size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Detalles del Medicamento</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Main Info */}
          <div className="space-y-2">
            <span className="text-brand-primary font-bold text-xs uppercase tracking-widest px-2 py-1 bg-brand-primary/10 rounded">
              {medicamento.categoria?.nombre || "General"}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{medicamento.nombreComercial}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg italic">{medicamento.nombreGenerico}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="text-brand-secondary"><Droplets size={20} /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Forma</p>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{medicamento.forma?.nombre || "N/A"}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <div className="text-brand-accent"><Layers size={20} /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Unidad</p>
                <p className="font-semibold text-slate-700 dark:text-slate-200">{medicamento.unidad?.nombre || "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Package size={18} className="text-slate-400" />
              Información Adicional
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Principio Activo:</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{medicamento.nombreGenerico}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Concentración:</span>
                <span className="text-slate-800 dark:text-slate-200 font-semibold">{medicamento.concentracion || "No especificada"}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Estado:</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${medicamento.isActive ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-400"}`}>
                  {medicamento.isActive ? "ACTIVO" : "INACTIVO"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="btn-primary w-full justify-center h-12 text-base shadow-lg shadow-brand-primary/20"
          >
            Cerrar Detalles
          </button>
        </div>
      </div>
    </div>
  );
}
