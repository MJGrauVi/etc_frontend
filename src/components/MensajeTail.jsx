import { useEffect } from "react";

const estilosPorTipo = {
  info: "alerta-info",
  error: "alerta-error",
  success: "alerta-success",
};

const MensajeTail = ({ tipo = "info", texto, onClose, autoClose = true }) => {
  useEffect(() => {
    if (autoClose && texto) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose, texto]);

  if (!texto) return null;

  const claseTipo = estilosPorTipo[tipo] || estilosPorTipo.info;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 overflow-hidden pointer-events-none z-999 ">
      <div className={`alerta-base ${claseTipo} pointer-events-auto`}>
        <p className="text-2xl font-bold tracking-tight">{texto}</p>
      </div>
    </div>
  );
};

export default MensajeTail;
