export const obtenerMensajeError = (error) => {
  if (error?.message === "NETWORK_ERROR") {
    return "Servidor no disponible. Disculpe las molestias.";
  }

  if (error?.message === "UNAUTHORIZED") {
    return "La sesión ha caducado. Inicia sesión de nuevo.";
  }

  if (error?.backendMessage) {
    return error.backendMessage;
  }

  if (error?.data?.message) {
    return error.data.message;
  }

  return "No se pudo completar la operación.";
};
