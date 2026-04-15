import { useState } from "react";
import { Link } from "react-router-dom";
import usePiezaDetalle from "../hooks/usePiezaDetalle.js";
import PublicacionPreview from "../components/PublicacionPreview.jsx";
import ModalEditarPieza from "../components/ModalEditarPieza.jsx";
import GestorImagenes from "../components/GestorImagenes.jsx";
import Cargando from "../components/Cargando.jsx";
import MensajeTail from "../components/MensajeTail.jsx";

const PiezaDetallePageOriginal = () => {
  const {
    pieza,
    publicacion,
    cargando,
    generando,
    guardando,
    error,
    mensaje,
    setMensaje,
    generarPublicacion,
    handleEditar,
    guardarCambios,
    modalEditar,
    piezaEdit,
    guardandoPieza,
    abrirModalEditar,
    cerrarModalEditar,
    handleEditarPieza,
    guardarPieza,
    eliminarPieza,
    subiendoImagen,
    subirImagen,
    eliminarImagen,
    marcarPortada,
    perfil,
    modoManual,
    iniciarManual,
  } = usePiezaDetalle();

  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  const [imagenActiva, setImagenActiva] = useState(null);

  if (cargando) return <Cargando />;
  if (error)
    return (
      <p className="px-6 py-4 text-orange-600 border border-orange-300 bg-orange-50">
        Error: {error}
      </p>
    );

  const imagenPortada =
    pieza.medias?.find((m) => m.es_portada) || pieza.medias?.[0];
  const imagenMostrada = imagenActiva
    ? pieza.medias?.find((m) => m.id === imagenActiva)
    : imagenPortada;

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

          <div className="flex flex-wrap items-start justify-between gap-4 mt-3">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
                {pieza.nombre}
              </h1>
              <div className="flex flex-wrap gap-3 mt-2">
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
                  {pieza.publicacions_count} publicacion
                  {pieza.publicacions_count !== 1 ? "es" : ""}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={abrirModalEditar}
                className="px-5 py-2 text-sm font-semibold text-gray-700 transition border border-gray-300 hover:bg-gray-100"
              >
                Editar pieza
              </button>
              <button
                onClick={() => setConfirmarEliminar(true)}
                className="px-5 py-2 text-sm font-semibold text-red-600 transition border border-red-300 hover:bg-red-50"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mensaje */}
      <MensajeTail
        tipo={mensaje.tipo}
        texto={mensaje.texto}
        onClose={() => setMensaje({ tipo: "", texto: "" })}
      />

      {/* Contenido principal */}
      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Galería */}
            <div className="w-full shrink-0 md:w-80">
              {imagenMostrada ? (
                <img
                  src={imagenMostrada.url_completa}
                  alt={pieza.nombre}
                  className="object-cover w-full border border-gray-200 h-80"
                />
              ) : (
                <div className="flex items-center justify-center w-full bg-gray-100 border border-gray-200 h-80">
                  <span className="text-gray-400">Sin imágenes</span>
                </div>
              )}

              {pieza.medias?.length > 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {pieza.medias.map((media) => (
                    <img
                      key={media.id}
                      src={media.url_completa}
                      alt={media.nombre_original}
                      onClick={() => setImagenActiva(media.id)}
                      className={`object-cover w-16 h-16 transition border cursor-pointer ${
                        (imagenActiva ?? imagenPortada?.id) === media.id
                          ? "border-orange-500"
                          : "border-gray-200 hover:border-orange-400"
                      }`}
                    />
                  ))}
                </div>
              )}

              <GestorImagenes
                medias={pieza.medias ?? []}
                subiendoImagen={subiendoImagen}
                onSubir={subirImagen}
                onEliminar={eliminarImagen}
                onMarcarPortada={marcarPortada}
              />
            </div>

            {/* Descripción + botones */}
            <div className="flex-1">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                Descripción
              </h2>
              <p className="leading-relaxed text-gray-600">
                {pieza.descripcion}
              </p>

              {/* 👇 Botones con gap */}
              <div className="flex flex-col gap-3 mx-auto mt-8 sm:flex-row">
                <button
                  onClick={generarPublicacion}
                  disabled={generando}
                  className="px-8 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generando
                    ? "Generando con IA..."
                    : publicacion
                      ? "Regenerar con IA"
                      : "Generar con IA"}
                </button>

                <button
                  onClick={iniciarManual}
                  disabled={generando}
                  className="px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 hover:bg-orange-50 disabled:opacity-50"
                >
                  Crear manualmente
                </button>
              </div>

              {!imagenPortada && (
                <p className="mt-2 text-sm text-orange-600">
                  Necesitas al menos una imagen para generar la publicación con
                  IA.
                </p>
              )}
            </div>
          </div>

          {/* Previsualización — sin prop mensaje */}
          {(publicacion || modoManual) && (
            <PublicacionPreview
              publicacion={
                publicacion || {
                  id: null,
                  titulo: "",
                  contenido: "",
                  hashtags: "",
                  estado: "borrador",
                  piezas: pieza,
                }
              }
              guardando={guardando}
              onEditar={handleEditar}
              onGuardar={guardarCambios}
              perfil={perfil}
            />
          )}
        </div>
      </section>

      {/* Modal editar */}
      {modalEditar && (
        <ModalEditarPieza
          piezaEdit={piezaEdit}
          guardando={guardandoPieza}
          onChange={handleEditarPieza}
          onGuardar={guardarPieza}
          onCerrar={cerrarModalEditar}
        />
      )}

      {/* Confirmación eliminar */}
      {confirmarEliminar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
          <div className="w-full max-w-sm p-6 bg-white border border-gray-200 shadow-xl">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              ¿Eliminar esta pieza?
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Esta acción es irreversible. Se eliminarán también sus imágenes y
              publicaciones asociadas.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmarEliminar(false)}
                className="px-5 py-2 text-sm text-gray-600 transition border border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={eliminarPieza}
                className="px-6 py-2 text-sm font-semibold text-white transition bg-red-500 hover:bg-red-600"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default PiezaDetallePageOriginal;
