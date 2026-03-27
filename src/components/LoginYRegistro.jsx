import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Mensaje from "./Mensaje.jsx";
import useContextoSesion from "../hooks/useContextoSesion.js";

const LoginYRegistro = () => {
  const { iniciarLogin, registrarUsuario, cargando } = useContextoSesion();

  const [modoRegistro, setModoRegistro] = useState(true);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const navegar = useNavigate();

  const estadoInicial = {
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    password_confirmation: ""
  };

  const [form, setForm] = useState(estadoInicial);
 //Desestructuro el evento.
const handleChange = ({ target }) => {
  const { name, value } = target;

  setForm(prev => ({
    ...prev,
    [name]: value,
  }));
};

  const mostrarMensaje = (tipo, texto, tiempo = 2000) => {
    setMensaje({ tipo, texto });
    setTimeout(() => setMensaje({ tipo: "", texto: "" }), tiempo);
  };

  const submitFormulario = async (e) => {
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

  return (
    <form className="form-login-registro" onSubmit={submitFormulario} onChange={handleChange}>
      <h2>{modoRegistro ? "Crea tu cuenta" : "Inicia sesión"}</h2>

      <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />

      {/* EMAIL */}
      <div className="campo-formulario">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          required
        />
      </div>

      {/* PASSWORD */}
      <div className="campo-formulario">
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          required
        />
      </div>

      {/* CAMPOS SOLO PARA REGISTRO */}
      {modoRegistro && (
        <>
          <div className="campo-formulario">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              required
            />
          </div>

          <div className="campo-formulario">
            <label>Dirección (opcional)</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
            />
          </div>

          <div className="campo-formulario">
            <label>Teléfono (opcional)</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
            />
          </div>

          <div className="campo-formulario">
            <label>Repite la contraseña</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              required
            />
          </div>
        </>
      )}

      <div className="botones">
        <button type="submit" disabled={cargando}>
          {modoRegistro ? "Registrarme" : "Iniciar Sesión"}
        </button>

        <button
          type="button"
          className="boton-alternativo"
          disabled={cargando}
          onClick={() => {
            setModoRegistro(!modoRegistro);
            setForm(estadoInicial);
            setMensaje("");
          }}
        >
          {modoRegistro ? (
            <>
              <span className="cuenta">¿Ya tienes cuenta?</span> Entra aquí
            </>
          ) : (
            <>
              <span className="cuenta">¿No tienes cuenta?</span> Regístrate
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginYRegistro;
