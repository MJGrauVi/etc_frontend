import { useState } from "react";
import { Share2 } from "lucide-react";

const PublicacionPreview = ({
  publicacion,
  guardando,
  publicandoFacebook,
  onEditar,
  onGuardar,
  onPublicarFacebook,
  perfil,
}) => {
  const [errorPublicacion, setErrorPublicacion] = useState("");
  const piezaPublicacion = publicacion.pieza ?? publicacion.piezas;

  const mediaPublicacion =
    piezaPublicacion?.medias?.find((m) => m.es_portada) ||
    piezaPublicacion?.medias?.[0];

  const imagenUrl = mediaPublicacion?.url_completa;

  const publicarFacebook = async () => {
    if (!publicacion.id) {
      setErrorPublicacion("Guarda la publicacion antes de publicarla en Facebook.");
      return;
    }

    setErrorPublicacion("");

    try {
      const mensajeFacebook = [publicacion.titulo, publicacion.contenido, publicacion.hashtags]
        .filter(Boolean)
        .join("\n\n");

      await onPublicarFacebook({ mensaje: mensajeFacebook });
    } catch (error) {
      console.error("Error preparando publicacion para Facebook", error);
      setErrorPublicacion("No se pudo preparar la publicacion para Facebook.");
    }
  };

  return (
    <div className="mt-10 border border-orange-200 bg-orange-50">
      <div className="px-6 py-4 bg-orange-100 border-b border-orange-200">
        <h2 className="text-lg font-semibold text-orange-700">
          Previsualizacion de la publicacion
        </h2>
        <p className="text-sm text-orange-600">
          Edita el texto antes de guardar o publicar
        </p>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="w-full shrink-0 md:w-64">
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

          <div className="flex flex-col flex-1 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Titulo
              </label>
              <input
                type="text"
                name="titulo"
                value={publicacion.titulo}
                onChange={onEditar}
                className="w-full px-4 py-2 text-gray-800 transition bg-white border border-gray-300 focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Descripcion
              </label>
              <textarea
                name="contenido"
                value={publicacion.contenido}
                onChange={onEditar}
                rows={6}
                className="w-full px-4 py-2 text-gray-800 transition bg-white border border-gray-300 resize-none focus:outline-none focus:border-orange-400"
              />
            </div>

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
                <option value="pendiente">Lista para publicar</option>
                <option value="publicado">Publicada</option>
              </select>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <button
                onClick={onGuardar}
                disabled={guardando}
                className="flex items-center justify-center w-full px-6 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
              >
                {guardando ? "Guardando..." : "Guardar publicacion"}
              </button>

              <button
                onClick={publicarFacebook}
                disabled={publicandoFacebook || !publicacion.id}
                className="flex items-center justify-center w-full gap-2 px-6 py-3 font-semibold text-white transition bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
              >
                <Share2 size={18} />
                {publicandoFacebook ? "Publicando..." : "Publicar en Facebook"}
              </button>
            </div>

            {errorPublicacion && (
              <p className="text-sm text-red-600">{errorPublicacion}</p>
            )}
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-orange-200">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Imagen que se publicara en Facebook
          </h3>
          <div className="w-full max-w-sm overflow-hidden bg-gray-900 border border-gray-200 shadow-sm">
            <div className="relative overflow-hidden bg-gray-900 aspect-square">
              {imagenUrl ? (
                <img
                  src={imagenUrl}
                  alt="Vista previa de la imagen que se publicara en Facebook"
                  className="object-contain w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-sm text-white/70">
                  Sin imagen
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Facebook publicara la imagen portada de la pieza junto con el titulo, la descripcion y los hashtags.
          </p>
        </div>

        {perfil && (
          <div className="flex items-center gap-4 pt-6 mt-6 border-t border-orange-200">
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
