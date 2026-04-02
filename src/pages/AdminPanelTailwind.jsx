import useAdminUsuarios from "../hooks/useAdminUsuarios.js";
import Cargando from "../components/Cargando";

const AdminPanelTailwind = () => {
  const { usuariosFiltrados, cargando, error, filtro, setFiltro, cambiarRol } = useAdminUsuarios();

  if (cargando) return <Cargando />;
  if (error) return (
    <p className="px-6 py-4 text-orange-600 border border-orange-300 bg-orange-50">
      Error: {error}
    </p>
  );

  return (
    <main className="min-h-screen font-sans bg-white">

      {/* Cabecera — mismo estilo que tu hero pero más compacto */}
      <section className="py-12 border-b border-gray-200 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Gestión de usuarios
          </h1>
          <p className="mt-2 text-gray-600">
            Administra roles y verifica el estado de los usuarios registrados.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">

          {/* Buscador — mismo estilo que tus botones secundarios */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 transition border border-orange-300 md:w-96 bg-white/20 backdrop-blur-md focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto border border-gray-200">
            <table className="w-full text-sm text-left text-gray-700">

              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-800">Nombre</th>
                  <th className="px-6 py-4 font-semibold text-gray-800">Email</th>
                  <th className="px-6 py-4 font-semibold text-gray-800">Email verificado</th>
                  <th className="px-6 py-4 font-semibold text-gray-800">Fecha registro</th>
                  <th className="px-6 py-4 font-semibold text-gray-800">Rol</th>
                </tr>
              </thead>

              <tbody>
                {usuariosFiltrados.map((u, index) => (
                  <tr
                    key={u.id}
                    className={`border-b border-gray-100 transition hover:bg-orange-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {u.nombre}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {u.email}
                    </td>

                    {/* Badge verificación — mismo naranja de tu paleta */}
                    <td className="px-6 py-4">
                      {u.email_verified_at ? (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 border border-green-200">
                          {new Date(u.email_verified_at).toLocaleDateString("es-ES")}
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-white border border-orange-300">
                          Pendiente
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {new Date(u.created_at).toLocaleDateString("es-ES")}
                    </td>

                    {/* Select rol — coherente con tus botones */}
                    <td className="px-6 py-4">
                      <select
                        value={u.rol?.name ?? "Usuario"}
                        onChange={(e) => cambiarRol(u.id, e.target.value)}
                        className="px-3 py-2 font-semibold text-orange-600 transition border border-orange-300 cursor-pointer bg-white/20 backdrop-blur-md hover:bg-orange-50 focus:outline-none focus:border-orange-500"
                      >
                        <option value="usuario">usuario</option>
                        <option value="administrador">administrador</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Vacío */}
            {usuariosFiltrados.length === 0 && (
              <div className="py-16 text-center bg-white">
                <p className="text-lg text-gray-600">
                  No se encontraron usuarios.
                </p>
              </div>
            )}
          </div>

          {/* Contador */}
          <p className="mt-4 text-sm text-gray-500">
            {usuariosFiltrados.length} usuario{usuariosFiltrados.length !== 1 ? "s" : ""} encontrado{usuariosFiltrados.length !== 1 ? "s" : ""}
          </p>

        </div>
      </section>
    </main>
  );
};

export default AdminPanelTailwind;