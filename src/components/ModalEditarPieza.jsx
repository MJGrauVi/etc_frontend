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
  const guardarPieza = (event) => {
    event.preventDefault();
    onGuardar();
  };

  return (
    <>     
    <MensajeTail
        tipo={mensaje?.tipo}
        texto={mensaje?.texto}
        onClose={() => setMensaje(null)}
      />
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40">
      <form
        onSubmit={guardarPieza}
        className="w-full max-w-lg bg-white border border-gray-200 shadow-xl"
      >

        {/* Muestro la cabecera */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-800">Editar pieza</h2>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar edición de la pieza"
            className="text-xl leading-none text-gray-400 transition hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Muestro los campos */}
        <div className="flex flex-col gap-4 px-6 py-5">

          <div>
            <label htmlFor="editar-pieza-nombre" className="block mb-1 text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              id="editar-pieza-nombre"
              type="text"
              name="nombre"
              value={piezaEdit.nombre}
              onChange={onChange}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 focus:outline-none focus:border-orange-400"
            />
          </div>

          <div>
            <label htmlFor="editar-pieza-descripcion" className="block mb-1 text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              id="editar-pieza-descripcion"
              name="descripcion"
              value={piezaEdit.descripcion}
              onChange={onChange}
              rows={4}
              className="w-full px-4 py-2 text-gray-800 border border-gray-300 resize-none focus:outline-none focus:border-orange-400"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="editar-pieza-categoria" className="block mb-1 text-sm font-medium text-gray-700">
                Categoría
              </label>
              <input
                id="editar-pieza-categoria"
                type="text"
                name="categoria"
                value={piezaEdit.categoria}
                onChange={onChange}
                className="w-full px-4 py-2 text-gray-800 border border-gray-300 focus:outline-none focus:border-orange-400"
              />
            </div>
            <div className="w-32">
              <label htmlFor="editar-pieza-precio" className="block mb-1 text-sm font-medium text-gray-700">
                Precio (€)
              </label>
              <input
                id="editar-pieza-precio"
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

        {/* Muestro las acciones */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button
            type="button"
            onClick={onCerrar}
            className="px-5 py-2 text-sm text-gray-600 transition border border-gray-300 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="px-6 py-2 text-sm font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>

      </form>
    </div>
    </>
  );
};

export default ModalEditarPieza;
