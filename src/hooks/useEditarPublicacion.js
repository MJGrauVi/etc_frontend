import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDatos from "./useDatos.js";

const useEditarPublicacion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { get, cargando } = useDatos(true);
  const { put, post } = useDatos();

  const [publicacion, setPublicacion] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [publicandoFacebook, setPublicandoFacebook] = useState(false);
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

  const publicarEnFacebook = async (datosPublicacion = {}) => {
    if (!publicacion?.id) {
      setMensaje({
        tipo: "error",
        texto: "Guarda la publicacion antes de publicarla en Facebook.",
      });
      return;
    }

    setPublicandoFacebook(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      const respuesta = await post(`publicacion/${publicacion.id}/facebook`, datosPublicacion);
      const publicacionActualizada = respuesta.data?.data ?? respuesta.data;
      setPublicacion(publicacionActualizada);
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

  const volverAlPanel = () => navigate("/publicaciones");

  return {
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
    volverAlPanel,
  };
};

export default useEditarPublicacion;
