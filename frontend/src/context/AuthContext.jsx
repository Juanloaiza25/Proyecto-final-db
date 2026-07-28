import { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin, register as apiRegister } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const data = await apiLogin(username, password);
    localStorage.setItem("token", data.token);
    const userData = {
      username: data.username,
      nombre: data.nombre,
      apellido: data.apellido,
      rol: data.rol,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return data;
  };

  const register = async (formData) => {
    const data = await apiRegister(formData);
    localStorage.setItem("token", data.token);
    const userData = {
      username: data.username,
      nombre: data.nombre,
      apellido: data.apellido,
      rol: data.rol,
    };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAdmin = () => user?.rol === "ROLE_ADMIN";
  const isEmpleado = () => user?.rol === "ROLE_EMPLEADO";
  const canEdit = () => isAdmin() || isEmpleado();
  const isAuthenticated = () => !!user;

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, isAdmin, isEmpleado, canEdit, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
