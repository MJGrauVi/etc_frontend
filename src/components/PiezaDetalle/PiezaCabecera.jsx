import React from 'react';
import {Link} from "react-router-dom";
import { formatoEuro } from "../../utils/formatoMoneda.js";
import useContextoSesion from "../../hooks/useContextoSesion.js";

const PiezaCabecera = (props) => {

    const {pieza, onAbrirModalEditar, onEliminar} = props;
    const { usuario } = useContextoSesion();
    const textoVolver = usuario?.rol === "Administrador" ? "<- Volver a piezas" : "<- Volver a mis piezas";

  return (
    <section className="py-12 border-b border-gray-200 bg-gray-50">
      <div className="px-6 mx-auto max-w-7xl">
        <Link
          to="/mis-piezas"
          className="text-sm text-orange-500 transition hover:text-orange-600"
        >
          {textoVolver}
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
                  {formatoEuro(pieza.precio)}
                </span>
              )}
              <span className="px-3 py-1 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200">
                {pieza.publicacions_count} publicacion{pieza.publicacions_count !== 1 ? "es" : ""}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onAbrirModalEditar}
              className="px-5 py-2 text-sm font-semibold text-gray-700 transition border border-gray-300 hover:bg-gray-100"
            >
              Editar pieza
            </button>
            <button
              onClick={onEliminar}
              className="px-5 py-2 text-sm font-semibold text-red-600 transition border border-red-300 hover:bg-red-50"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PiezaCabecera;
