export default function Header({ view, setView }) {
  return (
    <header className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Clínica Salud y Vida - Gestión de Medicamentos</h1>
      <nav className="space-x-2">
        <button
          className={`px-4 py-1 rounded ${view === "home" ? "bg-white text-blue-600" : "bg-blue-500 cursor-pointer"}`}
          onClick={() => setView("home")}
        >
          Home
        </button>
        <button
          className={`px-4 py-1 rounded ${view === "admin" ? "bg-white text-blue-600" : "bg-blue-500 cursor-pointer"}`}
          onClick={() => setView("admin")}
        >
          Admin
        </button>
      </nav>
    </header>
  );
}
