import useAdminUsuarios from "../hooks/useAdminUsuarios.js";
import Cargando from "../components/Cargando";

const AdminUsuarios = () => {
  const { usuariosFiltrados, cargando, error, filtro, setFiltro, cambiarRol } = useAdminUsuarios();

  if (cargando) return <Cargando />;
  if (error) return (
    <p className="p-4 text-red-600">Error: {error}</p>
  );

  return (
    <div className="max-w-5xl px-8 py-8 mx-auto">

      <h2 className="mb-6 text-2xl font-semibold text-gray-800">
        Gestión de usuarios
      </h2>

      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="w-full px-4 py-2 mb-6 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-orange-400"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="px-4 py-3 font-semibold text-left text-gray-600">Nombre</th>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">Email</th>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">Verificado</th>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">Registro</th>
              <th className="px-4 py-3 font-semibold text-left text-gray-600">Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map(u => (
              <tr
                key={u.id}
                className="transition border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-800 align-middle">{u.name}</td>
                <td className="px-4 py-3 text-gray-600 align-middle">{u.email}</td>
                <td className="px-4 py-3 align-middle">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    u.email_verified_at
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {u.email_verified_at
                      ? new Date(u.email_verified_at).toLocaleDateString("es-ES")
                      : "Pendiente"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 align-middle">
                  {new Date(u.created_at).toLocaleDateString("es-ES")}
                </td>
                <td className="px-4 py-3 align-middle">
                  <select
                    value={u.rol}
                    onChange={(e) => cambiarRol(u.id, e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-300 rounded cursor-pointer focus:outline-none focus:border-orange-400"
                  >
                    <option value="usuario">usuario</option>
                    <option value="administrador">administrador</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {usuariosFiltrados.length === 0 && (
        <p className="py-8 text-sm text-center text-gray-400">
          No se encontraron usuarios.
        </p>
      )}
    </div>
  );
};

export default AdminUsuarios;