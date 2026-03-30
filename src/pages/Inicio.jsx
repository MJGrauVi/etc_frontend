import fondo from "../public/assets/escritorio.png";

export default function Inicio() {
  return (
    <main className="min-h-screen font-sans">
<section className="relative flex items-center justify-center min-h-[600px] w-full overflow-hidden bg-white"> {/* Fondo blanco para que contraste con el texto negro si la imagen tarda en cargar */}
  {/* Imagen de fondo ocupando todo el espacio con opacidad */}
  <img
    src={fondo} 
    alt="Fondo escritorio"
    className="absolute inset-0 z-0 object-cover w-full h-full opacity-30"
  />

  {/* Contenido centrado sobre la imagen con z-index mayor */}
  <div className="relative z-10 max-w-4xl px-6 mx-auto text-center">
    {/* H1: Negro (text-black), Responsive (text-3xl en móvil, text-6xl en md+) */}
    <h1 className="text-3xl font-bold leading-tight text-black md:text-6xl">
      Muestra al mundo lo que creas
    </h1>

    <p className="mt-6 text-lg text-gray-800 md:text-xl"> {/* Ajustado text-gray-800 para legibilidad sobre el fondo */}
      Con ETC puedes crear publicaciones profesionales y compartir tus
      piezas únicas en redes sociales en solo unos clics.
    </p>

    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <button className="px-8 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600">
        Solicita una prueba gratis
      </button>
      {/* Botón secundario ajustado para fondo claro */}
      <button className="px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 bg-white/20 backdrop-blur-md hover:bg-orange-50">
        Saber más
      </button>
    </div>
  </div>
</section>
      

      {/* <Hero /> */}
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          {/* Título principal */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 md:text-4xl">
            Gestión profesional para creadores y pequeñas empresas
          </h2>

          {/* Descripción larga */}
          <p className="max-w-3xl mx-auto mt-6 text-lg leading-relaxed text-center text-gray-600">
            ETC está construido sobre tecnología cloud moderna, diseñada para
            ser rápida, intuitiva y fácil de integrar en tu día a día. Ofrece
            herramientas visuales, análisis claros, comunicación integrada y
            procesos simplificados para ayudarte a mostrar tus creaciones,
            gestionar tu actividad y reducir tiempos y costes. Podrás conocer
            todas las características y acceder al contenido detallado de cada
            herramienta que te ayudará a impulsar tu empresa, taller, agencia o
            asociación.
          </p>

          {/* Grid de beneficios */}
          <div className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-2 lg:grid-cols-4">
            {/* Ahorro */}
            <div className="px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 bg-white/20 backdrop-blur-md hover:bg-orange-50">
            {/* <div className="p-8 transition shadow-sm bg-gray-50 rounded-xl hover:shadow-md"> */}
              <div className="flex items-center justify-center w-16 h-16 mx-auto text-orange-600 bg-orange-100 rounded-full">
                {/* Icono de ahorro */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V4m0 12v4"
                  />
                </svg>
              </div>
                {/* <div className="px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 bg-white/20 backdrop-blur-md hover:bg-orange-50"> */}
              <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
                Ahorro
              </h3>
              <p className="mt-3 text-center text-gray-600">
                El cloud computing es más eficiente que los sistemas
                tradicionales. Muchas PYMES ya se han pasado y han reducido
                costes de infraestructura y mantenimiento.
              </p>
            </div>

            {/* Garantía */}
            <div className="px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 bg-white/20 backdrop-blur-md hover:bg-orange-50">
              <div className="flex items-center justify-center w-16 h-16 mx-auto text-orange-600 bg-orange-100 rounded-full">
                {/* Icono de garantía */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
                Garantía
              </h3>
              <p className="mt-3 text-center text-gray-600">
                Garantía incondicional de satisfacción. Para que tomes la mejor
                decisión, te ofrecemos 1 mes gratis de prueba sin compromiso.
              </p>
            </div>

            {/* Seguridad */}
            <div className="px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 bg-white/20 backdrop-blur-md hover:bg-orange-50">
              <div className="flex items-center justify-center w-16 h-16 mx-auto text-orange-600 bg-orange-100 rounded-full">
                {/* Icono de seguridad */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c1.657 0 3-.895 3-2s-1.343-2-3-2-3 .895-3 2 1.343 2 3 2zm0 0v5m0 4a9 9 0 110-18 9 9 0 010 18z"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
                Seguridad
              </h3>
              <p className="mt-3 text-center text-gray-600">
                Datos encriptados, accesos seguros y monitorización técnica
                constante. Tu información y la de tus clientes siempre
                protegida.
              </p>
            </div>

            {/* Facilidad */}
            <div className="px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 bg-white/20 backdrop-blur-md hover:bg-orange-50">
              <div className="flex items-center justify-center w-16 h-16 mx-auto text-orange-600 bg-orange-100 rounded-full">
                {/* Icono de facilidad */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-9 w-9"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
                Facilidad
              </h3>
              <p className="mt-3 text-center text-gray-600">
                Software intuitivo, ágil y productivo. Procesos simples, ayudas
                integradas y una experiencia pensada para que no pierdas tiempo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de beneficios */}
      {/* <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-center text-gray-800 md:text-4xl">
            ¿Por qué usar ETC?
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-lg text-center text-gray-600">
            Diseñado para creadores, artesanos y pequeñas empresas que quieren
            mostrar su trabajo sin complicaciones.
          </p>

          <div className="grid grid-cols-1 gap-10 mt-12 md:grid-cols-3">
            <div className="p-6 transition shadow-sm bg-gray-50 rounded-xl hover:shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Fácil de usar
              </h3>
              <p className="mt-2 text-gray-600">
                Crea publicaciones profesionales en minutos, sin necesidad de
                conocimientos técnicos.
              </p>
            </div>

            <div className="p-6 transition shadow-sm bg-gray-50 rounded-xl hover:shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Escaparate digital
              </h3>
              <p className="mt-2 text-gray-600">
                Muestra tus piezas únicas en un espacio visual pensado para
                destacar tu trabajo.
              </p>
            </div>

            <div className="p-6 transition shadow-sm bg-gray-50 rounded-xl hover:shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">
                Comparte en redes
              </h3>
              <p className="mt-2 text-gray-600">
                Publica directamente en tus redes sociales favoritas con un solo
                clic.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA final */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl px-6 mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 md:text-4xl">
            ¿Listo para mostrar tus creaciones?
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Empieza hoy mismo y crea tu primera publicación en minutos.
          </p>

          <button className="px-10 py-4 mt-8 font-semibold text-white transition bg-orange-500 hover:bg-orange-600">
            Crear mi primera publicación
          </button>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="px-6 mx-auto max-w-7xl">
          {/* SECCION FINAL */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 md:text-4xl">
            ¿Por qué usar ETC?
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-lg text-center text-gray-600">
            Una herramienta pensada para creadores, artesanos y pequeñas
            empresas que quieren mostrar su trabajo sin complicaciones.
          </p>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-3">
            {/* Tarjeta 1 */}
             {/* <div className="px-8 py-3 font-semibold text-orange-600 transition border border-orange-300 bg-white/20 backdrop-blur-md hover:bg-orange-50"></div> */}
            <div className="p-8 transition shadow-sm bg-gray-50 hover:shadow-md">
              <div className="flex items-center justify-center mx-auto text-orange-600 bg-orange-100 rounded-full w-14 h-14">
                {/* Icono simple */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
             
              <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
                Fácil de usar
              </h3>

              <p className="mt-3 text-center text-gray-600">
                Crea publicaciones profesionales en minutos, sin conocimientos
                técnicos ni herramientas complicadas.
              </p>
            </div>

            {/* Tarjeta 2 */}
            <div className="p-8 transition shadow-sm bg-gray-50 hover:shadow-md">
              <div className="flex items-center justify-center mx-auto text-orange-600 bg-orange-100 rounded-full w-14 h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7l9-4 9 4-9 4-9-4zm0 6l9 4 9-4m-9 4v6"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
                Tu escaparate digital
              </h3>

              <p className="mt-3 text-center text-gray-600">
                Muestra tus piezas únicas en un espacio visual pensado para
                destacar tu trabajo y atraer clientes.
              </p>
            </div>

            {/* Tarjeta 3 */}
            <div className="p-8 transition shadow-sm bg-gray-50 hover:shadow-md">
              <div className="flex items-center justify-center mx-auto text-orange-600 bg-orange-100 rounded-full w-14 h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                  />
                </svg>
              </div>

              <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
                Comparte en redes
              </h3>

              <p className="mt-3 text-center text-gray-600">
                Publica directamente en tus redes sociales favoritas con un solo
                clic. Rápido, sencillo y eficaz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
