const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/api\/medicamentos$/, '') || "http://localhost:8080";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
};

export const getUsuarios = async () => {
  const res = await fetch(`${API_BASE}/api/admin/usuarios`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Error cargando usuarios");
  return res.json();
};

export const getUsuario = async (id) => {
  const res = await fetch(`${API_BASE}/api/admin/usuarios/${id}`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Error cargando usuario");
  return res.json();
};

export const createUsuario = async (data) => {
  const res = await fetch(`${API_BASE}/api/admin/usuarios`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error creando usuario");
  }
  return res.json();
};

export const updateUsuario = async (id, data) => {
  const res = await fetch(`${API_BASE}/api/admin/usuarios/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error actualizando usuario");
  }
  return res.json();
};

export const deleteUsuario = async (id) => {
  const res = await fetch(`${API_BASE}/api/admin/usuarios/${id}`, {
    method: "DELETE",
    headers: getHeaders()
  });
  if (!res.ok) throw new Error("Error eliminando usuario");
};

export const getRoles = async () => {
  const res = await fetch(`${API_BASE}/api/admin/usuarios/roles`, { headers: getHeaders() });
  if (!res.ok) throw new Error("Error cargando roles");
  return res.json();
};
