import React from "react";
import { useState } from "react";
import GestorImagenes from "../GestorImagenes.jsx";
const PiezaGaleria = ({
  pieza,
  subiendoImagen,
  subirImagen,
  eliminarImagen,
  marcarPortada,
}) => {
  const [imagenActiva, setImagenActiva] = useState(null);

  const imagenPortada =
    pieza.medias?.find((m) => m.es_portada) || pieza.medias?.[0];
  const imagenMostrada = imagenActiva
    ? pieza.medias?.find((m) => m.id === imagenActiva)
    : imagenPortada;

  return (
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
      {!imagenPortada && (
        <p className="mt-2 text-sm text-orange-600">
          Necesitas al menos una imagen para generar la publicación con IA.
        </p>
      )}
      <GestorImagenes
        medias={pieza.medias ?? []}
        subiendoImagen={subiendoImagen}
        onSubir={subirImagen}
        onEliminar={eliminarImagen}
        onMarcarPortada={marcarPortada}
      />
    </div>
  );
};

export default PiezaGaleria;
