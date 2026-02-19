import { useEffect, useState, useMemo } from "react";
import { getMedicamentos } from "../api/medicamentosApi";
import { Search, Pill, Plus } from "lucide-react";

import MedicamentoCard from "../components/MedicamentoCard";
import MedicamentoDetail from "../components/MedicamentoDetail";

export default function Home() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await getMedicamentos();
        if (Array.isArray(data)) {
          setMedicamentos(data);
        } else {
          console.error("Respuesta inesperada de la API:", data);
          setMedicamentos([]);
        }
      } catch (error) {
        console.error("Error cargando medicamentos:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return medicamentos.filter(m =>
      m.nombreComercial.toLowerCase().includes(q) ||
      m.nombreGenerico.toLowerCase().includes(q)
    );
  }, [search, medicamentos]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Catálogo de Medicamentos</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Gestiona y consulta el inventario actual de la clínica.</p>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary" size={20} />
        <input
          type="text"
          placeholder="Buscar por nombre comercial, genérico o principio activo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-premium pl-12 h-14 text-lg shadow-sm"
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Buscando en inventario...</p>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(m => (
            <MedicamentoCard key={m.idMedicamento} medicamento={m} onClick={setSelected} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4">
            <Pill size={32} />
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium">No se encontraron medicamentos</p>
          <button onClick={() => setSearch("")} className="text-brand-primary font-semibold mt-2 hover:underline">Limpiar búsqueda</button>
        </div>
      )}

      <MedicamentoDetail medicamento={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
