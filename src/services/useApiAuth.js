const API_URL = "http://localhost:8095/api";

export const useApiAuth = () => {
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
    await fetch(`${API_URL}/logout`, { method: "POST" });
  };

  return { login, register, logout };
};
