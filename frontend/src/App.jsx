import Home from "./pages/Home";
import AdminPanel from "./components/AdminPanel";
import Header from "./components/Header";
import { useState } from "react";

export default function App() {

  // 🔥 Inicializamos directamente desde localStorage
  const [view, setView] = useState(() => {
    return localStorage.getItem("view") || "home";
  });

  // 🔥 Esto asegura guardar el estado cada vez que cambie
  const handleSetView = (newView) => {
    setView(newView);
    localStorage.setItem("view", newView);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header view={view} setView={handleSetView} />

      <main className="p-4">
        {view === "home" && <Home />}
        {view === "admin" && <AdminPanel />}
      </main>
    </div>
  );
}
