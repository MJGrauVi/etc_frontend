import Mensaje from "./Mensaje.jsx";

const PublicacionPreview = ({
  publicacion,
  guardando,
  mensaje,
  onEditar,
  onGuardar,
}) => {
  const imagenUrl = publicacion.piezas?.medias?.find(m => m.es_portada)?.url_completa
    || publicacion.piezas?.medias?.[0]?.url_completa;

  return (
    <div className="mt-10 border border-orange-200 bg-orange-50">

      <div className="px-6 py-4 bg-orange-100 border-b border-orange-200">
        <h2 className="text-lg font-semibold text-orange-700">
          Previsualización de la publicación
        </h2>
        <p className="text-sm text-orange-600">
          Edita el texto antes de guardar
        </p>
      </div>

      <div className="p-6">
        <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />

        <div className="flex flex-col gap-6 md:flex-row">

          {/* Imagen de la pieza */}
          <div className="flex-shrink-0 w-full md:w-64">
            {imagenUrl ? (
              <img
                src={imagenUrl}
                alt="Imagen de la pieza"
                className="object-cover w-full h-64 border border-gray-200"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-64 bg-gray-100 border border-gray-200">
                <span className="text-sm text-gray-400">Sin imagen</span>
              </div>
            )}
          </div>

          {/* Campos editables */}
          <div className="flex flex-col flex-1 gap-4">

            {/* Título */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                name="titulo"
                value={publicacion.titulo}
                onChange={onEditar}
                className="w-full px-4 py-2 text-gray-800 transition bg-white border border-gray-300 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Contenido */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Descripción
              </label>
              <textarea
                name="contenido"
                value={publicacion.contenido}
                onChange={onEditar}
                rows={6}
                className="w-full px-4 py-2 text-gray-800 transition bg-white border border-gray-300 resize-none focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Hashtags */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Hashtags
              </label>
              <input
                type="text"
                name="hashtags"
                value={publicacion.hashtags}
                onChange={onEditar}
                className="w-full px-4 py-2 text-gray-800 transition bg-white border border-gray-300 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Estado */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                name="estado"
                value={publicacion.estado}
                onChange={onEditar}
                className="px-4 py-2 font-semibold text-orange-600 transition bg-white border border-orange-300 hover:bg-orange-50 focus:outline-none"
              >
                <option value="borrador">Borrador</option>
                <option value="lista">Lista para publicar</option>
                <option value="publicado">Publicada</option>
              </select>
            </div>

            {/* Botón guardar */}
            <button
              onClick={onGuardar}
              disabled={guardando}
              className="w-full px-6 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {guardando ? "Guardando..." : "Guardar publicación"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicacionPreview;