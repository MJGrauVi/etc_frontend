import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginRegistroFormUI from "./LoginRegistroFormUI";
import useLoginRegistroForm from "../hooks/useLoginRegistroForm";
import MensajeTail from "./MensajeTail.jsx";

const LoginRegistro = () => {

  // Muestro el formulario de registro si llega desde Prueba Gratis.
  const location = useLocation();
  const mostrarRegistro = location.state?.mostrarRegistro;
  
  const {
    form,
    mensaje,
    modoRegistro,
    cargando,
    handleChange,
    handleSubmit,
    toggleModoRegistro,
    setMensaje,
    setModoRegistro,
    emailEnUso,
    validarEmailUnico
  } = useLoginRegistroForm();

  // Muestro el formulario de registro si llega desde "Prueba Gratis".
  useEffect(()=>{
    if(mostrarRegistro){
      setModoRegistro(true);
    }
  },[mostrarRegistro, setModoRegistro])

  return (
    <>
  
      <LoginRegistroFormUI
        form={form}
        mensaje={mensaje}
        modoRegistro={modoRegistro}
        cargando={cargando}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleModo={toggleModoRegistro}
        onBlurEmail={validarEmailUnico}
        emailEnUso={emailEnUso}
      />
          <MensajeTail
        tipo={mensaje?.tipo}
        texto={mensaje?.texto}
        onClose={() => setMensaje(null)}
      />
    </>
  );
};

export default LoginRegistro;
