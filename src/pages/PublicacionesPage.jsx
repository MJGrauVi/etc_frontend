import { Link } from "react-router-dom";
import { CalendarDays, Edit3, ExternalLink, Search, Trash2, X } from "lucide-react";
import { useState } from "react";
import Cargando from "../components/Cargando.jsx";
import usePublicaciones from "../hooks/usePublicaciones.js";

const ESTADOS = {
  borrador: {
    etiqueta: "Borrador",
    clase: "bg-gray-100 text-gray-700 border-gray-200",
  },
  pendiente: {
    etiqueta: "Lista para publicar",
    clase: "bg-orange-50 text-orange-700 border-orange-200",
  },
  publicado: {
    etiqueta: "Publicada",
    clase: "bg-green-50 text-green-700 border-green-200",
  },
  error: {
    etiqueta: "Error",
    clase: "bg-red-50 text-red-700 border-red-200",
  },
};

const obtenerImagenPortada = (publicacion) => {
  const pieza = publicacion.pieza ?? publicacion.piezas;
  const medias = pieza?.medias ?? [];
  return medias.find((media) => media.es_portada)?.url_completa || medias[0]?.url_completa || null;
};

const formatearFecha = (fecha) => {
  if (!fecha) return "Sin fecha";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(fecha));
};

const EstadoBadge = ({ estado }) => {
  const datos = ESTADOS[estado] ?? ESTADOS.borrador;
  return (
    <span className={`inline-flex border px-2.5 py-1 text-xs font-semibold ${datos.clase}`}>
      {datos.etiqueta}
    </span>
  );
};

const PublicacionesPage = () => {
  const {
    publicacionesFiltradas,
    resumenEstados,
    cargando,
    error,
    filtro,
    setFiltro,
    estado,
    setEstado,
    eliminandoId,
    eliminarPublicacion,
  } = usePublicaciones();
  const [confirmandoId, setConfirmandoId] = useState(null);

  if (cargando) return <Cargando />;

  if (error) {
    return <p className="alerta-base alerta-error">Error: {error}</p>;
  }

  return (
    <main className="min-h-screen font-sans bg-white">
      <section className="page-header">
        <div className="flex flex-col gap-4 px-6 mx-auto max-w-7xl md:flex-row md:items-center md:justify-between">
          <div className="text-left">
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Publicaciones
            </h1>
            <p className="mt-2 text-gray-600">
              {publicacionesFiltradas.length} publicacion{publicacionesFiltradas.length !== 1 ? "es" : ""} encontrada{publicacionesFiltradas.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Link to="/mis-piezas" className="text-center btn-secondary">
            Ver mis piezas
          </Link>
        </div>
      </section>

      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 mb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search size={18} className="absolute text-gray-400 left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por titulo, pieza o hashtags..."
                value={filtro}
                onChange={(event) => setFiltro(event.target.value)}
                className="pl-10 inputClass"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["todas", "borrador", "pendiente", "publicado", "error"].map((opcion) => (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => setEstado(opcion)}
                  className={`border px-3 py-2 text-sm font-semibold transition ${estado === opcion ? "border-orange-400 bg-orange-50 text-orange-700" : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"}`}
                >
                  {opcion === "todas" ? `Todas (${resumenEstados.todas ?? 0})` : `${ESTADOS[opcion].etiqueta} (${resumenEstados[opcion] ?? 0})`}
                </button>
              ))}
            </div>
          </div>

          {publicacionesFiltradas.length === 0 ? (
            <div className="py-20 text-center border border-gray-200 bg-gray-50">
              <p className="mb-6 text-lg text-gray-500">No hay publicaciones con estos filtros.</p>
              <Link to="/mis-piezas" className="btn-primary">Crear desde una pieza</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {publicacionesFiltradas.map((publicacion) => {
                const pieza = publicacion.pieza ?? publicacion.piezas;
                const imagen = obtenerImagenPortada(publicacion);
                const facebook = publicacion.reds?.find((red) => red.nombre?.toLowerCase() === "facebook");

                const confirmando = confirmandoId === publicacion.id;
                const eliminando = eliminandoId === publicacion.id;

                return (
                  <article key={publicacion.id} className="grid gap-4 p-4 text-left transition bg-white border border-gray-200 md:grid-cols-[140px_1fr_auto] hover:border-orange-300 hover:shadow-sm">
                    <div className="h-36 overflow-hidden bg-gray-100 md:h-full">
                      {imagen ? (
                        <img src={imagen} alt={pieza?.nombre || publicacion.titulo} className="object-cover w-full h-full" />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full text-sm text-gray-400">Sin imagen</div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <EstadoBadge estado={publicacion.estado} />
                        {facebook?.pivot?.estado_publicacion && (
                          <span className="px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200 bg-blue-50">
                            Facebook: {facebook.pivot.estado_publicacion}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 text-xl font-semibold text-gray-800">
                        {publicacion.titulo || "Publicacion sin titulo"}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-orange-600">
                        {pieza?.nombre || "Pieza no disponible"}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600 line-clamp-2">
                        {publicacion.contenido || "Sin descripcion."}
                      </p>
                      {publicacion.hashtags && (
                        <p className="mt-2 text-sm font-semibold text-gray-500 line-clamp-1">{publicacion.hashtags}</p>
                      )}
                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-400">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays size={14} />
                          Creada: {formatearFecha(publicacion.created_at)}
                        </span>
                        {facebook?.pivot?.published_at && (
                          <span>Facebook: {formatearFecha(facebook.pivot.published_at)}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col justify-end gap-2 md:items-end md:justify-center">
                      <Link to={pieza?.id ? `/pieza/${pieza.id}` : "/mis-piezas"} className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-semibold text-orange-600 transition border border-orange-300 hover:bg-orange-50 md:w-auto">
                        Ver pieza
                        <ExternalLink size={16} />
                      </Link>

                      <Link to={`/publicaciones/${publicacion.id}/editar`} className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-semibold text-blue-600 transition border border-blue-200 hover:bg-blue-50 md:w-auto">
                        Editar
                        <Edit3 size={16} />
                      </Link>

                      {confirmando ? (
                        <div className="flex w-full flex-col gap-2 md:w-44">
                          <button
                            type="button"
                            onClick={() => eliminarPublicacion(publicacion.id)}
                            disabled={eliminando}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white transition bg-red-600 hover:bg-red-700 disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                            {eliminando ? "Eliminando..." : "Eliminar"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmandoId(null)}
                            disabled={eliminando}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 transition border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                          >
                            <X size={16} />
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmandoId(publicacion.id)}
                          className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-semibold text-red-600 transition border border-red-200 hover:bg-red-50 md:w-auto"
                        >
                          <Trash2 size={16} />
                          Eliminar
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PublicacionesPage;
