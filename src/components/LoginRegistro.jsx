import React from "react";
import LoginRegistroFormUI from "./LoginRegistroFormUI";
import useLoginRegistroForm from "../hooks/useLoginRegistroForm";
import MensajeTail from "./MensajeTail.jsx";

const LoginRegistro = () => {
  const {
    form,
    mensaje,
    modoRegistro,
    cargando,
    handleChange,
    handleSubmit,
    toggleModoRegistro,
    setMensaje
  } = useLoginRegistroForm();

  return (
    <>
      <MensajeTail
        tipo={mensaje?.tipo}
        texto={mensaje?.texto}
        onClose={() => setMensaje(null)}
      />
      <LoginRegistroFormUI
        form={form}
        mensaje={mensaje}
        modoRegistro={modoRegistro}
        cargando={cargando}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleModo={toggleModoRegistro}
      />
    </>
  );
};

export default LoginRegistro;
