const API_URL = import.meta.env.VITE_API_URL;
/* operaciones de datos (get, post, put, remove, postForm) */
const getToken = () => localStorage.getItem("token");

const getHeaders = (includeBody = false) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
  };
  if (includeBody) headers["Content-Type"] = "application/json";
  return headers;
};

const crudService = {
  get: async (endpoint) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      const error = new Error("Error al obtener datos");
      error.status = res.status;
      throw error;
    }
    return await res.json();
  },

  post: async (endpoint, data) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = new Error("Error al crear recurso");
      error.status = res.status;
      throw error;
    }
    return await res.json();
  },

  put: async (endpoint, data) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "PUT",
      headers: getHeaders(true),
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = new Error("Error al actualizar recurso");
      error.status = res.status;
      throw error;
    }
    return await res.json();
  },

  remove: async (endpoint) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    if (!res.ok) {
      const error = new Error("Error al eliminar recurso");
      error.status = res.status;
      throw error;
    }
    return await res.json();
  },

  postForm: async (endpoint, formData) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "application/json",
      },
      body: formData,
    });
    if (!res.ok) {
      const error = new Error("Error al enviar formulario");
      error.status = res.status;
      throw error;
    }
    return await res.json();
  },
};

export { crudService };