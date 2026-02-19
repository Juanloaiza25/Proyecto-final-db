import Home from "./pages/Home";
import AdminPanel from "./components/AdminPanel";
import { useState, useEffect } from "react";
import { LayoutDashboard, Database, Activity, Sun, Moon } from "lucide-react";

export default function App() {
  const [view, setView] = useState(() => {
    return localStorage.getItem("view") || "home";
  });

  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex flex-col hidden lg:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <Activity size={24} />
          </div>
          <div>
            <h1 className="font-bold text-slate-800 dark:text-white leading-tight">Salud & Vida</h1>
            <p className="text-xs text-slate-400 font-medium tracking-wide">GESTIÓN MÉDICA</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <button
            onClick={() => handleSetView("home")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer ${view === "home"
              ? "bg-brand-primary/10 text-brand-primary shadow-sm"
              : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            <LayoutDashboard size={20} />
            Catálogo
          </button>

          <button
            onClick={() => handleSetView("admin")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium cursor-pointer ${view === "admin"
              ? "bg-brand-primary/10 text-brand-primary shadow-sm"
              : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
          >
            <Database size={20} />
            Administración
          </button>
        </nav>

        <div className="p-4 space-y-4 border-t border-slate-50 dark:border-slate-800 mt-auto">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDark(!isDark)}
            className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white shadow-sm cursor-pointer"
          >
            <div className="flex items-center gap-2 font-medium text-sm">
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
              <span>{isDark ? "Modo Oscuro" : "Modo Claro"}</span>
            </div>
            <div className="w-10 h-5 bg-slate-200 dark:bg-slate-600 rounded-full p-1 flex items-center">
              <div
                className={`w-3.5 h-3.5 bg-white rounded-full shadow-sm transition-transform duration-[250ms] ease-in-out ${isDark ? "translate-x-5" : "translate-x-0"
                  }`}
              ></div>
            </div>
          </button>

          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 mb-1 uppercase tracking-wider">Servidor</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
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
            <h1 className="font-bold text-slate-800 dark:text-white">Salud & Vida</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer">
              {isDark ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => handleSetView("home")} className={`p-2 rounded-lg cursor-pointer ${view === "home" ? "bg-brand-primary text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}><LayoutDashboard size={20} /></button>
            <button onClick={() => handleSetView("admin")} className={`p-2 rounded-lg cursor-pointer ${view === "admin" ? "bg-brand-primary text-white" : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}><Database size={20} /></button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full">
          {view === "home" && <Home />}
          {view === "admin" && <AdminPanel />}
        </main>
      </div>
    </div>
  );
}
