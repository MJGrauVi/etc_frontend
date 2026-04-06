/* const getHeaders = (includeBody = false) => {
    const headers = {
        'Accept': 'application/json'
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (includeBody) headers['Content-Type'] = 'application/json';

    return headers;
};
export default getHeaders; */

//Ejecuta la petición http, interpreta la respuesta y maneja errores de red.
//Captura backen apagado, CORS Y FALLO DE CONEXIÓN.
export const fetchErroresRed = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      if (res.status === 401) throw new Error("UNAUTHORIZED");
      throw new Error("HTTP_ERROR");
    }

    return await res.json();
    
  } catch (error) {
    if (error.message === "UNAUTHORIZED" || error.message === "HTTP_ERROR") {
      throw error;
    }
    throw new Error("NETWORK_ERROR");
  }
};
