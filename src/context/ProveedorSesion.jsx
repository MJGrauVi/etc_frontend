import { createContext, useState } from "react";
import { useApiAuth } from "../services/useApiAuth.js";

const ContextoSesion = createContext();

const ProveedorSesion = ({ children }) => {
  const { login, register, logout } = useApiAuth();

  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);

  // LOGIN
  const iniciarLogin = async (email, password) => {
    setCargando(true);
    try {
      const data = await login(email, password);
      setUsuario(data.usuario); // Ajusta según tu backend
      return data;
    } finally {
      setCargando(false);
    }
  };

  // REGISTRO
  const registrarUsuario = async (formData) => {
    setCargando(true);
    try {
      const data = await register(formData);
      return data;
    } finally {
      setCargando(false);
    }
  };

  // LOGOUT
  const cerrarSesion = async () => {
    await logout();
    setUsuario(null);
  };

  return (
    <ContextoSesion.Provider
      value={{
        usuario,
        cargando,
        iniciarLogin,
        registrarUsuario,
        cerrarSesion
      }}
    >
      {children}
    </ContextoSesion.Provider>
  );
};

export default ProveedorSesion;
export {ContextoSesion};
