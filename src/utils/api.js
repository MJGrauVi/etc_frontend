
export const fetchErroresRed = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);

// Propaga el status para que los hooks puedan distinguir 403, 422, 429...
//
if (!res.ok) {
    const error = new Error("HTTP_ERROR");
    //Al añadir .status permite añadir lógica condicinal dependiendo del error.
    //si 401 redirige a Login, si 404 muestra mensaje 'No encontrado?..
    error.status = res.status; 
    error.statusText = res.statusText;
    throw error;
    
}

    return await res.json();
    
  } catch (error) {
    if (error.message === "HTTP_ERROR") {
      throw error;
    }
    throw new Error("NETWORK_ERROR");//Solo errores reales de red.
  }
};
