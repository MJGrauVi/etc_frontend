export const fetchErroresRed = async (url, options = {}) => {
  
  //Normaliza errores.
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      let error;

      if (res.status === 401) {
        error = new Error("UNAUTHORIZED");
      } else {
        error = new Error("HTTP_ERROR");
      }

      error.status = res.status;
      throw error;
    }

    return await res.json();

  } catch (error) {

    //Si es un error HTTP que yo mismo generé arriba, lo dejo pasar
    if (
      error.message === "UNAUTHORIZED" ||
      error.message === "HTTP_ERROR"
    ) {
      throw error;
    }

    // Si no es de los nuestros, entonces sí es un error real de red
    throw new Error("NETWORK_ERROR");
  }
};
