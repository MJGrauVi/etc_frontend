import {fetchErroresRed} from "../utils/api.js";

//Objeto de configuración, evita repetir petToker y cabeceras.
//Añade token y cabeceras autómaticamente.
//AQUI DECIDIMOS QUE DATOS DE AUTENTICACIÓN SE ENVIAN.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8095/api";

const request = async (endpoint, options = {})=>{
    const token = localStorage.getItem("token");

    const headers = {
        "Accept": "application/json",
        ...(token && {"Authorization": `Bearer ${token}`}),//Inyección dinámica del token.
        ...(!options.isFormData && {"Content-Type": "application/json"}),
        ...options.headers,
    };
    //Si es FormData dejamos que el navegador gestione el Content-Type.
    if(options.isFormData) delete headers["Content-Type"];
    

    return fetchErroresRed(`${API_URL}/${endpoint}`,{...options, headers});
};
export default request;