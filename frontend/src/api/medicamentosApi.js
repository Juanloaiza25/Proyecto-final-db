const API_BASE = "http://localhost:8080/api/medicamentos";

export const getMedicamentos = async () => (await fetch(API_BASE)).json();
export const getMedicamento = async (id) => (await fetch(`${API_BASE}/${id}`)).json();
export const createMedicamento = async (data) => (await fetch(API_BASE, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})).json();
export const updateMedicamento = async (id, data) => (await fetch(`${API_BASE}/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})).json();
export const deleteMedicamento = async (id) => fetch(`${API_BASE}/${id}`, { method: "DELETE" });
export const getCategorias = async () => (await fetch(`${API_BASE}/categorias`)).json();
export const getUnidades = async () => (await fetch(`${API_BASE}/unidades`)).json();
export const getFormas = async () => (await fetch(`${API_BASE}/formas`)).json();
