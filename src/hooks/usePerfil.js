import { useState, useEffect } from "react";
import useContextoSesion from "./useContextoSesion.js";

const usePerfil = () => {
  const { get, usuario } = useContextoSesion();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const respuesta = await get("perfil");
        setPerfil(respuesta.data);
      } catch {
        setPerfil(null);
      }
    };
    cargar();
  }, [get]);

  // Construyo la URL completa del logo.
  const logoUrl = perfil?.logo
    ? `${import.meta.env.VITE_API_URL.replace('/api', '')}/storage/${perfil.logo}`
    : null;

  return {
    perfil,
    logoUrl,
    nombre: usuario?.nombre ?? "",
    movil: perfil?.movil ?? "",
    web: perfil?.web ?? "",
  };
};

export default usePerfil;