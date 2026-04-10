import MensajeTail from "./MensajeTail.jsx";
import { useState } from "react";

const PublicacionPreview = ({
  publicacion,
  guardando,
  onEditar,
  onGuardar,
  perfil,
}) => {
  const [copiado, setCopiado] = useState();
  const imagenUrl =
    publicacion.piezas?.medias?.find((m) => m.es_portada)?.url_completa ||
    publicacion.piezas?.medias?.[0]?.url_completa;

  // Función que copia el contenido formateado
  const copiarContenido = () => {
    const texto = `${publicacion.titulo}

${publicacion.contenido}

${publicacion.hashtags}

${perfil?.movil ? `📞 ${perfil.movil}` : ""}
${perfil?.web ? `🌐 ${perfil.web}` : ""}`.trim();

    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    });
  };
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
        {/* ── Botón Copiar, solo cuando este lista la publicación- Simulamos la publicacion en redes ── */}
        {(publicacion.estado === "lista" ||
          publicacion.estado === "publicado") && (
          <div className="pt-6 mt-6 border-t border-orange-200">
            <p className="mb-3 text-sm text-gray-600">
              Copia el contenido y pégalo directamente en tus redes sociales:
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Copiar contenido */}
              <button
                onClick={copiarContenido}
                className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold transition border ${
                  copiado
                    ? "text-green-700 bg-green-50 border-green-300"
                    : "text-orange-600 bg-white border-orange-300 hover:bg-orange-50"
                }`}
              >
                {copiado ? "Copiado" : "Copiar contenido"}
              </button>

              {/* Abrir Facebook */}

              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition bg-blue-600 hover:bg-blue-700"
              >
                Abrir Facebook
              </a>

              {/* Abrir Instagram */}

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white transition bg-pink-500 hover:bg-pink-600"
              >
                Abrir Instagram
              </a>
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Copia el contenido, abre la red social y pégalo en tu nueva
              publicación.
            </p>
          </div>
        )}

        {/* ── PIE DE PÁGINA DEL ARTESANO ── */}
        {perfil && (
          <div className="flex items-center gap-4 pt-6 mt-6 border-t border-orange-200">
            {/* Logo */}
            {perfil.logoUrl ? (
              <img
                src={perfil.logoUrl}
                alt="Logo"
                className="object-contain p-1 bg-white border border-gray-200 w-14 h-14"
              />
            ) : (
              <div className="flex items-center justify-center bg-orange-100 border border-orange-200 w-14 h-14">
                <span className="text-xl font-bold text-orange-400">
                  {perfil.nombre?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}

            {/* Datos del artesano */}
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-gray-800">
                {perfil.nombre}
              </span>
              {perfil.movil && (
                <span className="text-sm text-gray-500">{perfil.movil}</span>
              )}
              {perfil.web && (
                <a
                  href={perfil.web}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-orange-500 transition hover:text-orange-600"
                >
                  {perfil.web}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicacionPreview;
