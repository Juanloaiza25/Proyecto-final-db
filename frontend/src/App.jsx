import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./components/AdminPanel";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Database, Activity, Sun, Moon,
  LogOut, User, Users, ShieldCheck, Pill
} from "lucide-react";

// ROL label mapping
const ROL_DISPLAY = {
  "ROLE_ADMIN":    { label: "Admin",    color: "text-rose-400",   bg: "bg-rose-500/10" },
  "ROLE_EMPLEADO": { label: "Empleado", color: "text-amber-400",  bg: "bg-amber-500/10" },
  "ROLE_USUARIO":  { label: "Usuario",  color: "text-sky-400",    bg: "bg-sky-500/10" },
};

function AppContent() {
  const { user, logout, isAdmin, canEdit, loading } = useAuth();

  const [view, setView] = useState(() => localStorage.getItem("view") || "home");
  const [authView, setAuthView] = useState("login"); // "login" | "register"
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const handleSetView = (newView) => {
    setView(newView);
    localStorage.setItem("view", newView);
  };

  const handleLogout = () => {
    logout();
    handleSetView("home");
  };

  // Loading spinner while restoring session
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Show login/register pages if not authenticated and trying to access admin
  if (!user && (view === "admin")) {
    return authView === "login"
      ? <Login onGoRegister={() => setAuthView("register")} />
      : <Register onGoLogin={() => setAuthView("login")} />;
  }

  const rolMeta = user ? (ROL_DISPLAY[user.rol] || { label: user.rol, color: "text-slate-400", bg: "bg-slate-500/10" }) : null;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex-col hidden lg:flex">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 dark:text-white leading-tight">Salud &amp; Vida</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">GESTIÓN MÉDICA</p>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {/* Catálogo — visible para todos */}
          <button
            id="nav-catalogo"
            onClick={() => handleSetView("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer ${view === "home"
              ? "bg-brand-primary/10 text-brand-primary shadow-sm"
              : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            <LayoutDashboard size={20} />
            Catálogo
          </button>

          {/* Administración — solo ADMIN y EMPLEADO */}
          {canEdit() && (
            <button
              id="nav-admin"
              onClick={() => handleSetView("admin")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer ${view === "admin"
                ? "bg-brand-primary/10 text-brand-primary shadow-sm"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
            >
              <Database size={20} />
              Administración
            </button>
          )}
        </nav>

        {/* Bottom section */}
        <div className="p-4 space-y-3 border-t border-slate-50 dark:border-slate-800 mt-auto">

          {/* Theme toggle */}
          <button
            type="button"
            id="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2 font-medium text-sm">
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
              <span>{isDark ? "Modo Oscuro" : "Modo Claro"}</span>
            </div>
            <div className="w-10 h-5 bg-slate-200 dark:bg-slate-600 rounded-full p-1 flex items-center">
              <div className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform duration-250 ease-in-out ${isDark ? "translate-x-5" : "translate-x-0"}`} />
            </div>
          </button>

          {/* User info or login buttons */}
          {user ? (
            <div className="space-y-2">
              {/* User card */}
              <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-3 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-sm">
                    {user.username?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 truncate">
                      {user.nombre || user.username}
                    </p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${rolMeta?.bg} ${rolMeta?.color}`}>
                      {rolMeta?.label}
                    </span>
                  </div>
                </div>
              </div>
              {/* Logout */}
              <button
                id="btn-logout"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium text-sm transition cursor-pointer"
              >
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button
                id="btn-login"
                onClick={() => { setAuthView("login"); handleSetView("auth"); }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-brand-primary text-white font-semibold text-sm hover:bg-brand-primary/90 transition cursor-pointer"
              >
                <User size={16} /> Iniciar sesión
              </button>
              <button
                id="btn-register"
                onClick={() => { setAuthView("register"); handleSetView("auth"); }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Registrarse
              </button>
            </div>
          )}

          {/* Server status */}
          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-3 border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Servidor</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Conectado</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Mobile Header */}
        <header className="lg:hidden p-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <Activity className="text-brand-primary" size={24} />
            <h1 className="font-bold text-slate-800 dark:text-white">Salud &amp; Vida</h1>
          </div>
          <div className="flex gap-2 items-center">
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer">
              {isDark ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => handleSetView("home")} className={`p-2 rounded-lg cursor-pointer ${view === "home" ? "bg-brand-primary text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-500"}`}>
              <LayoutDashboard size={20} />
            </button>
            {canEdit() && (
              <button onClick={() => handleSetView("admin")} className={`p-2 rounded-lg cursor-pointer ${view === "admin" ? "bg-brand-primary text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-500"}`}>
                <Database size={20} />
              </button>
            )}
            {user ? (
              <button onClick={handleLogout} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-red-400 cursor-pointer" title="Cerrar sesión">
                <LogOut size={20} />
              </button>
            ) : (
              <button onClick={() => { setAuthView("login"); handleSetView("auth"); }} className="p-2 rounded-lg bg-brand-primary text-white cursor-pointer">
                <User size={20} />
              </button>
            )}
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {/* Auth views */}
          {view === "auth" && authView === "login" && (
            <Login onGoRegister={() => setAuthView("register")} />
          )}
          {view === "auth" && authView === "register" && (
            <Register onGoLogin={() => setAuthView("login")} />
          )}

          {/* App views */}
          {view === "home" && <Home />}
          {view === "admin" && canEdit() && <AdminPanel />}

          {/* Blocked: logged in but no permissions for admin */}
          {view === "admin" && !canEdit() && user && (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <ShieldCheck size={48} className="text-slate-300 dark:text-slate-600" />
              <h2 className="text-xl font-bold text-slate-600 dark:text-slate-400">Acceso restringido</h2>
              <p className="text-slate-400">Tu rol no tiene permisos para acceder a esta sección.</p>
              <button onClick={() => handleSetView("home")} className="text-brand-primary font-semibold hover:underline cursor-pointer">
                Volver al catálogo
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
