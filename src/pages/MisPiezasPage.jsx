import { Link } from "react-router-dom";
import useMisPiezas from "../hooks/useMisPiezas.js";
import Cargando from "../components/Cargando.jsx";

const MisPiezasPage = () => {
  const { piezasFiltradas, cargando, error, filtro, setFiltro } = useMisPiezas();

  if (cargando) return <Cargando />;
  if (error) return (
    <p className="px-6 py-4 text-orange-600 border border-orange-300 bg-orange-50">
      Error: {error}
    </p>
  );

  return (
    <main className="min-h-screen font-sans bg-white">

      {/* Cabecera */}
      <section className="py-12 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between px-6 mx-auto max-w-7xl">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Mis piezas
            </h1>
            <p className="mt-2 text-gray-600">
              {piezasFiltradas.length} pieza{piezasFiltradas.length !== 1 ? "s" : ""} creada{piezasFiltradas.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            to="/pieza/nueva"
            className="px-6 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600"
          >
            + Nueva pieza
          </Link>
        </div>
      </section>

      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">

          {/* Buscador */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="w-full px-4 py-3 text-gray-800 transition bg-white border border-orange-300 md:w-96 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Grid de piezas */}
          {piezasFiltradas.length === 0 ? (
            <div className="py-20 text-center">
              <p className="mb-4 text-lg text-gray-500">
                No tienes piezas todavía.
              </p>
              <Link
                to="/pieza/nueva"
                className="px-6 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600"
              >
                Crear mi primera pieza
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {piezasFiltradas.map(pieza => (
                <Link
                  key={pieza.id}
                  to={`/pieza/${pieza.id}`}
                  className="transition border border-gray-200 group hover:border-orange-300 hover:shadow-md"
                >
                  {/* Imagen */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                    {pieza.medias.length > 0 ? (
                      <img
                        src={pieza.medias.find(m => m.es_portada)?.url_completa || pieza.medias[0].url_completa}
                        alt={pieza.nombre}
                        className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* Badge de categoría */}
                    {pieza.categoria && (
                      <span className="absolute px-2 py-1 text-xs font-semibold text-orange-700 bg-orange-100 border border-orange-200 top-2 left-2">
                        {pieza.categoria}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 transition group-hover:text-orange-500">
                      {pieza.nombre}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {pieza.descripcion}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      {pieza.precio ? (
                        <span className="text-sm font-semibold text-orange-600">
                          {parseFloat(pieza.precio).toFixed(2)} €
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">Sin precio</span>
                      )}
                      <span className="text-xs text-gray-400">
                        {pieza.medias.length} foto{pieza.medias.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>
    </main>
  );
};

export default MisPiezasPage;