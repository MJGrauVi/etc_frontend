export const fetchErroresRed = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      let errorData = null;

      try {
        errorData = await res.json();
      } catch {
        errorData = null;
      }
      //Objeto error
      const error = new Error(res.status === 401 ? "UNAUTHORIZED" : "HTTP_ERROR");
      error.status = res.status; //Añadimos el código HTTP  al error.
      error.data = errorData; //Guardo el JSON que devuelve el backend con el mensaje.
      error.backendMessage =
        errorData?.message ||
        errorData?.error ||
        errorData?.errors?.email?.[0] ||
        "";

      throw error;
    }

    return await res.json();
  } catch (error) {
    if (error.message === "UNAUTHORIZED" || error.message === "HTTP_ERROR") {
      throw error;
    }

    throw new Error("NETWORK_ERROR");
  }
};
