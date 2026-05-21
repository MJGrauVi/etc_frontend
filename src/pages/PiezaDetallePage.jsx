import { useState } from "react";
import usePiezaDetalle from "../hooks/usePiezaDetalle.js";
import PublicacionPreview from "../components/PublicacionPreview.jsx";
import ModalEditarPieza from "../components/ModalEditarPieza.jsx";
import Cargando from "../components/Cargando.jsx";
import MensajeTail from "../components/MensajeTail.jsx";
import PiezaCabecera from "../components/PiezaDetalle/PiezaCabecera.jsx";
import PiezaGaleria from "../components/PiezaDetalle/PiezaGaleria.jsx";
import PiezaDescripcionBotones from "../components/PiezaDetalle/PiezaDescripcionBotones.jsx";
import ModalEliminar from "../components/PiezaDetalle/ModalEliminar.jsx";

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
    perfil,
    modoManual,
    iniciarManual,
  } = usePiezaDetalle();

  const [confirmarEliminar, setConfirmarEliminar] = useState(false);

  if (cargando) return <Cargando />;
  if (error)
    return (
      <p className="px-6 py-4 text-orange-600 border border-orange-300 bg-orange-50">
        Error: {error}
      </p>
    );

  return (
    <main className="min-h-screen font-sans bg-white">
      {/* Muestro la cabecera */}
      <PiezaCabecera
        pieza={pieza}
        onAbrirModalEditar={abrirModalEditar}
        onEliminar={() => setConfirmarEliminar(true)}
      />

      {/* Muestro el mensaje */}
      <MensajeTail
        tipo={mensaje.tipo}
        texto={mensaje.texto}
        onClose={() => setMensaje({ tipo: "", texto: "" })}
      />

      {/* Muestro el contenido principal */}
      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">
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
              publicacion={publicacion}
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
              perfil={perfil}
            />
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
