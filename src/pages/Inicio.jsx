import fondo from "../assets/imagenFondo.png";
import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";


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


export default function Inicio() {
  return (
    <main className="min-h-screen font-sans">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-white" pt-16
        aria-label="Sección principal"
      >
        {/* Imagen de fondo decorativa */}
        <img
          src={fondo}
          alt=""
          role="presentation"
          className="absolute inset-0 z-0 object-cover w-full h-full opacity-20"
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
              <Card variant="beneficios" key={item.id} {...item} />
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
              <Card variant="caracteristicas" key={item.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
