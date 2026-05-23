import useAdminUsuarios from "../hooks/useAdminUsuarios.js";
import Cargando from "../components/Cargando";
import useContextoSesion from "../hooks/useContextoSesion.js";

const AdminPanelTailwind = () => {
  const { usuariosFiltrados, cargando, error, filtro, setFiltro, cambiarRol } =
    useAdminUsuarios();
  const { usuario } = useContextoSesion(); // Identifico al administrador para evitar que cambie su propio rol.

  if (cargando) return <Cargando />;
  if (error)
    return (
      <p className="px-6 py-4 text-orange-600 border border-orange-300 bg-orange-50">
        Error: {error}
      </p>
    );

  const renderRol = (u) =>
    u.id === usuario?.id ? (
      <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 border border-orange-200 bg-orange-50">
        {u.roles?.[0]?.name ?? "Usuario"} (tÃº)
      </span>
    ) : (
      <select
        value={u.roles?.[0]?.name ?? "Usuario"}
        onChange={(e) => cambiarRol(u.id, e.target.value)}
        className="w-full px-3 py-2 font-semibold text-orange-600 transition bg-white border border-orange-300 cursor-pointer hover:bg-orange-50 focus:outline-none focus:border-orange-500 md:w-auto"
      >
        <option value="Usuario">Usuario</option>
        <option value="Administrador">Administrador</option>
        <option value="Invitado">Invitado</option>
      </select>
    );

  const renderVerificacion = (u) =>
    u.email_verified_at ? (
      <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 border border-green-200">
        {new Date(u.email_verified_at).toLocaleDateString("es-ES")}
      </span>
    ) : (
      <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 bg-white border border-orange-300">
        Pendiente
      </span>
    );

  return (
    <main className="min-h-screen font-sans bg-white">
      {/* Muestro la cabecera con un estilo similar al hero, pero más compacto */}
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
          {/* Muestro el buscador con el estilo de mis botones secundarios */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar por nombre o email..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full px-4 py-3 text-gray-700 transition border border-orange-300 md:w-96 bg-white/20 backdrop-blur-md focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-4 md:hidden">
            {usuariosFiltrados.map((u) => (
              <article
                key={u.id}
                className="p-4 text-left bg-white border border-gray-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-gray-800 break-words">
                      {u.nombre}
                    </h2>
                    <p className="mt-1 text-sm text-gray-600 break-all">
                      {u.email}
                    </p>
                  </div>
                </div>

                <dl className="grid gap-3 mt-4 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-semibold text-gray-500">
                      Email verificado
                    </dt>
                    <dd className="shrink-0">{renderVerificacion(u)}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-semibold text-gray-500">
                      Fecha registro
                    </dt>
                    <dd className="text-gray-700 shrink-0">
                      {new Date(u.created_at).toLocaleDateString("es-ES")}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="font-semibold text-gray-500">Rol</dt>
                    <dd className="min-w-40">{renderRol(u)}</dd>
                  </div>
                </dl>
              </article>
            ))}

            {usuariosFiltrados.length === 0 && (
              <div className="py-16 text-center bg-white border border-gray-200">
                <p className="text-lg text-gray-600">
                  No se encontraron usuarios.
                </p>
              </div>
            )}
          </div>

          {/* Muestro la tabla */}
          <div className="hidden overflow-x-auto border border-gray-200 md:block">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-800">
                    Nombre
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-800">
                    Email
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-800">
                    Email verificado
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-800">
                    Fecha registro
                  </th>
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

                    <td className="px-6 py-4 text-gray-600">{u.email}</td>

                    {/* Muestro el badge de verificación con el naranja de la marca */}
                    <td className="px-6 py-4">
                      {u.email_verified_at ? (
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 border border-green-200">
                          {new Date(u.email_verified_at).toLocaleDateString(
                            "es-ES",
                          )}
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

                    {/* Muestro el selector de rol */}
                    <td className="px-6 py-4">
                      {u.id === usuario?.id ? (
                        // Si es mi propio usuario administrador, muestro solo texto sin selector.
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-orange-600 border border-orange-200 bg-orange-50">
                          {u.roles?.[0]?.name ?? "Usuario"} (tú)
                        </span>
                      ) : (
                        <select
                          value={u.roles?.[0]?.name ?? "Usuario"}
                          onChange={(e) => cambiarRol(u.id, e.target.value)}
                          className="px-3 py-2 font-semibold text-orange-600 transition border border-orange-300 cursor-pointer bg-white/20 backdrop-blur-md hover:bg-orange-50 focus:outline-none focus:border-orange-500"
                        >
                          <option value="Usuario">Usuario</option>
                          <option value="Administrador">Administrador</option>
                          <option value="Invitado">Invitado</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Muestro el estado vacío */}
            {usuariosFiltrados.length === 0 && (
              <div className="py-16 text-center bg-white">
                <p className="text-lg text-gray-600">
                  No se encontraron usuarios.
                </p>
              </div>
            )}
          </div>

          {/* Muestro el contador */}
          <p className="mt-4 text-sm text-gray-500">
            {usuariosFiltrados.length} usuario
            {usuariosFiltrados.length !== 1 ? "s" : ""} encontrado
            {usuariosFiltrados.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>
    </main>
  );
};

export default AdminPanelTailwind;
