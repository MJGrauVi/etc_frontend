import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginRegistroFormUI from "./LoginRegistroFormUI";
import useLoginRegistroForm from "../hooks/useLoginRegistroForm";
import Mensaje from "./Mensaje.jsx";

const LoginRegistro = () => {

  // Lee desde que enlace llega el usuario, prueba gratis .....
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
        modoRegistro={modoRegistro}
        cargando={cargando}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onToggleModo={toggleModoRegistro}
        onBlurEmail={validarEmailUnico}
        emailEnUso={emailEnUso}
      />
          <Mensaje
        tipo={mensaje?.tipo}
        texto={mensaje?.texto}
        onClose={() => setMensaje(null)}
      />
    </>
  );
};

export default LoginRegistro;
