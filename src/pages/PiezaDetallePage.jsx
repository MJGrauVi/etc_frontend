import { Link } from "react-router-dom";
import usePiezaDetalle from "../hooks/usePiezaDetalle.js";
import PublicacionPreview from "../components/PublicacionPreview.jsx";
import Cargando from "../components/Cargando.jsx";

const PiezaDetallePage = () => {
  const {
    pieza,
    publicacion,
    cargando,
    generando,
    guardando,
    error,
    mensaje,
    generarPublicacion,
    handleEditar,
    guardarCambios,
  } = usePiezaDetalle();

  if (cargando) return <Cargando />;
  if (error) return (
    <p className="px-6 py-4 text-orange-600 border border-orange-300 bg-orange-50">
      Error: {error}
    </p>
  );

  const imagenPortada = pieza.medias?.find(m => m.es_portada)
    || pieza.medias?.[0];

  return (
    <main className="min-h-screen font-sans bg-white">

      {/* Cabecera */}
      <section className="py-12 border-b border-gray-200 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <Link
            to="/mis-piezas"
            className="text-sm text-orange-500 transition hover:text-orange-600"
          >
            ← Volver a mis piezas
          </Link>
          <h1 className="mt-3 text-3xl font-bold text-gray-800 md:text-4xl">
            {pieza.nombre}
          </h1>
          <div className="flex gap-3 mt-2">
            {pieza.categoria && (
              <span className="px-3 py-1 text-xs font-semibold text-orange-700 bg-orange-100 border border-orange-200">
                {pieza.categoria}
              </span>
            )}
            {pieza.precio && (
              <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200">
                {parseFloat(pieza.precio).toFixed(2)} €
              </span>
            )}
            <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200">
              {pieza.publicacions_count} publicacion{pieza.publicacions_count !== 1 ? "es" : ""}
            </span>
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row">

            {/* Galería de imágenes */}
            <div className="flex-shrink-0 w-full md:w-80">
              {imagenPortada ? (
                <img
                  src={imagenPortada.url_completa}
                  alt={pieza.nombre}
                  className="object-cover w-full border border-gray-200 h-80"
                />
              ) : (
                <div className="flex items-center justify-center w-full bg-gray-100 border border-gray-200 h-80">
                  <span className="text-gray-400">Sin imágenes</span>
                </div>
              )}

              {/* Miniaturas */}
              {pieza.medias?.length > 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {pieza.medias.map(media => (
                    <img
                      key={media.id}
                      src={media.url_completa}
                      alt={media.nombre_original}
                      className="object-cover w-16 h-16 transition border border-gray-200 cursor-pointer hover:border-orange-400"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Datos de la pieza */}
            <div className="flex-1">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                Descripción
              </h2>
              <p className="leading-relaxed text-gray-600">
                {pieza.descripcion}
              </p>

              {/* Botón generar IA */}
              <div className="mt-8">
                <button
                  onClick={generarPublicacion}
                  disabled={generando}
                  className="px-8 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generando
                    ? "Generando con IA..."
                    : publicacion
                    ? "Regenerar publicación con IA"
                    : "Generar publicación con IA"}
                </button>
                {!imagenPortada && (
                  <p className="mt-2 text-sm text-orange-600">
                    Necesitas al menos una imagen para generar la publicación.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Previsualización */}
          {publicacion && (
            <PublicacionPreview
              publicacion={publicacion}
              guardando={guardando}
              mensaje={mensaje}
              onEditar={handleEditar}
              onGuardar={guardarCambios}
            />
          )}

        </div>
      </section>
    </main>
  );
};

export default PiezaDetallePage;