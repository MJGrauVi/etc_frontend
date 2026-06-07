import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navegar = useNavigate();

  return (
    <main className="flex items-center justify-center min-h-screen px-6 bg-white">
      <section className="w-full max-w-xl py-16 text-center">
        <p className="mb-3 text-sm font-semibold tracking-wide text-orange-500 uppercase">
          Error
        </p>
        <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
          Pagina no encontrada
        </h1>
        <p className="mt-4 text-gray-600">
          La ruta solicitada no existe o ya no esta disponible.
        </p>
        <button
          type="button"
          className="mt-8 btn-primary"
          onClick={() => navegar("/")}
        >
          Volver a inicio
        </button>
      </section>
    </main>
  );
};

export default ErrorPage;
