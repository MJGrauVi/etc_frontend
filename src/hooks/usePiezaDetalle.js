import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useContextoSesion from "./useContextoSesion.js";
import usePerfil from "./usePerfil.js";

const usePiezaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, post, put, remove, postForm } = useContextoSesion(); // ← remove + postForm
  const perfil = usePerfil();

  const [pieza, setPieza]             = useState(null);
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargando]       = useState(true);
  const [generando, setGenerando]     = useState(false);
  const [guardando, setGuardando]     = useState(false);
  const [error, setError]             = useState(null);
  const [mensaje, setMensaje]         = useState({ tipo: "", texto: "" });
  const [modoManual, setModoManual] = useState(false);


  const [modalEditar, setModalEditar]       = useState(false);
  const [piezaEdit, setPiezaEdit]           = useState({});
  const [guardandoPieza, setGuardandoPieza] = useState(false);
  const [subiendoImagen, setSubiendoImagen] = useState(false);

  // ── Carga ────────────────────────────────────────────────────────────────
  const cargarPieza = async () => {
    try {
      const respuesta = await get(`pieza/${id}`);
      setPieza(respuesta.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => { cargarPieza(); }, [id]);

  // ── Editar pieza ─────────────────────────────────────────────────────────
  const abrirModalEditar = () => {
    setPiezaEdit({
      nombre:      pieza.nombre      ?? "",
      descripcion: pieza.descripcion ?? "",
      categoria:   pieza.categoria   ?? "",
      precio:      pieza.precio      ?? "",
    });
    setModalEditar(true);
  };
  const cerrarModalEditar = () =>{
    setModalEditar(false);
  }

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

  // ── Eliminar pieza ───────────────────────────────────────────────────────
  const eliminarPieza = async () => {
    try {
      await remove(`pieza/${id}`); // ← remove, no del
      navigate("/mis-piezas");
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    }
  };

  // ── Imágenes ─────────────────────────────────────────────────────────────
  const subirImagen = async (archivo) => {
    setSubiendoImagen(true);
    try {
      const formData = new FormData();
      formData.append("imagen", archivo);
      formData.append("pieza_id", id);

      const respuesta = await postForm("media", formData); // ← postForm para multipart
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
      await remove(`media/${mediaId}`); // ← remove
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

  // ── Modo Manual ────────────────────────────────────────────────────────────────────


// Publicación vacía para rellenar manualmente
const iniciarManual = () => {
    setPublicacion({
        id: null, // 👈 null indica que aún no está en BD
        titulo: "",
        contenido: "",
        hashtags: "",
        estado: "borrador",
        piezas: pieza,
    });
    setModoManual(true);
};

// Guardar cambia según si ya existe o no
const guardarCambios = async () => {
    setGuardando(true);
    try {
        let respuesta;

        if (publicacion.id) {
            // 👇 Ya existe → actualizar con PUT
            respuesta = await put(`publicacion/${publicacion.id}`, {
                titulo:    publicacion.titulo,
                contenido: publicacion.contenido,
                hashtags:  publicacion.hashtags,
                estado:    publicacion.estado,
            });
        } else {
            // 👇 No existe → crear con POST
            respuesta = await post("publicacion", {
                pieza_id:  id,
                titulo:    publicacion.titulo,
                contenido: publicacion.contenido,
                hashtags:  publicacion.hashtags,
                estado:    publicacion.estado,
            });
        }

        setPublicacion(respuesta.data);
        setModoManual(false);
        setMensaje({ tipo: "success", texto: "Publicación guardada correctamente." });
    } catch (err) {
        if (err.status === 403) {
            setMensaje({ tipo: "error", texto: "No tienes permiso para editar esta publicación." });
        } else {
            setMensaje({ tipo: "error", texto: err.message });
        }
    } finally {
        setGuardando(false);
    }
};

   // ── IA ────────────────────────────────────────────────────────────────────
  const generarPublicacion = async () => {
    setGenerando(true);
    setMensaje({ tipo: "", texto: "" });

    try {
        const respuesta = await post("publicacion/generar", { pieza_id: id });
        const pub = respuesta.data;
        pub.titulo = pub.titulo.replace(/[*:#]/g, "").trim();
        setPublicacion(pub);
        setMensaje({ tipo: "success", texto: "Publicación generada correctamente." });
    } catch (err) {
        // Mensaje específico según el código de error.
        if (err.status === 429) {
            setMensaje({
                tipo: "error",
                texto: "Has alcanzado el límite diario de peticiones de IA. Inténtalo mañana."
            });
        // 500 = error de servidor, probablemente timeout de Gemini.
          }else if (err.status === 500) {
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

  const guardarCambiosAnterior = async () => {
    setGuardando(true);
    try {
      const respuesta = await put(`publicacion/${publicacion.id}`, {
        titulo:    publicacion.titulo,
        contenido: publicacion.contenido,
        hashtags:  publicacion.hashtags,
        estado:    publicacion.estado,
      });

      setPublicacion(respuesta.data);
      setMensaje({ tipo: "success", texto: "Cambios guardados correctamente." });
    } catch (err){
       if (err.status === 403) {
        setMensaje({ tipo: "error", texto: "No tienes permiso para editar esta publicación." });
    } else if (err.status === 422) {
        setMensaje({ tipo: "error", texto: "Datos incorrectos. Revisa los campos." });
    } else if (err.status === 500){
      setMensaje({
        tipo: "error", 
        texto: "La IA está tardando demasiado. Inténtalo de nuevo en unos segundos."});
    }else {
        setMensaje({ tipo: "error", texto: err.message });
    }
    } finally {
      setGuardando(false);
    }
  };

  return {
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
    iniciarManual,
    guardarCambiosAnterior
  };
};

export default usePiezaDetalle;