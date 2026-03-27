const API_URL = "http://tu-backend.test/api";

export const useApiCrud = () => {
  const get = async (endpoint) => {
    const res = await fetch(`${API_URL}/${endpoint}`);
    if (!res.ok) throw new Error("Error al obtener datos");
    return await res.json();
  };

  const post = async (endpoint, data) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al crear recurso");
    return await res.json();
  };

  const put = async (endpoint, data) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error("Error al actualizar recurso");
    return await res.json();
  };

  const remove = async (endpoint) => {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar recurso");
    return await res.json();
  };

  return { get, post, put, remove };
};
