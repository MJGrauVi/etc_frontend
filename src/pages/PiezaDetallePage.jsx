import { useState } from "react";
import usePiezaDetalle from "../hooks/usePiezaDetalle.js";
import PublicacionPreview from "../components/PublicacionPreview.jsx";
import ModalEditarPieza from "../components/ModalEditarPieza.jsx";
import Cargando from "../components/Cargando.jsx";
import MensajeTail from "../components/MensajeTail.jsx";
import PiezaCabecera from "../components/PiezaDetalle/PiezaCabecera.jsx";
import PiezaGaleria from "../components/PiezaDetalle/PiezaGaleria.jsx";
import ModalEliminar from "../components/PiezaDetalle/ModalEliminar.jsx";

const PiezaDetallePage = () => {
  const {
    pieza,
    publicacion,
    cargando,
    generando,
    guardando,
    error,
    mensaje,
    setMensaje,
    generarPublicacion,
    handleEditar,
    guardarCambios,
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
      {/* Cabecera */}
      <PiezaCabecera
        pieza={pieza}
        onAbrirModalEditar={abrirModalEditar}
        onEliminar={() => setConfirmarEliminar(true)}
      />

      {/* Mensaje */}
      <MensajeTail
        tipo={mensaje.tipo}
        texto={mensaje.texto}
        onClose={() => setMensaje({ tipo: "", texto: "" })}
      />

      {/* Contenido principal */}
      <section className="py-10">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Galería */}
            <PiezaGaleria
              pieza={pieza}
              subiendoImagen={subiendoImagen}
              onSubir={subirImagen}
              onEliminar={eliminarImagen}
              onMarcarPortada={marcarPortada}
            />

            {/* Descripción + botones */}
            <PiezaDescripcionBotones pieza={pieza}
              publicacion={publicacion}
              generando={generando}
              generarPublicacion={generarPublicacion}
              iniciarManual={iniciarManual} />

            {/* Previsualización */}
            {(publicacion || modoManual) && (
              <PublicacionPreview
                publicacion={
                  publicacion || {
                    id: null,
                    titulo: "",
                    contenido: "",
                    hashtags: "",
                    estado: "borrador",
                    piezas: pieza,
                  }
                }
                guardando={guardando}
                onEditar={handleEditar}
                onGuardar={guardarCambios}
                perfil={perfil}
              />
            )}
          </div>
          </div>
      </section>

      {/* Modal editar */}
      {modalEditar && (
        <ModalEditarPieza
          piezaEdit={piezaEdit}
          guardando={guardandoPieza}
          onChange={handleEditarPieza}
          onGuardar={guardarPieza}
          onCerrar={cerrarModalEditar}
        />
      )}

      {/* Confirmación eliminar */}
      <ModalEliminar
        visible={confirmarEliminar}
        onCancelar={() => setConfirmarEliminar(false)}
        onConfirmar={eliminarPieza}
      />
    </main>
  );
};

export default PiezaDetallePage;
