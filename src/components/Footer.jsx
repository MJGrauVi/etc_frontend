export default function Footer() {
  return (
    <footer className="pt-16 pb-10 text-gray-300 bg-gray-900">
      <div className="grid grid-cols-1 gap-12 px-6 mx-auto max-w-7xl md:grid-cols-4">

        {/* Logo + descripción */}
        <div>
          <h3 className="text-2xl font-bold text-white">ETC</h3>
          <p className="mt-4 leading-relaxed text-gray-400">
            Expón Tu Creación es la plataforma para creadores, artesanos y pequeñas empresas
            que quieren mostrar su trabajo de forma profesional y sencilla.
          </p>
        </div>

        {/* Enlaces rápidos */}
        <div>
          <h4 className="text-lg font-semibold text-white">Enlaces</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="transition hover:text-orange-400">Inicio</a></li>
            <li><a href="#" className="transition hover:text-orange-400">Características</a></li>
            <li><a href="#" className="transition hover:text-orange-400">Precios</a></li>
            <li><a href="#" className="transition hover:text-orange-400">Contacto</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-white">Legal</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="#" className="transition hover:text-orange-400">Política de privacidad</a></li>
            <li><a href="#" className="transition hover:text-orange-400">Aviso legal</a></li>
            <li><a href="#" className="transition hover:text-orange-400">Política de cookies</a></li>
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h4 className="text-lg font-semibold text-white">Síguenos</h4>
          <div className="flex mt-4 space-x-4">

            {/* Facebook */}
            <a href="#" className="transition hover:text-orange-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
              </svg>
            </a>

            {/* Instagram */}
            <a href="#" className="transition hover:text-orange-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" strokeWidth="2" />
                <circle cx="17" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </a>

            {/* Twitter/X */}
            <a href="#" className="transition hover:text-orange-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h3l-7 9 8 11h-6l-5-7-5 7H2l8-11-7-9h6l4 6 4-6z" />
              </svg>
            </a>

          </div>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="pt-6 mt-12 text-sm text-center text-gray-500 border-t border-gray-700">
        © {new Date().getFullYear()} ETC – Expón Tu Creación. Todos los derechos reservados.
      </div>

      {/* Banner de cookies */}
      <div className="px-6 py-4 mt-8 text-sm text-center text-gray-300 bg-gray-800">
        🍪 Usamos cookies para mejorar tu experiencia.  
        <a href="#" className="ml-1 text-orange-400 hover:underline">Saber más</a>
      </div>
    </footer>
  );
}
