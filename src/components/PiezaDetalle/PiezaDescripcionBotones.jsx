import React from 'react';
const PiezaDescripcionBotones = ({pieza, generarPublicacion, generando, iniciarManual}) => {
  return (
    <div className="flex-1">
      <h2 className="mb-3 text-xl font-semibold text-gray-800">
        Descripción
      </h2>
      <p className="leading-relaxed text-gray-600 max-w-prose">
        {pieza.descripcion}
      </p>

      <div className="flex flex-col items-center gap-3 mt-8 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={generarPublicacion}
          disabled={generando || !pieza.medias?.length}
          className="w-full px-8 py-3 font-semibold text-white transition bg-orange-500 sm:w-auto hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generando ? "Generando con IA..." : "Generar con IA"}
        </button>

        <button
          type="button"
          onClick={iniciarManual}
          disabled={generando}
          className="w-full px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 sm:w-auto hover:bg-orange-50 disabled:opacity-50"
        >
          Crear manualmente
        </button>
      </div>

      {!pieza.medias?.length && (
        <p className="mt-3 text-sm text-center text-orange-600">
          Necesitas al menos una imagen para generar la publicación con IA.
        </p>
      )}
    </div>
  );
};

export default PiezaDescripcionBotones;
