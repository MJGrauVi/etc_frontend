import { useEffect, useState } from "react";
import { Download, Share2 } from "lucide-react";
import {
  crearPublicacionPngBlob,
  exportarPublicacionPng,
} from "../utils/exportPublicacionImage.js";

const PublicacionPreview = ({
  publicacion,
  guardando,
  publicandoFacebook,
  onEditar,
  onGuardar,
  onPublicarFacebook,
  perfil,
}) => {
  const [copiado, setCopiado] = useState();
  const [exportando, setExportando] = useState(false);
  const [errorExportacion, setErrorExportacion] = useState("");
  const [previewPngUrl, setPreviewPngUrl] = useState(null);
  const piezaPublicacion = publicacion.pieza ?? publicacion.piezas;

  //Utilizamos la imagen marcada como portada o la primera imagen.
  const mediaPublicacion =
    piezaPublicacion?.medias?.find((m) => m.es_portada) ||
    piezaPublicacion?.medias?.[0];

  const imagenUrl = mediaPublicacion?.url_completa;

  //Canvas no puede leer directamente la imagen del backend por CORS.
  //Pedimos las imagenes al backend, convertimos a blob y creamos URL temporal que sí podemos usar dentro del canvas.
  const crearBlobUrlAutenticada = async (endpoint, accept = "image/*") => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8095/api";
    const token = localStorage.getItem("token");

    const respuesta = await fetch(`${apiUrl}/${endpoint}`, {
      headers: {
        Accept: accept,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!respuesta.ok) {
      throw new Error("IMAGE_FETCH_ERROR");
    }

    const blob = await respuesta.blob();
    return URL.createObjectURL(blob);
  };

  const crearImagenBlobUrl = async () => {
    if (!mediaPublicacion?.id) return null;
    return crearBlobUrlAutenticada(`media/${mediaPublicacion.id}/archivo`);
  };

  const crearLogoBlobUrl = async () => {
    if (!perfil?.logoUrl) return null;
    return crearBlobUrlAutenticada("perfil/logo/archivo");
  };

  // La previsualizacion debe salir del mismo canvas que se descarga y se envia a Facebook.
  // Asi evitamos que el usuario vea una composicion en pantalla y Facebook reciba otra distinta.
  useEffect(() => {
    let cancelado = false;
    let imagenBlobUrl = null;
    let logoBlobUrl = null;
    let previewTemporalUrl = null;

    const generarPreviewReal = async () => {
      if (!publicacion?.titulo && !imagenUrl) {
        setPreviewPngUrl(null);
        return;
      }

      try {
        imagenBlobUrl = await crearImagenBlobUrl();
        logoBlobUrl = await crearLogoBlobUrl();
        const perfilCanvas = logoBlobUrl ? { ...perfil, logoUrl: logoBlobUrl } : perfil;
        const blob = await crearPublicacionPngBlob({
          imagenUrl,
          imagenBlobUrl,
          titulo: publicacion.titulo,
          perfil: perfilCanvas,
        });

        if (cancelado) return;
        previewTemporalUrl = URL.createObjectURL(blob);
        setPreviewPngUrl((anterior) => {
          if (anterior) URL.revokeObjectURL(anterior);
          return previewTemporalUrl;
        });
      } catch (error) {
        console.error("Error generando previsualizacion real", error);
      } finally {
        if (imagenBlobUrl) URL.revokeObjectURL(imagenBlobUrl);
        if (logoBlobUrl) URL.revokeObjectURL(logoBlobUrl);
      }
    };

    const temporizador = setTimeout(generarPreviewReal, 250);

    return () => {
      cancelado = true;
      clearTimeout(temporizador);
      if (previewTemporalUrl) URL.revokeObjectURL(previewTemporalUrl);
    };
  }, [imagenUrl, mediaPublicacion?.id, publicacion?.titulo, perfil?.logoUrl, perfil?.nombre, perfil?.movil, perfil?.web]);

  // Funcion que copia el contenido formateado
  const copiarContenido = () => {
    const texto = `${publicacion.titulo}

${publicacion.contenido}

${publicacion.hashtags}

${perfil?.movil ? `Tel: ${perfil.movil}` : ""}
${perfil?.web ? `Web: ${perfil.web}` : ""}`.trim();

    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    });
  };

  const descargarImagen = async () => {
    setExportando(true);
    setErrorExportacion("");
    let imagenBlobUrl = null;
    let logoBlobUrl = null;

    try {
      imagenBlobUrl = await crearImagenBlobUrl();
      logoBlobUrl = await crearLogoBlobUrl();
      const perfilCanvas = logoBlobUrl ? { ...perfil, logoUrl: logoBlobUrl } : perfil;
      const nombreBase = publicacion.titulo || "publicacion-etc";
      const slug = nombreBase
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      await exportarPublicacionPng({
        imagenUrl,
        imagenBlobUrl,
        titulo: publicacion.titulo,
        perfil: perfilCanvas,
        nombreArchivo: `${slug || "publicacion-etc"}.png`,
      });
    } catch (error) {
      console.error("Error exportando publicacion", error);
      setErrorExportacion(
        "No se pudo generar la imagen. Revisa que la imagen de la pieza este disponible.",
      );
    } finally {
      if (imagenBlobUrl) URL.revokeObjectURL(imagenBlobUrl);
      if (logoBlobUrl) URL.revokeObjectURL(logoBlobUrl);
      setExportando(false);
    }
  };

  const publicarFacebook = async () => {
    if (!publicacion.id) {
      setErrorExportacion("Guarda la publicacion antes de publicarla en Facebook.");
      return;
    }

    setExportando(true);
    setErrorExportacion("");
    let imagenBlobUrl = null;
    let logoBlobUrl = null;

    try {
      imagenBlobUrl = await crearImagenBlobUrl();
      logoBlobUrl = await crearLogoBlobUrl();
      const perfilCanvas = logoBlobUrl ? { ...perfil, logoUrl: logoBlobUrl } : perfil;
      const blob = await crearPublicacionPngBlob({
        imagenUrl,
        imagenBlobUrl,
        titulo: publicacion.titulo,
        perfil: perfilCanvas,
      });
      const formData = new FormData();
      formData.append("imagen", blob, `publicacion-${publicacion.id}.png`);
      formData.append(
        "mensaje",
        [publicacion.titulo, publicacion.contenido, publicacion.hashtags]
          .filter(Boolean)
          .join("\n\n"),
      );

      await onPublicarFacebook(formData);
    } catch (error) {
      console.error("Error preparando publicacion para Facebook", error);
      setErrorExportacion("No se pudo preparar la imagen para Facebook.");
    } finally {
      if (imagenBlobUrl) URL.revokeObjectURL(imagenBlobUrl);
      if (logoBlobUrl) URL.revokeObjectURL(logoBlobUrl);
      setExportando(false);
    }
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
                <option value="pendiente">Lista para publicar</option>
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
        {/* Acciones para copiar o publicar en redes */}
        <div className="pt-6 mt-6 border-t border-orange-200">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Imagen final para redes
          </h3>
          <div className="w-full max-w-sm overflow-hidden bg-gray-900 border border-gray-200 shadow-sm">
            <div className="relative overflow-hidden bg-gray-900 aspect-square">
              {previewPngUrl ? (
                <img
                  src={previewPngUrl}
                  alt="Vista previa de la publicacion"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-sm text-white/70">
                  Generando vista previa...
                </div>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            La descarga se genera en formato cuadrado 1080x1080.
          </p>
          <button
            onClick={descargarImagen}
            disabled={exportando}
            className="flex items-center justify-center w-full gap-2 px-6 py-3 mt-4 font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
          >
            <Download size={18} />
            {exportando ? "Generando..." : "Descargar imagen PNG"}
          </button>
          <button
            onClick={publicarFacebook}
            disabled={exportando || publicandoFacebook || !publicacion.id}
            className="flex items-center justify-center w-full gap-2 px-6 py-3 mt-3 font-semibold text-white transition bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
          >
            <Share2 size={18} />
            {publicandoFacebook ? "Publicando..." : "Publicar en Facebook"}
          </button>
          {errorExportacion && (
            <p className="mt-2 text-sm text-red-600">{errorExportacion}</p>
          )}
        </div>

        {(publicacion.estado === "pendiente" ||
          publicacion.estado === "publicado") && (
            <div className="pt-6 mt-6 border-t border-orange-200">
              <p className="mb-3 text-sm text-gray-600">
                Copia el contenido y pégalo directamente en tus redes sociales:
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {/* Copiar contenido */}
                <button
                  onClick={copiarContenido}
                  className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold transition border ${copiado
                      ? "text-green-700 bg-green-50 border-green-300"
                      : "text-orange-600 bg-white border-orange-300 hover:bg-orange-50"
                    }`}
                >
                  {copiado ? "Copiado" : "Copiar contenido"}
                </button>

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
                Copia el contenido, descarga la imagen y sube ambos a tu nueva
                publicacion.
              </p>
            </div>
          )}

        {/* Pie de pagina del artesano */}
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
