const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api/medicamentos";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

// GET operations - public (no auth required)
export const getMedicamentos = async () => (await fetch(API_BASE)).json();
export const getMedicamento = async (id) => (await fetch(`${API_BASE}/${id}`)).json();
export const getCategorias = async () => (await fetch(`${API_BASE}/categorias`)).json();
export const getUnidades = async () => (await fetch(`${API_BASE}/unidades`)).json();
export const getFormas = async () => (await fetch(`${API_BASE}/formas`)).json();
export const buscarPorNombre = async (nombre) => (await fetch(`${API_BASE}/buscar?nombre=${encodeURIComponent(nombre)}`)).json();

// Write operations - require ADMIN or EMPLEADO token
export const createMedicamento = async (data) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al crear medicamento");
  return res.json();
};

export const updateMedicamento = async (id, data) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error("Error al actualizar medicamento");
  return res.json();
};

export const deleteMedicamento = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Error al eliminar medicamento");
};
