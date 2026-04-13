import { createContext, useState, useEffect } from "react";
import { authService } from "../services/authService.js";
import { crudService } from "../services/crudService.js";

const ContextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  // CAMBIO 1: Ya no invocamos con (), usamos el objeto directamente
  // Si quieres mantener las variables cortas, puedes hacer esto:
  const { get, post, put, remove, postForm } = crudService;

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true); // Empezamos en true para evitar parpadeos de UI.

  // LOGIN
  const iniciarLogin = async (email, password) => {
    setCargando(true);
    try {
      // CAMBIO 2: Usar authService.login directamente
      const respuesta = await authService.login(email, password);
      
      // Guardamos el token. El apiClient lo leerá automáticamente en la próxima petición
      localStorage.setItem("token", respuesta.token); 
      
      // CAMBIO 3: Pedir los datos frescos del usuario tras el login
      const datosUser = await authService.me();
      setUsuario(datosUser.data || datosUser); 
      
      return respuesta;
    } finally {
      setCargando(false);
    }
  };

  // REGISTRO
  const registrarUsuario = async (userData) => {
    setCargando(true);
    try {
      return await authService.register(userData);
    } finally {
      setCargando(false);
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

  // LOGOUT
  const cerrarSesion = async () => {
    try {
      await authService.logout();
    } finally {
      // Siempre limpiamos localmente, falle o no la petición al servidor
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
      }}
    >
      {children}
    </ContextoSesion.Provider>
  );
};

export default ProveedorSesion;
export { ContextoSesion };