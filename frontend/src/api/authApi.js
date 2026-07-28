const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/api\/medicamentos$/, '') || "http://localhost:8080";

export const login = async (username, password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al iniciar sesión");
  }
  return res.json();
};

export const register = async (data) => {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Error al registrarse");
  }
  return res.json();
};
