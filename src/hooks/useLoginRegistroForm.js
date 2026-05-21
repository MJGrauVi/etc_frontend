import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useContextoSesion from "../hooks/useContextoSesion.js";

const esErrorEmailSinVerificar = (err) => {
  const textoBackend = `${err.backendMessage || ""} ${err.data?.message || ""}`.toLowerCase();
  const hablaDeEmail =
    textoBackend.includes("email") || textoBackend.includes("correo");
  const hablaDeVerificacion =
    textoBackend.includes("verific") ||
    textoBackend.includes("verify") ||
    textoBackend.includes("verified");

  if (err.status === 403 && !textoBackend) {
    return true;
  }

  return (
    [401, 403, 409, 422].includes(err.status) &&
    hablaDeEmail &&
    hablaDeVerificacion
  );
};

const esErrorCredencialesInvalidas = (err, modoRegistro) => {
  if (modoRegistro) return false;

  return err.message === "UNAUTHORIZED" || [400, 401, 422].includes(err.status);
};

const useLoginRegistroForm = () => {
  const {
    iniciarLogin,
    registrarUsuario,
    cargando,
    comprobarDisponibilidadEmail,
  } = useContextoSesion();
  const navegar = useNavigate();

  const estadoInicial = {
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    password_confirmation: "",
  };

  const [form, setForm] = useState(estadoInicial);
  const [modoRegistro, setModoRegistro] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [emailEnUso, setEmailEnUso] = useState(true);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const mostrarMensaje = (tipo, texto, tiempo = 2000) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje(null), tiempo);
  };

  const toggleModoRegistro = () => {
    setModoRegistro((prev) => !prev);
    setForm(estadoInicial);
    setMensaje(null);
  };

  const validarEmailUnico = async (email) => {
    if (!email || !modoRegistro) return;

    try {
      const existe = await comprobarDisponibilidadEmail(email);
      if (existe) {
        setEmailEnUso(true);
        mostrarMensaje("error", "Este email ya esta registrado.");
      } else {
        setEmailEnUso(false);
      }
    } catch (err) {
      console.error("Error validando email", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modoRegistro && emailEnUso) {
      mostrarMensaje("error", "Corrige el email antes de continuar");
      return;
    }
    setMensaje(null);

    try {
      if (modoRegistro) {
        await registrarUsuario(form);
        mostrarMensaje(
          "success",
          "Cuenta creada. Revisa tu correo para verificarla.",
          2500,
        );
        setForm(estadoInicial);
        setTimeout(() => navegar("/"), 2500);
      } else {
        const data = await iniciarLogin(form.email, form.password);
        console.log("Respuesta login:", data);
        // Puedo mostrar un mensaje de éxito al iniciar sesión.
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
      console.log("ERROR REAL:", err);
      if (err.message === "NETWORK_ERROR") {
        mostrarMensaje(
          "error",
          "Servidor no disponible.\n Disculpe las molestias.",
        );
      } else if (esErrorEmailSinVerificar(err)) {
        mostrarMensaje(
          "error",
          "Tu cuenta todavia no esta verificada. Revisa tu correo y confirma el email antes de iniciar sesion.",
          4500,
        );
        setForm(estadoInicial);
      } else if (esErrorCredencialesInvalidas(err, modoRegistro)) {
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
    setMensaje,
    emailEnUso,
    validarEmailUnico,
  };
};

export default useLoginRegistroForm;
