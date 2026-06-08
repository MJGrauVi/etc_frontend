
import { Link } from "react-router-dom";
import Cargando from "../components/Cargando.jsx";
import EstadoError from "../components/EstadoError.jsx";
import Mensaje from "../components/Mensaje.jsx";
import PublicacionPreview from "../components/PublicacionPreview.jsx";
import useEditarPublicacion from "../hooks/useEditarPublicacion.js";

const EditarPublicacionPage = () => {
  const {
    publicacion,
    cargando,
    guardando,
    publicandoFacebook,
    error,
    mensaje,
    setMensaje,
    handleEditar,
    guardarCambios,
    publicarEnFacebook,
  } = useEditarPublicacion();

  if (error) return <EstadoError mensaje={error} />;

  if (!cargando && !publicacion) {
    return (
      <main className="min-h-screen px-6 py-12 bg-white">
        <div className="max-w-4xl mx-auto text-center border border-gray-200 bg-gray-50 p-8">
          <p className="mb-6 text-gray-600">No se ha encontrado la publicacion.</p>
          <Link to="/publicaciones" className="btn-secondary">
            Volver a publicaciones
          </Link>
        </div>
      </main>
    );
  }

  const pieza = publicacion?.pieza ?? publicacion?.piezas;

  return (
    <main className="min-h-screen font-sans bg-white">
      <section className="page-header">
        <div className="px-6 mx-auto text-left max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Editar publicacion
          </h1>
          <p className="mt-2 text-gray-600">
            {cargando
              ? "Cargando publicación..."
              : pieza?.nombre
                ? `Pieza asociada: ${pieza.nombre}`
                : "Actualiza el contenido antes de publicarlo."}
          </p>
        </div>
      </section>

      <Mensaje
        tipo={mensaje.tipo}
        texto={mensaje.texto}
        onClose={() => setMensaje({ tipo: "", texto: "" })}
      />

      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">
          {cargando ? (
            <Cargando />
          ) : (
            <PublicacionPreview
              publicacion={publicacion}
              guardando={guardando}
              publicandoFacebook={publicandoFacebook}
              onEditar={handleEditar}
              onGuardar={guardarCambios}
              onPublicarFacebook={publicarEnFacebook}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default EditarPublicacionPage;
