import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";

const useLoginRegistroForm = () => {
  const { iniciarLogin, registrarUsuario, cargando } = useContextoSesion();
  const navegar = useNavigate();

  // Estado inicial del formulario.
  const estadoInicial = {
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [form, setForm] = useState(estadoInicial);
  const [modoRegistro, setModoRegistro] = useState(false); //Empieza en login.
  const [mensaje, setMensaje] = useState(null);

  // Delegación de eventos: un solo handler para todos los inputs
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Mostrar mensaje temporal
  const mostrarMensaje = (tipo, texto, tiempo = 2000) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), tiempo);
  };

  // Cambiar entre login y registro
  const toggleModoRegistro = () => {
    setModoRegistro((prev) => !prev);
    setForm(estadoInicial);
    setMensaje(null);
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje(null);

    try {
      if (modoRegistro) {
        // REGISTRO
        await registrarUsuario(form);
        mostrarMensaje("success", "¡Cuenta creada! Revisa tu correo para verificarla.", 2500);
        setForm(estadoInicial);
        setTimeout(() => navegar("/"), 2500);
      } else {
        // LOGIN
        const data = await iniciarLogin(form.email, form.password);
        console.log("Respuesta login:", data); //
        mostrarMensaje("success", "¡Has iniciado sesión!", 1500);
        setForm(estadoInicial);
        setTimeout(() => {
          if (data?.data?.rol === "Administrador") {
            navegar("/admin/usuarios");
          } else {
            navegar("/");
          }
        }, 1500);
      }
    } catch (err) {
      if (err.message === "NETWORK_ERROR") {
        mostrarMensaje("error", "Servidor no disponible");
      } else if (err.message === "UNAUTHORIZED") {
        mostrarMensaje("error", "Credenciales incorrectas");
      } else {
        mostrarMensaje("error", "Error inesperado");
      }
    }
  };

  return {
    form,
    mensaje,
    modoRegistro,
    setModoRegistro,
    cargando,
    handleChange,
    handleSubmit,
    toggleModoRegistro,
    setMensaje
  };
};

export default useLoginRegistroForm;
