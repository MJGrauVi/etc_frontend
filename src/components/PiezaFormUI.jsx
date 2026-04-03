import Mensaje from "./Mensaje.jsx";

const inputClase = "w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 focus:outline-none focus:border-orange-400 transition";
const labelClase = "block mb-1 text-sm font-medium text-gray-700";

const PiezaFormUI = ({
  form,
  previews,
  cargando,
  mensaje,
  onChange,
  onFotos,
  onEliminarFoto,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto">

      <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />

      {/* NOMBRE */}
      <div className="mb-4">
        <label htmlFor="nombre" className={labelClase}>
          Nombre de la pieza
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={onChange}
          required
          className={inputClase}
          placeholder="Ej: Jarrón de cerámica azul"
        />
      </div>

      {/* DESCRIPCIÓN */}
      <div className="mb-4">
        <label htmlFor="descripcion" className={labelClase}>
          Descripción
        </label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={form.descripcion}
          onChange={onChange}
          required
          rows={4}
          className={`${inputClase} resize-none`}
          placeholder="Describe tu pieza: materiales, técnica, inspiración..."
        />
      </div>

      {/* CATEGORÍA Y PRECIO en fila */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label htmlFor="categoria" className={labelClase}>
            Categoría <span className="font-normal text-gray-400">(opcional)</span>
          </label>
          <input
            id="categoria"
            name="categoria"
            type="text"
            value={form.categoria}
            onChange={onChange}
            className={inputClase}
            placeholder="Ej: Cerámica, Joyería..."
          />
        </div>
        <div className="w-36">
          <label htmlFor="precio" className={labelClase}>
            Precio <span className="font-normal text-gray-400">(€)</span>
          </label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            step="0.01"
            value={form.precio}
            onChange={onChange}
            className={inputClase}
            placeholder="0.00"
          />
        </div>
      </div>

      {/* FOTOS */}
      <div className="mb-6">
        <label className={labelClase}>
          Fotos de la pieza <span className="font-normal text-gray-400">(jpeg, png, jpg · máx 2MB por foto)</span>
        </label>

        {/* Zona de subida */}
        <label className="flex flex-col items-center justify-center w-full h-32 transition border-2 border-orange-300 border-dashed cursor-pointer hover:bg-orange-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mb-2 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium text-orange-500">Pulsa para seleccionar fotos</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/jpg"
            multiple
            className="hidden"
            onChange={onFotos}
          />
        </label>

        {/* Previews de las fotos seleccionadas */}
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {previews.map((url, i) => (
              <div key={i} className="relative w-24 h-24">
                <img
                  src={url}
                  alt={`foto-${i}`}
                  className="object-cover w-full h-full border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => onEliminarFoto(i)}
                  className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white bg-orange-500 hover:bg-orange-600"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BOTÓN SUBMIT */}
      <button
        type="submit"
        disabled={cargando}
        className="w-full px-6 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {cargando ? "Guardando pieza..." : "Crear pieza"}
      </button>

    </form>
  );
};

export default PiezaFormUI;