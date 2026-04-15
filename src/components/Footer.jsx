import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-400 bg-gray-900 border-t border-gray-800">
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Columna 1: Marca + Contacto (Sustituimos descripción por datos útiles) */}
          <div className="flex flex-col">
            <Link
              to="/"
              className="mb-6 text-2xl font-black tracking-tighter text-white"
            >
              ETC<span className="text-primary">.</span>
            </Link>
            <div className="space-y-4 text-sm">
              {/* Email con icono de sobre */}
              <a
                href="mailto:etc-apps@proton.me"
                className="flex items-center gap-3 transition-colors group hover:text-white"
              >
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                etc-apps@proton.me
              </a>

              {/* Web con icono de mundo/red */}
              <a
                href="https://etc-apps.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors group hover:text-white"
              >
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                    />
                  </svg>
                </span>
                etc-apps.com
              </a>

              {/* Ubicación opcional con icono de mapa */}
              <p className="flex items-center gap-3 text-primary">
                <span className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </span>
                Alicante, España
              </p>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Explorar</h4>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link to="/" 
              onClick={()=>{window.scrollTo({top:0, behavior: "smooth"})}}
              className="transition-colors hover:text-primary">
                Inicio
              </Link>
              <Link
                to="/precios"
                className="transition-colors hover:text-primary"
              >
                Planes y Precios
              </Link>
              <a href="mailto:etc-apps@proton.me" className="transition-colors hover:text-primary">Soporte</a>
            </nav>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Legal</h4>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link
                to="/privacidad"
                className="transition-colors hover:text-primary"
              >
                Privacidad
              </Link>
              <Link
                to="/aviso-legal"
                className="transition-colors hover:text-primary"
              >
                Aviso Legal
              </Link>
              <Link
                to="/cookies"
                className="transition-colors hover:text-primary"
              >
                Cookies
              </Link>
            </nav>
          </div>

          {/* Columna 4: Redes Sociales (Incluyendo LinkedIn) */}
          <div>
            <h4 className="mb-6 text-lg font-bold text-white">Síguenos</h4>
            <div className="flex flex-wrap gap-4">
              {/* Facebook - Usamos fill="currentColor" */}
              <a
                href="https://facebook.com/etc_apps"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 transition-all bg-gray-800 rounded-full hover:bg-primary hover:text-white"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com/etc_apps"
                target="_blank"
                rel="noopener noreferrer"
                title="Síguenos en Instagram"
                className="p-2 transition-all bg-gray-800 rounded-full hover:bg-primary hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17" cy="7" r="1" fill="currentColor" />
                </svg>
              </a>

              {/* LinkedIn (Añadido) */}
              <a
                href="https://linkedin.com/company/etc-apps"
                target="_blank"
                rel="noopener noreferrer"
                title="Síguenos en LinkedIn"
                className="p-2 transition-all bg-gray-800 rounded-full hover:bg-primary hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* X */}
              <a
                href="https://x.com/etc_apps"
                target="_blank"
                rel="noopener noreferrer"
                title="Síguenos en X"
                className="p-2 transition-all bg-gray-800 rounded-full hover:bg-primary hover:text-white"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Separador y Copyright */}
        <div className="pt-8 mt-12 text-xs tracking-wide text-center border-t border-gray-800">
          <p>
            © {currentYear} EXPÓN TU CREACIÓN. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
