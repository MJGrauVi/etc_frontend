import { useRef, useState } from "react";

const PiezaGaleria = ({
  pieza,
  subiendoImagen,
  onSubir,
  onEliminar,
  onMarcarPortada,
}) => {
  const inputRef = useRef(null);
  const [imagenActivaId, setImagenActivaId] = useState(null);

  const medias = pieza.medias ?? [];
  const imagenPortada = medias.find((media) => media.es_portada) || medias[0];
  const imagenMostrada = imagenActivaId
    ? medias.find((media) => media.id === imagenActivaId)
    : imagenPortada;
  const hayImagenes = medias.length > 0;

  const handleArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) onSubir(archivo);
    e.target.value = "";
  };

  const eliminarImagenActiva = () => {
    if (!imagenMostrada) return;
    if (confirm("¿Eliminar esta imagen?")) {
      onEliminar(imagenMostrada.id);
      setImagenActivaId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full overflow-hidden bg-gray-100 border border-gray-200 aspect-square">
        {imagenMostrada ? (
          <>
            <img
              src={imagenMostrada.url_completa}
              alt={pieza.nombre}
              className="object-cover w-full h-full"
            />
            {imagenMostrada.es_portada && (
              <span className="absolute px-2 py-1 text-xs font-bold text-white bg-orange-500 top-3 left-3">
                PORTADA
              </span>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full gap-3 text-gray-400">
            <span className="text-sm">Sin imagenes</span>
            <button
              type="button"
              onClick={() => inputRef.current.click()}
              disabled={subiendoImagen}
              className="px-4 py-2 text-sm font-semibold text-orange-600 transition bg-white border border-orange-300 hover:bg-orange-50 disabled:opacity-50"
            >
              Añadir primera imagen
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => inputRef.current.click()}
            disabled={subiendoImagen}
            className="px-4 py-2 text-sm font-semibold text-orange-600 transition border border-orange-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {subiendoImagen ? "Subiendo..." : "+ Añadir imagen"}
          </button>

          {imagenMostrada && !imagenMostrada.es_portada && (
            <button
              type="button"
              onClick={() => onMarcarPortada(imagenMostrada.id)}
              className="px-4 py-2 text-sm font-semibold text-white transition bg-orange-500 hover:bg-orange-600"
            >
              Marcar portada
            </button>
          )}

          {imagenMostrada && (
            <button
              type="button"
              onClick={eliminarImagenActiva}
              className="px-4 py-2 text-sm font-semibold text-red-600 transition border border-red-300 hover:bg-red-50"
            >
              Eliminar
            </button>
          )}
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleArchivo}
        />
      </div>

      {hayImagenes && (
        <div className="flex flex-wrap gap-2 mt-4">
          {medias.map((media) => (
            <button
              key={media.id}
              type="button"
              onClick={() => setImagenActivaId(media.id)}
              aria-label={`Mostrar imagen ${media.nombre_original}`}
              aria-pressed={(imagenActivaId ?? imagenPortada?.id) === media.id}
              className={`relative w-16 h-16 overflow-hidden transition border-2 ${
                (imagenActivaId ?? imagenPortada?.id) === media.id
                  ? "border-orange-500"
                  : "border-gray-200 hover:border-orange-400"
              }`}
            >
              <img
                src={media.url_completa}
                alt={media.nombre_original}
                className="object-cover w-full h-full"
              />
              {media.es_portada && (
                <span className="absolute inset-x-0 bottom-0 bg-orange-500 text-white text-[9px] font-bold leading-4">
                  PORTADA
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {!hayImagenes && (
        <p className="mt-2 text-sm text-orange-600">
          Necesitas al menos una imagen para generar la publicacion con IA.
        </p>
      )}
    </div>
  );
};

export default PiezaGaleria;
