import React from "react";
import Mensaje from "./Mensaje.jsx";
import "./LoginForm.css";

const LoginRegistroFormUI = ({
  form,
  modoRegistro,
  mensaje,
  cargando,
  onChange,
  onSubmit,
  onToggleModo
}) => {
  return (
    <form
      className="form-login-registro"
      onSubmit={onSubmit}
    >
      <h2>{modoRegistro ? "Crea tu cuenta" : "Inicia sesión"}</h2>

      <Mensaje tipo={mensaje.tipo} texto={mensaje.texto} />

      {/* EMAIL */}
      <div className="campo-formulario">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
        />
      </div>

      {/* PASSWORD */}
      <div className="campo-formulario">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          required
        />
      </div>

      {/* CAMPOS SOLO PARA REGISTRO */}
      {modoRegistro && (
        <>
          <div className="campo-formulario">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="direccion">Dirección (opcional)</label>
            <input
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={onChange}
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="telefono">Teléfono (opcional)</label>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={onChange}
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="password_confirmation">Repite la contraseña</label>
            <input
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={onChange}
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
          onClick={onToggleModo}
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

export default LoginRegistroFormUI;
