import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoginRegistroFormUI from "./LoginRegistroFormUI";
import useLoginRegistroForm from "../hooks/useLoginRegistroForm";
import MensajeTail from "./MensajeTail.jsx";

const LoginRegistro = () => {

  //Mostar form registro si viene de Prueba Gratis.
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
    setModoRegistro
  } = useLoginRegistroForm();

  //Mostar form registro si viene de "Prueba Gratis" .
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
