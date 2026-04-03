import fondo from "../public/assets/escritorio.png";

export default function Hero() {
  return (
    <section className="relative flex items-center justify-center min-h-[600px] w-full overflow-hidden bg-white"> {/* Fondo blanco para que contraste con el texto negro si la imagen tarda en cargar */}
      {/* Imagen de fondo ocupando todo el espacio con opacidad */}
      <img
        src={fondo} 
        alt="Fondo escritorio"
        className="absolute inset-0 z-0 object-cover w-full h-full opacity-40"
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
  );
}
