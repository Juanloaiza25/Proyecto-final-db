import { useEffect, useState } from "react";
import {
  getUsuarios, createUsuario, updateUsuario, deleteUsuario, getRoles
} from "../api/usuariosApi";
import {
  Users, Plus, Pencil, Trash2, X, Check, AlertCircle, Shield,
  ShieldCheck, ShieldAlert, User, ToggleLeft, ToggleRight, Save
} from "lucide-react";

const ROL_LABELS = {
  "ROLE_ADMIN":    { label: "Admin",    color: "bg-rose-500/15 text-rose-400 border-rose-500/20" },
  "ROLE_EMPLEADO": { label: "Empleado", color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  "ROLE_USUARIO":  { label: "Usuario",  color: "bg-sky-500/15  text-sky-400  border-sky-500/20" },
};

const RolBadge = ({ rol }) => {
  const meta = ROL_LABELS[rol] || { label: rol, color: "bg-slate-500/15 text-slate-400 border-slate-500/20" };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold ${meta.color}`}>
      {meta.label}
    </span>
  );
};

const EMPTY_FORM = { username: "", email: "", password: "", nombre: "", apellido: "", idRol: "", isActive: true };

export default function UsuariosPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // null = crear, object = editar
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      const [usuariosData, rolesData] = await Promise.all([getUsuarios(), getRoles()]);
      setUsuarios(usuariosData);
      setRoles(rolesData);
    } catch (e) {
      setError("Error cargando usuarios: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setShowForm(true);
  };

  const openEdit = (u) => {
    setEditing(u);
    setForm({
      username: u.username || "",
      email: u.email || "",
      password: "",
      nombre: u.nombre || "",
      apellido: u.apellido || "",
      idRol: u.idRol || "",
      isActive: u.isActive ?? true,
    });
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);
    try {
      const payload = { ...form, idRol: Number(form.idRol) };
      if (editing) {
        if (!payload.password) delete payload.password;
        await updateUsuario(editing.idUsuario, payload);
      } else {
        await createUsuario(payload);
      }
      closeForm();
      load();
    } catch (e) {
      setFormError(e.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUsuario(id);
      setDeleteConfirm(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleToggleActive = async (u) => {
    try {
      await updateUsuario(u.idUsuario, { isActive: !u.isActive });
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
            <Users size={18} />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 dark:text-white">Gestión de Usuarios</h3>
            <p className="text-xs text-slate-400">{usuarios.length} usuarios registrados</p>
          </div>
        </div>
        <button
          id="btn-nuevo-usuario"
          onClick={openCreate}
          className="flex items-center gap-2 bg-brand-primary text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-brand-primary/90 transition shadow-lg shadow-brand-primary/20 cursor-pointer"
        >
          <Plus size={16} /> Nuevo usuario
        </button>
      </div>

      {/* Global error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
          <AlertCircle size={16} /> {error}
          <button onClick={() => setError("")} className="ml-auto"><X size={14} /></button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              {["Usuario", "Nombre", "Email", "Rol", "Estado", "Acciones"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {usuarios.map(u => (
              <tr key={u.idUsuario} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition">
                <td className="px-4 py-3 font-medium text-slate-800 dark:text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xs font-bold">
                      {u.username?.[0]?.toUpperCase()}
                    </div>
                    {u.username}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  {[u.nombre, u.apellido].filter(Boolean).join(" ") || "—"}
                </td>
                <td className="px-4 py-3 text-slate-500 dark:text-slate-400">{u.email || "—"}</td>
                <td className="px-4 py-3"><RolBadge rol={u.rolNombre} /></td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => handleToggleActive(u)}
                    className={`flex items-center gap-1 text-xs font-medium transition cursor-pointer ${u.isActive ? "text-emerald-500" : "text-slate-400"}`}
                    title={u.isActive ? "Desactivar" : "Activar"}
                  >
                    {u.isActive
                      ? <><ToggleRight size={18} /> Activo</>
                      : <><ToggleLeft size={18} /> Inactivo</>}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(u)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-brand-primary hover:bg-brand-primary/10 transition cursor-pointer"
                      title="Editar"
                    >
                      <Pencil size={14} />
                    </button>
                    {deleteConfirm === u.idUsuario ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(u.idUsuario)}
                          className="p-1.5 rounded-lg text-white bg-red-500 hover:bg-red-600 transition cursor-pointer" title="Confirmar">
                          <Check size={14} />
                        </button>
                        <button onClick={() => setDeleteConfirm(null)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer" title="Cancelar">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(u.idUsuario)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer"
                        title="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal / Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg">
            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                  {editing ? <Pencil size={16} /> : <Plus size={16} />}
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white">
                  {editing ? "Editar usuario" : "Nuevo usuario"}
                </h3>
              </div>
              <button onClick={closeForm} className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {/* Modal form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Nombre</label>
                  <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    placeholder="Juan" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Apellido</label>
                  <input value={form.apellido} onChange={e => setForm({ ...form, apellido: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                    placeholder="López" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Username *</label>
                <input required value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  placeholder="juanlopez" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  placeholder="juan@email.com" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Contraseña {editing ? "(dejar vacío para no cambiar)" : "*"}
                </label>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  required={!editing} minLength={editing ? 0 : 6}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  placeholder={editing ? "••••••  (sin cambios)" : "Mínimo 6 caracteres"} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Rol *</label>
                  <select required value={form.idRol} onChange={e => setForm({ ...form, idRol: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30">
                    <option value="">Seleccionar...</option>
                    {roles.map(r => (
                      <option key={r.idRol} value={r.idRol}>
                        {ROL_LABELS[r.nombre]?.label || r.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">Estado</label>
                  <button type="button"
                    onClick={() => setForm({ ...form, isActive: !form.isActive })}
                    className={`flex items-center gap-2 w-full border rounded-xl px-3 py-2.5 text-sm font-medium transition cursor-pointer
                      ${form.isActive
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-700/30 dark:bg-emerald-900/20 dark:text-emerald-400"
                        : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500"}`}
                  >
                    {form.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                    {form.isActive ? "Activo" : "Inactivo"}
                  </button>
                </div>
              </div>

              {formError && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl px-4 py-3 text-sm">
                  <AlertCircle size={16} /> {formError}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={closeForm}
                  className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-medium rounded-xl py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer">
                  Cancelar
                </button>
                <button type="submit" disabled={formLoading}
                  className="flex-1 flex items-center justify-center gap-2 bg-brand-primary text-white font-semibold rounded-xl py-2.5 hover:bg-brand-primary/90 disabled:opacity-60 transition cursor-pointer">
                  {formLoading
                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <><Save size={15} /> {editing ? "Guardar cambios" : "Crear usuario"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
