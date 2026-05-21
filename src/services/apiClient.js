import {fetchErroresRed} from "../utils/api.js";

// Centralizo la configuración común de todas 
// las peticiones: URL base, token de autenticación y cabeceras HTTP.


const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8095/api";

const request = async (endpoint, options = {})=>{
    const token = localStorage.getItem("token");

    const headers = {
        "Accept": "application/json",
        ...(token && {"Authorization": `Bearer ${token}`}),// Inyecto dinámicamente el token.
        ...(!options.isFormData && {"Content-Type": "application/json"}),
        ...options.headers,
    };
    // Si uso FormData, dejo que el navegador gestione el Content-Type.
    if(options.isFormData) delete headers["Content-Type"];
    

    return fetchErroresRed(`${API_URL}/${endpoint}`,{...options, headers});
};
export default request;