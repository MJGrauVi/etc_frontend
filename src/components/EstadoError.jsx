import React from 'react';
const EstadoError = ({ mensaje = "No se pudo cargar la información." }) => {
  return (
    <section className="fixed inset-0 flex items-center justify-center p-6 overflow-hidden pointer-events-none z-999">
      <div className="max-w-4xl mx-auto alerta-base alerta-error pointer-events-auto">
        <p className="text-2xl font-bold tracking-tight">{mensaje}</p>
      </div>
    </section>
  );
};

export default EstadoError;
