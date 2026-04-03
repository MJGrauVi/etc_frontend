import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useContextoSesion from "./useContextoSesion.js";

const usePiezaDetalle = () => {
  const { id } = useParams();
  const { get, post } = useContextoSesion();

  const [pieza, setPieza] = useState(null);
  const [publicacion, setPublicacion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [generando, setGenerando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Carga el detalle de la pieza
  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await get(`pieza/${id}`);
        setPieza(respuesta.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [id]);

  // Genera la publicación con IA
  const generarPublicacion = async () => {
    setGenerando(true);
    setMensaje({ tipo: "", texto: "" });
    try {
      const respuesta = await post("publicacion/generar", { pieza_id: id });
      console.log("Respuesta IA:", respuesta)
      // Limpiamos el título de caracteres que manda la IA
      const pub = respuesta.data;
      console.log("Publicacion:", pub);
      pub.titulo = pub.titulo.replace(/[*:#]/g, "").trim();
      setPublicacion(pub);
      setMensaje({ tipo: "success", texto: "Publicación generada correctamente." });
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
    } finally {
      setGenerando(false);
    }
  };

  // Editar campos de la publicación
  const handleEditar = ({ target }) => {
    const { name, value } = target;
    setPublicacion(prev => ({ ...prev, [name]: value }));
  };

  // Guardar cambios editados
  const guardarCambios = async () => {
    setGuardando(true);
    try {
      const respuesta = await post(`publicacion/${publicacion.id}`, {
        titulo: publicacion.titulo,
        contenido: publicacion.contenido,
        hashtags: publicacion.hashtags,
        estado: publicacion.estado,
        _method: "PUT" // Laravel acepta PUT con _method
      });
      setPublicacion(respuesta.data);
      setMensaje({ tipo: "success", texto: "Cambios guardados correctamente." });
    } catch (err) {
      setMensaje({ tipo: "error", texto: err.message });
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
    generarPublicacion,
    handleEditar,
    guardarCambios,
  };
};

export default usePiezaDetalle;