import { useState } from "react";
import usePiezaDetalle from "../hooks/usePiezaDetalle.js";
import PublicacionPreview from "../components/PublicacionPreview.jsx";
import ModalEditarPieza from "../components/ModalEditarPieza.jsx";
import Cargando from "../components/Cargando.jsx";
import EstadoError from "../components/EstadoError.jsx";
import Mensaje from "../components/Mensaje.jsx";
import PiezaCabecera from "../components/PiezaDetalle/PiezaCabecera.jsx";
import PiezaGaleria from "../components/PiezaDetalle/PiezaGaleria.jsx";
import PiezaDescripcionBotones from "../components/PiezaDetalle/PiezaDescripcionBotones.jsx";
import ModalEliminar from "../components/ModalEliminar.jsx";

const PiezaDetallePage = () => {
  const {
    pieza,
    publicacion,
    cargando,
    generando,
    guardando,
    publicandoFacebook,
    error,
    mensaje,
    setMensaje,
    generarPublicacion,
    handleEditar,
    guardarCambios,
    publicarEnFacebook,
    modalEditar,
    piezaEdit,
    guardandoPieza,
    abrirModalEditar,
    cerrarModalEditar,
    handleEditarPieza,
    guardarPieza,
    eliminarPieza,
    subiendoImagen,
    subirImagen,
    eliminarImagen,
    marcarPortada,
    modoManual,
    iniciarManual,
  } = usePiezaDetalle();

  const [confirmarEliminar, setConfirmarEliminar] = useState(false);
  if (error) return <EstadoError mensaje={error} />;

  return (
    <main className="min-h-screen font-sans bg-white">
      {/* Muestro la cabecera */}
      {cargando ? (
        <section className="page-header">
          <div className="px-6 mx-auto text-left max-w-7xl">
            <h1 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Cargando pieza...
            </h1>
          </div>
        </section>
      ) : (
        <PiezaCabecera
          pieza={pieza}
          onAbrirModalEditar={abrirModalEditar}
          onEliminar={() => setConfirmarEliminar(true)}
        />
      )}

      {/* Muestro el mensaje */}
      <Mensaje
        tipo={mensaje.tipo}
        texto={mensaje.texto}
        onClose={() => setMensaje({ tipo: "", texto: "" })}
      />

      {/* Muestro el contenido principal */}
      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">
          {cargando ? (
            <Cargando />
          ) : (
            <>
          <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
            {/* Muestro la galería */}
            <PiezaGaleria
              pieza={pieza}
              subiendoImagen={subiendoImagen}
              onSubir={subirImagen}
              onEliminar={eliminarImagen}
              onMarcarPortada={marcarPortada}
            />

            {/* Muestro la descripción y los botones */}
            <PiezaDescripcionBotones pieza={pieza}
              generando={generando}
              generarPublicacion={generarPublicacion}
              iniciarManual={iniciarManual} />
          </div>

          {/* Muestro la previsualización */}
          {(publicacion || modoManual) && (
            <PublicacionPreview
              publicacion={
                publicacion || {
                  id: null,
                  titulo: "",
                  contenido: "",
                  hashtags: "",
                  estado: "borrador",
                  pieza,
                }
              }
              guardando={guardando}
              publicandoFacebook={publicandoFacebook}
              onEditar={handleEditar}
              onGuardar={guardarCambios}
              onPublicarFacebook={publicarEnFacebook}
            />
          )}
            </>
          )}
        </div>
      </section>

      {/* Muestro el modal de edición */}
      {modalEditar && (
        <ModalEditarPieza
          piezaEdit={piezaEdit}
          guardando={guardandoPieza}
          onChange={handleEditarPieza}
          onGuardar={guardarPieza}
          onCerrar={cerrarModalEditar}
        />
      )}

      {/* Muestro la confirmación de eliminación */}
      <ModalEliminar
        visible={confirmarEliminar}
        onCancelar={() => setConfirmarEliminar(false)}
        onConfirmar={eliminarPieza}
      />
    </main>
  );
};

export default PiezaDetallePage;
