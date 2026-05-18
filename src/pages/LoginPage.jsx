import LoginRegistro from "../components/LoginRegistro.jsx";
import LogoEtcTail from "../components/logo/LogoEtcTail.jsx";

const LoginPage = () => {
  return (
    <>
      <main className="relative min-h-screen px-4 py-10 overflow-hidden bg-gray-50">
        <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-0 lg:-translate-x-8 lg:grid-cols-[1fr_420px] xl:-translate-x-12">
          {/* Bloque visual */}
          <section className="relative items-center justify-center hidden min-h-130 bg-white/70 lg:flex">
            <LogoEtcTail className="h-88 w-88 opacity-10" />
            <div className="absolute max-w-md text-left bottom-16 left-20">
              <h1 className="text-4xl font-bold text-gray-900">
                Gestiona tu contenido con claridad
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Accede a tu espacio para crear, organizar y preparar tus
                publicaciones.
              </p>
            </div>
          </section>

          {/* Formulario pisando el bloque */}
          <section className="relative z-10 flex justify-center lg:-ml-32">
            <LoginRegistro />
          </section>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
