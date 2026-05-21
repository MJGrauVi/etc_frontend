import "./Cargando.css";
// Muestro un indicador mientras se cargan los datos.
const Cargando = () => {
  return (
    <div className="contenedor-cargando">
      <div className="spinner"></div>
      <p>Cargando ...</p>
    </div>
  );
};

export default Cargando;