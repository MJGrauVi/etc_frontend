const API_URL = "http://localhost:8095/api";

// 👇 Necesitas definirla aquí también porque me() necesita el token
const getToken = () => localStorage.getItem('token');

const useApiAuth = () => {

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error("Error al iniciar sesión");
    return await res.json();
  };

  const register = async (formData) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    if (!res.ok) throw new Error("Error al registrar usuario");
    return await res.json();
  };

  const logout = async () => {
    await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${getToken()}`, // 👈 typo corregido: Authoriation → Authorization
        'Accept': 'application/json'
      }
    });
    localStorage.removeItem('token');
  };

  const me = async () => {
    const res = await fetch(`${API_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`, // 👈 reemplaza getHeaders() por esto
        'Accept': 'application/json'
      }
    });
    if (!res.ok) throw new Error("No autenticado");
    return await res.json();
  };

  return { login, register, logout, me };
};

export { useApiAuth };