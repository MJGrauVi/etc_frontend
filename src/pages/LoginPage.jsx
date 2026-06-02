import LoginRegistro from "../components/LoginRegistro.jsx";
import LogoEtcTail from "../components/logo/LogoEtcTail.jsx";

const LoginPage = () => {
  return (
    <>
      <main className="relative min-h-screen px-4 py-10 overflow-hidden bg-gray-50">
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-6 md:grid-cols-[1fr_380px] lg:-translate-x-8 lg:grid-cols-[1fr_420px] lg:gap-0 xl:-translate-x-12">
          {/* Bloque visual */}
          <section className="relative items-center justify-center hidden min-h-110 bg-white/70 md:flex lg:min-h-130">
            <LogoEtcTail className="h-56 w-56 opacity-10 lg:h-88 lg:w-88" />
            <div className="absolute max-w-sm text-left bottom-10 left-10 lg:bottom-16 lg:left-20 lg:max-w-md">
              <h1 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                Gestiona tu contenido con claridad
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600 lg:text-lg">
                Accede a tu espacio para crear, organizar y preparar tus
                publicaciones.
              </p>
            </div>
          </section>

          {/* Formulario pisando el bloque */}
          <section className="relative z-10 flex justify-center md:-ml-16 lg:-ml-32">
            <LoginRegistro />
          </section>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
