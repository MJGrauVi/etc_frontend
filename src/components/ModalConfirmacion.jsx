import React from "react";

const ModalConfirmacion = ({
  visible,
  onConfirmar,
  onCancelar,
  titulo,
  mensaje,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  confirmando = false,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-xl">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          {titulo}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-600 whitespace-pre-line">
          {mensaje}
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            disabled={confirmando}
            className="px-5 py-2 text-sm text-gray-600 transition border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            disabled={confirmando}
            className="px-6 py-2 text-sm font-semibold text-white transition bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {confirmando ? "Publicando..." : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacion;
