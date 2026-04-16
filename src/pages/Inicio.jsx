import fondo from "../assets/escritorioApp2.jpeg";
import { Link } from "react-router-dom";

/* ============================================================
   DATOS — Arrays de contenido para evitar repetición de JSX
   (Patrón DRY requerido en DIW/DWC)
   ============================================================ */
const ICONOS = {
  ahorro: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V4m0 12v4"
    />
  ),
  garantia: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  ),
  seguridad: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  ),
  facilidad:(
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"
    />
  ),
  facil:(
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
  ),
  escaparate:(
     <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 7l9-4 9 4-9 4-9-4zm0 6l9 4 9-4m-9 4v6"
      />
  ),
  redes:(
     <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
      />
  ),
};
const BENEFICIOS = [
  {
    id: "ahorro",
    titulo: "Ahorro",
    descripcion:
      "El cloud computing es más eficiente que los sistemas tradicionales. Muchas PYMES ya se han pasado y han reducido costes de infraestructura y mantenimiento.",
    icono: "ahorro",
  },
  {
    id: "garantia",
    titulo: "Garantía",
    descripcion:
      "Garantía incondicional de satisfacción. Para que tomes la mejor decisión, te ofrecemos 1 mes gratis de prueba sin compromiso.",
    icono: "garantia",
  },
  {
    id: "seguridad",
    titulo: "Seguridad",
    descripcion:
      "Datos encriptados, accesos seguros y monitorización técnica constante. Tu información y la de tus clientes siempre protegida.",
    icono: "seguridad",
  },
  {
    id: "facilidad",
    titulo: "Facilidad",
    descripcion:
      "Software intuitivo, ágil y productivo. Procesos simples, ayudas integradas y una experiencia pensada para que no pierdas tiempo.",
    icono: "facilidad",
  },
];

const CARACTERISTICAS = [
  {
    id: "facil",
    titulo: "Fácil de usar",
    descripcion:
      "Crea publicaciones profesionales en minutos, sin conocimientos técnicos ni herramientas complicadas.",
    icono: "facil",
  },
  {
    id: "escaparate",
    titulo: "Tu escaparate digital",
    descripcion:
      "Muestra tus piezas únicas en un espacio visual pensado para destacar tu trabajo y atraer clientes.",
    icono: "escaparate",
  },
  {
    id: "redes",
    titulo: "Comparte en redes",
    descripcion:
      "Publica directamente en tus redes sociales favoritas con un solo clic. Rápido, sencillo y eficaz.",
    icono: "redes",
  },
];

/* ============================================================
   SUBCOMPONENTES — Reutilizables dentro del módulo
   ============================================================ */

/**
 * Icono SVG genérico de tamaño configurable.
 * Recibe el path SVG como children.
 */
function IconSVG({ children, className = "h-9 w-9" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/**
 * Tarjeta de beneficio (Ahorro, Garantía, Seguridad, Facilidad).
 * Usa la clase @utility benefit-card definida en index.css.
 */
function BenefitCard({ titulo, descripcion, icono }) {
  return (
    <article className="benefit-card">
      <div className="text-orange-600 bg-orange-100 icon-circle">
        {<IconSVG>{ICONOS[icono]}</IconSVG>}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
        {titulo}
      </h3>
      <p className="mt-3 font-normal text-center text-gray-600">
        {descripcion}
      </p>
    </article>
  );
}

/**
 * Tarjeta de característica (Fácil, Escaparate, Redes).
 * Usa la clase @utility feature-card definida en index.css.
 */
function FeatureCard({ titulo, descripcion, icono }) {
  return (
    <article className="feature-card">
      <div className="text-orange-600 bg-orange-100 icon-circle w-14 h-14">
        <IconSVG className="w-8 h-8">{ICONOS[icono]}</IconSVG>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-center text-gray-800">
        {titulo}
      </h3>
      <p className="mt-3 text-center text-gray-600">{descripcion}</p>
    </article>
  );
}

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */
export default function Inicio() {
  return (
    <main className="min-h-screen font-sans">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center w-full pt-16 overflow-hidden bg-white min-h-150"
        aria-label="Sección principal"
      >
        {/* Imagen de fondo decorativa */}
        <img
          src={fondo}
          alt=""
          role="presentation"
          className="absolute bottom-0 z-0 object-cover w-full h-full opacity-25"
        />

        {/* Contenido principal del hero */}
        <div className="relative z-10 max-w-4xl px-6 mx-auto text-center">
          <h1 className="text-3xl font-bold leading-tight text-black md:text-6xl">
            Muestra al mundo lo que creas
          </h1>

          <p className="mt-6 text-lg text-gray-800 md:text-xl">
            Con ETC puedes crear publicaciones profesionales y compartir tus
            piezas únicas en redes sociales en solo unos clics.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link
              to="/login"
              state={{ mostrarRegistro: true }}
              className="btn-primary"
            >
              Solicita una prueba gratis
            </Link>
            <button className="btn-secondary">Saber más</button>
          </div>
        </div>
      </section>

      {/* ── BENEFICIOS ────────────────────────────────────────── */}
      <section className="py-20 bg-white" aria-labelledby="beneficios-titulo">
        <div className="px-6 mx-auto max-w-7xl">
          <h2 id="beneficios-titulo" className="section-title">
            Gestión profesional para creadores y pequeñas empresas
          </h2>

          <p className="section-subtitle">
            ETC está construido sobre tecnología cloud moderna, diseñada para
            ser rápida, intuitiva y fácil de integrar en tu día a día. Ofrece
            herramientas visuales, análisis claros, comunicación integrada y
            procesos simplificados para ayudarte a mostrar tus creaciones,
            gestionar tu actividad y reducir tiempos y costes.
          </p>

          {/* Grid generado desde el array BENEFICIOS */}
          <div className="grid grid-cols-1 gap-10 mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((item) => (
              <BenefitCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA CENTRAL ───────────────────────────────────────── */}
      <section className="py-20 bg-gray-50" aria-labelledby="cta-titulo">
        <div className="max-w-4xl px-6 mx-auto text-center">
          <h2 id="cta-titulo" className="section-title">
            ¿Listo para mostrar tus creaciones?
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Empieza hoy mismo y crea tu primera publicación en minutos.
          </p>

          <Link
            to="/login"
            state={{ mostrarRegistro: true }}
            className="inline-block px-10 py-4 btn-primary mt-9"
          >
            Crear mi primera publicación
          </Link>
        </div>
      </section>

      {/* ── CARACTERÍSTICAS ───────────────────────────────────── */}
      <section
        className="py-20 bg-white"
        aria-labelledby="caracteristicas-titulo"
      >
        <div className="px-6 mx-auto max-w-7xl">
          <h2 id="caracteristicas-titulo" className="section-title">
            ¿Por qué usar ETC?
          </h2>

          <p className="max-w-2xl section-subtitle">
            Una herramienta pensada para creadores, artesanos y pequeñas
            empresas que quieren mostrar su trabajo sin complicaciones.
          </p>

          {/* Grid generado desde el array CARACTERISTICAS */}
          <div className="grid grid-cols-1 gap-10 mt-16 md:grid-cols-3">
            {CARACTERISTICAS.map((item) => (
              <FeatureCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
