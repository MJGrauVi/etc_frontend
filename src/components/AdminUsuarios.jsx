import useAdminUsuarios from "../hooks/useAdminUsuarios.js";
import Cargando from "../components/Cargando";
import "./AdminUsuarios.css";

const AdminUsuarios = () => {
  const { usuariosFiltrados, cargando, error, filtro, setFiltro, cambiarRol } = useAdminUsuarios();

  if (cargando) return <Cargando />;
  if (error) return <p className="admin-error">Error: {error}</p>;

  return (
    <div className="admin-container">
      <h2 className="admin-titulo">Gestión de usuarios</h2>

      <input
        className="admin-buscador"
        type="text"
        placeholder="Buscar por nombre o email..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <table className="admin-tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Verificado</th>
            <th>Registro</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <span className={`badge ${u.email_verified_at ? "badge-ok" : "badge-pending"}`}>
                  {u.email_verified_at
                    ? new Date(u.email_verified_at).toLocaleDateString("es-ES")
                    : "Pendiente"}
                </span>
              </td>
              <td>{new Date(u.created_at).toLocaleDateString("es-ES")}</td>
              <td>
                <select
                  className="admin-select"
                  value={u.rol}
                  onChange={(e) => cambiarRol(u.id, e.target.value)}
                >
                  <option value="usuario">usuario</option>
                  <option value="administrador">administrador</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuariosFiltrados.length === 0 && (
        <p className="admin-vacio">No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default AdminUsuarios;