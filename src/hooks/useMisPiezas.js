import { useEffect, useState } from "react";
import useContextoSesion from "./useContextoSesion.js";

const useMisPiezas = () => {
  const { get } = useContextoSesion();
  const [piezas, setPiezas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await get("piezas");
        setPiezas(respuesta.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const piezasFiltradas = piezas.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    (p.categoria && p.categoria.toLowerCase().includes(filtro.toLowerCase()))
  );

  return { piezasFiltradas, cargando, error, filtro, setFiltro };
};

export default useMisPiezas;