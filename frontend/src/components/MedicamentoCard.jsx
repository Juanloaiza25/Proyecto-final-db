export default function MedicamentoCard({ medicamento, onClick }) {
  const inactive = !medicamento.isActive;

  return (
    <div
      onClick={() => onClick(medicamento)}
      className={
        `border p-4 rounded shadow cursor-pointer transition hover:shadow-lg hover:transalate-y-1
         ${inactive ? "bg-gray-300 text-gray-600" : "hover:bg-gray-100"}`
      }
    >
      <h2 className="font-bold">{medicamento.nombreComercial}</h2>
      <p>{medicamento.nombreGenerico}</p>
      <p className="text-sm text-gray-500">{medicamento.categoria?.nombre}</p>

      {/* Etiqueta de inactivo (opcional lindo extra) */}
      {inactive && (
        <span className="mt-2 inline-block bg-gray-700 text-white text-xs px-2 py-1 rounded">
          Inactivo
        </span>
      )}
    </div>
  );
}
