import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDatos from "./useDatos.js";


const mensajeConfirmacionDemo = (pageName) =>
  `No tienes una pagina de Facebook configurada.\n\nSi continuas, esta publicacion se publicara usando la pagina demo${pageName ? ` (${pageName})` : ""}. Para publicar en tu propia pagina, configura primero tu pagina de Facebook en tu perfil.\n\n¿Quieres continuar usando la pagina demo?`;
const usePiezaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, cargando } = useDatos(true);
  const { get: getFacebook, post, put, remove, postForm } = useDatos();

  const [pieza, setPieza]             = useState(null);
  const [publicacion, setPublicacion] = useState(null);
  const [generando, setGenerando]     = useState(false);
  const [guardando, setGuardando]     = useState(false);
  const [publicandoFacebook, setPublicandoFacebook] = useState(false);
  const [confirmacionDemoFacebook, setConfirmacionDemoFacebook] = useState(null);
  const [error, setError]             = useState(null);
  const [mensaje, setMensaje]         = useState({ tipo: "", texto: "" });
  const [modoManual, setModoManual]   = useState(false);

  const [modalEditar, setModalEditar]       = useState(false);
  const [piezaEdit, setPiezaEdit]           = useState({});
  const [guardandoPieza, setGuardandoPieza] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  // Cargo los datos principales.

 useEffect(() => {
  const cargarPieza = async () => {
    try {
      const respuesta = await get(`pieza/${id}`);
      setPieza(respuesta.data);
    } catch (err) {
      setError(err.message);
    }
  };

  cargarPieza();
}, [get, id]);

  // Gestiono la ediciÃ³n de la pieza.
  const abrirModalEditar = () => {
    setPiezaEdit({
      nombre:      pieza.nombre      ?? "",
      descripcion: pieza.descripcion ?? "",
      categoria:   pieza.categoria   ?? "",
      precio:      pieza.precio      ?? "",
    });
    setModalEditar(true);
  };

  const cerrarModalEditar = () => setModalEditar(false);

  const handleEditarPieza = ({ target }) => {
    const { name, value } = target;
    setPiezaEdit(prev => ({ ...prev, [name]: value }));
  };

  const guardarPieza = async () => {
    setGuardandoPieza(true);
    try {
      const respuesta = await put(`pieza/${id}`, piezaEdit);
      setPieza(prev => ({ ...prev, ...respuesta.data }));
      setModalEditar(false);
      setMensaje({ tipo: "success", texto: "Pieza actualizada correctamente." });
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    } finally {
      setGuardandoPieza(false);
    }
  };

  // Gestiono la eliminaciÃ³n de la pieza.
  const eliminarPieza = async () => {
    try {
      await remove(`pieza/${id}`);
      navigate("/mis-piezas");
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  // Gestiono las imÃ¡genes.
  const subirImagen = async (archivo) => {
    setSubiendoImagen(true);
    try {
      const formData = new FormData();
      formData.append("imagen", archivo);
      formData.append("pieza_id", id);
      const respuesta = await postForm("media", formData);
      setPieza(prev => ({
        ...prev,
        medias: [...(prev.medias ?? []), respuesta.data],
      }));
      setMensaje({ tipo: "success", texto: "Imagen subida correctamente." });
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    } finally {
      setSubiendoImagen(false);
    }
  };

  const eliminarImagen = async (mediaId) => {
    try {
      await remove(`media/${mediaId}`);
      setPieza(prev => ({
        ...prev,
        medias: prev.medias.filter(m => m.id !== mediaId),
      }));
      setMensaje({ tipo: "success", texto: "Imagen eliminada." });
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  const marcarPortada = async (mediaId) => {
    try {
      await put(`media/${mediaId}`, { es_portada: true });
      setPieza(prev => ({
        ...prev,
        medias: prev.medias.map(m => ({ ...m, es_portada: m.id === mediaId })),
      }));
      setMensaje({ tipo: "success", texto: "Portada actualizada." });
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  // Gestiono el modo manual.
  const iniciarManual = () => {
    setPublicacion({
      id:       null,
      titulo:   "",
      contenido: "",
      hashtags: "",
      estado:   "borrador",
      pieza,
    });
    setModoManual(true);
  };

  // Gestiono la generaciÃ³n con IA.
  const generarPublicacion = async () => {
    if (!pieza.medias?.length) {
      setMensaje({
        tipo: "error",
        texto: "Necesitas al menos una imagen para generar la publicaciÃ³n con IA.",
      });
      return;
    }

    setGenerando(true);
    setMensaje({ tipo: "", texto: "" });
    try {
      const respuesta = await post("publicacion/generar", { pieza_id: id });
      const pub = respuesta.data?.data ?? respuesta.data;
      setPublicacion({
        ...pub,
        pieza_id: pub.pieza_id ?? id,
        pieza: pub.pieza ?? pub.piezas ?? pieza,
        titulo: (pub.titulo ?? "").replace(/[*:#]/g, "").trim(),
        estado: pub.estado === "lista" ? "pendiente" : (pub.estado ?? "borrador"),
      });
      setModoManual(false);
      setMensaje({ tipo: "success", texto: "PublicaciÃ³n generada correctamente." });
    } catch (err) {
      if (err.status === 429) {
        setMensaje({
          tipo: "error",
          texto: "Has alcanzado el lÃ­mite diario de peticiones de IA. IntÃ©ntalo maÃ±ana."
        });
      } else if (err.status === 500) {
        setMensaje({
          tipo: "error",
          texto: "La IA estÃ¡ tardando demasiado. IntÃ©ntalo de nuevo en unos segundos."
        });
      } else {
        setMensaje({ tipo: "error", texto: err.message });
      }
    } finally {
      setGenerando(false);
    }
  };

  const handleEditar = ({ target }) => {
    const { name, value } = target;
    setPublicacion(prev => ({ ...prev, [name]: value }));
  };

  const normalizarEstado = (estado) =>
    estado === "lista" ? "pendiente" : estado;

  // Guardo publicaciones generadas con IA o creadas manualmente.
  const guardarCambios = async () => {
    setGuardando(true);
    try {
      let respuesta;
      const datosPublicacion = {
        pieza_id: id,
        titulo: publicacion.titulo,
        contenido: publicacion.contenido,
        hashtags: publicacion.hashtags,
        estado: normalizarEstado(publicacion.estado),
      };

      if (publicacion.id) {
        // Si ya existe en BD, actualizo con PUT.
        respuesta = await put(`publicacion/${publicacion.id}`, datosPublicacion);
      } else {
        // Si es manual y no existe, creo con POST.
        respuesta = await post("publicacion", datosPublicacion);
      }

      const pubGuardada = respuesta.data?.data ?? respuesta.data;
      setPublicacion({
        ...pubGuardada,
        pieza: pubGuardada?.pieza ?? pubGuardada?.piezas ?? publicacion.pieza ?? publicacion.piezas ?? pieza,
        pieza_id: pubGuardada?.pieza_id ?? id,
        estado: normalizarEstado(pubGuardada?.estado ?? datosPublicacion.estado),
      });
      setModoManual(false);
      setMensaje({ tipo: "success", texto: "PublicaciÃ³n guardada correctamente." });

    } catch (err) {
      if (err.status === 403) {
        console.error("Error 403 guardando publicacion", {
          publicacionId: publicacion.id,
          piezaId: id,
          backendMessage: err.backendMessage,
          data: err.data,
        });
        setMensaje({ tipo: "error", texto: "No tienes permiso para editar esta publicaciÃ³n." });
      } else if (err.status === 422) {
        setMensaje({ tipo: "error", texto: "Datos incorrectos. Revisa los campos." });
      } else if (err.status === 500) {
        setMensaje({ tipo: "error", texto: "Error del servidor. IntÃ©ntalo de nuevo." });
      } else {
        setMensaje({ tipo: "error", texto: err.message });
      }
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
      const pubActualizada = respuesta.data?.data ?? respuesta.data;
      const warning = respuesta.data?.warning;

      setPublicacion({
        ...pubActualizada,
        pieza: pubActualizada?.pieza ?? pubActualizada?.piezas ?? publicacion.pieza ?? pieza,
        pieza_id: pubActualizada?.pieza_id ?? id,
      });
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

  return {
    pieza,
    publicacion,
    cargando,
    generando,
    guardando,
    publicandoFacebook,
    confirmacionDemoFacebook,
    error,
    mensaje,
    setMensaje,
    generarPublicacion,
    handleEditar,
    guardarCambios,
    publicarEnFacebook,
    confirmarPublicacionDemoFacebook,
    cancelarPublicacionDemoFacebook,
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
  };
};

export default usePiezaDetalle;
