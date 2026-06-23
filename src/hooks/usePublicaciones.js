import { useEffect, useMemo, useState } from "react";
import useDatos from "./useDatos.js";

const normalizar = (valor) => String(valor ?? "").toLowerCase().trim();

const construirMensajeFacebook = (publicacion) =>
  [publicacion.titulo, publicacion.contenido, publicacion.hashtags]
    .filter(Boolean)
    .join("\n\n");

const mensajeConfirmacionDemo = (pageName) =>
  `No tienes una pagina de Facebook configurada.\n\nSi continuas, esta publicacion se publicara usando la pagina demo${pageName ? ` (${pageName})` : ""}. Para publicar en tu propia pagina, configura primero tu pagina de Facebook en tu perfil.\n\n¿Quieres continuar usando la pagina demo?`;

const usePublicaciones = () => {
  const { get, cargando, error: errorCarga } = useDatos(true);
  const { get: getFacebook, remove, post } = useDatos();
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [estado, setEstado] = useState("todas");
  const [eliminandoId, setEliminandoId] = useState(null);
  const [publicandoId, setPublicandoId] = useState(null);
  const [confirmacionDemoFacebook, setConfirmacionDemoFacebook] = useState(null);
  const [mensajePublicacion, setMensajePublicacion] = useState(null);

  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const respuesta = await get("publicaciones");
        setPublicaciones(respuesta.data ?? respuesta ?? []);
      } catch {
        // useDatos ya conserva el error de la comunicacion.
      }
    };

    cargarPublicaciones();
  }, [get]);

  const publicacionesFiltradas = useMemo(() => {
    const texto = normalizar(filtro);

    return publicaciones.filter((publicacion) => {
      const pieza = publicacion.pieza ?? publicacion.piezas;
      const coincideEstado = estado === "todas" || publicacion.estado === estado;
      const coincideTexto =
        !texto ||
        normalizar(publicacion.titulo).includes(texto) ||
        normalizar(publicacion.contenido).includes(texto) ||
        normalizar(publicacion.hashtags).includes(texto) ||
        normalizar(pieza?.nombre).includes(texto);

      return coincideEstado && coincideTexto;
    });
  }, [estado, filtro, publicaciones]);

  const resumenEstados = useMemo(
    () =>
      publicaciones.reduce(
        (resumen, publicacion) => ({
          ...resumen,
          [publicacion.estado]: (resumen[publicacion.estado] ?? 0) + 1,
        }),
        { todas: publicaciones.length },
      ),
    [publicaciones],
  );

  const eliminarPublicacion = async (id) => {
    setEliminandoId(id);

    try {
      await remove(`publicacion/${id}`);
      setPublicaciones((previas) =>
        previas.filter((publicacion) => publicacion.id !== id),
      );
    } finally {
      setEliminandoId(null);
    }
  };

  const publicarConfirmadoEnFacebook = async (publicacion, { demoConfirmada = false } = {}) => {
    const mensajeFacebook = construirMensajeFacebook(publicacion);

    setPublicandoId(publicacion.id);
    setMensajePublicacion(null);

    try {
      if (!demoConfirmada) {
        const destinoRespuesta = await getFacebook(`publicacion/${publicacion.id}/facebook/destination`);
        const destino = destinoRespuesta.data?.data ?? destinoRespuesta.data;

        if (destino?.requires_confirmation) {
          setConfirmacionDemoFacebook({
            publicacion,
            titulo: "Usar pagina demo de Facebook",
            mensaje: mensajeConfirmacionDemo(destino.page_name),
          });
          return false;
        }
      }

      const respuesta = await post(`publicacion/${publicacion.id}/facebook`, {
        mensaje: mensajeFacebook,
        ...(demoConfirmada && { confirm_demo: true }),
      });
      const publicacionActualizada = respuesta.data?.data ?? respuesta.data;
      const warning = respuesta.data?.warning;

      setPublicaciones((previas) =>
        previas.map((item) =>
          item.id === publicacionActualizada.id ? publicacionActualizada : item,
        ),
      );

      setMensajePublicacion({
        tipo: "success",
        texto: warning
          ? `Publicacion publicada en Facebook correctamente. ${warning}`
          : "Publicacion publicada en Facebook correctamente.",
      });
      return true;
    } catch (err) {
      if (err.status === 409 && err.data?.requires_demo_confirmation) {
        setConfirmacionDemoFacebook({
          publicacion,
          titulo: "Usar pagina demo de Facebook",
          mensaje: mensajeConfirmacionDemo(err.data?.destination?.page_name),
        });
        return false;
      }

      setMensajePublicacion({
        tipo: "error",
        texto: err.data?.error || err.backendMessage || err.message || "No se pudo publicar en Facebook.",
      });
      return false;
    } finally {
      setPublicandoId(null);
    }
  };

  const publicarEnFacebook = async (publicacion) => {
    if (publicacion.estado !== "pendiente") {
      setMensajePublicacion({
        tipo: "error",
        texto: "Cambia la publicación a Lista para publicar antes de publicarla.",
      });
      return false;
    }

    return publicarConfirmadoEnFacebook(publicacion);
  };

  const confirmarPublicacionDemoFacebook = async () => {
    if (!confirmacionDemoFacebook) return false;

    const publicacion = confirmacionDemoFacebook.publicacion;
    setConfirmacionDemoFacebook(null);
    return publicarConfirmadoEnFacebook(publicacion, { demoConfirmada: true });
  };

  const cancelarPublicacionDemoFacebook = () => {
    setConfirmacionDemoFacebook(null);
  };

  const error = errorCarga;

  return {
    publicacionesFiltradas,
    resumenEstados,
    cargando,
    error,
    filtro,
    setFiltro,
    estado,
    setEstado,
    eliminandoId,
    eliminarPublicacion,
    publicandoId,
    publicarEnFacebook,
    confirmacionDemoFacebook,
    confirmarPublicacionDemoFacebook,
    cancelarPublicacionDemoFacebook,
    mensajePublicacion,
    setMensajePublicacion,
  };
};

export default usePublicaciones;
