import { useRef } from "react";

const GestorImagenes = ({
  medias = [],
  subiendoImagen,
  onSubir,
  onEliminar,
  onMarcarPortada,
}) => {
  const inputRef = useRef();

  const handleArchivo = (e) => {
    const archivo = e.target.files[0];
    if (archivo) onSubir(archivo);
    e.target.value = "";
  };

  return (
    <div className="mt-6">

      {/* Muestro la cabecera con el botón de subida */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
          Imágenes
        </h3>
        <button
          onClick={() => inputRef.current.click()}
          disabled={subiendoImagen}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 transition border border-orange-300 hover:bg-orange-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {subiendoImagen ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-orange-400 rounded-full border-t-transparent animate-spin" />
              Subiendo...
            </>
          ) : (
            <>+ Añadir imagen</>
          )}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleArchivo}
        />
      </div>

      {/* Muestro la zona de subida cuando no hay imágenes */}
      {medias.length === 0 ? (
        <div
          onClick={() => inputRef.current.click()}
          className="flex flex-col items-center justify-center h-32 gap-2 text-gray-400 transition border-2 border-gray-300 border-dashed cursor-pointer hover:border-orange-400 hover:bg-orange-50"
        >
          <span className="text-3xl">🖼️</span>
          <span className="text-sm">Sin imágenes — haz clic para subir</span>
        </div>
      ) : (
        /* Muestro el grid de miniaturas con controles */
        <div className="flex flex-wrap gap-3">
          {medias.map((media) => (
            <div
              key={media.id}
              className={`relative group w-24 h-24 border-2 transition ${
                media.es_portada
                  ? "border-orange-400"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              <img
                src={media.url_completa}
                alt={media.nombre_original}
                className="object-cover w-full h-full"
              />

              {/* Muestro la marca de portada */}
              {media.es_portada && (
                <span className="absolute top-1 left-1 bg-orange-500 text-white text-[10px] font-bold px-1 py-0.5 leading-none">
                  PORTADA
                </span>
              )}

              {/* Muestro los controles al pasar el cursor */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition opacity-0 bg-black/50 group-hover:opacity-100">
                {!media.es_portada && (
                  <button
                    onClick={() => onMarcarPortada(media.id)}
                    className="text-[11px] font-semibold text-white bg-orange-500 px-2 py-1 hover:bg-orange-600 transition"
                  >
                    Portada
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm("¿Eliminar esta imagen?")) onEliminar(media.id);
                  }}
                  className="text-[11px] font-semibold text-white bg-red-500 px-2 py-1 hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GestorImagenes;