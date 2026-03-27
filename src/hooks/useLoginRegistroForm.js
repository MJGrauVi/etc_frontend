import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";

const useLoginRegistroForm = () => {
  const { iniciarLogin, registrarUsuario, cargando } = useContextoSesion();
  const navegar = useNavigate();

  // Estado inicial del formulario
  const estadoInicial = {
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  const [form, setForm] = useState(estadoInicial);
  const [modoRegistro, setModoRegistro] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });

  // Delegación de eventos: un solo handler para todos los inputs
  const handleChange = ({ target }) => {
    const { name, value } = target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Mostrar mensaje temporal
  const mostrarMensaje = (tipo, texto, tiempo = 2000) => {
    setMensaje({ tipo, texto });

    setTimeout(() => {
      setMensaje({ tipo: "", texto: "" });
    }, tiempo);
  };

  // Cambiar entre login y registro
  const toggleModoRegistro = () => {
    setModoRegistro(prev => !prev);
    setForm(estadoInicial);
    setMensaje({ tipo: "", texto: "" });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: "", texto: "" });

    try {
      if (modoRegistro) {
        // REGISTRO
        await registrarUsuario(form);

        mostrarMensaje("success", "¡Cuenta creada! Revisa tu correo para verificarla.", 2500);
        setForm(estadoInicial);

        setTimeout(() => navegar("/"), 2500);
      } else {
        // LOGIN
        await iniciarLogin(form.email, form.password);

        mostrarMensaje("success", "¡Has iniciado sesión!", 2000);
        setForm(estadoInicial);

        setTimeout(() => navegar("/"), 2000);
      }
    } catch (err) {
      mostrarMensaje("error", err.message || "Error al conectar con el servidor.");
    }
  };

  return {
    form,
    mensaje,
    modoRegistro,
    cargando,
    handleChange,
    handleSubmit,
    toggleModoRegistro
  };
};

export default useLoginRegistroForm;
