import React from "react";

const LoginRegistroFormUI = ({
  form,
  modoRegistro,
  cargando,
  onChange,
  onSubmit,
  onToggleModo,
  onBlurEmail,
  emailEnUso
}) => {
  return (
    <form
      className="w-full max-w-md p-8 mx-auto bg-white border border-gray-200 shadow-sm"
      onSubmit={onSubmit}
    >
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        {modoRegistro ? "Crea tu cuenta" : "Inicia sesión"}
      </h2>

      {/* EMAIL */}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="labelClass"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          // --- CLAVE: Disparar validación al salir del campo ---
          onBlur={() => onBlurEmail(form.email)}
          required
          className="inputClass ${emailEnUso ? 'border-red-500 focus:ring-red-500' : ''}"
        />
      </div>

      {/* PASSWORD */}
      <div className="mb-4">
        <label
          htmlFor="password"
          className="labelClass"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          required
          className="inputClass"
        />
      </div>

      {/* CAMPOS SOLO PARA REGISTRO */}
      {modoRegistro && (
        <>
          <div className="mb-4">
            <label
              htmlFor="password_confirmation"
              className="labelClass"
            >
              Repite la contraseña
            </label>
            <input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={form.password_confirmation}
              onChange={onChange}
              required
              className="inputClass"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="nombre"
              className="labelClass"
            >
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={onChange}
              required
              className="inputClass"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="direccion"
              className="labelClass"
            >
              Dirección{" "}
              <span className="font-normal text-gray-400">(opcional)</span>
            </label>
            <input
              id="direccion"
              type="text"
              name="direccion"
              value={form.direccion}
              onChange={onChange}
              className="inputClass"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="telefono"
              className="labelClass"
            >
              Teléfono{" "}
              <span className="font-normal text-gray-400">(opcional)</span>
            </label>
            <input
              id="telefono"
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={onChange}
              className="inputClass"
            />
          </div>
        </>
      )}

      {/* BOTONES */}
      <div className="flex flex-col gap-3 mt-6">
        <button
          type="submit"
          disabled={cargando || (modoRegistro && emailEnUso)}
          className="w-full px-6 py-3 font-semibold text-white transition bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {cargando
            ? "Cargando..."
            : modoRegistro
              ? "Registrarme"
              : "Iniciar sesión"}
        </button>

        <button
          type="button"
          disabled={cargando}
          onClick={onToggleModo}
          className="w-full px-6 py-3 font-semibold text-orange-600 transition border border-orange-300 hover:bg-orange-50 disabled:opacity-50"
        >
          {modoRegistro ? (
            <>
              <span className="font-normal text-gray-500">
                ¿Ya tienes cuenta?
              </span>{" "}
              Entra aquí
            </>
          ) : (
            <>
              <span className="font-normal text-gray-500">
                ¿No tienes cuenta?
              </span>{" "}
              Regístrate
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginRegistroFormUI;
