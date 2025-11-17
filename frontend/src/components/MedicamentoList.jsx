import { deleteMedicamento } from "../api/medicamentosApi";

export default function MedicamentoList({ medicamentos, setEditing, fetchMedicamentos }) {
  const handleDelete = async (id) => {
    if (confirm("¿Eliminar este medicamento?")) {
      await deleteMedicamento(id);
      fetchMedicamentos();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Nombre Comercial</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Genérico</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Categoría</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Unidad</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Forma</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {medicamentos.map((m) => (
            <tr key={m.idMedicamento} className="even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{m.idMedicamento}</td>
              <td className="border border-gray-300 px-4 py-2">{m.nombreComercial}</td>
              <td className="border border-gray-300 px-4 py-2">{m.nombreGenerico}</td>
              <td className="border border-gray-300 px-4 py-2">{m.categoria?.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{m.unidad?.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{m.forma?.nombre}</td>
                      {/* ESTADO */}
                <td className={`border border-gray-300 px-4 py-2 ` +
                    (m.isActive ? "text-green-600" : "text-red-600")}>
                {m.isActive ? "Activo" : "Inactivo"}
                </td>

              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-1 cursor-pointer"
                  onClick={() => setEditing(m)}
                >
                  Editar
                </button>

                <button
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  onClick={() => handleDelete(m.idMedicamento)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
