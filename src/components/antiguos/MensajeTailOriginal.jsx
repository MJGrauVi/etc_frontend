import { useEffect } from "react";

const estilos = {
  info: "bg-blue-100 text-blue-800 text-xl py-50",
  error: "bg-red-100 text-red-800 text-xl py-50",
  success: "bg-green-100 text-green-800 text-xl py-50"
};

const MensajeTailOriginal = ({ tipo = "info", texto, onClose, autoClose = true }) => {

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, 5000);
      return () => clearTimeout(timer);//Evita errores de momoria si el componente se desmonta antes de que pasen los 5 segundos.
    }
  }, [autoClose, onClose]);

  if (!texto) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* fondo oscuro-bloquea visualmente el resto de la aplicación */}
     {/*  <div className="absolute inset-0 bg-black opacity-30"></div> */}

      {/* caja mensaje */}
      <div className={`relative z-10 px-20 py-4 shadow-lg
        w-80 text-center
        ${estilos[tipo]}
      `}>
        
        {/* <button
          onClick={onClose}
          className="absolute text-sm font-bold cursor-pointer top-2 right-2"
        >
          ✕
        </button> */}

        <p>{texto}</p>
      </div>
    </div>
  );
};

export default MensajeTailOriginal;