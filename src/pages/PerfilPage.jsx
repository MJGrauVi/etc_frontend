import usePerfilForm from "../hooks/usePerfilForm.js";
import Cargando from "../components/Cargando.jsx";
import Mensaje from "../components/Mensaje.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";

// Reutilizo las clases comunes de la app.
const inputClase =
  "w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 focus:outline-none focus:border-orange-400 transition";
const labelClase = "block mb-1 text-sm font-medium text-gray-700";

const PerfilPage = () => {
  const { usuario } = useContextoSesion();
  const {
    form,
    logoPreview,
    cargando,
    guardando,
    mensaje,
    setMensaje,
    handleChange,
    handleLogo,
    guardarPerfil,
  } = usePerfilForm();

  return (
    <main className="min-h-screen font-sans bg-white">
      {/* Muestro la cabecera con el patrón común de las páginas */}
      <section className="py-12 border-b border-gray-200 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Mi perfil
          </h1>
          <p className="mt-2 text-gray-600">
            {usuario?.nombre} · {usuario?.email}
          </p>
        </div>
      </section>
      
      <Mensaje
        tipo={mensaje.tipo}
        texto={mensaje.texto}
        onClose={() => setMensaje({ tipo: "", texto: "" })}
      />

      <section className="py-10">
        <div className="max-w-3xl px-6 mx-auto">
          {cargando ? (
            <Cargando />
          ) : (
            <form onSubmit={guardarPerfil}>
            {/* Muestro la sección de logo y datos principales */}
            {/* Uso flex-col en móvil y flex-row en escritorio */}
            <div className="flex flex-col gap-8 mb-8 md:flex-row">
              {/* Muestro la columna del logo */}
              <div className="flex flex-col items-center w-full gap-3 shrink-0 md:w-48">
                {/* Muestro la vista previa del logo */}
                <div className="flex w-40 *:h-40 overflow-hidden border border-gray-200 justify-center items-center bg-gray-50">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <span className="px-2 text-sm text-center text-gray-400">
                      Sin logo
                    </span>
                  )}
                </div>

                {/* Muestro el botón para subir el logo */}
                <label htmlFor="perfil-logo" className="w-full px-4 py-2 text-sm font-semibold text-center text-orange-600 transition border border-orange-300 cursor-pointer hover:bg-orange-50">
                  Cambiar logo
                  <input
                    id="perfil-logo"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/svg+xml"
                    className="hidden"
                    onChange={handleLogo}
                  />
                </label>
                <p className="text-xs text-center text-gray-400">
                  jpeg, png, svg · máx 2MB
                </p>
              </div>

              {/* Muestro la columna de datos principales */}
              <div className="flex flex-col flex-1 gap-4">
                <div>
                  <label htmlFor="perfil-descripcion" className={labelClase}>Descripción del negocio</label>
                  <textarea
                    id="perfil-descripcion"
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows={4}
                    className={`${inputClase} resize-none`}
                    placeholder="Describe tu actividad, especialidad, estilo..."
                  />
                </div>

                <div>
                  <label htmlFor="perfil-web" className={labelClase}>Web</label>
                  <input
                    id="perfil-web"
                    type="url"
                    name="web"
                    value={form.web}
                    onChange={handleChange}
                    className={inputClase}
                    placeholder="https://tu-web.com"
                  />
                </div>

                <div>
                  <label htmlFor="perfil-movil" className={labelClase}>Móvil</label>
                  <input
                    id="perfil-movil"
                    type="tel"
                    name="movil"
                    value={form.movil}
                    onChange={handleChange}
                    className={inputClase}
                    placeholder="600 000 000"
                  />
                </div>
              </div>
            </div>

            {/* Muestro la sección de redes sociales */}
            {/* Uso el mismo separador visual que en la tabla de administración */}
            <div className="pt-8 mb-8 border-t border-gray-200">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Redes sociales
              </h2>
              <div className="flex flex-col gap-4">
                <div>
                  <label htmlFor="perfil-facebook" className={labelClase}>Facebook</label>
                  <input
                    id="perfil-facebook"
                    type="url"
                    name="facebook"
                    value={form.redes_sociales.facebook}
                    onChange={handleChange}
                    className={inputClase}
                    placeholder="https://facebook.com/tu-pagina"
                  />
                </div>
                <div>
                  <label htmlFor="perfil-instagram" className={labelClase}>Instagram</label>
                  <input
                    id="perfil-instagram"
                    type="url"
                    name="instagram"
                    value={form.redes_sociales.instagram}
                    onChange={handleChange}
                    className={inputClase}
                    placeholder="https://instagram.com/tu-cuenta"
                  />
                </div>
                <div>
                  <label htmlFor="perfil-linkedin" className={labelClase}>LinkedIn</label>
                  <input
                    id="perfil-linkedin"
                    type="url"
                    name="linkedin"
                    value={form.redes_sociales.linkedin}
                    onChange={handleChange}
                    className={inputClase}
                    placeholder="https://linkedin.com/in/tu-perfil"
                  />
                </div>
              </div>
            </div>

            {/* Muestro la sección de documento */}
            <div className="pt-8 mb-8 border-t border-gray-200">
              <h2 className="mb-4 text-lg font-semibold text-gray-800">
                Documento de identidad
              </h2>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full md:w-40">
                  <label htmlFor="perfil-tipo-documento" className={labelClase}>Tipo</label>
                  <select
                    id="perfil-tipo-documento"
                    name="tipo_documento"
                    value={form.tipo_documento}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-gray-800 transition bg-white border border-gray-300 focus:outline-none focus:border-orange-400"
                  >
                    <option value="">Selecciona</option>
                    <option value="nif">NIF</option>
                    <option value="cif">CIF</option>
                    <option value="nie">NIE</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="perfil-documento" className={labelClase}>Número</label>
                  <input
                    id="perfil-documento"
                    type="text"
                    name="documento"
                    value={form.documento}
                    onChange={handleChange}
                    className={inputClase}
                    placeholder="12345678T"
                  />
                </div>
              </div>
            </div>

            {/* Muestro el botón de guardar */}
            <button
              type="submit"
              disabled={guardando}
              className="w-full px-6 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default PerfilPage;
