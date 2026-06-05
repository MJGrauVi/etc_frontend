import { Link } from "react-router-dom";
import { Globe, Mail, MapPin } from "lucide-react";
import LogoEtcFondoNegro from "../assets/LogoEtcFondoNegro.svg";

const ICONOS_REDES = {
  facebook: (
    <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0022 12z" />
  ),
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" />
    </>
  ),
  linkedin: (
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  ),
  x: (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  ),
};

const REDES = [
  {
    nombre: "Facebook",
    href: "https://facebook.com/etc_apps",
    icono: "facebook",
    svgProps: { fill: "currentColor", stroke: "none", viewBox: "0 0 24 24" },
  },
  {
    nombre: "Instagram",
    href: "https://instagram.com/etc_apps",
    icono: "instagram",
    svgProps: { fill: "none", stroke: "currentColor", strokeWidth: "2", viewBox: "0 0 24 24" },
  },
  {
    nombre: "LinkedIn",
    href: "https://linkedin.com/company/etc-apps",
    icono: "linkedin",
    svgProps: { fill: "currentColor", stroke: "none", viewBox: "0 0 24 24" },
  },
  {
    nombre: "X (Twitter)",
    href: "https://x.com/etc_apps",
    icono: "x",
    svgProps: { fill: "currentColor", stroke: "none", viewBox: "0 0 24 24" },
  },
];

const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-gray-400 bg-gray-900 border-t border-gray-800">
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr_1fr] lg:gap-16">
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:pl-4 lg:pl-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 mb-6 md:justify-start"
              aria-label="Ir al inicio de ETC Apps"
            >
              <img
                src={LogoEtcFondoNegro}
                alt=""
                className="w-auto h-9 md:h-10"
                aria-hidden="true"
              />
              <span className="text-xl font-bold text-white md:text-2xl">Etc Apps</span>
            </Link>

            <div className="space-y-4 text-sm">
              <a href="mailto:etc-apps@proton.me" className="flex items-center justify-center gap-3 hover:text-white md:justify-start">
                <Mail size={20} className="text-primary" aria-hidden="true" />
                <span>etc-apps@proton.me</span>
              </a>

              <a
                href="https://etc-apps.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 hover:text-white md:justify-start"
              >
                <Globe size={20} className="text-primary" aria-hidden="true" />
                <span>etc-apps.com</span>
              </a>

              <p className="flex items-center justify-center gap-3 md:justify-start">
                <MapPin size={20} className="text-primary" aria-hidden="true" />
                <span>Alicante, España</span>
              </p>
            </div>
          </div>

          <div className="text-center md:text-left">
            <h4 className="footer-title">Explorar</h4>
            <nav aria-label="Explorar" className="flex flex-col items-center space-y-3 text-sm md:items-start">
              <Link to="/" onClick={scrollTop} className="footer-link">
                Inicio
              </Link>
              <Link to="/precios" className="footer-link">
                Planes y Precios
              </Link>
              <a href="mailto:etc-apps@proton.me" className="footer-link">
                Soporte
              </a>
            </nav>
          </div>

          <div className="text-center md:text-left">
            <h4 className="footer-title">Legal</h4>
            <nav aria-label="Legal" className="flex flex-col items-center space-y-3 text-sm md:items-start">
              <Link to="/privacidad" className="footer-link">
                Privacidad
              </Link>
              <Link to="/aviso-legal" className="footer-link">
                Aviso Legal
              </Link>
              <Link to="/cookies" className="footer-link">
                Cookies
              </Link>
            </nav>
          </div>

          <div className="md:text-center">
            <h4 className="footer-title">Síguenos</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {REDES.map(({ nombre, href, icono, svgProps }) => (
                <a
                  key={nombre}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Síguenos en ${nombre}`}
                  className="p-2 transition-colors bg-gray-800 rounded-full hover:bg-primary hover:text-white"
                >
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    {...svgProps}
                  >
                    {ICONOS_REDES[icono]}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 mt-12 text-xs tracking-wide text-center border-t border-gray-800">
          <p>© {currentYear} EXPÓN TU CREACIÓN. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
