import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDatos from "./useDatos.js";

const mensajeConfirmacionDemo = (pageName) =>
  `No tienes una pagina de Facebook configurada.\n\nSi continuas, esta publicacion se publicara usando la pagina demo${pageName ? ` (${pageName})` : ""}. Para publicar en tu propia pagina, configura primero tu pagina de Facebook en tu perfil.\n\n¿Quieres continuar usando la pagina demo?`;

const useEditarPublicacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, cargando } = useDatos(true);
  const { get: getFacebook, put, post } = useDatos();

  const [publicacion, setPublicacion] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [publicandoFacebook, setPublicandoFacebook] = useState(false);
  const [confirmacionDemoFacebook, setConfirmacionDemoFacebook] = useState(null);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  useEffect(() => {
    const cargarPublicacion = async () => {
      try {
        const respuesta = await get(`publicacion/${id}`);
        setPublicacion(respuesta.data ?? respuesta);
      } catch (err) {
        setError(err.backendMessage || err.message);
      }
    };

    cargarPublicacion();
  }, [get, id]);

  const handleEditar = ({ target }) => {
    const { name, value } = target;
    setPublicacion((previa) => ({ ...previa, [name]: value }));
  };

  const guardarCambios = async () => {
    if (!publicacion) return;

    setGuardando(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      const respuesta = await put(`publicacion/${publicacion.id}`, {
        titulo: publicacion.titulo,
        contenido: publicacion.contenido,
        hashtags: publicacion.hashtags,
        estado: publicacion.estado,
      });

      const publicacionActualizada = respuesta.data?.data ?? respuesta.data;
      setPublicacion(publicacionActualizada);
      setMensaje({ tipo: "success", texto: "Publicacion actualizada correctamente." });
    } catch (err) {
      setMensaje({
        tipo: "error",
        texto: err.backendMessage || err.message || "No se pudo guardar la publicacion.",
      });
    } finally {
      setGuardando(false);
    }
  };

  const publicarConfirmadoEnFacebook = async (datosPublicacion = {}, { demoConfirmada = false } = {}) => {
    setPublicandoFacebook(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      if (!demoConfirmada) {
        const destinoRespuesta = await getFacebook(`publicacion/${publicacion.id}/facebook/destination`);
        const destino = destinoRespuesta.data?.data ?? destinoRespuesta.data;

        if (destino?.requires_confirmation) {
          setConfirmacionDemoFacebook({
            datosPublicacion,
            titulo: "Usar pagina demo de Facebook",
            mensaje: mensajeConfirmacionDemo(destino.page_name),
          });
          return false;
        }
      }

      const respuesta = await post(`publicacion/${publicacion.id}/facebook`, {
        ...datosPublicacion,
        ...(demoConfirmada && { confirm_demo: true }),
      });
      const publicacionActualizada = respuesta.data?.data ?? respuesta.data;
      const warning = respuesta.data?.warning;

      setPublicacion(publicacionActualizada);
      setMensaje({
        tipo: "success",
        texto: warning
          ? `Publicacion publicada en Facebook correctamente. ${warning}`
          : "Publicacion publicada en Facebook correctamente.",
      });
      return true;
    } catch (err) {
      if (err.status === 409 && err.data?.requires_demo_confirmation) {
        setConfirmacionDemoFacebook({
          datosPublicacion,
          titulo: "Usar pagina demo de Facebook",
          mensaje: mensajeConfirmacionDemo(err.data?.destination?.page_name),
        });
        return false;
      }

      setMensaje({
        tipo: "error",
        texto: err.data?.error || err.backendMessage || err.message || "No se pudo publicar en Facebook.",
      });
      return false;
    } finally {
      setPublicandoFacebook(false);
    }
  };

  const publicarEnFacebook = async (datosPublicacion = {}) => {
    if (!publicacion?.id) {
      setMensaje({
        tipo: "error",
        texto: "Guarda la publicacion antes de publicarla en Facebook.",
      });
      return false;
    }

    if (publicacion.estado !== "pendiente") {
      setMensaje({
        tipo: "error",
        texto: "Revisa la publicacion y cambia su estado a Lista para publicar antes de publicarla en Facebook.",
      });
      return false;
    }

    return publicarConfirmadoEnFacebook(datosPublicacion);
  };

  const confirmarPublicacionDemoFacebook = async () => {
    if (!confirmacionDemoFacebook) return false;

    const datosPublicacion = confirmacionDemoFacebook.datosPublicacion;
    setConfirmacionDemoFacebook(null);
    return publicarConfirmadoEnFacebook(datosPublicacion, { demoConfirmada: true });
  };

  const cancelarPublicacionDemoFacebook = () => {
    setConfirmacionDemoFacebook(null);
  };

  const volverAlPanel = () => navigate("/publicaciones");

  return {
    publicacion,
    cargando,
    guardando,
    publicandoFacebook,
    confirmacionDemoFacebook,
    error,
    mensaje,
    setMensaje,
    handleEditar,
    guardarCambios,
    publicarEnFacebook,
    confirmarPublicacionDemoFacebook,
    cancelarPublicacionDemoFacebook,
    volverAlPanel,
  };
};

export default useEditarPublicacion;
