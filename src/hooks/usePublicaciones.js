import { useEffect, useMemo, useState } from "react";
import useDatos from "./useDatos.js";

const normalizar = (valor) => String(valor ?? "").toLowerCase().trim();

const usePublicaciones = () => {
  const { get, cargando, error: errorCarga } = useDatos(true);
  const { remove, error: errorEliminar } = useDatos();
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [estado, setEstado] = useState("todas");
  const [eliminandoId, setEliminandoId] = useState(null);

  useEffect(() => {
    const cargarPublicaciones = async () => {
      try {
        const respuesta = await get("publicaciones");//Cargamos todas las publicaciones del usuario.
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

  const error = errorCarga || errorEliminar;

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
  };
};

export default usePublicaciones;
