import { useEffect, useState } from "react";
import { getMedicamentos } from "../api/medicamentosApi";
import MedicamentosList from "./MedicamentoList";
import MedicamentoForm from "./MedicamentoForm";
import { Settings, ShieldCheck } from "lucide-react";

export default function AdminPanel() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchMedicamentos();
  }, []);

  const fetchMedicamentos = async () => {
    try {
      const data = await getMedicamentos();
      if (Array.isArray(data)) {
        setMedicamentos(data);
      } else {
        setMedicamentos([]);
      }
    } catch (error) {
      console.error("Error cargando medicamentos:", error);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-primary mb-1">
            <ShieldCheck size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">Acceso Administrativo</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Panel de Control</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Alta, edición y gestión de inventario farmacéutico.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-brand-primary">
              <Settings size={120} className="rotate-12" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 relative z-10">
              {editing ? "Editar Registro" : "Nuevo Medicamento"}
            </h2>
            <MedicamentoForm
              editing={editing}
              onSaved={() => {
                setEditing(null);
                fetchMedicamentos();
              }}
            />
          </div>
        </div>

        <div className="xl:col-span-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <MedicamentosList
              medicamentos={medicamentos}
              setEditing={setEditing}
              fetchMedicamentos={fetchMedicamentos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
