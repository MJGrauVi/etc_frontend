const EstadoError = ({ mensaje = "No se pudo cargar la información." }) => {
  return (
    <section className="px-6 py-10">
      <div className="max-w-4xl mx-auto alerta-base alerta-error">
        Error: {mensaje}
      </div>
    </section>
  );
};

export default EstadoError;
