const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem("token");

const getHeaders = (includeBody = false) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
  };
  if (includeBody) headers["Content-Type"] = "application/json";
  return headers;
};

const useApiCrud = () => {
  const get = async (endpoint) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Error al obtener datos");
    return await res.json();
  };

  const post = async (endpoint, data) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      // 👇 Lanza el status para que el hook pueda distinguir el error.
      const error = new Error("Error al crear recurso");
      error.status = res.status;
      throw error;
    }
    return await res.json();
  };

  const put = async (endpoint, data) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json();
    
      throw new Error(`Error ${res.status}: ${JSON.stringify(errorData)}`);
    }
    return await res.json();
  };

  const remove = async (endpoint) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Error al eliminar recurso");
    return await res.json();
  };
  const postForm = async (endpoint, formData) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "application/json",
        // Sin Content-Type — el navegador lo pone solo
      },
      body: formData, // FormData directamente, sin JSON.stringify
    });
    if (!res.ok) throw new Error("Error al crear recurso");
    return await res.json();
  };

  return { get, post, put, remove, postForm };
};
export { useApiCrud };
