import { useEffect, useState } from "react";
import useDatos from "./useDatos.js";

// Consumo los servicios desde hooks y gestiono el estado de React.
const useAdminUsuarios = () => {
  const { get, put, cargando, error } = useDatos(true);
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await get("users");
        setUsuarios(respuesta.data);
      } catch {
        // useDatos ya conserva el error de la comunicacion.
      }
    };
    cargar();
  }, [get]);

  const cambiarRol = async (id, nuevoRol) => {
    try {
      await put(`admin/usuarios/${id}/rol`, { rol: nuevoRol });
      setUsuarios(prev =>
        prev.map(u => u.id === id ? { ...u, roles:[{name: nuevoRol }] } : u)
      );
    } catch {
      // useDatos ya conserva el error de la comunicacion.
    }
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    u.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return { usuariosFiltrados, cargando, error, filtro, setFiltro, cambiarRol };
};

export default useAdminUsuarios;
