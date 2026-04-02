import { createContext, useState, useEffect } from "react";
import { useApiAuth } from "../services/useApiAuth.js";
import { useApiCrud } from "../services/useApiCrud.js";

const ContextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  const { login, register, logout, me} = useApiAuth();
  const { get} = useApiCrud();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);

  // LOGIN
  const iniciarLogin = async (email, password) => {
    setCargando(true);
    try {
      const respuesta = await login(email, password);
      localStorage.setItem("token", respuesta.token); //Guardamos el token para que useApiCrud pueda usarlo.
      setUsuario(respuesta.data); // Ajusta según tu backend.
      return respuesta;
    } finally {
      setCargando(false);
    }
  };
  //Va directamente en el componente Admin.
  //Ya autenticado. Usa el token directamente.
  const cargarUsuarios = async () => {
    const usuarios = await get("admin/users"); //Envia Bearer Toke solo.
    return usuarios;
  };

  // REGISTRO
  const registrarUsuario = async (formData) => {
    setCargando(true);
    try {
      const respuesta = await register(formData);
      return respuesta;
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    const recuperarSesion = async () => {
      //Si el usuario refresca la página se pierde el estado aunque tengas token, con esto recuperamos sesion.
      const token = localStorage.getItem("token");
      if (!token) return;
      setCargando(true);
      try {
        const data = await me();
        setUsuario(data);
      } catch {
        //Token inválido o expirado.
        localStorage.removeItem("token");
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };
    recuperarSesion();
  }, []);

  // LOGOUT
  const cerrarSesion = async () => {
    await logout();
    localStorage.removeItem("token"); //Eliminamos el token al cerrar sesión.
    setUsuario(null);
  };

  return (
    <ContextoSesion.Provider
      value={{
        usuario,
    cargando,
    iniciarLogin,
    registrarUsuario,
    cerrarSesion,
    get
        
      }}
    >
      {children}
    </ContextoSesion.Provider>
  );
};

export default ProveedorSesion;
export {ContextoSesion} ;
