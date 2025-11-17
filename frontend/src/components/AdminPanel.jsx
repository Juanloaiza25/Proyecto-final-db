import { useEffect, useState } from "react";
import { getMedicamentos} from "../api/medicamentosApi";
import MedicamentosList from "./MedicamentoList";
import MedicamentoForm from "./MedicamentoForm";

export default function AdminPanel() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    // Función async dentro del useEffect
    const fetchData = async () => {
      try {
        const data = await getMedicamentos();
        setMedicamentos(data);
      } catch (error) {
        console.error("Error cargando medicamentos:", error);
      }
    };

    fetchData();
  }, []); // solo al montar

  const fetchMedicamentos = async () => {
    try {
      const data = await getMedicamentos();
      setMedicamentos(data);
    } catch (error) {
      console.error("Error refrescando medicamentos:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración - Medicamentos</h1>

      <MedicamentoForm
        editing={editing}
        onSaved={() => {
          setEditing(null);
          fetchMedicamentos();
        }}
      />

      <MedicamentosList
        medicamentos={medicamentos}
        setEditing={setEditing}
        fetchMedicamentos={fetchMedicamentos}
      />
    </div>
  );
}
