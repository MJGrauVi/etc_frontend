import { useEffect, useState } from "react";
import useDatos from "./useDatos.js";

const useMisPiezas = () => {
  const { get, cargando, error } = useDatos(true);
  const [piezas, setPiezas] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await get("piezas");
        setPiezas(respuesta.data ?? []);
      } catch {
        // useDatos ya conserva el error de la comunicacion.
      }
    };
    cargar();
  }, [get]);

  const piezasFiltradas = piezas.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    (p.categoria && p.categoria.toLowerCase().includes(filtro.toLowerCase()))
  );

  return { piezasFiltradas, cargando, error, filtro, setFiltro };
};

export default useMisPiezas;
