import { useEffect, useState } from "react";

export default function MedicamentoDetail({ medicamento, onClose }) {
  const [show, setShow] = useState(false);

  // Cuando llega un medicamento → animación de entrada
  useEffect(() => {
    if (medicamento) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(true);
    }
  }, [medicamento]);

  if (!medicamento) return null;

  // Animación de salida antes de desmontar
  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(), 200); // coincide con duración de animación
  };

  return (
    <div
      onClick={(e) => {
        // Cierra solo si se hace clic en el fondo, no dentro del contenido
        if (e.target === e.currentTarget) handleClose();
      }}
      className={`
        fixed inset-0 flex justify-center items-center p-4
        bg-black/30 backdrop-blur-sm
        transition-opacity duration-200
        ${show ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        className={`
          bg-white p-6 rounded shadow w-full max-w-md
          transition-all duration-200
          ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"}
        `}
        onClick={(e) => e.stopPropagation()} // evita cerrar al hacer clic dentro
      >
        <h2 className="text-xl font-bold mb-2">{medicamento.nombreComercial}</h2>

        <p><strong>Genérico:</strong> {medicamento.nombreGenerico}</p>
        <p><strong>Categoría:</strong> {medicamento.categoria?.nombre}</p>
        <p><strong>Unidad:</strong> {medicamento.unidad?.nombre}</p>
        <p><strong>Forma:</strong> {medicamento.forma?.nombre}</p>
        <p><strong>Concentración:</strong> {medicamento.concentracion}</p>
        <p><strong>Presentación:</strong> {medicamento.presentacion}</p>
        <p><strong>Efectos Secundarios:</strong> {medicamento.efectosSecundarios}</p>
        <p><strong>Contraindicaciones:</strong> {medicamento.contraindicaciones}</p>

        <button
          onClick={handleClose}
          className="mt-4 bg-red-500 text-white px-4 py-1 rounded cursor-pointer transition hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
