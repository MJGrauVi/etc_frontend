import MensajeTail from "./MensajeTail.jsx";

const ModalEditarPieza = ({
  piezaEdit,
  guardando,
  onChange,
  onGuardar,
  onCerrar,
  mensaje,
  setMensaje
}) => {
  return (
    <>     
    <MensajeTail
        tipo={mensaje?.tipo}
        texto={mensaje?.texto}
        onClose={() => setMensaje(null)}
      />
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <div className="w-full max-w-lg bg-white border border-gray-200 shadow-xl">

        {/* Cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Editar pieza</h2>
          <button
            onClick={onCerrar}
            className="text-xl leading-none text-gray-400 transition hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Campos */}
        <div className="flex flex-col gap-4 px-6 py-5">

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={piezaEdit.nombre}
              onChange={onChange}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 focus:outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={piezaEdit.descripcion}
              onChange={onChange}
              rows={4}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 resize-none focus:outline-none focus:border-orange-400"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Categoría
              </label>
              <input
                type="text"
                name="categoria"
                value={piezaEdit.categoria}
                onChange={onChange}
                className="w-full px-4 py-2 text-gray-800 border border-gray-300 focus:outline-none focus:border-orange-400"
              />
            </div>
            <div className="w-32">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Precio (€)
              </label>
              <input
                type="number"
                name="precio"
                value={piezaEdit.precio}
                onChange={onChange}
                step="0.01"
                min="0"
                className="w-full px-4 py-2 text-gray-800 border border-gray-300 focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onCerrar}
            className="px-5 py-2 text-sm text-gray-600 transition border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={onGuardar}
            disabled={guardando}
            className="px-6 py-2 text-sm font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

      </div>
    </div>
    </>
  );
};

export default ModalEditarPieza;