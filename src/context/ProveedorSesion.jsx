import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService.js";
import { crudService } from "../services/crudService.js";

const ContextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  // Uso el objeto de servicios directamente, sin invocarlo como función.
  // Mantengo variables cortas desestructurando el servicio.
  const { get, post, put, remove, postForm } = crudService;

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true); // Empiezo en true para evitar parpadeos de UI.

  // Gestiono el login
  const iniciarLogin = async (email, password) => {
    setCargando(true);
    try {
      // Uso authService.login directamente.
      const respuesta = await authService.login(email, password);
      
      // Guardo el token para que apiClient lo lea en la próxima petición.
      localStorage.setItem("token", respuesta.token); 
      
      // Pido los datos actualizados del usuario tras el login.
      const datosUser = await authService.me();
      setUsuario(datosUser.data || datosUser); 
      
      return respuesta;
    } finally {
      setCargando(false);
    }
  };

  // Gestiono el registro
  const registrarUsuario = async (userData) => {
    setCargando(true);
    try {
      return await authService.register(userData);
    } finally {
      setCargando(false);
    }
  };
  const comprobarDisponibilidadEmail = async (email) => {
  try {
    const respuesta = await authService.checkEmail(email);
    return respuesta.exists; // Leo la respuesta del backend: { exists: true/false }.
  } catch (error) {
    console.error("Error al validar email", error);
    return false; 
  }
};

  useEffect(() => {
    const recuperarSesion = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setCargando(false);
        return;
      }
      try {
        const respuesta = await authService.me();
        setUsuario(respuesta.data || respuesta);
      } catch {
        localStorage.removeItem("token");
        setUsuario(null);
      } finally {
        setCargando(false);
      }
    };
    recuperarSesion();
  }, []);

  // Gestiono el logout
  const cerrarSesion = async () => {
    try {
      await authService.logout();
    } finally {
      // Limpio la sesión local aunque falle la petición al servidor.
      localStorage.removeItem("token");
      setUsuario(null);
    }
  };

  return (
    <ContextoSesion.Provider
      value={{
        usuario,
        cargando,
        iniciarLogin,
        registrarUsuario,
        cerrarSesion,
        get,
        post,
        put,
        remove,
        postForm,
        comprobarDisponibilidadEmail
      }}
    >
      {children}
    </ContextoSesion.Provider>
  );
};

export default ProveedorSesion;
export { ContextoSesion };