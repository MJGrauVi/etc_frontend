import { Link } from "react-router-dom";
import useMisPiezas from "../hooks/useMisPiezas.js";
import Cargando from "../components/Cargando.jsx";

const MisPiezasPage = () => {
  const { piezasFiltradas, cargando, error, filtro, setFiltro } = useMisPiezas();

  // — Estados de carga y error ————————————————————————————————

  if (cargando) return <Cargando />;

  // Antes: clases inline mezcladas sin criterio
  // Ahora: alerta-base + alerta-error definidas en index.css
  if (error) return (
    <p className="alerta-base alerta-error">
      Error: {error}
    </p>
  );

  return (
    <main className="min-h-screen font-sans bg-white">

      {/* — Cabecera ——————————————————————————————————————————
          Antes: py-12 border-b border-gray-200 bg-gray-50 inline
          Ahora: page-header (py-8 móvil / py-12 md+)
      */}
      <section className="page-header">
        <div className="flex flex-col gap-4 px-6 mx-auto max-w-7xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Mis piezas
            </h1>
            <p className="mt-2 text-gray-600">
              {piezasFiltradas.length} pieza{piezasFiltradas.length !== 1 ? "s" : ""} creada{piezasFiltradas.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* Antes: clases de botón escritas a mano
              Ahora: btn-primary (w-full móvil / w-auto md+) */}
          <Link to="/pieza/nueva" className="text-center btn-primary">
            + Nueva pieza
          </Link>
        </div>
      </section>

      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">

          {/* — Buscador ————————————————————————————————————————
              Antes: todas las clases inline incluyendo focus
              Ahora: inputClass (estilos base) + md:w-96 (ancho específico)
              El md:w-96 se queda aquí porque es propio de este input,
              no de todos los inputs del proyecto.
          */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Buscar por nombre o categoría..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              className="inputClass md:w-96"
            />
          </div>

          {/* — Grid de piezas o estado vacío ——————————————————— */}
          {piezasFiltradas.length === 0 ? (

            // Estado vacío — sin piezas todavía
            <div className="py-20 text-center">
              <p className="mb-6 text-lg text-gray-500">
                No tienes piezas todavía.
              </p>
              {/* Antes: clases de botón inline
                  Ahora: btn-primary */}
              <Link to="/pieza/nueva" className="btn-primary">
                Crear mi primera pieza
              </Link>
            </div>

          ) : (

            // Grid responsivo: 1 col móvil / 2 tablet / 3 lg / 4 xl
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {piezasFiltradas.map(pieza => (

                // Antes: clases de tarjeta inline + group inline
                // Ahora: piece-card (incluye group para los hijos)
                <Link
                  key={pieza.id}
                  to={`/pieza/${pieza.id}`}
                  className="piece-card group"
                >
                  {/* — Imagen de portada ———————————————————————— */}
                  <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                    {pieza.medias.length > 0 ? (
                      <img
                        src={pieza.medias.find(m => m.es_portada)?.url_completa || pieza.medias[0].url_completa}
                        alt={pieza.nombre}
                        className="object-cover w-full h-full transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      // Placeholder cuando no hay imagen
                      <div className="flex items-center justify-center w-full h-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 h-12 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
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

                  {/* — Información de la pieza ———————————————————— */}
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
