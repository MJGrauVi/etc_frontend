import { useEffect, useState } from "react";
import useContextoSesion from "./useContextoSesion.js";

const useAdminUsuarios = () => {
  const { get, put } = useContextoSesion();
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await get("users");
        setUsuarios(respuesta.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  const cambiarRol = async (id, nuevoRol) => {
    try {
      await put(`admin/usuarios/${id}/rol`, { rol: nuevoRol });
      setUsuarios(prev =>
        prev.map(u => u.id === id ? { ...u, rol: nuevoRol } : u)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const usuariosFiltrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    u.email.toLowerCase().includes(filtro.toLowerCase())
  );

  return { usuariosFiltrados, cargando, error, filtro, setFiltro, cambiarRol };
};

export default useAdminUsuarios;