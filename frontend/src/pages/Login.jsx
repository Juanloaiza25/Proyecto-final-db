import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Activity, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login({ onGoRegister }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.username, form.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      {/* Background decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl shadow-2xl shadow-brand-primary/30 mb-4">
            <Activity size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Salud &amp; Vida</h1>
          <p className="text-slate-400 mt-1 text-sm">Sistema de Gestión Médica</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Iniciar sesión</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Usuario</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-username"
                  type="text"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  placeholder="Ingresa tu usuario"
                  required
                  className="w-full bg-slate-800/60 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-800/60 border border-slate-600/50 text-white placeholder-slate-500 rounded-xl pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 disabled:opacity-60 text-white font-semibold rounded-xl py-3 transition-all duration-200 shadow-lg shadow-brand-primary/20 cursor-pointer"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Iniciando sesión...
                </span>
              ) : "Iniciar sesión"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-700/50" />
            <span className="text-slate-500 text-xs">o</span>
            <div className="flex-1 h-px bg-slate-700/50" />
          </div>

          {/* Register link */}
          <p className="text-center text-slate-400 text-sm">
            ¿No tienes cuenta?{" "}
            <button
              onClick={onGoRegister}
              className="text-brand-primary font-semibold hover:underline cursor-pointer"
            >
              Regístrate aquí
            </button>
          </p>

          {/* Guest hint */}
          <p className="text-center text-slate-500 text-xs mt-3">
            Puedes ver el catálogo de medicamentos sin iniciar sesión.
          </p>
        </div>
      </div>
    </div>
  );
}
