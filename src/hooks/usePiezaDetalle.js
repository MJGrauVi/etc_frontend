import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDatos from "./useDatos.js";

const usePiezaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, cargando } = useDatos(true);
  const { post, put, remove, postForm } = useDatos();

  const [pieza, setPieza]             = useState(null);
  const [publicacion, setPublicacion] = useState(null);
  const [generando, setGenerando]     = useState(false);
  const [guardando, setGuardando]     = useState(false);
  const [publicandoFacebook, setPublicandoFacebook] = useState(false);
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

  // Gestiono la edición de la pieza.
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

  // Gestiono la eliminación de la pieza.
  const eliminarPieza = async () => {
    try {
      await remove(`pieza/${id}`);
      navigate("/mis-piezas");
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  // Gestiono las imágenes.
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

  // Gestiono la generación con IA.
  const generarPublicacion = async () => {
    if (!pieza.medias?.length) {
      setMensaje({
        tipo: "error",
        texto: "Necesitas al menos una imagen para generar la publicación con IA.",
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
      setMensaje({ tipo: "success", texto: "Publicación generada correctamente." });
    } catch (err) {
      if (err.status === 429) {
        setMensaje({
          tipo: "error",
          texto: "Has alcanzado el límite diario de peticiones de IA. Inténtalo mañana."
        });
      } else if (err.status === 500) {
        setMensaje({
          tipo: "error",
          texto: "La IA está tardando demasiado. Inténtalo de nuevo en unos segundos."
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
      setMensaje({ tipo: "success", texto: "Publicación guardada correctamente." });

    } catch (err) {
      if (err.status === 403) {
        console.error("Error 403 guardando publicacion", {
          publicacionId: publicacion.id,
          piezaId: id,
          backendMessage: err.backendMessage,
          data: err.data,
        });
        setMensaje({ tipo: "error", texto: "No tienes permiso para editar esta publicación." });
      } else if (err.status === 422) {
        setMensaje({ tipo: "error", texto: "Datos incorrectos. Revisa los campos." });
      } else if (err.status === 500) {
        setMensaje({ tipo: "error", texto: "Error del servidor. Inténtalo de nuevo." });
      } else {
        setMensaje({ tipo: "error", texto: err.message });
      }
    } finally {
      setGuardando(false);
    }
  };

  const publicarEnFacebook = async (datosPublicacion = {}) => {
    if (!publicacion?.id) {
      setMensaje({
        tipo: "error",
        texto: "Guarda la publicacion antes de publicarla en Facebook.",
      });
      return;
    }

    if (publicacion.estado !== "pendiente") {
      setMensaje({
        tipo: "error",
        texto: "Revisa la publicacion y cambia su estado a Lista para publicar antes de publicarla en Facebook.",
      });
      return;
    }

    setPublicandoFacebook(true);
    try {
      const respuesta = await post(`publicacion/${publicacion.id}/facebook`, datosPublicacion);
      const pubActualizada = respuesta.data?.data ?? respuesta.data;

      setPublicacion({
        ...pubActualizada,
        pieza: pubActualizada?.pieza ?? pubActualizada?.piezas ?? publicacion.pieza ?? pieza,
        pieza_id: pubActualizada?.pieza_id ?? id,
      });
      setMensaje({ tipo: "success", texto: "Publicacion publicada en Facebook correctamente." });
    } catch (err) {
      setMensaje({
        tipo: "error",
        texto: err.data?.error || err.backendMessage || err.message || "No se pudo publicar en Facebook.",
      });
    } finally {
      setPublicandoFacebook(false);
    }
  };

  return {
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
  };
};

export default usePiezaDetalle;
