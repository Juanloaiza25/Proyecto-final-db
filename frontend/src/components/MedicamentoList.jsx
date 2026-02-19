import { deleteMedicamento } from "../api/medicamentosApi";
import { Edit2, Trash2, Pill, Search } from "lucide-react";
import { useState } from "react";

export default function MedicamentoList({ medicamentos, setEditing, fetchMedicamentos }) {
  const [listSearch, setListSearch] = useState("");

  const filtered = medicamentos.filter(m =>
    m.nombreComercial.toLowerCase().includes(listSearch.toLowerCase()) ||
    m.nombreGenerico.toLowerCase().includes(listSearch.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este medicamento?")) {
      try {
        await deleteMedicamento(id);
        fetchMedicamentos();
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Pill size={18} className="text-brand-primary" />
          Inventario Registrado
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary" size={16} />
          <input
            type="text"
            placeholder="Filtrar lista..."
            value={listSearch}
            onChange={(e) => setListSearch(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm dark:text-slate-200 focus:ring-2 focus:ring-brand-primary/20 outline-none w-full md:w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Medicamento</th>
              <th>Categoría</th>
              <th>Forma / Unidad</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.idMedicamento} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 group">
                <td>
                  <div className="font-bold text-slate-900 dark:text-white">{m.nombreComercial}</div>
                  <div className="text-xs text-slate-400 italic">{m.nombreGenerico}</div>
                </td>
                <td>
                  <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-bold rounded-md uppercase">
                    {m.categoria?.nombre || "N/A"}
                  </span>
                </td>
                <td>
                  <div className="text-sm text-slate-600 dark:text-slate-400">{m.forma?.nombre || "-"}</div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500">{m.unidad?.nombre || "-"}</div>
                </td>
                <td>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${m.isActive ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"}`}>
                    {m.isActive ? "ACTIVO" : "INACTIVO"}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditing(m)}
                      className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg"
                      title="Editar"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(m.idMedicamento)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400 font-medium">No se encontraron registros en esta vista.</p>
          </div>
        )}
      </div>
    </div>
  );
}
