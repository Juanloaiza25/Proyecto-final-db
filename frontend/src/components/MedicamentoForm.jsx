import { useEffect, useState } from "react";
import { createMedicamento, updateMedicamento, getCategorias, getUnidades, getFormas } from "../api/medicamentosApi";

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

  //  Cuando cambie editing, actualizamos el formulario
  useEffect(() => {
    if (editing) {
      // Clonamos para evitar referencias directas
       // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Cargar catálogos
  useEffect(() => {
    const fetchData = async () => {
      setCategorias(await getCategorias());
      setUnidades(await getUnidades());
      setFormas(await getFormas());
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

    if (editing) {
      await updateMedicamento(editing.idMedicamento, form);
    } else {
      await createMedicamento(form);
    }

    onSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-4">
        {editing ? "Editar Medicamento" : "Agregar Medicamento"}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="font-semibold">Nombre Comercial</label>
          <input
            type="text"
            name="nombreComercial"
            value={form.nombreComercial}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Nombre Genérico</label>
          <input
            type="text"
            name="nombreGenerico"
            value={form.nombreGenerico}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Categoría</label>
          <select
            name="categoria"
            value={form.categoria.idCategoria}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Seleccione...</option>
            {categorias.map((c) => (
              <option key={c.idCategoria} value={c.idCategoria}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Unidad</label>
          <select
            name="unidad"
            value={form.unidad.idUnidad}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Seleccione...</option>
            {unidades.map((u) => (
              <option key={u.idUnidad} value={u.idUnidad}>
                {u.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-semibold">Forma</label>
          <select
            name="forma"
            value={form.forma.idForma}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Seleccione...</option>
            {formas.map((f) => (
              <option key={f.idForma} value={f.idForma}>
                {f.nombre}
              </option>
            ))}
          </select>
        </div>

<label className="flex items-center gap-3 select-none">
  <span className="font-semibold">Activo</span>

  <div
    onClick={() => setForm({ ...form, isActive: !form.isActive })}
    className={`
      w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition
      ${form.isActive ? "bg-green-500" : "bg-gray-400"}
    `}
  >
    <div
      className={`
        bg-white w-5 h-5 rounded-full shadow-md transform transition
        ${form.isActive ? "translate-x-6" : "translate-x-0"}
      `}
    ></div>
  </div>
</label>


        <div>
          <label className="font-semibold">Concentración</label>
          <input
            type="text"
            name="concentracion"
            value={form.concentracion}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Presentación</label>
          <input
            type="text"
            name="presentacion"
            value={form.presentacion}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="col-span-2">
          <label className="font-semibold">Efectos Secundarios</label>
          <textarea
            name="efectosSecundarios"
            value={form.efectosSecundarios}
            onChange={handleChange}
            className="border p-2 rounded w-full resize-none"
          />
        </div>

        <div className="col-span-2">
          <label className="font-semibold">Contraindicaciones</label>
          <textarea
            name="contraindicaciones"
            value={form.contraindicaciones}
            onChange={handleChange}
            className="border p-2 rounded w-full resize-none overflow-y-auto"
          />
        </div>

      </div>

      <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
        {editing ? "Actualizar" : "Agregar"}
      </button>
        {editing && (
    <button
        type="button"
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded ml-2 cursor-pointer"
        onClick={() => setForm(BASE_FORM) || onSaved(null)}
    >
        Cancelar
    </button>
    )}
    </form>
  );
}
