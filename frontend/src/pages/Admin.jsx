import { useState, useEffect } from "react";
import { getMedicamentos } from "../api/medicamentosApi";
import MedicamentoForm from "../components/MedicamentoForm";
import MedicamentosList from "../components/MedicamentosList";

export default function Admin() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadMedicamentos = async () => {
    try {
      const data = await getMedicamentos();
      setMedicamentos(data);
    } catch (error) {
      console.error("Error cargando medicamentos:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadMedicamentos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administración de Medicamentos</h1>

      <div className="mb-8">
        <MedicamentoForm
          editing={editing}
          onSaved={() => {
            setEditing(null);
            loadMedicamentos();
          }}
        />
      </div>

      <MedicamentosList
        medicamentos={medicamentos}
        setEditing={setEditing}
        fetchMedicamentos={loadMedicamentos}
      />
    </div>
  );
}
