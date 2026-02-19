import { useEffect, useState } from "react";
import { createMedicamento, updateMedicamento, getCategorias, getUnidades, getFormas } from "../api/medicamentosApi";
import { Save, X, PlusCircle, CheckCircle2 } from "lucide-react";

const BASE_FORM = {
  nombreComercial: "",
  nombreGenerico: "",
  categoria: { idCategoria: "" },
  unidad: { idUnidad: "" },
  forma: { idForma: "" },
  concentracion: "",
  presentacion: "",
  efectosSecundarios: "",
  contraindicaciones: "",
  isActive: true
};

export default function MedicamentoForm({ editing, onSaved }) {
  const [form, setForm] = useState(BASE_FORM);
  const [categorias, setCategorias] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [formas, setFormas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        ...editing,
        categoria: { idCategoria: editing.categoria?.idCategoria || "" },
        unidad: { idUnidad: editing.unidad?.idUnidad || "" },
        forma: { idForma: editing.forma?.idForma || "" }
      });
    } else {
      setForm(BASE_FORM);
    }
  }, [editing]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, unis, forms] = await Promise.all([
          getCategorias(),
          getUnidades(),
          getFormas()
        ]);
        setCategorias(cats);
        setUnidades(unis);
        setFormas(forms);
      } catch (error) {
        console.error("Error cargando catálogos:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "categoria")
      setForm({ ...form, categoria: { idCategoria: value } });
    else if (name === "unidad")
      setForm({ ...form, unidad: { idUnidad: value } });
    else if (name === "forma")
      setForm({ ...form, forma: { idForma: value } });
    else if (type === "checkbox")
      setForm({ ...form, [name]: checked });
    else
      setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        categoria: { idCategoria: parseInt(form.categoria.idCategoria) },
        unidad: { idUnidad: parseInt(form.unidad.idUnidad) },
        forma: { idForma: parseInt(form.forma.idForma) }
      };

      if (editing) {
        await updateMedicamento(editing.idMedicamento, payload);
      } else {
        await createMedicamento(payload);
      }
      onSaved();
      setForm(BASE_FORM);
    } catch (error) {
      alert("Error al guardar el medicamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-5">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Nombre Comercial</label>
          <input
            type="text"
            name="nombreComercial"
            placeholder="Ej: Aspirina"
            value={form.nombreComercial}
            onChange={handleChange}
            className="input-premium"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Nombre Genérico</label>
          <input
            type="text"
            name="nombreGenerico"
            placeholder="Ej: Ácido Acetilsalicílico"
            value={form.nombreGenerico}
            onChange={handleChange}
            className="input-premium"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Categoría</label>
            <select
              name="categoria"
              value={form.categoria.idCategoria}
              onChange={handleChange}
              className="input-premium appearance-none"
              required
            >
              <option value="">Seleccionar...</option>
              {categorias.map((c) => (
                <option key={c.idCategoria} value={c.idCategoria}>{c.nombre}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Unidad</label>
            <select
              name="unidad"
              value={form.unidad.idUnidad}
              onChange={handleChange}
              className="input-premium appearance-none"
              required
            >
              <option value="">Seleccionar...</option>
              {unidades.map((u) => (
                <option key={u.idUnidad} value={u.idUnidad}>{u.nombre}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider ml-1">Forma</label>
            <select
              name="forma"
              value={form.forma.idForma}
              onChange={handleChange}
              className="input-premium appearance-none"
              required
            >
              <option value="">Seleccionar...</option>
              {formas.map((f) => (
                <option key={f.idForma} value={f.idForma}>{f.nombre}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 mt-5">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={form.isActive}
              onChange={handleChange}
              className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-brand-primary focus:ring-brand-primary/20 bg-white dark:bg-slate-900"
            />
            <label htmlFor="isActive" className="text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              Estado Activo
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-4">
        <button
          disabled={loading}
          type="submit"
          className="btn-primary w-full justify-center h-12 shadow-lg shadow-brand-primary/20 disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              {editing ? <CheckCircle2 size={20} /> : <PlusCircle size={20} />}
              {editing ? "Guardar Cambios" : "Registrar Medicamento"}
            </>
          )}
        </button>

        {editing && (
          <button
            type="button"
            className="btn-outline w-full justify-center h-12"
            onClick={() => onSaved()}
          >
            <X size={20} />
            Cancelar Edición
          </button>
        )}
      </div>
    </form>
  );
}
