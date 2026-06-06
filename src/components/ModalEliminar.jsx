const ModalEliminar = ({
  visible,
  onConfirmar,
  onCancelar,
  titulo = "¿Eliminar esta pieza?",
  mensaje = "Esta acción es irreversible. Se eliminarán también sus imágenes y publicaciones asociadas.",
  textoConfirmar = "Sí, eliminar",
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="w-full max-w-sm p-6 bg-white border border-gray-200 shadow-xl">
        <h2 className="mb-2 text-lg font-semibold text-gray-800">
          {titulo}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          {mensaje}
        </p>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="px-5 py-2 text-sm text-gray-600 transition border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirmar}
            className="px-6 py-2 text-sm font-semibold text-white transition bg-red-500 hover:bg-red-600"
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEliminar;
