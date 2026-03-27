import React from "react";
import LoginRegistroFormUI from "./LoginRegistroFormUI";
import useLoginRegistroForm from "../hooks/useLoginRegistroForm";

const LoginRegistro = () => {
  const {
    form,
    mensaje,
    modoRegistro,
    cargando,
    handleChange,
    handleSubmit,
    toggleModoRegistro
  } = useLoginRegistroForm();

  return (
    <LoginRegistroFormUI
      form={form}
      mensaje={mensaje}
      modoRegistro={modoRegistro}
      cargando={cargando}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onToggleModo={toggleModoRegistro}
    />
  );
};

export default LoginRegistro;
