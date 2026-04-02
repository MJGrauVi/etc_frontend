
const API_URL = "http://localhost:8095/api";

const useApiAuth = () => {

  //No necesito token porque el usuario AÚN no esta autenticado.
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    
    if (!res.ok) throw new Error("Error al iniciar sesión");
    //Laravel devuelve el token aquí y React lo guarda.
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
        'Authoriation': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      }

    });
    localStorage.removeItem('token');//Limpia en el frontend.
  };

  return { login, register, logout};
};
export {useApiAuth};