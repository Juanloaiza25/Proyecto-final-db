import { useEffect, useState, useMemo } from "react";
import { getMedicamentos } from "../api/medicamentosApi";

import MedicamentoCard from "../components/MedicamentoCard";
import MedicamentoDetail from "../components/MedicamentoDetail";

export default function Home() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getMedicamentos();
        setMedicamentos(data);
      } catch (error) {
        console.error("Error cargando medicamentos:", error);
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Catálogo de Medicamentos</h1>

      <input
        type="text"
        placeholder="Buscar medicamento..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map(m => (
          <MedicamentoCard key={m.idMedicamento} medicamento={m} onClick={setSelected} />
        ))}
      </div>

      <MedicamentoDetail medicamento={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
